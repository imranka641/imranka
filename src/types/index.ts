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

export interface ProjectImage {
  url: string;
  caption: string;
  alt: string;
  category?: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

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
  previewType: 'typemaster' | 'makecv' | 'food-ordering' | 'dental' | 'productivity' | 'jungle' | 'jungle-house' | 'itkan' | 'elpacho' | 'yellowflower' | 'kosykawa' | 'inheritance' | 'garden' | 'custom' | string;
  image: string; // Primary realistic photograph of the application or environment
  gallery: ProjectImage[]; // Realistic photo gallery and interface views
  stats?: ProjectStat[];
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
