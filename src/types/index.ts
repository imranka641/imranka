export type ProjectCategory = 
  | 'All'
  | 'Food & E-Commerce'
  | 'Healthcare'
  | 'Productivity'
  | 'Hospitality'
  | 'Education'
  | 'Coffee'
  | 'Islamic Tech'
  | 'Legal-Tech';

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  problemSolved: string;
  targetAudience: string;
  features: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  featured?: boolean;
  accentColor: string; // e.g. emerald, cyan, amber, violet, rose, orange
  previewType: 'food-ordering' | 'dental' | 'productivity' | 'jungle' | 'itkan' | 'elpacho' | 'yellowflower' | 'kosykawa' | 'inheritance' | 'garden';
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level?: string;
  category: string;
  highlight?: boolean;
  iconName?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  deliverables: string[];
  projectTypeKey: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  keyActivities: string[];
}
