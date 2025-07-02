export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website: string;
  bio: string;
}

export interface TechStack {
  languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
  highlights: string[];
}

export interface NarrativeAnswers {
  hardestProblem: string;
  proudestAchievement: string;
  learningExperience: string;
  futureGoals: string;
  workStyle: string;
  motivation: string;
  [key: string]: string; // Allow custom questions
}

export interface CustomQuestion {
  id: string;
  question: string;
  placeholder: string;
  isCustom: true;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  techStack: TechStack;
  projects: Project[];
  narrativeAnswers: NarrativeAnswers;
  customQuestions: CustomQuestion[];
  profileImage?: string;
  selectedTemplate: string;
  selectedTheme: string;
  contentLevel: 'simple' | 'standard' | 'detailed';
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
}

export interface ContentLevel {
  id: 'simple' | 'standard' | 'detailed';
  name: string;
  description: string;
  features: string[];
}