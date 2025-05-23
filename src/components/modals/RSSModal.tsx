
import React from 'react';
import { motion } from 'framer-motion';

interface RSSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSSModal: React.FC<RSSModalProps> = ({ isOpen, onClose }) => {
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
        className="modal-content w-full max-w-5xl h-[80vh]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Flux RSS - Actualités Tech & Espace
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">🚀 Actualités Spatiales</h3>
            <iframe 
              src="https://www.futura-sciences.com/rss/espace/flux.rss"
              className="w-full h-64 lg:h-80 bg-gray-800/50 rounded-lg border border-blue-500/30"
              title="Flux RSS Espace"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">💻 Tech News</h3>
            <iframe 
              src="https://www.lemondeinformatique.fr/rss/rss.xml"
              className="w-full h-64 lg:h-80 bg-gray-800/50 rounded-lg border border-purple-500/30"
              title="Flux RSS Tech"
            />
          </div>
        </div>

        <motion.div 
          className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-300 text-sm">
            💡 <strong>Info :</strong> Cette section affiche les dernières actualités du monde technologique et spatial 
            pour rester à jour avec les innovations et découvertes qui façonnent notre futur.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RSSModal;
