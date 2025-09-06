import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks } from '@/data';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Background Video */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/demo_reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center bg-transparent p-8 rounded-lg">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 shadow-lg">
            Arin Idhant
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Creative technologist & visual artist
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-8">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Github size={32} />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Linkedin size={32} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Mail size={32} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
