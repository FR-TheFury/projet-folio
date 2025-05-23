
import React from 'react';
import { X, Calendar, MapPin, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const experiences = [
    {
      title: "Développeur Web",
      company: "BI Développement",
      type: "Alternance",
      period: "1 an",
      location: "Tourcoing",
      description: "Développement et livraison de sites clients avec suivi post-livraison",
      responsibilities: [
        "Développement et livraison de sites clients",
        "Modifications post-livraison",
        "Suivi des clients",
        "Réparation d'hébergements avec failles de sécurité"
      ],
      color: "cyan"
    },
    {
      title: "Stagiaire Développeur",
      company: "BI Développement", 
      type: "Stage",
      period: "10 mois sur 2 ans",
      location: "Tourcoing",
      description: "Apprentissage approfondi du développement web et participation aux projets internes",
      responsibilities: [
        "Apprentissage WordPress",
        "Participation aux projets internes",
        "Formation aux technologies web"
      ],
      color: "purple"
    },
    {
      title: "Stagiaire Technicien",
      company: "JB Solution",
      type: "Stage",
      period: "2 semaines", 
      location: "Hallennes lez Haubourdin",
      description: "Découverte des systèmes domotiques et de surveillance",
      responsibilities: [
        "Domotique",
        "Vidéo-surveillance", 
        "Systèmes automatisés"
      ],
      color: "pink"
    },
    {
      title: "Stagiaire Support IT",
      company: "CER France",
      type: "Stage",
      period: "1 mois",
      location: "Radinghem-en-Weppes", 
      description: "Support technique et réparation de matériel informatique",
      responsibilities: [
        "Réparation de machines internes et clients",
        "Support technique utilisateurs",
        "Maintenance préventive"
      ],
      color: "yellow"
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
                  Expériences Professionnelles
                </h2>
                
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={`${exp.company}-${exp.title}`}
                      className={`relative p-6 border border-${exp.color}-400/30 rounded-lg bg-black/30`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 bg-${exp.color}-500/20 rounded-lg`}>
                            <Briefcase className={`text-${exp.color}-300`} size={20} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold text-${exp.color}-300 mb-1`}>{exp.title}</h3>
                            <p className="text-purple-300 font-medium">{exp.company}</p>
                            <p className="text-sm text-cyan-200">{exp.type}</p>
                          </div>
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
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-cyan-300">Responsabilités :</h4>
                        <ul className="space-y-1">
                          {exp.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-cyan-100">
                              <div className={`w-1.5 h-1.5 bg-${exp.color}-400 rounded-full`}></div>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
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
