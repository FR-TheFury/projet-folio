
import React from 'react';
import { X, Award, Shield, Brain, Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose }) => {
  const certifications = [
    {
      title: "ANSSI",
      issuer: "Agence Nationale de la Sécurité des Systèmes d'Information",
      icon: Shield,
      description: "Certification en cybersécurité et sécurité des systèmes d'information",
      color: "cyan",
      status: "Obtenu"
    },
    {
      title: "PIX",
      issuer: "Service public français",
      icon: Brain,
      description: "Certification des compétences numériques - Plateforme officielle française",
      color: "purple", 
      status: "Obtenu"
    },
    {
      title: "RGPD",
      issuer: "Formation Réglementation Européenne",
      icon: Eye,
      description: "Certification en protection des données personnelles et conformité RGPD",
      color: "pink",
      status: "Obtenu"
    },
    {
      title: "Google",
      issuer: "Google",
      icon: Award,
      description: "Certifications Google en développement web et outils numériques",
      color: "yellow",
      status: "Obtenu"
    },
    {
      title: "Microsoft",
      issuer: "Microsoft",
      icon: Users,
      description: "Certifications Microsoft en technologies et outils de productivité",
      color: "blue",
      status: "Obtenu"
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
                  Certifications
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.title}
                      className={`p-6 border border-${cert.color}-400/30 rounded-lg bg-black/30 hover:bg-black/50 transition-colors`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 bg-${cert.color}-500/20 rounded-lg`}>
                          <cert.icon className={`text-${cert.color}-300`} size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold text-${cert.color}-300 mb-1`}>{cert.title}</h3>
                          <p className="text-purple-300 font-medium text-sm">{cert.issuer}</p>
                        </div>
                        <span className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">
                          {cert.status}
                        </span>
                      </div>
                      
                      <p className="text-cyan-100 text-sm leading-relaxed">{cert.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-cyan-400/20">
                        <div className={`w-full bg-${cert.color}-500/20 rounded-full h-2`}>
                          <div className={`bg-${cert.color}-400 h-2 rounded-full w-full`}></div>
                        </div>
                        <p className="text-xs text-cyan-300 mt-2">Certification validée</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 border border-cyan-400/30 rounded-lg bg-black/20">
                  <h3 className="text-lg font-bold text-cyan-300 mb-3">📈 Amélioration continue</h3>
                  <p className="text-cyan-100 text-sm">
                    Je maintiens mes certifications à jour et continue d'en acquérir de nouvelles 
                    pour rester au fait des dernières technologies et bonnes pratiques du secteur.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificationModal;
