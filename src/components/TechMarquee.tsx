import React from 'react';
import { motion } from 'motion/react';

// Logos officiels en noir et blanc (monochrome pur adapté au thème clair/sombre)
const TECH_LOGOS = [
  { name: "Python", src: "https://cdn.simpleicons.org/python" },
  { name: "n8n", src: "https://cdn.simpleicons.org/n8n" },
  { name: "Make", src: "https://cdn.simpleicons.org/make" },
  { name: "Zapier", src: "https://cdn.simpleicons.org/zapier" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql" },
  { name: "Redis", src: "https://cdn.simpleicons.org/redis" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker" },
  { name: "OpenAI", src: "" },
  { name: "Claude", src: "https://cdn.simpleicons.org/anthropic" },
  { name: "LangChain", src: "https://cdn.simpleicons.org/langchain" },
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe" },
  { name: "Grafana", src: "https://cdn.simpleicons.org/grafana" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
];

export const TechMarquee: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
      {/* 
        Utilisation de maskImage au lieu de divs dégradées opaques :
        Permet aux bords gauche et droit de se dissoudre en transparence totale de manière floue et progressive,
        sans créer de rectangle opaque ou de démarcation visible sur le fond (en mode sombre comme en mode clair).
      */}
      <div 
        className="w-full overflow-hidden py-6 sm:py-8 relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.7) 8%, black 15%, black 85%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.2) 97%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 3%, rgba(0,0,0,0.7) 8%, black 15%, black 85%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.2) 97%, transparent 100%)',
        }}
      >
        <motion.div
          className="flex items-center gap-16 md:gap-20 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 34,
            repeat: Infinity,
          }}
        >
          {/* Exactement 2 copies : la translation de -50% correspond pile à une copie,
              ce qui garantit une boucle parfaitement continue sans saut ni tremblement. */}
          {[...TECH_LOGOS, ...TECH_LOGOS].map((tech, index) => (
            <div
              key={index}
              className="shrink-0 flex items-center justify-center transition-opacity duration-300 opacity-60 hover:opacity-100 cursor-default"
              title={tech.name}
            >
              <div className="shrink-0 min-w-8 h-8 md:min-w-10 md:h-10 flex items-center justify-center">
                {tech.src ? <img
                  src={tech.src}
                  alt={tech.name}
                  className="max-w-10 max-h-full object-contain select-none pointer-events-none grayscale brightness-0 dark:invert transition-all duration-300"
                  draggable={false}
                /> : <span className="font-display text-lg tracking-tight font-semibold">{tech.name}</span>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};