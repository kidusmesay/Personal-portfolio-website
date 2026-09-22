export interface JobEntry {
  id: string;
  title: string;
  company: string;
  dateRange: string;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
}

export interface TechSkill {
  name: string;
  color?: string;
}
