import React, { useEffect, useState, useRef, useCallback } from 'react';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  icon: React.JSX.Element;
  link?: string | null; // Keep link optional for projects without external links
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isFullyOpen, setIsFullyOpen] = useState(false);      // For entry animation
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); // For exit animation
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Stable callback for initiating the closing animation sequence
  const startCloseAnimation = useCallback(() => {
    setIsAnimatingOut(true);
  }, []);

  // Effect for handling the actual close call after the exit animation completes
  useEffect(() => {
    if (isAnimatingOut) {
      const timer = setTimeout(() => {
        onClose(); // Call prop to unmount/hide modal in parent
        setIsAnimatingOut(false); // Reset for the next time the modal might open
      }, 300); // Duration must match the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimatingOut, onClose]);

  // Effect for entry animation and managing the outside click listener
  useEffect(() => {
    if (project) {
      // --- Modal is Opening ---
      setIsAnimatingOut(false); // Ensure any lingering exit animation state is reset
      setIsFullyOpen(false);    // Start in a visually "closed" state to prepare for animation

      // Delay setting to fully open. This allows the browser to paint the initial
      // (scaled-down, transparent) state before the transition to the "open" state begins.
      const openAnimTimer = setTimeout(() => {
        setIsFullyOpen(true);
      }, 50); // A small delay (e.g., 50ms) is usually sufficient. Adjust if needed.

      // Setup listener for clicks outside the modal content to close it
      const handleClickOutside = (event: MouseEvent) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
          startCloseAnimation();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);

      // Cleanup function for this effect
      return () => {
        clearTimeout(openAnimTimer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    } else {
      // --- Modal is Closed (project is null) ---
      setIsFullyOpen(false); // Reset for the next time the modal opens
    }
  }, [project, startCloseAnimation]); // Dependencies for this effect

  // If there's no project data, don't render the modal
  if (!project) {
    return null;
  }

  // Base classes for the modal content - ensures transitions are always configured
  const baseModalContentClasses = "bg-slate-800/90 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-2xl w-full relative transform transition-all duration-300 ease-in-out";
  
  // Dynamic classes for modal content appearance based on animation states
  const modalContentAnimationClasses = (isFullyOpen && !isAnimatingOut)
    ? 'scale-100 opacity-100'  // Target state when fully open
    : 'scale-95 opacity-0';     // Initial state for entry, or target state for exit

  // Dynamic classes for the backdrop visibility
  const backdropAnimationClasses = (isFullyOpen && !isAnimatingOut) 
    ? 'opacity-100' // Visible when content is (or animating to be) fully open
    : 'opacity-0';   // Hidden otherwise (or animating out)

  return (
    <div 
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ${backdropAnimationClasses}`}
    >
      <div 
        ref={modalContentRef}
        className={`${baseModalContentClasses} ${modalContentAnimationClasses}`}
      >
        <button
          onClick={startCloseAnimation} // Use the internal handler that triggers the animation
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors text-2xl z-10"
          aria-label="Close modal"
        >
          &times;
        </button>
        
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0 w-20 h-20 bg-slate-700/50 rounded-lg flex items-center justify-center">
            {React.cloneElement(project.icon, { className: "w-12 h-12 text-blue-300" })}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-blue-300 mb-4">{project.shortDescription}</p>
          </div>
        </div>

        <div className="mt-6 text-white/80 space-y-3 leading-relaxed">
          {project.detailedDescription.split('\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.link && (
          <div className="mt-8 text-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              View Project / Learn More
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal; 