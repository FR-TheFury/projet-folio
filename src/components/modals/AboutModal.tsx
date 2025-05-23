
import React from 'react';
import { X, Globe, Heart, Code, Gamepad2, Music, Plane, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const languages = [
    { name: "Anglais", level: "Très bon niveau", color: "cyan" },
    { name: "Espagnol", level: "Notions", color: "purple" }
  ];

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

  const interests = [
    { icon: Code, name: "Modélisation 3D", details: "Unity, Blender, Sketchup, SolidWorks" },
    { icon: Gamepad2, name: "Jeux vidéo", details: "Passion gaming" },
    { icon: Music, name: "Musique", details: "Écoute et création" },
    { icon: Plane, name: "Voyages", details: "Grèce, Italie, Japon" }
  ];

  const sports = [
    "Natation", "Airsoft", "Golf", "Tennis", "Plongée", "Équitation"
  ];

  const softSkills = [
    "Adaptation rapide",
    "Organisation de projet et d'équipe", 
    "Gestion du stock et du matériel"
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
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto"
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
                  À propos de moi
                </h2>
                
                <div className="space-y-6 text-cyan-100">
                  <p className="text-lg leading-relaxed">
                    Passionné par le développement web, je travaille principalement avec React et développe 
                    des projets personnels innovants. J'ai aussi de l'expérience avec Prestashop et d'autres 
                    technologies web modernes.
                  </p>
                  
                  {/* Compétences de développement */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                      <Zap size={20} />
                      Compétences de développement
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
                  
                  {/* Langues */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                      <Globe size={20} />
                      Langues
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {languages.map((lang, index) => (
                        <motion.div
                          key={lang.name}
                          className={`p-4 border border-${lang.color}-400/30 rounded-lg bg-black/20`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h4 className={`text-${lang.color}-300 font-bold`}>{lang.name}</h4>
                          <p className="text-sm text-cyan-100">{lang.level}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Centres d'intérêt */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                      <Heart size={20} />
                      Centres d'intérêt
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {interests.map((interest, index) => (
                        <motion.div
                          key={interest.name}
                          className="p-4 border border-purple-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <interest.icon className="text-purple-300" size={20} />
                            <h4 className="text-purple-300 font-bold">{interest.name}</h4>
                          </div>
                          <p className="text-sm text-cyan-100">{interest.details}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sports */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300">Sports pratiqués</h3>
                    <div className="flex flex-wrap gap-2">
                      {sports.map((sport) => (
                        <span key={sport} className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-pink-300">Soft Skills</h3>
                    <div className="space-y-2">
                      {softSkills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          className="flex items-center gap-3 p-3 border border-pink-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span className="text-cyan-100">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
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

export default AboutModal;
