"use client";

import React, { useState, useEffect } from 'react';
import { Project } from '../types'; 

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsImageOpen(false);
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex flex-col md:flex-row w-full max-w-5xl mb-8 cursor-pointer bg-gray-800 border border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div
          className="flex-shrink-0 w-64 border-r border-gray-600 bg-gray-800 p-4 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border border-gray-600 rounded-lg">
              <pre className="text-xs font-mono text-white">{"</>"}</pre>
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold mb-2 font-mono text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm border border-gray-600 bg-gray-700 rounded-full font-mono text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleOutsideClick}>
        <div
              className="relative flex bg-gray-900 border border-gray-600 rounded-lg p-8 max-w-6xl w-full m-4 shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >            
            {project.imageUrl ? (
              <div className="flex-shrink-0 w-80 border-r border-gray-600 mr-4 p-2 flex items-center justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                  onClick={() => setIsImageOpen(true)}
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-80 border-r border-gray-600 mr-4 flex items-center justify-center">
                <pre className="text-xs font-mono text-white">{"</>"}</pre>
              </div>
            )}

            <div className="flex-1 space-y-6">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold font-mono text-white">{project.title}</h2>
              <div className="text-gray-300">{project.fullDescription}</div>

              <div className="space-y-3">
                <h4 className="font-bold font-mono text-white">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold font-mono text-white">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 text-sm border border-gray-600 bg-gray-700 rounded-full font-mono text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg font-mono text-white hover:bg-black hover:text-white transition-colors"
                  >
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-600 bg-gray-700 rounded-lg font-mono text-white hover:bg-black hover:text-white transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isImageOpen && project.imageUrl && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleOutsideClick}>
          <div className="relative flex bg-gray-900 p-4 max-w-full max-h-full rounded-lg" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsImageOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              &times;
            </button>

            <img
              src={project.imageUrl}
              alt={project.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
