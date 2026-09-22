import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, Play, Pause, ArrowUpRight } from 'lucide-react';

interface VideoPresentationProps {
  // Optionnel : URLs personnalisables pour les versions française et anglaise
  videoSrcFr?: string;
  videoSrcEn?: string;
  posterUrl?: string;
}

export const VideoPresentation: React.FC<VideoPresentationProps> = ({
  videoSrcFr,
  videoSrcEn,
  posterUrl = '/art/agent-core.webp'
}) => {
  const [activeLang, setActiveLang] = useState<'fr' | 'en'>('fr');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = activeLang === 'fr' ? videoSrcFr : videoSrcEn;

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Gestion si autoplay avec son est bloqué par le navigateur
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
            setIsPlaying(true);
          }
        });
      }
    }
  };

  const handleLangChange = (lang: 'fr' | 'en', e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLang === lang) return;
    setActiveLang(lang);
    if (videoRef.current) {
      const wasPlaying = !videoRef.current.paused;
      videoRef.current.src = lang === 'fr' ? videoSrcFr : videoSrcEn;
      if (wasPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)', scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
      >
        {/* Titre Principal */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
            Mon parcours et ma vision
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Découvrez mon approche : connecter les personnes, les applications et l’intelligence artificielle pour construire des systèmes utiles.
          </p>
        </div>

        {/* Cadre de la Vidéo (Style Tablette / Écran incurvé moderne) */}
        <div className="w-full mt-4 border border-zinc-200 dark:border-zinc-800 p-2">
          <div 
            onClick={activeVideo ? togglePlay : undefined}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full relative aspect-[16/9] overflow-hidden bg-zinc-950 select-none group"
          >
            {activeVideo ? <video ref={videoRef} src={activeVideo} poster={posterUrl} muted={isMuted} playsInline controls className="w-full h-full object-cover" onEnded={() => setIsPlaying(false)} /> : <img src={posterUrl} alt="Sculpture originale d’un noyau d’intelligence artificielle" className="w-full h-full object-cover" loading="lazy" />}

            {/* Voile sombre subtil pour améliorer le contraste des contrôles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {activeVideo ? <>
            {/* Bouton de Son (Haut Droite) */}
            <button
              onClick={toggleMute}
              type="button"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 z-20"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 dark:text-zinc-300" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              )}
            </button>

            {/* Bouton Play/Pause central (visible si en pause ou au survol) */}
            <AnimatePresence>
              {(!isPlaying || isHovering) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110">
                    {isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sélecteur de Langue (Pill flottant en bas au centre) */}
            {videoSrcEn && (
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
              <div 
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-white/60 dark:border-zinc-700/60 shadow-xl"
              >
                {/* Option Français */}
                <button
                  type="button"
                  onClick={(e) => handleLangChange('fr', e)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeLang === 'fr'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {/* Drapeau Français stylisé */}
                  <span className="w-4 h-4 rounded-full overflow-hidden inline-flex border border-zinc-300/60 shrink-0">
                    <span className="w-1/3 h-full bg-[#002654]" />
                    <span className="w-1/3 h-full bg-[#FFFFFF]" />
                    <span className="w-1/3 h-full bg-[#CE1126]" />
                  </span>
                  <span>Français</span>
                </button>

                {/* Option Anglais */}
                <button
                  type="button"
                  onClick={(e) => handleLangChange('en', e)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeLang === 'en'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {/* Drapeau Anglais / Union Jack stylisé */}
                  <span className="w-4 h-4 rounded-full overflow-hidden inline-flex items-center justify-center bg-[#012169] relative border border-zinc-300/60 shrink-0">
                    {/* Croix blanche */}
                    <span className="absolute inset-0 m-auto w-full h-[3px] bg-white" />
                    <span className="absolute inset-0 m-auto h-full w-[3px] bg-white" />
                    {/* Croix rouge */}
                    <span className="absolute inset-0 m-auto w-full h-[1.5px] bg-[#C8102E]" />
                    <span className="absolute inset-0 m-auto h-full w-[1.5px] bg-[#C8102E]" />
                  </span>
                  <span>Anglais</span>
                </button>
              </div>
              </div>
            )}
            </> : <div className="absolute inset-0 flex flex-col justify-end items-start p-6 sm:p-12 bg-gradient-to-t from-black/80 via-transparent to-transparent text-left">
              <span className="font-mono text-[9px] tracking-widest text-zinc-300 mb-4" data-testid="video-pending">PRÉSENTATION FILMÉE — EN PRÉPARATION</span>
              <Link data-testid="video-about-link" to="/a-propos" className="text-white font-serif-accent italic text-2xl sm:text-4xl flex items-center gap-5">L’humain derrière la machine <ArrowUpRight size={25} /></Link>
            </div>}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
