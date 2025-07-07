// Application constants

export const CERTIFICATION_TYPES = {
  PMP: 'PMP',
  CAPM: 'CAPM',
} as const;

export const SUBSCRIPTION_TYPES = {
  FREE: 'free',
  PREMIUM: 'premium',
} as const;

export const EXAM_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXAM: '/exam',
  RESULTS: '/results',
  NOT_FOUND: '*',
} as const;

// Default certification configurations
export const CERTIFICATION_CONFIG = {
  PMP: {
    stages: 9,
    questionsPerStage: [20, 40, 60, 80, 100, 120, 140, 160, 180],
    timePerStage: [30, 60, 90, 120, 150, 180, 210, 240, 270], // minutes
    passingScore: 80,
    requiresPremium: true,
  },
  CAPM: {
    stages: 6,
    questionsPerStage: [25, 50, 75, 100, 125, 150],
    timePerStage: [40, 75, 115, 150, 190, 225], // minutes
    passingScore: 75,
    requiresPremium: false,
  },
} as const;

export const PROJECT_DOMAINS = [
  'Project Integration Management',
  'Project Scope Management',
  'Project Schedule Management',
  'Project Cost Management',
  'Project Quality Management',
  'Project Resource Management',
  'Project Communications Management',
  'Project Risk Management',
  'Project Procurement Management',
  'Project Stakeholder Management',
] as const;