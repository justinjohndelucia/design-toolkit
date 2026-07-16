export interface Article {
  id: string;
  category: string;
  headline: string;
  summary: string;
  source: string;
  time: string;
  /** Optional real thumbnail; falls back to a palette gradient when absent. */
  thumbnail?: string;
}

export interface Tool {
  name: string;
  category: string;
  url: string;
  desc: string;
  keywords: string[];
}

export type Theme = 'dark' | 'light';
