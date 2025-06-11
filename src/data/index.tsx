import { Project, MediaItem, NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Creative', href: '/creative' },
]

const projects: Project[] = [
  {
    title: "Task Manager",
    description: "A web application for managing tasks efficiently.",
    fullDescription: (
      <div className="space-y-4 text-gray-300">
        <p>
          Task Manager is a full-stack web app that allows users to efficiently manage their daily tasks.
          The intuitive interface includes drag-and-drop prioritization and category filtering.
        </p>
        <img
          src="/trial.gif"
          alt="Task Manager Dashboard"
          className="rounded-lg border border-gray-700"
        />
        <p>
          Built with <strong>React</strong> and <strong>Node.js</strong>, it uses <strong>MongoDB</strong> for storage
          and implements authentication using JWT. Real-time updates are handled via WebSockets.
        </p>
        <img
          src="/trial.gif"
          alt="Task Manager Mobile View"
          className="rounded-lg border border-gray-700"
        />
        <p>
          Users can switch between light and dark modes and get real-time notifications when tasks are updated.
        </p>
      </div>
    ),
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "User authentication and authorization",
      "Task categorization and filtering",
      "Real-time notifications",
      "Drag-and-drop task prioritization",
      "Dark mode support"
    ],
    liveUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/yourusername/task-manager",
    imageUrl: "/projects/task-manager.jpg"
  },
  {
    title: "Fitness Tracker",
    description: "A mobile app for tracking workouts and nutrition.",
    fullDescription: (
      <div className="space-y-4 text-gray-300">
        <p>
          Fitness Tracker is a mobile application designed to help users log their workouts and monitor their nutrition.
        </p>
        <img
          src="/images/fitness-dashboard.png"
          alt="Fitness App Dashboard"
          className="rounded-lg border border-gray-700"
        />
        <p>
          Users receive personalized workout suggestions based on their fitness goals, as well as nutritional advice.
          Progress is visualized with interactive charts and graphs.
        </p>
        <img
          src="/images/fitness-graph.png"
          alt="Fitness Progress Chart"
          className="rounded-lg border border-gray-700"
        />
        <p>
          The app integrates with Firebase for backend services like authentication and real-time data sync.
        </p>
      </div>
    ),
    technologies: ["React Native", "Firebase"],
    features: [
      "Workout logging and tracking",
      "Nutritional information and meal logging",
      "Progress analytics and charts",
      "Workout suggestions based on user goals",
      "Social sharing of achievements"
    ],
    liveUrl: "https://fitness-tracker-app.com",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    imageUrl: "/projects/fitness-tracker.jpg"
  }
];


export const mediaItems: MediaItem[] = [
  {
    type: 'video',
    title: 'Animation Project',
    description: 'A short animated piece exploring...',
    thumbnail: '/creative/video1-thumb.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=QHscMam4W7s'
  },
  {
    type: 'video',
    title: 'Another Animation Project',
    description: 'A second animated piece...',
    thumbnail: '/creative/video2-thumb.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=7aWL2iEb6y4'
  },
  {
    type: 'photo',
    title: 'Photography Series',
    description: 'Exploring urban landscapes...',
    thumbnail: '/creative/images/one.jpg',
    fullImage: '/creative/photo1-full.jpg'
  },
  {
    type: 'photo',
    title: 'Photography Series',
    description: 'Exploring urban landscapes...',
    thumbnail: '/creative/images/two.jpg',
    fullImage: '/creative/photo2-full.jpg'
  },
];

export const socialLinks = {
  github: "https://github.com/Arin1604",
  linkedin: "https://linkedin.com/in/yourhandle",
  email: "your.email@example.com"
}

export { projects };
