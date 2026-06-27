// Theme types
export type ThemeMode = 'light' | 'dark';

// Notification types
export interface NotificationOptions {
  key?: string;
  persist?: boolean;
  anchorOrigin?: {
    vertical: 'bottom' | 'top';
    horizontal: 'left' | 'center' | 'right';
  };
  autoHideDuration?: number;
  [key: string]: unknown;
}

export interface Notification {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  dismissed?: boolean;
  options?: NotificationOptions;
}

// User types
export type UserRole = 'parent' | 'educator' | 'professional';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Child profile types
export interface Child {
  id: string;
  userId: string;
  firstName: string;
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  gradeLevel?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Assessment types
export type AssessmentModule = 'dyslexia' | 'dyscalculia' | 'dysgraphia' | 'adhd' | 'autism';
export type AssessmentStatus = 'in_progress' | 'completed';

export interface Assessment {
  id: string;
  userId: string;
  childId: string;
  module: AssessmentModule;
  status: AssessmentStatus;
  startedAt: Date;
  completedAt?: Date;
  answers: AssessmentAnswer[];
  metadata?: Record<string, unknown>;
}

export interface AssessmentAnswer {
  questionId: string;
  answer: unknown;
  timeSpent: number;
  answeredAt: Date;
}

// Question types
export type QuestionType = 'multiple_choice' | 'multiple_select' | 'rating_scale' | 'pattern_completion';

export interface Question {
  id: string;
  module: AssessmentModule;
  type: QuestionType;
  text: string;
  media?: {
    type: 'image' | 'audio';
    url: string;
  };
  options?: string[];
  correctAnswer?: unknown;
  scoringWeight: number;
}

// Result types
export interface AssessmentResult {
  id: string;
  assessmentId: string;
  scores: Record<string, number>;
  indicators: string[];
  recommendations: string;
  riskLevel: 'low' | 'moderate' | 'high';
  generatedAt: Date;
}

// Service Worker types
export interface ServiceWorkerState {
  updateAvailable: boolean;
  registration?: ServiceWorkerRegistration;
}

// Material-UI Theme extension
declare module '@material-ui/core/styles' {
  interface Theme {
    custom?: {
      gradients?: {
        primary?: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      gradients?: {
        primary?: string;
      };
    };
  }
}

// Component prop types
export interface FlexboxProps {
  row?: boolean;
  wrap?: boolean;
  grow?: boolean;
  column?: boolean;
  noGrow?: boolean;
  shrink?: boolean;
  noWrap?: boolean;
  inline?: boolean;
  alignEnd?: boolean;
  noShrink?: boolean;
  className?: string;
  rowReverse?: boolean;
  alignStart?: boolean;
  justifyEnd?: boolean;
  alignCenter?: boolean;
  justifyStart?: boolean;
  justifyCenter?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyBetween?: boolean;
  children?: React.ReactNode;
}

// Config types
export interface ThemePalette {
  type: 'light' | 'dark';
  background: {
    default: string;
    paper: string;
  };
  primary: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
}

export interface ThemeConfig {
  palette: ThemePalette;
}

export interface Config {
  messages: {
    app: {
      crash: {
        title: string;
        options: {
          email: string;
          reset: string;
        };
      };
    };
    loader: {
      fail: string;
    };
    images: {
      failed: string;
    };
    404: string;
  };
  cancelationMessage: string;
  dateFormat: string;
  copyright: {
    title: string;
    link: string;
  };
  email: string;
  domain: string;
  repository: string;
  loader: {
    delay: number;
    minimumLoading: number;
  };
  title: string;
  themePair: [ThemeMode, ThemeMode];
  notifications: {
    options: {
      anchorOrigin: {
        vertical: 'bottom' | 'top';
        horizontal: 'left' | 'center' | 'right';
      };
      autoHideDuration: number;
    };
    maxSnack: number;
  };
  giphy404: string;
  themes: {
    light: ThemeConfig;
    dark: ThemeConfig;
  };
}

// Route types
export interface RouteConfig {
  exact?: boolean;
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
}

// API types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown[];
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Loading state types
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';
