import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  Check, 
  Copy, 
  CheckCircle2, 
  Instagram,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ProfileInfo } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import { supabase } from '../lib/supabase';

interface ContactPageProps {
  profile: ProfileInfo;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25
    }
  }
};

export const ContactPage: React.FC<ContactPageProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'freelance',
    message: '',
    honeypot: ''
  });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setFormStatus('idle');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'submitting') return;

    setErrorMessage(null);
    setFormStatus('submitting');

    if (!supabase) {
      setFormStatus('error');
      setErrorMessage(
        "Le service de messagerie n'est pas disponible pour le moment. Veuillez me contacter directement par email."
      );
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-message', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          message: formData.message.trim(),
          honeypot: formData.honeypot
        }
      });

      if (error) {
        let msg = "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.";
        try {
          if ('context' in error && error.context && typeof error.context.json === 'function') {
            const errorBody = await error.context.json();
            if (errorBody?.error) msg = errorBody.error;
          } else if (error.message) {
            msg = error.message;
          }
        } catch {
          if (error.message) msg = error.message;
        }
        setFormStatus('error');
        setErrorMessage(msg);
        return;
      }

      // Succès réel
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'freelance',
        message: '',
        honeypot: ''
      });
    } catch (err: unknown) {
      console.error('Erreur lors de la soumission du formulaire :', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setFormStatus('error');
      setErrorMessage(errMsg || "Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return (
    <PageTransition>
      <div className="studio-page contact-page">
        <PageIntro number="06" label="Connexion humaine" title="Tout commence" accent="par un échange." description="Une idée, un processus à simplifier ou un nouveau défi ? Parlons de ce que nous pouvons construire ensemble." />

        <div className="contact-layout">
          
          {/* Left Column: Direct Channels */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="contact-direct space-y-8 min-w-0"
          >
            <div className="contact-person" data-testid="contact-person">
              <div className="contact-person-photo">
                {(profile.avatarUrl || profile.heroPhotoUrl) ? (
                  <img src={profile.avatarUrl || profile.heroPhotoUrl} alt={profile.name} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs text-zinc-500 uppercase">
                    {profile.name ? profile.name.slice(0, 2) : ''}
                  </div>
                )}
              </div>
              <div><span className="chapter-meta"><span className="signal-dot" />{profile.availability.status}</span><p>{profile.name}</p><span className="text-xs text-zinc-500 dark:text-zinc-400">Une conversation, pas un ticket support.</span></div>
            </div>
            <motion.div variants={staggerItem} className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                Canaux directs
              </span>

              {/* Email */}
              <div className="group contact-email-panel">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">Email professionnel</span>
                </div>
                
                <div className="flex items-center justify-between gap-3 bg-white dark:bg-zinc-800/80 p-3 rounded-2xl shadow-sm">
                  <a data-testid="contact-email-link" href={`mailto:${profile.contact.email}`} className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 break-all pl-2">
                    {profile.contact.email}
                  </a>
                  <button
                    data-testid="contact-copy-email"
                    onClick={handleCopyEmail}
                    className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors shrink-0 cursor-pointer"
                    title="Copier l'adresse"
                    aria-label={copiedEmail ? "Adresse email copiée" : "Copier l'adresse email"}
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={profile.contact.linkedin}
                  data-testid="contact-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                >
                  <Linkedin className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">LinkedIn</span>
                </a>

                <a
                  href={profile.contact.github}
                  data-testid="contact-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">GitHub</span>
                </a>

                {profile.contact.upwork && (
                  <a
                    href={profile.contact.upwork}
                    data-testid="contact-upwork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                  >
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">Up</span>
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Upwork</span>
                  </a>
                )}

                {profile.contact.fiverr && (
                  <a
                    href={profile.contact.fiverr}
                    data-testid="contact-fiverr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                  >
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">fi</span>
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Fiverr</span>
                  </a>
                )}

                {profile.contact.malt && (
                  <a
                    href={profile.contact.malt}
                    data-testid="contact-malt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                  >
                    <span className="text-xs font-black text-red-500 group-hover:scale-110 transition-transform">m</span>
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Malt</span>
                  </a>
                )}

                {profile.contact.instagram && (
                  <a
                    href={profile.contact.instagram}
                    data-testid="contact-instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-[24px] border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col items-center justify-center gap-2 transition-all duration-300 group"
                  >
                    <Instagram className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Instagram</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0"
          >
            <div className="contact-form-card" data-testid="contact-form-panel">
              <div className="contact-form-heading">
                <span className="chapter-meta">VOTRE PROCHAIN CHAPITRE</span>
                <span aria-hidden="true">↗</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
                Transmettez-moi les détails de votre projet. Je vous répondrai personnellement sous 24h.
              </p>

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 data-testid="contact-success" className="text-2xl font-black text-orange-600 dark:text-orange-500 tracking-tight">
                        Message envoyé
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
                        Merci pour votre message. Votre demande a bien été transmise et je reviendrai vers vous sous 24h ouvrées.
                      </p>
                    </div>
                    <button
                      data-testid="contact-new-message"
                      type="button"
                      onClick={handleResetForm}
                      className="px-8 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Envoyer un nouveau message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    {/* Honeypot field (invisible pour les robots anti-spam) */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <label htmlFor="contact-hp">Ne pas remplir ce champ si vous êtes humain</label>
                      <input
                        id="contact-hp"
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      />
                    </div>

                    {formStatus === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        aria-live="assertive"
                        data-testid="contact-error-notice"
                        className="p-4 rounded-[16px] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 text-xs font-medium flex items-start gap-3"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                        <span className="leading-relaxed">{errorMessage}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Nom</label>
                        <input
                          id="contact-name"
                          data-testid="contact-name"
                          autoComplete="name"
                          type="text"
                          required
                          maxLength={120}
                          disabled={formStatus === 'submitting'}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 rounded-[20px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm disabled:opacity-60"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Email</label>
                        <input
                          id="contact-email"
                          data-testid="contact-email"
                          autoComplete="email"
                          type="email"
                          required
                          maxLength={320}
                          disabled={formStatus === 'submitting'}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-[20px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <fieldset className="space-y-2">
                      <legend className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Besoin</legend>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'cdi', label: 'CDI' },
                          { id: 'freelance', label: 'Freelance' },
                          { id: 'audit', label: 'Audit' },
                          { id: 'autre', label: 'Autre' },
                        ].map((type) => (
                          <button
                            data-testid={`contact-type-${type.id}`}
                            aria-pressed={formData.projectType === type.id}
                            key={type.id}
                            type="button"
                            disabled={formStatus === 'submitting'}
                            onClick={() => setFormData({ ...formData, projectType: type.id })}
                            className={`p-3 rounded-[16px] border text-xs font-bold tracking-widest transition-all cursor-pointer disabled:cursor-not-allowed ${
                              formData.projectType === type.id
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md'
                                : 'bg-white dark:bg-zinc-900/50 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Message</label>
                      <textarea
                        id="contact-message"
                        data-testid="contact-message"
                        required
                        rows={5}
                        maxLength={5000}
                        disabled={formStatus === 'submitting'}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-[24px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm resize-none disabled:opacity-60"
                      />
                    </div>

                    <div className="pt-4">
                      <MagneticWrapper strength={0.2} className="w-full">
                        <motion.button
                          whileHover={formStatus === 'submitting' ? {} : { scale: 1.02 }}
                          whileTap={formStatus === 'submitting' ? {} : { scale: 0.98 }}
                          data-testid="contact-submit"
                          type="submit"
                          disabled={formStatus === 'submitting'}
                          className={`w-full py-5 text-white rounded-[24px] text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 ${
                            formStatus === 'submitting'
                              ? 'bg-orange-400 dark:bg-orange-500/60 cursor-not-allowed'
                              : 'bg-orange-600 hover:bg-orange-700 cursor-pointer'
                          }`}
                        >
                          {formStatus === 'submitting' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Envoi en cours...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Envoyer mon message</span>
                            </>
                          )}
                        </motion.button>
                      </MagneticWrapper>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};
