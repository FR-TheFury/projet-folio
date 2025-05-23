
import React from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  const projects = [
    {
      title: "Portfolio Spatial",
      description: "Site portfolio avec thème spatial et animations futuristes",
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind"],
      status: "En cours"
    },
    {
      title: "App Météo Spatiale",
      description: "Application de suivi des conditions météorologiques spatiales",
      tech: ["React", "API NASA", "Charts.js"],
      status: "Planifié"
    },
    {
      title: "Calculateur Orbital",
      description: "Outil de calcul de trajectoires orbitales",
      tech: ["JavaScript", "Three.js", "WebGL"],
      status: "Concept"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-75"></div>
              
              {/* Main content */}
              <div className="relative bg-black/90 backdrop-blur-md border border-cyan-400/50 rounded-xl p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-cyan-300 hover:text-white transition-colors z-10"
                >
                  <X size={24} />
                </button>
                
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                
                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                    Mes Projets
                  </h2>
                  
                  <div className="grid gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        className="p-6 border border-cyan-400/30 rounded-lg bg-black/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-cyan-300">{project.title}</h3>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            project.status === 'En cours' ? 'bg-green-500/20 text-green-300' :
                            project.status === 'Planifié' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <p className="text-cyan-100 mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-3 py-1 text-sm border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-colors rounded">
                            <Github size={16} />
                            Code
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1 text-sm border border-purple-400/50 text-purple-300 hover:bg-purple-400/10 transition-colors rounded">
                            <ExternalLink size={16} />
                            Demo
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsModal;
