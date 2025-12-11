export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  status: 'ONLINE' | 'OFFLINE' | 'BETA';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}