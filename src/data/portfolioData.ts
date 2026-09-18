import { 
  ProfileInfo, 
  ServiceSolution, 
  ProjectItem, 
  SkillCategory, 
  Certification, 
  WorkflowStep, 
  Differentiator 
} from '../types/portfolio';

export const profileData: ProfileInfo = {
  name: 'Michael Godefroy',
  title: 'AI Automation Engineer',
  roleSubtitle: 'Automatisation & Intégrations',
  valueProposition: 'Du processus manuel au workflow automatisé.',
  bioSummary: [
    'Je conçois des workflows d’automatisation qui connectent applications, APIs, données et outils d’IA pour créer des systèmes pratiques.',
    'Mon objectif est de transformer les processus répétitifs en workflows fiables nécessitant moins d’intervention manuelle.'
  ],
  availability: {
    status: 'Disponible',
    subtext: 'CDI & Freelance',
    responseTime: 'Réponse sous 24h'
  },
  location: 'Paris • Remote',
  contact: {
    email: 'godefroy.michael.unix@gmail.com',
    linkedin: 'https://linkedin.com/in/michael-godefroy',
    upwork: 'https://upwork.com/freelancers/michaelg',
    github: 'https://github.com/mgodefroy',
    fiverr: 'https://fiverr.com',
    malt: 'https://malt.fr',
    instagram: 'https://instagram.com/michael_godefroy'
  },
  stats: [
    {
      value: '99.9%',
      label: 'Uptime',
      sublabel: 'Workflows fiabilisés'
    },
    {
      value: '-85%',
      label: 'Temps Manuel',
      sublabel: 'Processus automatisés'
    },
    {
      value: '< 24h',
      label: 'Réactivité',
      sublabel: 'Intervention rapide'
    },
    {
      value: '100%',
      label: 'Production',
      sublabel: 'Code versionné & audité'
    }
  ]
};

