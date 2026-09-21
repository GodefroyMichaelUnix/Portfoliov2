/**
 * Supabase Edge Function : send-contact-message
 *
 * Traite les soumissions publiques du formulaire de contact du portfolio :
 * 1. Validation stricte des données côté serveur (nom, email, type de besoin, message, honeypot)
 * 2. Enregistrement dans la table Supabase `public.contact_messages`
 * 3. Envoi d'une notification email via l'API Resend à michael@mgodefroy.com avec reply-to vers le visiteur
 * 
 * Variables d'environnement / Secrets Supabase requis :
 * - SUPABASE_URL (injecté automatiquement par Supabase)
 * - SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_ANON_KEY (injecté automatiquement par Supabase)
 * - RESEND_API_KEY (secret configuré par l'utilisateur dans Supabase Edge Functions)
 * - RESEND_FROM_EMAIL (optionnel, ex: 'Michael Godefroy <contact@mgodefroy.com>' ou 'onboarding@resend.dev' pour les tests)
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req: Request) => {
  // Gestion de la négociation CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Méthode non autorisée. Seul POST est accepté." }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Format JSON invalide dans la requête." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 1. Protection Anti-Abus (Honeypot)
  // Si le champ honeypot invisible est rempli, on feint le succès sans rien envoyer
  const honeypot = typeof body.honeypot === "string" ? body.honeypot.trim() : "";
  if (honeypot.length > 0) {
    console.warn("Honeypot détecté - soumission ignorée.");
    return new Response(
      JSON.stringify({ success: true, message: "Message traité." }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 2. Extraction et nettoyage
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // 3. Validation stricte côté serveur
  if (!name || name.length < 1 || name.length > 120) {
    return new Response(
      JSON.stringify({ error: "Le nom est requis et doit comporter entre 1 et 120 caractères." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 320 || !emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Une adresse email valide est requise (maximum 320 caractères)." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const allowedProjectTypes = ["cdi", "freelance", "audit", "autre"];
  if (!projectType || !allowedProjectTypes.includes(projectType)) {
    return new Response(
      JSON.stringify({ error: "Type de projet invalide. Valeurs acceptées : cdi, freelance, audit, autre." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  if (!message || message.length < 1 || message.length > 5000) {
    return new Response(
      JSON.stringify({ error: "Le message est requis et doit comporter entre 1 et 5000 caractères." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 4. Enregistrement dans Supabase (table public.contact_messages)
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseKey =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    Deno.env.get("SUPABASE_ANON_KEY") ||
    "";

  if (!supabaseUrl || !supabaseKey) {
    console.error("Configuration Supabase manquante dans l'environnement Edge Function.");
    return new Response(
      JSON.stringify({ error: "Configuration serveur Supabase introuvable." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error: insertError } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      project_type: projectType,
      message,
    });

  if (insertError) {
    console.error("Erreur lors de l'insertion dans public.contact_messages :", insertError);
    return new Response(
      JSON.stringify({ error: "Erreur lors de l'enregistrement du message en base de données." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 5. Envoi de l'email de notification via l'API Resend
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const recipientEmail = "michael@mgodefroy.com";

  // Expéditeur : utilise RESEND_FROM_EMAIL si défini (ex: contact@mgodefroy.com une fois le domaine vérifié chez Resend,
  // ou onboarding@resend.dev pour la phase de test initiale)
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "Portfolio Michael Godefroy <contact@mgodefroy.com>";

  if (!resendApiKey) {
    console.error("Secret RESEND_API_KEY non configuré dans Supabase Edge Functions.");
    return new Response(
      JSON.stringify({
        error: "Message enregistré dans la base, mais la notification email n'a pas pu être envoyée (clé RESEND_API_KEY non configurée).",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const projectLabels: Record<string, string> = {
    cdi: "Opportunité CDI",
    freelance: "Mission Freelance",
    audit: "Audit Technique & Automatisation",
    autre: "Autre demande",
  };

  const projectLabel = projectLabels[projectType] || projectType.toUpperCase();
  const dateStr = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f7f9; margin: 0; padding: 32px 16px; color: #18181b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e4e4e7; }
    .badge { display: inline-block; background: #ea580c; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    h1 { font-size: 20px; font-weight: 800; margin: 16px 0 24px; color: #09090b; }
    .row { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717a; letter-spacing: 0.5px; }
    .value { font-size: 15px; font-weight: 600; color: #09090b; margin-top: 4px; }
    .message-box { background: #fafaf9; border-radius: 12px; padding: 20px; border: 1px solid #e4e4e7; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #27272a; margin-top: 8px; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #f4f4f5; font-size: 12px; color: #a1a1aa; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">${escapeHtml(projectLabel)}</span>
    <h1>Nouveau message depuis le portfolio</h1>
    <div class="row">
      <div class="label">Expéditeur</div>
      <div class="value">${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;</div>
    </div>
    <div class="row">
      <div class="label">Type de besoin</div>
      <div class="value">${escapeHtml(projectLabel)}</div>
    </div>
    <div class="row">
      <div class="label">Date de réception</div>
      <div class="value">${escapeHtml(dateStr)} (heure de Paris)</div>
    </div>
    <div class="row">
      <div class="label">Message</div>
      <div class="message-box">${escapeHtml(message)}</div>
    </div>
    <div class="footer">
      Vous pouvez répondre directement à cet email pour contacter ${escapeHtml(name)}.
    </div>
  </div>
</body>
</html>
  `.trim();

  const emailText = `
Nouveau message depuis le portfolio
===================================
Expéditeur : ${name} (${email})
Type de besoin : ${projectLabel}
Date : ${dateStr}

Message :
---------
${message}

(Pour répondre, écrivez directement à : ${email})
  `.trim();

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `Nouveau message depuis le portfolio — [${projectLabel}]`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!resendRes.ok) {
      const errorText = await resendRes.text();
      console.error("Erreur renvoyée par l'API Resend :", errorText);
      return new Response(
        JSON.stringify({
          error: "Message enregistré en base, mais la notification email n'a pas pu être envoyée via Resend.",
          details: errorText,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const resendData = await resendRes.json();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message enregistré et notification transmise avec succès.",
        id: resendData.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Exception lors de l'appel Resend :", errMsg);
    return new Response(
      JSON.stringify({ error: "Erreur réseau lors de l'envoi de la notification." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
