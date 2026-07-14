import { Github, Linkedin, Mail } from 'lucide-react';
import { projects, socialLinks } from '@/data';
import HorizontalCardRail from '@/components/HorizontalCardRail';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <main className="relative h-[calc(100svh-4rem)] overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-[52%_center] md:object-[55%_center]"
        >
          <source src="/demo_reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-4 md:px-8 md:py-8">
        <div className="flex flex-1 items-center justify-center text-center">
          <div className="rounded-3xl bg-transparent px-4 py-3 md:p-8">
            <h1 className="mb-3 text-4xl font-bold text-white drop-shadow-lg md:mb-6 md:text-7xl">
              Arin Idhant
            </h1>
            <p className="mx-auto mb-5 max-w-2xl text-base text-gray-100 drop-shadow-lg md:mb-10 md:text-2xl">
              Creative technologist & visual artist
            </p>

          {/* Social Links */}
            <div className="flex justify-center gap-8 drop-shadow-lg">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Github className="h-7 w-7 md:h-8 md:w-8" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Linkedin className="h-7 w-7 md:h-8 md:w-8" />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              aria-label="Email"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Mail className="h-7 w-7 md:h-8 md:w-8" />
            </a>
            </div>
          </div>
        </div>

        <HorizontalCardRail
          id="featured-projects"
          title="Featured Projects"
          variant="overlay"
          className="mx-auto w-full max-w-5xl flex-none"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} variant="featured" />
          ))}
        </HorizontalCardRail>
      </div>
    </main>
  );
}
