
import React from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose }) => {
  const devSkills = [
    { name: "React", level: 95, color: "cyan" },
    { name: "JavaScript", level: 90, color: "yellow" },
    { name: "TypeScript", level: 85, color: "blue" },
    { name: "HTML/CSS", level: 95, color: "orange" },
    { name: "WordPress", level: 80, color: "purple" },
    { name: "PrestaShop", level: 75, color: "pink" },
    { name: "Unity", level: 70, color: "green" },
    { name: "Blender", level: 65, color: "cyan" }
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
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
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                  Compétences Techniques
                </h2>
                
                <div className="space-y-6 text-cyan-100">
                  <p className="text-lg leading-relaxed">
                    Voici un aperçu de mes compétences techniques en développement web et outils de création.
                  </p>
                  
                  {/* Compétences de développement */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                      <Zap size={20} />
                      Technologies maîtrisées
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {devSkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="p-4 border border-cyan-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-cyan-300 font-bold">{skill.name}</h4>
                            <span className="text-sm text-cyan-100">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className={`bg-${skill.color}-400 h-2 rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-cyan-400/30">
                    <p className="text-center text-cyan-300 text-sm">
                      En constante évolution, toujours prêt à apprendre de nouvelles technologies
                    </p>
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

export default SkillsModal;
