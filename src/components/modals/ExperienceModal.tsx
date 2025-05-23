
import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const experiences = [
    {
      type: "Formation",
      title: "BTS SIO Option SLAM",
      institution: "Lycée Technologique",
      period: "2023 - 2025",
      description: "Formation en développement d'applications et services informatiques.",
      skills: ["Programmation orientée objet", "Base de données", "Développement web", "Gestion de projet"]
    },
    {
      type: "Stage",
      title: "Développeur Web Junior",
      institution: "Entreprise Tech",
      period: "Mai - Juillet 2024",
      description: "Développement d'applications web et maintenance de systèmes existants.",
      skills: ["React", "PHP", "MySQL", "Git", "Méthodes Agiles"]
    },
    {
      type: "Projet",
      title: "Développeur Freelance",
      institution: "Projets personnels",
      period: "2023 - Présent",
      description: "Création de sites web et applications pour divers clients.",
      skills: ["Full-Stack", "Design UX/UI", "SEO", "Déploiement"]
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
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Parcours & Expériences
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exp.type === 'Formation' ? 'bg-green-600/30 text-green-300 border border-green-500/30' :
                      exp.type === 'Stage' ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30' :
                      'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                    }`}>
                      {exp.type}
                    </span>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-blue-400 font-medium">{exp.institution}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{exp.description}</p>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Compétences acquises :</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">Objectifs Futurs</h3>
          <p className="text-gray-300">
            Mon objectif est de devenir un développeur full-stack expérimenté, spécialisé dans les technologies modernes 
            et les applications innovantes. Je souhaite contribuer à des projets ambitieux qui repoussent les limites 
            technologiques, particulièrement dans le domaine spatial et des nouvelles technologies.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceModal;
