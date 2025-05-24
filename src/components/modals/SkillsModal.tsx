
import React from 'react';
import { X, Zap, Globe, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose }) => {
  const devSkills = [
    { name: "React", level: 95, color: "bg-cyan-400" },
    { name: "JavaScript", level: 90, color: "bg-yellow-400" },
    { name: "TypeScript", level: 85, color: "bg-blue-400" },
    { name: "HTML/CSS", level: 95, color: "bg-orange-400" },
    { name: "PHP", level: 80, color: "bg-purple-400" },
    { name: "SQL", level: 85, color: "bg-green-400" },
    { name: "Python", level: 75, color: "bg-yellow-400" },
    { name: "Java", level: 70, color: "bg-orange-400" },
    { name: "C#", level: 65, color: "bg-purple-400" },
    { name: "Angular", level: 70, color: "bg-red-400" },
    { name: "WordPress", level: 80, color: "bg-blue-400" },
    { name: "PrestaShop", level: 75, color: "bg-pink-400" },
    { name: "Unity", level: 70, color: "bg-green-400" },
    { name: "Blender", level: 65, color: "bg-cyan-400" }
  ];

  const specializations = [
    { name: "Dev Full Stack (Frontend & Backend)", level: 90, color: "bg-gradient-to-r from-cyan-400 to-purple-400" },
    { name: "Sites Web (Code & Low-code)", level: 85, color: "bg-gradient-to-r from-purple-400 to-pink-400" },
    { name: "Base de données", level: 80, color: "bg-gradient-to-r from-green-400 to-cyan-400" },
    { name: "Programmes et applications", level: 75, color: "bg-gradient-to-r from-yellow-400 to-orange-400" }
  ];

  const languages = [
    { name: "Anglais", level: "Très bon niveau", color: "bg-cyan-400" },
    { name: "Espagnol", level: "Notions", color: "bg-purple-400" }
  ];

  const softSkills = [
    "Adaptation rapide",
    "Travail en mode projet et mode agile",
    "Gestion de projet"
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
                  Compétences
                </h2>
                
                <div className="space-y-8 text-cyan-100">
                  <p className="text-lg leading-relaxed">
                    Voici un aperçu de mes compétences techniques, linguistiques et relationnelles.
                  </p>
                  
                  {/* Spécialisations */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                      <Zap size={24} />
                      Spécialisations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specializations.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="p-6 border border-cyan-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-cyan-300 font-bold text-lg">{skill.name}</h4>
                            <span className="text-sm text-cyan-100">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <motion.div 
                              className={`${skill.color} h-3 rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-purple-300">Technologies maîtrisées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {devSkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className="p-4 border border-purple-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-purple-300 font-bold">{skill.name}</h4>
                            <span className="text-sm text-cyan-100">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div 
                              className={`${skill.color} h-2 rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ delay: index * 0.05 + 0.5, duration: 0.8 }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Langues */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                      <Globe size={20} />
                      Langues
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {languages.map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          className="p-4 border border-cyan-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h4 className="text-cyan-300 font-bold text-lg">{lang.name}</h4>
                          <p className="text-cyan-100">{lang.level}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-pink-300 flex items-center gap-2">
                      <Brain size={20} />
                      Soft Skills
                    </h3>
                    <div className="space-y-3">
                      {softSkills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          className="flex items-center gap-4 p-4 border border-pink-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                          <span className="text-cyan-100 text-lg">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-cyan-400/30">
                    <p className="text-center text-cyan-300 text-lg">
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
