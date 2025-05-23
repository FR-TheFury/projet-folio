
import React from 'react';
import { motion } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            À Propos de Moi
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <motion.img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop"
              alt="Téo Debay"
              className="w-full rounded-lg mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Qui suis-je ?</h3>
              <p className="text-gray-300 leading-relaxed">
                Passionné par le développement web et l'espace, je suis un développeur full-stack 
                en formation BTS SIO option SLAM. Mon fascination pour les technologies spatiales 
                influence mon approche du développement, où je cherche constamment à repousser 
                les limites et à créer des expériences utilisateur exceptionnelles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">Compétences Techniques</h3>
              <div className="space-y-3">
                {[
                  { skill: 'JavaScript / TypeScript', level: 90 },
                  { skill: 'React / Next.js', level: 85 },
                  { skill: 'PHP / Laravel', level: 80 },
                  { skill: 'Python', level: 75 },
                  { skill: 'Base de données', level: 80 },
                  { skill: 'DevOps', level: 70 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{item.skill}</span>
                      <span className="text-blue-400">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.level}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white mb-3">Passions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🚀', title: 'Espace' },
                  { icon: '💻', title: 'Développement' },
                  { icon: '🎮', title: 'Gaming' },
                  { icon: '📱', title: 'Tech' }
                ].map((passion, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 rounded-lg border border-blue-500/30 text-center"
                  >
                    <div className="text-2xl mb-1">{passion.icon}</div>
                    <div className="text-sm text-gray-300">{passion.title}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutModal;
