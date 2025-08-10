export interface Project {
  title: string;
  description: string;
  fullDescription: React.ReactNode;
  skills: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export interface MediaItem {
  type: 'video' | 'photo'
  title: string
  description: string
  thumbnail: string
  videoUrl?: string
  fullImage?: string
}

export interface NavItem {
  label: string
  href: string
}
