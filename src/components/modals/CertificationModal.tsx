
import React from 'react';
import { motion } from 'framer-motion';

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const certifications = [
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2024",
      status: "Obtenu",
      description: "Certification complète en algorithmes JavaScript et structures de données.",
      badge: "🏆"
    },
    {
      title: "React Developer",
      issuer: "Meta (Facebook)",
      date: "2024",
      status: "En cours",
      description: "Certification officielle Meta pour le développement React.",
      badge: "⚛️"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      status: "Planifié",
      description: "Certification fondamentale pour les services cloud AWS.",
      badge: "☁️"
    },
    {
      title: "BTS SIO SLAM",
      issuer: "Éducation Nationale",
      date: "2025",
      status: "En cours",
      description: "Diplôme d'État en Services Informatiques aux Organisations.",
      badge: "🎓"
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
        className="modal-content w-full max-w-4xl"
        initial={{ rotateY: -90 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: 90 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Certifications & Diplômes
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{cert.badge}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cert.status === 'Obtenu' ? 'bg-green-600/30 text-green-300 border border-green-500/30' :
                  cert.status === 'En cours' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30' :
                  'bg-yellow-600/30 text-yellow-300 border border-yellow-500/30'
                }`}>
                  {cert.status}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{cert.title}</h3>
              <p className="text-blue-400 font-medium mb-2">{cert.issuer}</p>
              <p className="text-sm text-gray-400 mb-3">{cert.date}</p>
              <p className="text-gray-300 text-sm">{cert.description}</p>
              
              {cert.status === 'Obtenu' && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                    Voir le certificat →
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">🎯 Objectifs de Certification</h3>
          <p className="text-gray-300">
            Mon parcours de certification vise à valider mes compétences techniques et à rester à jour 
            avec les dernières technologies. Ces certifications me permettent de démontrer mon expertise 
            et mon engagement envers l'excellence professionnelle dans le développement web et les technologies cloud.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CertificationModal;
