export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "ai-resume",
    name: "AI Resume Builder",
    description:
      "An AI-powered resume builder that helps users create and optimize resumes for specific job roles.",
    technologies: [
      "Next.js",
      "TypeScript",
      "AI",
      "Tailwind CSS",
    ],
    github: "https://github.com/MrArnabGhosh/AiResume",
  },

  {
    id: "cloudkeep",
    name: "CloudKeep",
    description:
      "A cloud-based file storage and management platform with secure authentication, file management and cloud integration.",
    technologies: [
      "MERN",
      "TypeScript",
      "AWS",
      "MongoDB",
    ],
    github: "https://github.com/MrArnabGhosh",
  },

  {
    id: "ai-blog",
    name: "AI Blog App",
    description:
      "An AI-powered blogging platform with an admin dashboard, posts, comments and likes.",
    technologies: [
      "Next.js",
      "TypeScript",
      "AI",
      "MongoDB",
    ],
    github: "https://github.com/MrArnabGhosh",
  },

  {
    id: "voting-system",
    name: "Secure Voting System",
    description:
      "A secure web-based voting system with authentication and administrative controls.",
    technologies: [
      "Django",
      "Python",
      "SQLite",
    ],
    github: "https://github.com/MrArnabGhosh",
  },
];