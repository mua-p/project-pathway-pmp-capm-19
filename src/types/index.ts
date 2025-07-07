// Core application types for backend integration

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionType: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  type: 'PMP' | 'CAPM';
  totalStages: number;
  isActive: boolean;
}

export interface Stage {
  id: string;
  number: number;
  certificationId: string;
  name: string;
  description: string;
  questionCount: number;
  timeLimit: number; // in minutes
  passingScore: number;
  isUnlocked: boolean;
  isPremium: boolean;
}

export interface Question {
  id: string;
  stageId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamSession {
  id: string;
  userId: string;
  stageId: string;
  startTime: string;
  endTime?: string;
  answers: Answer[];
  score?: number;
  passed?: boolean;
  status: 'in_progress' | 'completed' | 'abandoned';
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  timeSpent: number; // in seconds
}

export interface UserProgress {
  userId: string;
  certificationId: string;
  completedStages: string[];
  currentStage: number;
  totalScore: number;
  averageScore: number;
  timeSpent: number; // total time in minutes
}

export interface DomainPerformance {
  domain: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface ExamResult {
  sessionId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  passed: boolean;
  domainPerformance: DomainPerformance[];
}