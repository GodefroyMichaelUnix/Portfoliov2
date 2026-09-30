import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { SectionHead } from './Folio';

interface VideoPresentationProps {
  videoSrcFr: string;
  videoSrcEn?: string;
  posterUrl?: string;
  placeholder?: boolean;
  webmSrc?: string;
}

const LangButton: React.FC<{ active: boolean; onClick: (e: React.MouseEvent) => void; label: string; testId: string }> = ({ active, onClick, label, testId }) => (
  <button type="button" data-testid={testId} onClick={onClick} className={`fb-video-lang ${active ? 'is-active' : ''}`}>{label}</button>
);

export const VideoPresentation: React.FC<VideoPresentationProps> = ({ videoSrcFr, videoSrcEn, posterUrl = '/art/presentation-poster.jpg', placeholder = false, webmSrc }) => {
  const [activeLang, setActiveLang] = useState<'fr' | 'en'>('fr');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = activeLang === 'en' && videoSrcEn ? videoSrcEn : videoSrcFr;

  useEffect(() => {
    const video = videoRef.current;
    if (!placeholder || !video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [placeholder]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) return video.pause();
    video.play().catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play();
    });
  };

  const handleLangChange = (lang: 'fr' | 'en', e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLang(lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="fb-video"
      data-testid="video-presentation"
    >
      <SectionHead
        label="Présentation"
        title="Mon parcours et ma vision"
        text="Découvrez mon approche : connecter les personnes, les applications et l’intelligence artificielle pour construire des systèmes utiles."
      />
      <div
        onClick={placeholder ? undefined : togglePlay}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`fb-video-frame group ${placeholder ? '' : 'is-clickable'}`}
      >
        <video
          ref={videoRef}
          key={activeVideo}
          src={webmSrc ? undefined : activeVideo}
          poster={posterUrl}
          muted={isMuted}
          playsInline
          autoPlay={placeholder}
          loop={placeholder}
          controls={!placeholder}
          preload="metadata"
          data-testid="presentation-video"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {webmSrc && <source src={activeVideo} type="video/mp4" />}
        </video>
        <div className="fb-video-shade" />

        {placeholder ? (
          <span className="fb-video-badge" data-testid="video-placeholder-badge">Aperçu d’ambiance · présentation filmée à venir</span>
        ) : (
          <>
            <button onClick={toggleMute} type="button" data-testid="video-mute-toggle" aria-label={isMuted ? 'Activer le son' : 'Couper le son'} className="fb-video-mute">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-orange-500" />}
            </button>
            <AnimatePresence>
              {(!isPlaying || isHovering) && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} className="fb-video-play-wrap">
                  <span className="fb-video-play">{isPlaying ? <Pause size={28} className="fill-current" /> : <Play size={28} className="fill-current ml-1" />}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {videoSrcEn && (
              <div className="fb-video-langs" onClick={(e) => e.stopPropagation()}>
                <LangButton testId="video-lang-fr" active={activeLang === 'fr'} onClick={(e) => handleLangChange('fr', e)} label="Français" />
                <LangButton testId="video-lang-en" active={activeLang === 'en'} onClick={(e) => handleLangChange('en', e)} label="Anglais" />
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};
