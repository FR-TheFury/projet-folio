
import React from 'react';
import { motion } from 'framer-motion';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const projects = [
    {
      title: "GSB Extranet",
      description: "Application web pour la gestion des visiteurs médicaux avec authentification et système de rapports.",
      tech: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      status: "Terminé",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      title: "Firelovers",
      description: "Plateforme communautaire pour les passionnés de feux d'artifice avec système de partage et notation.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      status: "En développement",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
    },
    {
      title: "Portfolio Spatial",
      description: "Portfolio personnel avec thème spatial et animations interactives.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      status: "Actuel",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=250&fit=crop"
    }
  ];

  return (
    <motion.div 
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content w-full max-w-6xl"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Mes Projets
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Terminé' ? 'bg-green-600/30 text-green-300 border border-green-500/30' :
                  project.status === 'En développement' ? 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30' :
                  'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                }`}>
                  {project.status}
                </span>
                <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                  Voir plus →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsModal;
