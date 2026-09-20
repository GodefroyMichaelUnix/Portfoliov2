/**
 * Service d'accès aux données du portfolio
 * Connecté à Supabase avec repli automatique (graceful fallback) sur les données locales.
 */
import { 
  profileData, 
  solutionsData, 
  projectsData, 
  skillsData, 
  certificationsData, 
  workflowStepsData, 
  differentiatorsData 
} from '../data/portfolioData';
import { 
  ProfileInfo, 
  ServiceSolution, 
  ProjectItem, 
  SkillCategory, 
  Certification, 
  WorkflowStep, 
  Differentiator 
} from '../types/portfolio';
import { supabase } from '../lib/supabase';

export interface PortfolioDatabaseAdapter {
  getProfile(): Promise<ProfileInfo>;
  getSolutions(): Promise<ServiceSolution[]>;
  getProjects(): Promise<ProjectItem[]>;
  getSkills(): Promise<SkillCategory[]>;
  getCertifications(): Promise<Certification[]>;
  getWorkflowSteps(): Promise<WorkflowStep[]>;
  getDifferentiators(): Promise<Differentiator[]>;
}

// Implémentation locale (données par défaut du code)
class LocalPortfolioAdapter implements PortfolioDatabaseAdapter {
  async getProfile(): Promise<ProfileInfo> {
    return profileData;
  }

  async getSolutions(): Promise<ServiceSolution[]> {
    return solutionsData;
  }

  async getProjects(): Promise<ProjectItem[]> {
    return projectsData;
  }

  async getSkills(): Promise<SkillCategory[]> {
    return skillsData;
  }

  async getCertifications(): Promise<Certification[]> {
    return certificationsData;
  }

  async getWorkflowSteps(): Promise<WorkflowStep[]> {
    return workflowStepsData;
  }

  async getDifferentiators(): Promise<Differentiator[]> {
    return differentiatorsData;
  }
}

// Adaptateur Supabase hybride : interroge Supabase et bascule sur le cache local si les tables ne sont pas encore créées
class SupabasePortfolioAdapter implements PortfolioDatabaseAdapter {
  private local = new LocalPortfolioAdapter();

  async getProfile(): Promise<ProfileInfo> {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        return this.local.getProfile();
      }

      return {
        name: data.name,
        title: data.title,
        roleSubtitle: data.role_subtitle || data.roleSubtitle,
        valueProposition: data.value_proposition || data.valueProposition,
        bioSummary: data.bio_summary || data.bioSummary || [],
        availability: data.availability,
        location: data.location,
        contact: data.contact,
        stats: data.stats || []
      };
    } catch {
      return this.local.getProfile();
    }
  }

  async getSolutions(): Promise<ServiceSolution[]> {
    return this.local.getSolutions();
  }

  async getProjects(): Promise<ProjectItem[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return this.local.getProjects();
      }

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
    } catch {
      return this.local.getProjects();
    }
  }

  async getSkills(): Promise<SkillCategory[]> {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return this.local.getSkills();
      }

      return data.map((row) => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        iconName: row.icon_name || row.iconName || 'Network',
        skills: Array.isArray(row.skills) ? row.skills : []
      }));
    } catch {
      return this.local.getSkills();
    }
  }

  async getCertifications(): Promise<Certification[]> {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return this.local.getCertifications();
      }

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
    } catch {
      return this.local.getCertifications();
    }
  }

  async getWorkflowSteps(): Promise<WorkflowStep[]> {
    return this.local.getWorkflowSteps();
  }

  async getDifferentiators(): Promise<Differentiator[]> {
    return this.local.getDifferentiators();
  }
}

export const portfolioService: PortfolioDatabaseAdapter = new SupabasePortfolioAdapter();
