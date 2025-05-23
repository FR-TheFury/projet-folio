
import React from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const experiences = [
    {
      title: "BTS Services Informatiques aux Organisations",
      company: "Lycée Technique",
      period: "2023 - 2025",
      location: "France",
      description: "Formation en développement d'applications et administration de systèmes informatiques.",
      skills: ["Développement Web", "Base de données", "Gestion de projet", "Administration système"]
    },
    {
      title: "Stage Développeur Web",
      company: "Entreprise Locale",
      period: "Été 2024",
      location: "France",
      description: "Développement d'une application web pour la gestion interne de l'entreprise.",
      skills: ["React", "Node.js", "MongoDB", "API REST"]
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
            className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto"
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
                    Formation & Stages
                  </h2>
                  
                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={exp.title}
                        className="relative p-6 border border-cyan-400/30 rounded-lg bg-black/30"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-cyan-300 mb-1">{exp.title}</h3>
                            <p className="text-purple-300 font-medium">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-cyan-100">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar size={14} />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-cyan-100 mb-4">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                              {skill}
                            </span>
                          ))}
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

export default ExperienceModal;
