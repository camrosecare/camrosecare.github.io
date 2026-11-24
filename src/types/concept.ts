export type ConceptId = 'concept-a' | 'concept-b' | 'concept-c' | 'concept-d';

export interface ConceptMeta {
  id: ConceptId;
  name: string;
  tagline: string;
  badge: string;
  paletteDescription: string;
  typography: string;
  keyAtmosphere: string;
  bestSuitedFor: string;
  accentColor: string;
}

export interface DaycareProgram {
  id: string;
  title: string;
  ageRange: string;
  description: string;
  highlights: string[];
  ratio: string;
  schedule: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  relation: string;
  location: string;
  quote: string;
  rating: number;
  date: string;
  program: string;
}

export interface DaycareFeature {
  title: string;
  description: string;
  tag: string;
}
