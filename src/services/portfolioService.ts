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
  WorkflowScenario
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
      roleSubtitle: data.role_subtitle || data.roleSubtitle || '',
      valueProposition: data.value_proposition || data.valueProposition || '',
      bioSummary: data.bio_summary || data.bioSummary || [],
      availability: data.availability || { status: '', subtext: '', responseTime: '' },
      location: data.location || '',
      contact: data.contact || { email: '', linkedin: '', upwork: '', github: '' },
      stats: data.stats || [],
      about_manifesto: data.about_manifesto || data.aboutManifesto || '',
      aboutManifesto: data.about_manifesto || data.aboutManifesto || '',
      about_closing: data.about_closing || data.aboutClosing || '',
      aboutClosing: data.about_closing || data.aboutClosing || ''
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
      categoryLabel: row.category_label || row.categoryLabel || '',
      subtitle: row.subtitle || '',
      problem: row.problem || '',
      context: row.context || '',
      solution: row.solution || '',
      techStack: Array.isArray(row.tech_stack) ? row.tech_stack : (row.techStack || []),
      measurableResult: row.measurable_result || row.measurableResult || '',
      metrics: row.metrics || [],
      architectureSummary: Array.isArray(row.architecture_summary) ? row.architecture_summary : (row.architectureSummary || []),
      featured: Boolean(row.featured),
      demoUrl: row.demo_url || row.demoUrl,
      githubUrl: row.github_url || row.githubUrl,
      mockupType: row.mockup_type || row.mockupType
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
      iconName: row.icon_name || row.iconName || 'Network',
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
      issueDate: row.issue_date || row.issueDate || '',
      logo: row.logo,
      image: row.image,
      verifyUrl: row.verify_url || row.verifyUrl || '',
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
}

export const portfolioService: PortfolioDatabaseAdapter = new SupabasePortfolioService();
