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
  MakingOfStackItem,
  TechStackItem,
  ServiceItem,
  PassionItem
} from '../types/portfolio';
import { supabase } from '../lib/supabase';
import type { Json } from '../lib/database.types';
import { safeExternalUrl } from '../lib/url';

type JsonObject = { [key: string]: Json | undefined };

function isJsonObject(value: Json): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(obj: JsonObject | null | undefined, key: string, fallback = ''): string {
  if (!obj) return fallback;
  const val = obj[key];
  return typeof val === 'string' ? val : fallback;
}

function getOptionalString(obj: JsonObject | null | undefined, key: string): string | undefined {
  if (!obj) return undefined;
  const val = obj[key];
  return typeof val === 'string' ? val : undefined;
}

function getStringArray(val: Json | undefined | null): string[] {
  if (!Array.isArray(val)) return [];
  return val.filter((item): item is string => typeof item === 'string');
}

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
  getTechStack(): Promise<TechStackItem[]>;
  getServices(): Promise<ServiceItem[]>;
  getPassions(): Promise<PassionItem[]>;
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

    const rawAvail = isJsonObject(data.availability) ? data.availability : null;

    const availability = {
      status: getString(rawAvail, 'status'),
      subtext: getString(rawAvail, 'subtext'),
      responseTime: getString(rawAvail, 'responseTime')
    };

    const rawContact = isJsonObject(data.contact) ? data.contact : null;

    const contact = {
      email: getString(rawContact, 'email'),
      linkedin: safeExternalUrl(getString(rawContact, 'linkedin')) || '',
      upwork: safeExternalUrl(getString(rawContact, 'upwork')) || '',
      github: safeExternalUrl(getString(rawContact, 'github')) || '',
      fiverr: safeExternalUrl(getOptionalString(rawContact, 'fiverr')),
      malt: safeExternalUrl(getOptionalString(rawContact, 'malt')),
      instagram: safeExternalUrl(getOptionalString(rawContact, 'instagram'))
    };

    const stats = Array.isArray(data.stats)
      ? data.stats
          .filter(isJsonObject)
          .map((s) => ({
            value: getString(s, 'value'),
            label: getString(s, 'label'),
            sublabel: getString(s, 'sublabel')
          }))
      : [];

    const aboutJourney = Array.isArray(data.about_journey)
      ? data.about_journey
          .filter(isJsonObject)
          .map((j) => ({
            year: getString(j, 'year'),
            text: getString(j, 'text')
          }))
      : [];

    const methodology = Array.isArray(data.methodology)
      ? data.methodology
          .filter(isJsonObject)
          .map((m) => ({
            step: getString(m, 'step'),
            title: getString(m, 'title'),
            tasks: getStringArray(m.tasks)
          }))
      : [];

    const aboutExpertise = Array.isArray(data.about_expertise)
      ? data.about_expertise
          .filter(isJsonObject)
          .map((e) => ({
            label: getString(e, 'label'),
            sub: getString(e, 'sub')
          }))
      : [];

    const bioSummary = getStringArray(data.bio_summary);

    return {
      name: data.name,
      title: data.title,
      roleSubtitle: data.role_subtitle || '',
      valueProposition: data.value_proposition || '',
      bioSummary,
      availability,
      location: data.location || '',
      contact,
      stats,
      avatarUrl: safeExternalUrl(data.avatar_url) || '',
      heroPhotoUrl: safeExternalUrl(data.hero_photo_url) || '',
      presentationVideoUrl: safeExternalUrl(data.presentation_video_url) || '',
      presentationVideoPoster: safeExternalUrl(data.presentation_video_poster) || '',
      aboutPageLabel: data.about_page_label || '',
      aboutPageTitle: data.about_page_title || '',
      aboutPageAccent: data.about_page_accent || '',
      aboutPageDescription: data.about_page_description || '',
      aboutJourneyIntroTitle: data.about_journey_intro_title || '',
      aboutJourneyIntroText: data.about_journey_intro_text || '',
      aboutTransitionText: data.about_transition_text || '',
      aboutExpertise,
      aboutJourney,
      aboutManifesto: data.about_manifesto || '',
      aboutClosing: data.about_closing || '',
      homeAboutTitle: data.home_about_title || '',
      homeAboutAccent: data.home_about_accent || '',
      homeAboutDescription: data.home_about_description || '',
      homeSavoirFaireDescription: data.home_savoir_faire_description || '',
      homeContactDescription: data.home_contact_description || '',
      methodology
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

    const validCategories = ['workflows', 'ai-agents', 'data-infra'] as const;
    const validMockups = ['automation-pipeline', 'agent-orchestrator', 'database-sync'] as const;

    return data.map((row) => {
      const category = validCategories.includes(row.category as (typeof validCategories)[number])
        ? (row.category as (typeof validCategories)[number])
        : 'workflows';

      const mockupType = row.mockup_type && validMockups.includes(row.mockup_type as (typeof validMockups)[number])
        ? (row.mockup_type as (typeof validMockups)[number])
        : undefined;

      const techStack = getStringArray(row.tech_stack);

      const metrics = Array.isArray(row.metrics)
        ? row.metrics
            .filter(isJsonObject)
            .map((m) => ({
              label: getString(m, 'label'),
              value: getString(m, 'value')
            }))
        : [];

      const architectureSummary = getStringArray(row.architecture_summary);

      return {
        id: row.id,
        title: row.title,
        category,
        categoryLabel: row.category_label || '',
        subtitle: row.subtitle || '',
        problem: row.problem || '',
        context: row.context || '',
        solution: row.solution || '',
        techStack,
        measurableResult: row.measurable_result || '',
        metrics,
        architectureSummary,
        featured: Boolean(row.featured),
        demoUrl: safeExternalUrl(row.demo_url),
        githubUrl: safeExternalUrl(row.github_url),
        mockupType
      };
    });
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

    return data.map((row) => {
      const skills = Array.isArray(row.skills)
        ? row.skills
            .filter(isJsonObject)
            .map((s) => ({
              name: getString(s, 'name'),
              levelBadge: getOptionalString(s, 'levelBadge'),
              useCase: getString(s, 'useCase'),
              tags: Array.isArray(s.tags)
                ? getStringArray(s.tags)
                : undefined,
              imageUrl: safeExternalUrl(getOptionalString(s, 'imageUrl'))
            }))
        : [];

      return {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle || '',
        iconName: row.icon_name || 'Network',
        skills
      };
    });
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

    return data.map((row) => {
      const skills = getStringArray(row.skills);

      return {
        id: row.id,
        title: row.title,
        issuer: row.issuer,
        issueDate: row.issue_date || '',
        logo: safeExternalUrl(row.logo) || '',
        image: safeExternalUrl(row.image),
        verifyUrl: safeExternalUrl(row.verify_url) || '',
        skills,
        featured: Boolean(row.featured),
        summary: row.summary || ''
      };
    });
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

    return data.map((row) => {
      const items = getStringArray(row.items);

      return {
        id: row.id,
        iconName: row.icon_name || 'Clock',
        label: row.label,
        prefix: row.prefix,
        numeric: row.numeric,
        description: row.description,
        items,
        sortOrder: row.sort_order ?? undefined
      };
    });
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
      sortOrder: row.sort_order ?? undefined
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

    return data.map((row) => {
      const nodes = getStringArray(row.nodes);

      return {
        id: row.id,
        name: row.name,
        kind: row.kind,
        title: row.title,
        description: row.description,
        nodes,
        sortOrder: row.sort_order ?? undefined
      };
    });
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
      bgImage: safeExternalUrl(row.bg_image) || ''
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

    return data.map((row) => {
      const tags = getStringArray(row.tags);

      return {
        id: row.id,
        title: row.title,
        description: row.description,
        image: safeExternalUrl(row.image) || '',
        tags,
        span: row.span || undefined
      };
    });
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

  async getTechStack(): Promise<TechStackItem[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (tech_stack): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      name: row.name,
      storagePath: row.storage_path || undefined,
      storageUrl: row.storage_path
        ? safeExternalUrl(supabase.storage.from('tech-logos').getPublicUrl(row.storage_path).data.publicUrl)
        : undefined,
      fallbackUrl: safeExternalUrl(row.fallback_url),
      altText: row.alt_text,
      sortOrder: row.sort_order,
      active: row.active,
      displayScale: Number(row.display_scale) || 1
    }));
  }

  async getServices(): Promise<ServiceItem[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (services): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => ({
      id: row.id,
      category: row.category || '',
      title: row.title || '',
      description: row.description || '',
      iconName: row.icon_name || 'Sparkles',
      before: row.before_text || '',
      after: row.after_text || ''
    }));
  }

  async getPassions(): Promise<PassionItem[]> {
    if (!supabase) {
      throw new Error('Client Supabase non configuré.');
    }

    const { data, error } = await supabase
      .from('passions')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true });

    if (error) {
      throw new Error(`Erreur Supabase (passions): ${error.message}`);
    }

    if (!data) return [];

    return data.map((row) => {
      const rawPath = row.image_path || '';
      const imageUrl = rawPath.startsWith('https://')
        ? safeExternalUrl(rawPath) || ''
        : rawPath
          ? supabase.storage.from('passion-images').getPublicUrl(rawPath).data.publicUrl
          : '';

      return {
        id: row.id,
        title: row.title || '',
        description: row.description || '',
        imageUrl: safeExternalUrl(imageUrl) || ''
      };
    });
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
