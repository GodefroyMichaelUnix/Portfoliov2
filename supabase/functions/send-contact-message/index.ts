/**
 * Supabase Edge Function: send-contact-message
 *
 * Public contact form endpoint for https://mgodefroy.com
 *
 * Workflow:
 * 1. Handles CORS (supports production https://mgodefroy.com, previews & local dev)
 * 2. Validates incoming payload (name, email, projectType, message, honeypot)
 * 3. Honeypot check: silently discards bots with 200 { success: true }
 * 4. Inserts sanitized message into Supabase database (public.contact_messages)
 * 5. Sends formatted notification email with Resend API to michael@mgodefroy.com
 *    with reply_to set to the visitor's email address
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// ==============================================================================
// CONFIGURATION
// ==============================================================================

/**
 * Sender address for Resend.
 *
 * NOTE ON DOMAIN VERIFICATION:
 * - In production: Once 'mgodefroy.com' is verified in your Resend dashboard (DNS records added),
 *   you can use 'contact@mgodefroy.com' or 'Michael Godefroy <contact@mgodefroy.com>'.
 * - During testing/development (before domain verification): Resend only allows sending from
 *   'onboarding@resend.dev' to the email address registered with your Resend account.
 * - You can also override this via the Supabase secret `RESEND_FROM_EMAIL`.
 */
const EMAIL_FROM_DEFAULT = "contact@mgodefroy.com";
const NOTIFICATION_RECIPIENT = "michael@mgodefroy.com";

// ==============================================================================
// CORS HELPER
// ==============================================================================

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = [
    "https://mgodefroy.com",
    "https://www.mgodefroy.com",
  ];

  const isAllowed =
    allowedOrigins.includes(origin) ||
    origin.startsWith("http://localhost:") ||
    origin.startsWith("http://127.0.0.1:") ||
    origin.endsWith(".run.app") ||
    origin.endsWith(".netlify.app");

  const allowOrigin = isAllowed ? origin : "https://mgodefroy.com";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// ==============================================================================
// HTML ESCAPING (XSS Prevention in emails)
// ==============================================================================

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==============================================================================
// MAIN HANDLER
// ==============================================================================

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

  // 1. Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // 2. Enforce POST method only
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 3. Parse JSON body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 4. Honeypot check (anti-bot)
  // If non-empty, treat as spam: do not insert, do not send email, return harmless success
  const honeypot = typeof body.honeypot === "string" ? body.honeypot.trim() : "";
  if (honeypot.length > 0) {
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 5. Extract and sanitize fields
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // 6. Server-side field validation

  // Name: 1 to 120 characters
  if (!name || name.length < 1 || name.length > 120) {
    return new Response(
      JSON.stringify({ error: "Name is required and must be between 1 and 120 characters." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Email: reasonable format, max 320 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || email.length > 320 || !emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "A valid email address is required (max 320 characters)." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Project Type: only accept 'cdi', 'freelance', 'audit', 'autre'
  const validProjectTypes = ["cdi", "freelance", "audit", "autre"] as const;
  type ValidProjectType = typeof validProjectTypes[number];

  if (!validProjectTypes.includes(projectType as ValidProjectType)) {
    return new Response(
      JSON.stringify({ error: "Invalid project type. Allowed values: cdi, freelance, audit, autre." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // Message: 1 to 5000 characters
  if (!message || message.length < 1 || message.length > 5000) {
    return new Response(
      JSON.stringify({ error: "Message is required and must be between 1 and 5000 characters." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 7. Supabase Database insertion (public.contact_messages)
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    Deno.env.get("SUPABASE_ANON_KEY");

  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment configuration missing in Edge Function.");
    return new Response(
      JSON.stringify({ error: "Database service configuration error." }),
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
    console.error("Failed to insert into public.contact_messages:", insertError.message);
    return new Response(
      JSON.stringify({ error: "Failed to save message." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // 8. Resend Email Notification
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY secret in Edge Function environment.");
    return new Response(
      JSON.stringify({ error: "Email service is not configured." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || EMAIL_FROM_DEFAULT;

  const projectLabels: Record<ValidProjectType, string> = {
    cdi: "CDI",
    freelance: "Freelance",
    audit: "Audit",
    autre: "Autre",
  };

  const projectLabel = projectLabels[projectType as ValidProjectType] || projectType;
  const receptionDate = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const emailSubject = `Nouveau message depuis le portfolio — [${projectLabel}]`;

  const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f7f9; margin: 0; padding: 32px 16px; color: #18181b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e4e4e7; }
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
      <div class="label">Nom</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>
    
    <div class="row">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #ea580c; text-decoration: none;">${escapeHtml(email)}</a></div>
    </div>
    
    <div class="row">
      <div class="label">Type de demande</div>
      <div class="value">${escapeHtml(projectLabel)}</div>
    </div>
    
    <div class="row">
      <div class="label">Reçu le</div>
      <div class="value">${escapeHtml(receptionDate)} (heure de Paris)</div>
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

Nom :
${name}

Email :
${email}

Type de demande :
${projectLabel}

Message :
${message}

Reçu le :
${receptionDate}

---
(Vous pouvez répondre directement à cet email pour contacter ${name} à : ${email})
  `.trim();

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [NOTIFICATION_RECIPIENT],
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend API rejected request with status:", resendResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email notification." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 9. Return success contract
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("Network exception during Resend notification:", errMsg);
    return new Response(
      JSON.stringify({ error: "Network error during email dispatch." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
