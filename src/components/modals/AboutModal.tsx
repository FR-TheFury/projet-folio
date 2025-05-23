
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto"
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
                    À propos de moi
                  </h2>
                  
                  <div className="space-y-4 text-cyan-100">
                    <p className="text-lg leading-relaxed">
                      Passionné par le développement web et les technologies spatiales, je suis un développeur full-stack 
                      en formation qui aime créer des expériences numériques innovantes.
                    </p>
                    
                    <p className="leading-relaxed">
                      Mon parcours combine formation technique et passion pour l'exploration spatiale. 
                      J'ai développé des compétences en React, Node.js, et diverses technologies modernes 
                      tout en gardant un œil sur les innovations dans le secteur spatial.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 border border-cyan-400/30 rounded-lg">
                        <h3 className="text-cyan-300 font-bold mb-2">🚀 Technologies</h3>
                        <ul className="text-sm space-y-1">
                          <li>React / Next.js</li>
                          <li>Node.js / Express</li>
                          <li>TypeScript</li>
                          <li>Tailwind CSS</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 border border-purple-400/30 rounded-lg">
                        <h3 className="text-purple-300 font-bold mb-2">🌌 Passions</h3>
                        <ul className="text-sm space-y-1">
                          <li>Exploration spatiale</li>
                          <li>Innovation technologique</li>
                          <li>UI/UX Design</li>
                          <li>Science-fiction</li>
                        </ul>
                      </div>
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
