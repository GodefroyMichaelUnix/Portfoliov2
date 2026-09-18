/**
 * Service d'accès aux données du portfolio
 * Conçu pour basculer en 1 ligne vers Supabase / PostgreSQL sans modifier les composants UI.
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

export interface PortfolioDatabaseAdapter {
  getProfile(): Promise<ProfileInfo>;
  getSolutions(): Promise<ServiceSolution[]>;
  getProjects(): Promise<ProjectItem[]>;
  getSkills(): Promise<SkillCategory[]>;
  getCertifications(): Promise<Certification[]>;
  getWorkflowSteps(): Promise<WorkflowStep[]>;
  getDifferentiators(): Promise<Differentiator[]>;
}

// Implémentation locale actuelle (données typées et externalisées)
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

/**
 * Exemple d'adaptateur Supabase prêt à l'emploi lorsque la base sera configurée :
 * 
 * class SupabasePortfolioAdapter implements PortfolioDatabaseAdapter {
 *   async getProjects(): Promise<ProjectItem[]> {
 *     const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
 *     if (error) throw error;
 *     return data;
 *   }
 *   ...
 * }
 */

export const portfolioService: PortfolioDatabaseAdapter = new LocalPortfolioAdapter();
