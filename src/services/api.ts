// API service layer - ready for backend integration

import { 
  User, 
  Certification, 
  Stage, 
  Question, 
  ExamSession, 
  UserProgress, 
  ExamResult 
} from '@/types';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request('/auth/me');
  }

  // Certification endpoints
  async getCertifications(): Promise<Certification[]> {
    return this.request('/certifications');
  }

  async getCertificationStages(certificationId: string): Promise<Stage[]> {
    return this.request(`/certifications/${certificationId}/stages`);
  }

  // User progress endpoints
  async getUserProgress(certificationId: string): Promise<UserProgress> {
    return this.request(`/progress/${certificationId}`);
  }

  // Exam endpoints
  async startExam(stageId: string): Promise<ExamSession> {
    return this.request('/exams/start', {
      method: 'POST',
      body: JSON.stringify({ stageId }),
    });
  }

  async getExamQuestions(sessionId: string): Promise<Question[]> {
    return this.request(`/exams/${sessionId}/questions`);
  }

  async submitAnswer(sessionId: string, questionId: string, selectedOption: number, timeSpent: number): Promise<void> {
    return this.request(`/exams/${sessionId}/answers`, {
      method: 'POST',
      body: JSON.stringify({ questionId, selectedOption, timeSpent }),
    });
  }

  async submitExam(sessionId: string): Promise<ExamResult> {
    return this.request(`/exams/${sessionId}/submit`, {
      method: 'POST',
    });
  }

  async getExamResult(sessionId: string): Promise<ExamResult> {
    return this.request(`/exams/${sessionId}/result`);
  }

  // Subscription endpoints
  async upgradeToPremium(): Promise<{ checkoutUrl: string }> {
    return this.request('/subscription/upgrade', {
      method: 'POST',
    });
  }

  async cancelSubscription(): Promise<void> {
    return this.request('/subscription/cancel', {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();