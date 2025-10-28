
export interface Student {
  id: string;
  name: string;
  skills: string[];
  projects: { name: string; description: string }[];
  mockInterviewScore: number;
  status: 'Not Placed' | 'Interviewing' | 'Placed';
  photoUrl: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  requiredSkills: string[];
  sector: string;
}

export interface MissionCardData {
  student: Student;
  topFits: Job[];
  skillGaps: string[];
}

export interface Offer {
    studentName: string;
    company: string;
    ctc: number;
    role: string;
    timestamp: Date;
}
