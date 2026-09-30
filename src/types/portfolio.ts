export interface ProjectItem {
  id: string;
  title: string;
  category: 'workflows' | 'ai-agents' | 'data-infra';
  categoryLabel: string;
  subtitle: string;
  problem: string;
  context: string;
  solution: string;
  techStack: string[];
  measurableResult: string;
  metrics?: { label: string; value: string }[];
  architectureSummary?: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  mockupType?: 'automation-pipeline' | 'agent-orchestrator' | 'database-sync';
}

export interface SkillItem {
  name: string;
  levelBadge?: string;
  useCase: string;
  tags?: string[];
  imageUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  logo: string;
  image?: string;
  verifyUrl: string;
  skills: string[];
  featured: boolean;
  summary: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverable: string;
  qualityGuarantee: string;
}

export interface Differentiator {
  id: string;
  title: string;
  factOrPractice: string;
  businessImpact: string;
  badge: string;
}

export interface ServiceSolution {
  id: string;
  title: string;
  subtitle: string;
  painPoint: string;
  concreteBenefit: string;
  deliverables: string[];
  metricTarget: string;
  iconName: string;
}

export interface ProfileJourneyItem {
  year: string;
  text: string;
}

export interface ProfileMethodologyStep {
  step: string;
  title: string;
  tasks: string[];
}

export interface ProfileExpertiseItem {
  label: string;
  sub: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  roleSubtitle: string;
  valueProposition: string;
  bioSummary: string[];
  availability: {
    status: string;
    subtext: string;
    responseTime: string;
  };
  location?: string;
  contact: {
    email: string;
    linkedin: string;
    upwork: string;
    github: string;
    fiverr?: string;
    malt?: string;
    instagram?: string;
  };
  stats: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  avatarUrl?: string;
  heroPhotoUrl?: string;
  presentationVideoUrl?: string;
  presentationVideoPoster?: string;
  aboutPageLabel?: string;
  aboutPageTitle?: string;
  aboutPageAccent?: string;
  aboutPageDescription?: string;
  aboutJourneyIntroTitle?: string;
  aboutJourneyIntroText?: string;
  aboutTransitionText?: string;
  aboutExpertise?: ProfileExpertiseItem[];
  aboutJourney?: ProfileJourneyItem[];
  aboutManifesto?: string;
  aboutClosing?: string;
  homeAboutTitle?: string;
  homeAboutAccent?: string;
  homeAboutDescription?: string;
  homeSavoirFaireDescription?: string;
  homeContactDescription?: string;
  methodology?: ProfileMethodologyStep[];
}

export interface PricingPlan {
  id: string;
  iconName: string;
  label: string;
  prefix: string;
  numeric: string;
  description: string;
  items: string[];
  sortOrder?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
}

export interface WorkflowScenario {
  id: string;
  name: string;
  kind: string;
  title: string;
  description: string;
  nodes: string[];
  sortOrder?: number;
}

export interface HomeExpertiseCard {
  id?: string;
  title: string;
  category: string;
  level: number;
  bgImage: string;
}

export interface HomePillar {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  span?: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  storagePath?: string;
  storageUrl?: string;
  fallbackUrl?: string;
  altText: string;
  sortOrder: number;
  active: boolean;
  displayScale: number;
}

export interface MakingOfStep {
  step: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface MakingOfStackItem {
  name: string;
  category?: string;
}


export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  before: string;
  after: string;
}

export interface PassionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
