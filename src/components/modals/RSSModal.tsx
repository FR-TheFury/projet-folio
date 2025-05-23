
import React from 'react';
import { X, Rss, TrendingUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RSSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSSModal: React.FC<RSSModalProps> = ({ isOpen, onClose }) => {
  const feeds = [
    {
      title: "Actualités Spatiales",
      description: "Les dernières nouvelles de l'exploration spatiale",
      items: [
        { title: "Mission Artemis III: Nouvelles mises à jour", date: "2024-01-15" },
        { title: "SpaceX lance 23 satellites Starlink", date: "2024-01-14" },
        { title: "Découverte d'exoplanète habitable", date: "2024-01-13" }
      ]
    },
    {
      title: "Tech & Innovation",
      description: "Dernières innovations technologiques",
      items: [
        { title: "IA générative: nouveaux développements", date: "2024-01-15" },
        { title: "Quantique: percée dans les processeurs", date: "2024-01-14" },
        { title: "Réalité augmentée: applications spatiales", date: "2024-01-13" }
      ]
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
                  <div className="flex items-center gap-3">
                    <Rss className="text-cyan-300" size={32} />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                      Flux RSS
                    </h2>
                  </div>
                  
                  <div className="grid gap-6">
                    {feeds.map((feed, feedIndex) => (
                      <motion.div
                        key={feed.title}
                        className="border border-cyan-400/30 rounded-lg bg-black/30 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: feedIndex * 0.2 }}
                      >
                        <div className="p-4 border-b border-cyan-400/30 bg-black/50">
                          <h3 className="text-xl font-bold text-cyan-300 mb-2">{feed.title}</h3>
                          <p className="text-cyan-100 text-sm">{feed.description}</p>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          {feed.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.title}
                              className="flex items-start gap-3 p-3 border border-purple-400/20 rounded-lg hover:bg-purple-400/5 transition-colors cursor-pointer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (feedIndex * 0.2) + (itemIndex * 0.1) }}
                            >
                              <TrendingUp className="text-purple-300 mt-1" size={16} />
                              <div className="flex-1">
                                <h4 className="text-cyan-100 font-medium hover:text-white transition-colors">
                                  {item.title}
                                </h4>
                                <div className="flex items-center gap-1 text-xs text-cyan-300 mt-1">
                                  <Calendar size={12} />
                                  {item.date}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
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

export default RSSModal;
