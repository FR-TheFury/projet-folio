
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
      description: "Site portfolio personnel avec thème spatial et animations futuristes créé avec React, TypeScript et Framer Motion",
      tech: ["React", "TypeScript", "Framer Motion", "Tailwind", "Three.js"],
      status: "En ligne",
      statusColor: "bg-green-500/20 text-green-300",
      githubUrl: "#",
      liveUrl: window.location.href
    },
    {
      title: "Firelovers",
      description: "Site web professionnel pour l'entreprise de mon père, développé avec une approche moderne et responsive",
      tech: ["WordPress", "PHP", "JavaScript", "CSS"],
      status: "En ligne",
      statusColor: "bg-green-500/20 text-green-300",
      githubUrl: "#",
      liveUrl: "https://firelovers.fr"
    },
    {
      title: "Gallery VRChat",
      description: "Site personnel de galerie pour mes créations et expériences dans l'univers VRChat",
      tech: ["React", "CSS", "JavaScript"],
      status: "En ligne",
      statusColor: "bg-green-500/20 text-green-300",
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: "100 Jours 100 Programmes",
      description: "Défi personnel de créer 100 programmes différents en 100 jours pour explorer diverses technologies",
      tech: ["Python", "JavaScript", "Java", "C#", "React"],
      status: "En cours",
      statusColor: "bg-yellow-500/20 text-yellow-300",
      githubUrl: "#",
      liveUrl: "#"
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
            className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto custom-scrollbar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
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
              <div className="space-y-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                  Mes Projets
                </h2>
                
                <div className="grid gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      className="p-8 border border-cyan-400/30 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-cyan-300">{project.title}</h3>
                        <span className={`px-3 py-1 text-sm rounded-full ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <p className="text-cyan-100 mb-6 text-lg leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded border border-purple-400/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-colors rounded"
                        >
                          <Github size={18} />
                          Code
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-colors rounded font-semibold"
                        >
                          <ExternalLink size={18} />
                          Voir le site
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer message */}
                <motion.div
                  className="text-center p-6 border border-cyan-400/20 rounded-lg bg-black/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30">
                    <span className="text-2xl">🚀</span>
                    <span className="text-cyan-300 font-medium">D'autres projets sont à venir...</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsModal;
