import React from 'react';

export const WorkflowDiagram = ({ labels = ['Déclencher', 'Comprendre', 'Transformer', 'Exécuter'] }: { labels?: string[] }) => (
  <div className="workflow-diagram" aria-label={`Flux : ${labels.join(', ')}`}>
    <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="workflow-wires" aria-hidden="true">
      <path d="M100 60 H300 C350 60 350 25 400 25 S450 60 500 60 H700" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M100 60 H300 C350 60 350 25 400 25 S450 60 500 60 H700" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="6 130" className="animate-circuit-flow" />
    </svg>
    {labels.map((label, i) => <div className="workflow-node" key={label}><span className="node-box">{['↗', '{ }', '◇', '↗'][i % 4]}</span><span className="font-mono text-[9px] opacity-50">0{i + 1}</span><span>{label}</span></div>)}
  </div>
);
