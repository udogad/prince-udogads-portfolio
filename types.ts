
export type InterestCategory = 'WEB' | 'MOBILE' | 'AI_SYSTEMS';
export type ProjectStatus = 'Completed' | 'In Progress' | 'Beta';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  sourceCodeUrl?: string;
  isSourceCodePrivate?: boolean;
  year: string;
  techDetails: string;
  category: InterestCategory;
  status: ProjectStatus;
  role: string;
  keyFeatures: string[];
  // Case Study Story Fields
  theBrief: string;
  theExecution: string;
  theChallenges: string;
  theImpact: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  category: InterestCategory;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum ThemeVibe {
  FUTURISTIC = 'FUTURISTIC',
  PROFESSIONAL = 'PROFESSIONAL',
  MINIMALIST = 'MINIMALIST'
}
