import React from 'react';
import { projects } from '@/data'; 
import ProjectCard from '../ProjectCard';

const Projects: React.FC = () => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <div className="text-white">No projects available.</div>
        )}
      </div>
    </div>

  );
};

export default Projects;
