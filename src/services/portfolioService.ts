/**
 * Service d'accès aux données du portfolio
 * Connecté directement à Supabase (source de vérité unique).
 */
import { 
  ProfileInfo, 
  ProjectItem, 
  SkillCategory, 
  Certification,
  PricingPlan,
  FAQItem,
  WorkflowScenario,
  HomeExpertiseCard,
  HomePillar,
  MakingOfStep,
  MakingOfStackItem
} from '../types/portfolio';
import { supabase } from '../lib/supabase';

export interface PortfolioDatabaseAdapter {
  getProfile(): Promise<ProfileInfo>;
  getProjects(): Promise<ProjectItem[]>;
  getSkills(): Promise<SkillCategory[]>;
  getCertifications(): Promise<Certification[]>;
  getPricingPlans(): Promise<PricingPlan[]>;
  getFaqs(): Promise<FAQItem[]>;
  getWorkflows(): Promise<WorkflowScenario[]>;
  getHomeExpertiseCards(): Promise<HomeExpertiseCard[]>;
  getHomePillars(): Promise<HomePillar[]>;
  getMakingOfSteps(): Promise<MakingOfStep[]>;
  getMakingOfStack(): Promise<Array<string | MakingOfStackItem>>;
}

class SupabasePortfolioService implements PortfolioDatabaseAdapter {
  async getProfile(): Promise<ProfileInfo> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré. Vérifiez VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.');
    }

    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Erreur Supabase (profile): ${error.message}`);
    }

    if (!data) {
      throw new Error('Aucun profil trouvé dans la table public.profile.');
    }

    return {
      name: data.name,
      title: data.title,
      roleSubtitle: data.role_subtitle || '',
      valueProposition: data.value_proposition || '',
      bioSummary: Array.isArray(data.bio_summary) ? data.bio_summary : [],
      availability: data.availability || { status: '', subtext: '', responseTime: '' },
      location: data.location || '',
      contact: data.contact || { email: '', linkedin: '', upwork: '', github: '' },
      stats: Array.isArray(data.stats) ? data.stats : [],
      about_journey: Array.isArray(data.about_journey) ? data.about_journey : [],
      aboutJourney: Array.isArray(data.about_journey) ? data.about_journey : [],
      about_manifesto: data.about_manifesto || '',
      aboutManifesto: data.about_manifesto || '',
      about_closing: data.about_closing || '',
      aboutClosing: data.about_closing || '',
      methodology: Array.isArray(data.methodology) ? data.methodology : []
    };
  }

  async getProjects(): Promise<ProjectItem[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erreur Supabase (projects): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      categoryLabel: row.category_label || '',
      subtitle: row.subtitle || '',
      problem: row.problem || '',
      context: row.context || '',
      solution: row.solution || '',
      techStack: Array.isArray(row.tech_stack) ? row.tech_stack : [],
      measurableResult: row.measurable_result || '',
      metrics: Array.isArray(row.metrics) ? row.metrics : [],
      architectureSummary: Array.isArray(row.architecture_summary) ? row.architecture_summary : [],
      featured: Boolean(row.featured),
      demoUrl: row.demo_url || undefined,
      githubUrl: row.github_url || undefined,
      mockupType: row.mockup_type || undefined
    }));
  }

  async getSkills(): Promise<SkillCategory[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (skill_categories): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      iconName: row.icon_name || 'Network',
      skills: Array.isArray(row.skills) ? row.skills : []
    }));
  }

  async getCertifications(): Promise<Certification[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erreur Supabase (certifications): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      issuer: row.issuer,
      issueDate: row.issue_date || '',
      logo: row.logo,
      image: row.image,
      verifyUrl: row.verify_url || '',
      skills: Array.isArray(row.skills) ? row.skills : [],
      featured: Boolean(row.featured),
      summary: row.summary || ''
    }));
  }

  async getPricingPlans(): Promise<PricingPlan[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (pricing_plans): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      iconName: row.icon_name || 'Clock',
      label: row.label,
      prefix: row.prefix,
      numeric: row.numeric,
      description: row.description,
      items: Array.isArray(row.items) ? row.items : [],
      sortOrder: row.sort_order
    }));
  }

  async getFaqs(): Promise<FAQItem[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (faqs): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      sortOrder: row.sort_order
    }));
  }

  async getWorkflows(): Promise<WorkflowScenario[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (workflows): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      kind: row.kind,
      title: row.title,
      description: row.description,
      nodes: Array.isArray(row.nodes) ? row.nodes : [],
      sortOrder: row.sort_order
    }));
  }

  async getHomeExpertiseCards(): Promise<HomeExpertiseCard[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('home_expertise_cards')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (home_expertise_cards): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      level: typeof row.level === 'number' ? row.level : Number(row.level) || 1,
      bgImage: row.bg_image || ''
    }));
  }

  async getHomePillars(): Promise<HomePillar[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('home_pillars')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (home_pillars): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      image: row.image,
      tags: Array.isArray(row.tags) ? row.tags : [],
      span: row.span || undefined
    }));
  }

  async getMakingOfSteps(): Promise<MakingOfStep[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('making_of_steps')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (making_of_steps): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      step: row.step,
      title: row.title,
      description: row.description,
      iconName: row.icon_name || undefined
    }));
  }

  async getMakingOfStack(): Promise<Array<string | MakingOfStackItem>> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('making_of_stack')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (making_of_stack): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      name: row.name
    }));
  }
}

export const portfolioService: PortfolioDatabaseAdapter = new SupabasePortfolioService();
