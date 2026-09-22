import React from 'react';
import { motion } from 'motion/react';

// Stack réellement cohérente avec le positionnement actuel :
// AI Automation • IT Automation • AI Engineering • Integrations
const TECH_LOGOS = [
  { name: "Python", src: "https://cdn.simpleicons.org/python" },
  { name: "n8n", src: "https://cdn.simpleicons.org/n8n" },
  { name: "Make", src: "https://cdn.simpleicons.org/make" },
  { name: "Zapier", src: "https://cdn.simpleicons.org/zapier" },
  { name: "HighLevel", src: "https://assets.cdn.filesafe.space/zELBHkVp0JPbbLvKIlF5/media/690a5f4a57ea175183408da2.png" },
  { name: "Twilio", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twilio.svg" },
  { name: "Vapi", src: "https://cdn.jsdelivr.net/npm/@thesvg/icons/icons/vapi.svg" },
  { name: "Retell AI", src: "https://cdn.prod.website-files.com/64ada0f2685b2d18caa5e699/6a25e25759e725c1b46fec54_Main%20Logo%20dark.svg" },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript" },
  { name: "React", src: "https://cdn.simpleicons.org/react" },
  { name: "OpenAI", src: "https://cdn.simpleicons.org/openai" },
  { name: "Claude", src: "https://cdn.simpleicons.org/anthropic" },
  { name: "Google Sheets", src: "https://cdn.simpleicons.org/googlesheets" },
  { name: "Slack", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg" },
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
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="max-w-10 max-h-full object-contain select-none pointer-events-none grayscale brightness-0 dark:invert transition-all duration-300"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};