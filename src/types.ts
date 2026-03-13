export interface Subtopic {
  id: string;
  title: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
}

export interface SubtopicContent {
  explanation: string;
  shortcuts: string[];
  questions: Question[];
}

export interface UserProgress {
  topic_id: string;
  subtopic_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number;
}
