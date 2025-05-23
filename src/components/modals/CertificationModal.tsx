
import React from 'react';
import { X, Award, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose }) => {
  const certifications = [
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2024",
      status: "En cours",
      description: "Certification officielle Meta pour le développement React"
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "FreeCodeCamp",
      date: "2023",
      status: "Obtenu",
      description: "Certification en algorithmique et structures de données JavaScript"
    },
    {
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      date: "2023",
      status: "Obtenu",
      description: "Certification en design web responsive et accessibilité"
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
                    Certifications
                  </h2>
                  
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert.title}
                        className="p-6 border border-cyan-400/30 rounded-lg bg-black/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                              <Award className="text-yellow-300" size={20} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-cyan-300 mb-1">{cert.title}</h3>
                              <p className="text-purple-300 font-medium">{cert.issuer}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-cyan-100 mb-2">
                              <Calendar size={14} />
                              {cert.date}
                            </div>
                            <span className={`px-3 py-1 text-xs rounded-full ${
                              cert.status === 'Obtenu' ? 'bg-green-500/20 text-green-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {cert.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-cyan-100 mb-4">{cert.description}</p>
                        
                        {cert.status === 'Obtenu' && (
                          <button className="flex items-center gap-2 px-3 py-1 text-sm border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-colors rounded">
                            <ExternalLink size={16} />
                            Voir le certificat
                          </button>
                        )}
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

export default CertificationModal;
