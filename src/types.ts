export type Role = 'user' | 'model';

export interface UserProfile {
  name: string;
  age: number | '';
  currentMood: string;
  therapyGoals: string;
}

export type ExerciseType = 'breathing' | 'meditation' | 'journaling' | 'nefes' | 'meditasyon' | 'gunluk';

export interface Exercise {
  type: ExerciseType;
  title: string;
  steps: string[];
}

export interface Message {
  role: Role;
  content: string;
  exercise?: Exercise;
}