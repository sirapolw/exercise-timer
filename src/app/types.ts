export interface Exercise {
  name: string;
  duration: number;
  reps?: number;
}

export interface Routine {
  id?: number;
  name: string;
  exercises: Exercise[];
  created_at?: string;
}