export const solutionsData: ServiceSolution[] = [
  {
    id: 'workflow-automation',
    title: 'Automatisation IT',
    subtitle: 'Interconnexion & Orchestration',
    painPoint: 'Tâches répétitives, silos de données.',
    concreteBenefit: 'Synchronisation fluide et exécution sans erreur.',
    deliverables: [
      'Pipelines automatisés (n8n, Python)',
      'Intégration d\'APIs REST/GraphQL',
      'Gestion des erreurs et alertes'
    ],
    metricTarget: 'Gain: 20h/semaine',
    iconName: 'Workflow'
  },
  {
    id: 'ai-agents-llm',
    title: 'Agents IA',
    subtitle: 'Workflows Cognitifs',
    painPoint: 'Données non structurées, traitement lourd.',
    concreteBenefit: 'Extraction et action intelligente.',
    deliverables: [
      'Pipelines RAG & LLMs',
      'Agents autonomes (Tool Calling)',
      'Guardrails stricts'
    ],
    metricTarget: 'Traitement en temps réel',
    iconName: 'Bot'
  },
  {
    id: 'monitoring-resilience',
    title: 'Observabilité',
    subtitle: 'Fiabilité 24/7',
    painPoint: 'Pannes silencieuses, détection tardive.',
    concreteBenefit: 'Monitoring continu et remédiation.',
    deliverables: [
      'Logs centralisés',
      'Mécanismes de fallback',
      'Alerting pro-actif'
    ],
    metricTarget: 'Détection < 1 minute',
    iconName: 'Activity'
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Pipeline IA de Tri Documentaire B2B',
    category: 'ai-agents',
    categoryLabel: 'IA & Automatisation',
    subtitle: 'Extraction structurée & injection ERP',
    context: 'Logistique traitant 500+ documents non standardisés/semaine.',
    problem: 'Saisie manuelle lente et sujette aux erreurs.',
    solution: 'Agent LLM couplé à n8n pour parsing JSON strict et validation humaine ciblée.',
    techStack: ['Python', 'n8n', 'OpenAI API', 'PostgreSQL'],
    measurableResult: '-82% de temps de traitement, taux d\'erreur <0.4%',
    metrics: [
      { label: 'Gain de temps', value: '-82%' },
      { label: 'Erreurs', value: '< 0.4%' },
      { label: 'Volume', value: '450/j' }
    ],
    architectureSummary: [
      'Ingestion webhook sécurisée',
      'Parsing hybride OCR/LLM',
      'Contrôle d\'intégrité métier'
    ],
    featured: true,
    mockupType: 'agent-orchestrator'
  },
  {
    id: 'project-2',
    title: 'Moteur de Synchronisation Multi-SaaS',
    category: 'workflows',
    categoryLabel: 'Workflows & API',
    subtitle: 'CRM, Facturation & Support temps réel',
    context: 'Scale-up SaaS avec silos entre Stripe, HubSpot et l\'application core.',
    problem: 'Désynchronisation des abonnements et délais d\'activation (48h).',
    solution: 'Architecture événementielle idempotente avec file d\'attente Redis et Make.',
    techStack: ['Python', 'Make', 'Redis', 'Stripe API'],
    measurableResult: 'Activation instantanée (<30s), 0 conflit de données',
    metrics: [
      { label: 'Activation', value: '< 30s' },
      { label: 'Incidents', value: '0' },
      { label: 'Événements', value: '25k/m' }
    ],
    architectureSummary: [
      'Webhook centralisé',
      'Queue transactionnelle',
      'Résolution de conflits automatisée'
    ],
    featured: true,
    mockupType: 'automation-pipeline'
  },
  {
    id: 'project-3',
    title: 'Observabilité Infrastructure Centralisée',
    category: 'data-infra',
    categoryLabel: 'Data & Infra',
    subtitle: 'Collecte, nettoyage et alerting auto',
    context: 'Parc de serveurs hétérogènes sans monitoring unifié.',
    problem: 'Pannes détectées par les clients, scripts de maintenance dispersés.',
    solution: 'Agents de collecte Python, aggrégation SQL et dashboard Grafana.',
    techStack: ['Python', 'Bash', 'PostgreSQL', 'Grafana'],
    measurableResult: 'Uptime sécurisé, résolution proactive',
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Détection', value: '< 1m' },
      { label: 'Scripts unifiés', value: '35+' }
    ],
    architectureSummary: [
      'Sondes Python modulaires',
      'Stockage relationnel',
      'Alerting sélectif'
    ],
    featured: true,
    mockupType: 'database-sync'
  }
];

