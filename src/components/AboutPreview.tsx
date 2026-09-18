import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Workflow, Sparkles } from 'lucide-react';

export const AboutPreview: React.FC = () => (
  <section className="home-about-preview" data-testid="home-about-preview">
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="home-about-story">
      <span className="chapter-meta"><span className="signal-dot" />L’humain avant la technologie</span>
      <h2>Comprendre le problème.<br /><span className="font-serif-accent italic">Construire la bonne réponse.</span></h2>
      <p>Je construis mon parcours vers l’ingénierie de l’automatisation, un projet à la fois. Ce qui m’anime : connecter les outils, simplifier le quotidien et rendre la technologie vraiment utile.</p>
      <Link data-testid="home-about-link" to="/a-propos" className="text-link">Un peu plus sur moi <ArrowUpRight size={17} /></Link>
    </motion.div>
    <div className="home-services-index">
      {[
        { icon: Workflow, title: 'Automatisation', text: 'Des outils qui travaillent ensemble.' },
        { icon: Sparkles, title: 'Intelligence artificielle', text: 'Du contexte à l’action.' },
        { icon: Code2, title: 'Développement', text: 'La liberté de créer sur mesure.' },
      ].map((item, i) => <Link key={item.title} to="/competences" data-testid={`home-service-${i}`} className="service-index-row"><item.icon size={21} strokeWidth={1.2} /><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight size={17} /></Link>)}
    </div>
  </section>
);
