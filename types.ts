
export enum Language {
  EN = 'EN',
  ZH_HK = '繁',
  ZH_CN = '簡'
}

export interface QualificationItem {
  title: string;
  definition: string;
  benefit: string;
  icon: string;
}

export interface PlayCharacteristic {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface ResearchCategoryContent {
  title: string;
  desc: string;
  items: { title: string; text: string; color: string }[];
  statsTitle: string;
  stats: { label: string; value: number; color: string; before?: number; reference?: string }[];
  references: string[];
}

export interface EFSkill {
  title: string;
  desc: string;
  example: string;
  icon: string;
  color: string;
  category: 'thinking' | 'doing' | 'optimization';
}

export interface QuestionnaireContent {
  title: string;
  subtitle: string;
  desc: string;
  instructionTitle: string;
  instructions: { step: number; title: string; desc: string }[];
  ratingLabel: { low: string; high: string };
  questions: string[];
  skills: string[]; // Ordered list of 12 skills corresponding to question groups
  resultsTitle: string;
  strengthsTitle: string;
  weaknessesTitle: string;
  downloadButton: string;
  reference: string;
  startBtn: string;
  submitBtn: string;
  retestBtn: string;
  disclaimer: string;
}

export interface CourseDetails {
  title: string;
  desc: string; // Short description for card
  fullDesc: string; // Detailed description for modal
  features: string[]; // List of features
  badge?: string; // Optional badge override
}

export interface FormLabels {
  title: string;
  salutation: string;
  contactName: string;
  date: string;
  sessions: string;
  duration: string;
  pax: string;
  paxCertification: string; // New: Specific label for certification pax
  goals: string;
  budget: string;
  quotation: string;
  phone: string;
  email: string;
  submitInfoWhatsApp: string; // Replaced old buttons
  formInstruction: string; // New instruction text
  cooperationMode: string; // New: Label for cooperation mode
  participationMode: string; // New: Label for participation mode
  options: {
    salutations: string[];
    sessions: string[];
    durations: string[];
    pax: string[];
    paxCertification: string[]; // New: Options for certification pax
    goals: string[];
    cooperation: string[]; // New: [Workshop, Certification]
    participation: string[]; // New: [Level 1, Level 2, Level 1+2]
    yes: string;
    no: string;
    other: string;
    notSure: string;
  }
}

export interface Translation {
  title: string;
  subtitle: string;
  buttons: {
    about: string;
    whatIs: string;
    origin: string;
    play: string;
    research: string;
    executive: string;
    qualifications: string;
  };
  aboutContent: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    footer: string;
  };
  researchContent: {
    children: ResearchCategoryContent;
    sen: ResearchCategoryContent;
    adult: ResearchCategoryContent;
    team: ResearchCategoryContent;
  };
  executiveContent: {
    header: string;
    intro: string;
    relationshipTitle: string;
    relationshipDesc: string;
    whySixBricksTitle: string;
    whySixBricksDesc: string;
    skillsTitle: string;
    skills: EFSkill[];
  };
  whatIsContent: {
    header: string;
    mainDescription: string;
    secrets: {
      title: string;
      one: { title: string; desc: string };
      two: { title: string; desc: string };
    };
    whyDuplo: {
      title: string;
      desc: string;
    };
    colorConcept: {
      title: string;
      desc: string;
    };
    references: string[];
  };
  originContent: {
    header: string;
    intro: string;
    milestones: {
      early: { title: string; desc: string };
      certification: { title: string; desc: string };
      global: { title: string; desc: string };
      research: { title: string; desc: string };
    };
    principles: {
      title: string;
      items: string[];
    };
    references: string[];
  };
  playContent: {
    header: string;
    subHeader: string;
    description: string;
    characteristics: PlayCharacteristic[];
    references: string[];
  };
  qualificationsContent: {
    header: string;
    items: QualificationItem[];
  };
  audiences: {
    schools: CourseDetails;
    charity: CourseDetails;
    ngo: CourseDetails;
    corporate: CourseDetails;
  };
  courseForm: FormLabels;
  questionnaire: QuestionnaireContent;
  certification: string;
  certificationDesc: string; // Short desc
  certificationFullDesc: string; // Full desc
  certificationFeatures: string[]; // Features
  aiHub: string;
  chatPlaceholder: string;
  genImage: string;
  imageGen: {
    promptPlaceholder: string;
    generate: string;
    aspectRatio: string;
    size: string;
    selectKey: string;
    billingInfo: string;
  };
}

export type BrickColor = 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN' | 'DARK_BLUE' | 'LIGHT_BLUE';

export const BRICK_COLORS: Record<BrickColor, string> = {
  RED: '#e60012',
  ORANGE: '#f37021',
  YELLOW: '#fff200',
  GREEN: '#00a651',
  DARK_BLUE: '#0054a6',
  LIGHT_BLUE: '#00aeef'
};