export const skillsData: SkillCategory[] = [
  {
    id: 'automation-workflows',
    title: 'Workflows',
    subtitle: 'Orchestration & APIs',
    iconName: 'Network',
    skills: [
      {
        name: 'Python (Scripting & Automation)',
        levelBadge: 'Avancé',
        useCase: 'Scripts, manipulation de données.',
        tags: ['Requests', 'Pandas', 'Pydantic']
      },
      {
        name: 'n8n & Make',
        levelBadge: 'Expert',
        useCase: 'Conception de flux.',
        tags: ['Webhooks', 'OAuth2', 'Custom Code']
      },
      {
        name: 'APIs RESTful',
        levelBadge: 'Avancé',
        useCase: 'Interconnexion de systèmes.',
        tags: ['JSON', 'Auth', 'Rate Limiting']
      }
    ]
  },
  {
    id: 'ai-agents',
    title: 'IA Agents',
    subtitle: 'Pipelines cognitifs',
    iconName: 'Cpu',
    skills: [
      {
        name: 'LLM Orchestration',
        levelBadge: 'Production',
        useCase: 'Agents autonomes.',
        tags: ['Function Calling', 'State Machines']
      },
      {
        name: 'Prompt Engineering',
        levelBadge: 'Avancé',
        useCase: 'Déterminisme LLM.',
        tags: ['JSON Schema', 'Guardrails']
      },
      {
        name: 'RAG',
        levelBadge: 'Avancé',
        useCase: 'Indexation & Recherche.',
        tags: ['Embeddings', 'Vector DB']
      }
    ]
  },
  {
    id: 'data-infra',
    title: 'Infra',
    subtitle: 'Déploiement fiable',
    iconName: 'Database',
    skills: [
      {
        name: 'PostgreSQL',
        levelBadge: 'Avancé',
        useCase: 'Modélisation & requêtes.',
        tags: ['SQL', 'Indexes']
      },
      {
        name: 'Linux & Bash',
        levelBadge: 'Solide',
        useCase: 'Administration & cron.',
        tags: ['Systemd', 'SSH']
      },
      {
        name: 'Git & CI/CD',
        levelBadge: 'Standard',
        useCase: 'Versioning et déploiement.',
        tags: ['GitHub', 'Pipelines']
      }
    ]
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'cert-google-prompting',
    title: 'Google Prompting Essentials',
    issuer: 'Google',
    issueDate: '2024',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=800&auto=format&fit=crop',
    verifyUrl: 'https://coursera.org/verify/professional-cert/google-prompting',
    featured: true,
    summary: 'Techniques avancées de prompting pour modèles de fondation.',
    skills: ['AI agent design', 'Multimodal Prompting', 'Prompt Engineering']
  },
  {
    id: 'cert-google-it-python',
    title: 'Google IT Automation with Python',
    issuer: 'Google',
    issueDate: '2023',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    verifyUrl: 'https://coursera.org/verify/professional-cert/GOOG-IT-PY',
    featured: true,
    summary: 'Automatisation système, Git, et résolution de problèmes.',
    skills: ['Python', 'Git', 'Debugging']
  },
  {
    id: 'cert-vanderbilt-ai-agents',
    title: 'AI Agent Developer',
    issuer: 'Vanderbilt University',
    issueDate: '2024',
    logo: 'https://cdn.simpleicons.org/coursera/0056D2',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    verifyUrl: 'https://coursera.org/verify/VAND-AGENTS',
    featured: true,
    summary: 'Architecture d\'agents autonomes, tool-use et mémoire.',
    skills: ['AI Agents', 'Tool Calling']
  },
  {
    id: 'cert-efset-english',
    title: 'EF SET English Certificate (C2)',
    issuer: 'EF Standard English Test',
    issueDate: '2023',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/10/EF_Education_First_logo.svg',
    image: 'https://images.unsplash.com/photo-1546410531-bea51804040a?q=80&w=800&auto=format&fit=crop',
    verifyUrl: 'https://www.efset.org/cert/EF-C2',
    featured: true,
    summary: 'Niveau professionnel bilingue (C2).',
    skills: ['Anglais C2', 'Communication technique']
  }
];

export const workflowStepsData: WorkflowStep[] = [
  {
    step: 1,
    title: 'Découverte',
    subtitle: 'Compréhension métier',
    description: 'Cartographie des processus.',
    keyDeliverable: 'Matrice de criticité',
    qualityGuarantee: 'Alignement business'
  },
  {
    step: 2,
    title: 'Architecture',
    subtitle: 'Conception système',
    description: 'Design de la résilience et des flux.',
    keyDeliverable: 'Schéma technique',
    qualityGuarantee: 'Évolutivité'
  },
  {
    step: 3,
    title: 'Développement',
    subtitle: 'Implémentation',
    description: 'Code modulaire et intégrations.',
    keyDeliverable: 'Code versionné',
    qualityGuarantee: 'Standards propres'
  },
  {
    step: 4,
    title: 'Déploiement',
    subtitle: 'Mise en prod',
    description: 'Tests réels et mise en service.',
    keyDeliverable: 'Système live',
    qualityGuarantee: 'Zéro régression'
  }
];

export const differentiatorsData: Differentiator[] = [
  {
    id: 'diff-1',
    title: 'Code Maintenable',
    badge: 'Standards',
    factOrPractice: 'Tout est documenté et versionné.',
    businessImpact: 'Indépendance technique garantie.'
  },
  {
    id: 'diff-2',
    title: 'Fiabilité 24/7',
    badge: 'Résilience',
    factOrPractice: 'Mécanismes de retry et alerting natifs.',
    businessImpact: 'Continuité des opérations.'
  }
];
