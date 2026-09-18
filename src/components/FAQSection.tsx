import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Es-tu disponible en CDI ou uniquement en freelance ?",
    answer: "Les deux. Je suis ouvert à un poste salarié comme à des missions freelance ponctuelles ou récurrentes — le format s'adapte au besoin, pas l'inverse."
  },
  {
    question: "Dans quel fuseau horaire travailles-tu ?",
    answer: "Madagascar (UTC+3), ce qui offre un bon chevauchement avec l'Europe et l'Afrique en direct, et reste facilement compatible avec les États-Unis en asynchrone."
  },
  {
    question: "Quels sont tes délais de réponse et de livraison ?",
    answer: "Réponse sous 24h à toute prise de contact. Les délais de livraison dépendent de la portée du projet et sont toujours cadrés dès l'échange initial, avant le démarrage."
  },
  {
    question: "Tu utilises des outils no-code/low-code ou uniquement du code ?",
    answer: "Les deux, selon ce qui sert le mieux le résultat : n8n ou Make pour aller vite sur des flux standards, Python et du code sur-mesure dès que la logique métier devient complexe ou critique."
  },
  {
    question: "Mon besoin n'est pas encore 100% défini, c'est un problème ?",
    answer: "Non, c'est même la norme. Chaque mission démarre par une phase de découverte pour cadrer précisément le besoin avant toute ligne de code."
  }
];

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
  hidden: { opacity: 0, y: 24 },
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

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1800px] mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-12"
      >
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <motion.h2 variants={staggerItem} className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-500 tracking-tighter">
            Questions fréquentes
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto w-full space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="faq-item border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
              >
                <button
                  data-testid={`faq-toggle-${index}`}
                  aria-controls={`faq-answer-${index}`}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 md:px-8 md:py-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-zinc-900 dark:text-white text-base md:text-lg">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-orange-500"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 32 }}
                      id={`faq-answer-${index}`}
                      data-testid={`faq-answer-${index}`}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 md:px-8 md:pb-8 text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};