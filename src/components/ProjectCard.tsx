"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const isFeatured = variant === 'featured';
  const projectId = `project-${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  const openProject = () => setIsOpen(true);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setIsImageOpen(false);
    }
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  };

  const handleProjectOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleImageOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsImageOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen && !isImageOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isImageOpen]);

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${project.title}`}
        onClick={openProject}
        onKeyDown={handleCardKeyDown}
        className={isFeatured
          ? 'group flex w-[82vw] max-w-80 flex-none snap-start cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/30 bg-transparent shadow-lg transition duration-300 hover:-translate-y-0.5 hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:w-96 md:max-w-none md:flex-row'
          : 'mb-8 flex w-full max-w-5xl cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-600 bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex-row'
        }
      >
        <div
          className={isFeatured
            ? 'flex h-24 w-full flex-shrink-0 items-center justify-center bg-transparent p-2 md:h-auto md:w-32'
            : 'flex h-48 w-full flex-shrink-0 items-center justify-center border-b border-gray-600 bg-gray-800 p-4 md:h-auto md:w-64 md:border-b-0 md:border-r'
          }
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={isFeatured
                ? 'h-full w-full rounded-2xl object-cover'
                : 'h-full w-full rounded-xl object-cover'
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gray-600">
              <pre className="text-xs font-mono text-white">{"</>"}</pre>
            </div>
          )}
        </div>

        <div className={isFeatured ? 'min-w-0 flex-1 px-3 pb-3 md:p-3 md:pl-1' : 'flex-1 p-6'}>
          <h3 className={isFeatured
            ? 'mb-1 line-clamp-2 text-sm font-bold font-mono text-white drop-shadow-lg md:text-base'
            : 'mb-2 text-xl font-bold font-mono text-white'
          }>
            {project.title}
          </h3>
          <p className={isFeatured
            ? 'line-clamp-2 text-xs leading-relaxed text-white/90 drop-shadow-lg md:text-sm'
            : 'mb-4 text-gray-300'
          }>
            {project.description}
          </p>

          {!isFeatured && (
            <div className="flex flex-wrap gap-2">
              {project.skills.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-mono text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-2 md:p-4"
          onClick={handleProjectOutsideClick}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={projectId}
            className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-x-hidden overflow-y-auto rounded-[1.75rem] border border-gray-600 bg-gray-900 p-4 pt-14 shadow-xl md:max-h-[90vh] md:flex-row md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            {project.imageUrl ? (
              <div className="mb-5 flex w-full flex-shrink-0 items-center justify-center border-b border-gray-600 pb-5 md:mb-0 md:mr-6 md:w-80 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="max-h-[32vh] w-full cursor-zoom-in rounded-2xl object-contain md:max-h-[60vh]"
                  onClick={() => setIsImageOpen(true)}
                />
              </div>
            ) : (
              <div className="mb-5 flex min-h-40 w-full flex-shrink-0 items-center justify-center border-b border-gray-600 pb-5 md:mb-0 md:mr-6 md:w-80 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                <pre className="text-xs font-mono text-white">{"</>"}</pre>
              </div>
            )}

            <div className="min-w-0 flex-1 space-y-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 bg-gray-900 text-xl text-white transition-colors hover:bg-black"
              >
                &times;
              </button>

              <h2 id={projectId} className="pr-8 text-xl font-bold font-mono text-white md:text-2xl">
                {project.title}
              </h2>
              <div className="min-w-0 text-sm text-gray-300 md:text-base">{project.fullDescription}</div>

              <div className="space-y-3">
                <h4 className="font-bold font-mono text-white">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start text-gray-300">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold font-mono text-white">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-mono text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 font-mono text-white transition-colors hover:bg-black"
                  >
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 font-mono text-white transition-colors hover:bg-black"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {isImageOpen && project.imageUrl && createPortal(
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-3"
          onClick={handleImageOutsideClick}
        >
          <div
            className="relative flex max-h-full max-w-full rounded-2xl bg-gray-900 p-4 pt-14"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsImageOpen(false)}
              aria-label="Close enlarged image"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 bg-gray-900 text-xl text-white transition-colors hover:bg-black"
            >
              &times;
            </button>

            <img
              src={project.imageUrl}
              alt={project.title}
              className="max-h-[calc(100dvh-5rem)] max-w-full rounded-xl object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProjectCard;
