
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  images: string[];
}

interface CertificationViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certification: Certification;
}

const CertificationViewer: React.FC<CertificationViewerProps> = ({ isOpen, onClose, certification }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % certification.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + certification.images.length) % certification.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Viewer Modal */}
          <motion.div
            className="relative w-full max-w-5xl max-h-[90vh] bg-black/95 backdrop-blur-md border border-cyan-400/50 rounded-xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-400/30">
              <div>
                <h3 className="text-xl font-bold text-cyan-300">{certification.title}</h3>
                <p className="text-purple-300">{certification.issuer}</p>
              </div>
              <button
                onClick={onClose}
                className="text-cyan-300 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Display */}
            <div className="relative h-[70vh] flex items-center justify-center bg-black/50">
              <img
                src={certification.images[currentImageIndex]}
                alt={`${certification.title} certification ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Navigation arrows (only if multiple images) */}
              {certification.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/80 text-cyan-300 hover:text-white border border-cyan-400/50 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/80 text-cyan-300 hover:text-white border border-cyan-400/50 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Image counter */}
            {certification.images.length > 1 && (
              <div className="p-4 text-center">
                <span className="text-cyan-300">
                  {currentImageIndex + 1} / {certification.images.length}
                </span>
              </div>
            )}

            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificationViewer;
