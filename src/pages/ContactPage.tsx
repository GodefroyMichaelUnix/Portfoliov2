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
  Instagram
} from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ProfileInfo } from '../types/portfolio';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { PageIntro } from '../components/PageIntro';
import michaelPortrait from '../assets/images/michael_seated_trimmed.png';

interface ContactPageProps {
  profile: ProfileInfo;
}

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
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'freelance',
    message: ''
  });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
              <div className="contact-person-photo"><img src={michaelPortrait} alt={profile.name} /></div>
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
                    aria-label={copiedEmail ? 'Email copié' : 'Copier l’email'}
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
                    title="Copier l'email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-orange-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Socials */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                    <img src="https://cdn.simpleicons.org/upwork/3f3f46" alt="Upwork" className="w-5 h-5 dark:hidden group-hover:scale-110 transition-transform" />
                    <img src="https://cdn.simpleicons.org/upwork/d4d4d8" alt="Upwork" className="w-5 h-5 hidden dark:block group-hover:scale-110 transition-transform" />
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
                    <img src="https://cdn.simpleicons.org/fiverr/3f3f46" alt="Fiverr" className="w-5 h-5 dark:hidden group-hover:scale-110 transition-transform" />
                    <img src="https://cdn.simpleicons.org/fiverr/d4d4d8" alt="Fiverr" className="w-5 h-5 hidden dark:block group-hover:scale-110 transition-transform" />
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
                    <img src="https://cdn.simpleicons.org/malt/3f3f46" alt="Malt" className="w-5 h-5 dark:hidden group-hover:scale-110 transition-transform" />
                    <img src="https://cdn.simpleicons.org/malt/d4d4d8" alt="Malt" className="w-5 h-5 hidden dark:block group-hover:scale-110 transition-transform" />
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
              <div className="contact-form-heading"><span className="chapter-meta">VOTRE PROCHAIN CHAPITRE</span><span aria-hidden="true">↗</span></div>
              <p className="demo-note" data-testid="contact-demo-notice">Aperçu du formulaire — aucun message n’est transmis. Pour me joindre, utilisez l’email direct.</p>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6"
                  >
                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 data-testid="contact-success" className="text-2xl font-black text-orange-600 dark:text-orange-500 tracking-tight">Demande préparée</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-light">
                        Ceci est un aperçu : aucun message n’a été envoyé. Contactez-moi directement par email pour poursuivre l’échange.
                      </p>
                      <a data-testid="contact-draft-email" href={`mailto:${profile.contact.email}?subject=${encodeURIComponent(`${formData.projectType} — ${formData.name}`)}&body=${encodeURIComponent(`${formData.message}\n\n${formData.name}\n${formData.email}`)}`} className="text-link mx-auto mt-5">Ouvrir dans ma messagerie <Mail size={16} /></a>
                    </div>
                    <button
                      data-testid="contact-new-message"
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Nouveau message
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Nom</label>
                        <input
                          id="contact-name"
                          data-testid="contact-name"
                          autoComplete="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 rounded-[20px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm"
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
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-[20px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Besoin</label>
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
                            onClick={() => setFormData({ ...formData, projectType: type.id })}
                            className={`p-3 rounded-[16px] border text-xs font-bold tracking-widest transition-all cursor-pointer ${
                              formData.projectType === type.id
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md'
                                : 'bg-white dark:bg-zinc-900/50 text-zinc-500 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-message" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-2">Message</label>
                      <textarea
                        id="contact-message"
                        data-testid="contact-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-[24px] bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 transition-all shadow-sm resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <MagneticWrapper strength={0.2} className="w-full">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          data-testid="contact-submit"
                          type="submit"
                          className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-[24px] text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Préparer mon message</span>
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
