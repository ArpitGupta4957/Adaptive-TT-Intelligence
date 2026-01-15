export type UserRole = 'teacher' | 'diet';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  districtId: string;
  schoolName?: string;
  schoolCode?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface ClassroomNeed {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  challenge: string;
  context: string;
  constraints: string;
  studentCount: number;
  gradeLevel: string;
  subject: string;
  submittedAt: string;
  status: 'draft' | 'submitted' | 'reviewed';
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  targetTeachers: string[];
  startDate: string;
  endDate: string;
  sessions: TrainingSession[];
  status: 'draft' | 'approved' | 'published' | 'completed';
  createdBy: string;
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  facilitator: string;
  resources: string[];
}

export interface AIRecommendation {
  id: string;
  clusterId: string;
  title: string;
  description: string;
  recommendedApproach: string;
  expectedOutcomes: string[];
  confidence: number;
  suggestedResources: string[];
}

export interface TeacherCohort {
  id: string;
  name: string;
  teacherCount: number;
  commonNeeds: string[];
  createdAt: string;
}

export interface FeedbackEntry {
  id: string;
  teacherId: string;
  trainingId: string;
  rating: number;
  feedback: string;
  evidence: string[];
  submittedAt: string;
}
