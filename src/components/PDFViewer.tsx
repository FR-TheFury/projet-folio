
import React from 'react';
import { X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl }) => {
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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* PDF Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[95vh] bg-black/95 backdrop-blur-md border border-cyan-400/50 rounded-xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-400/30">
              <h3 className="text-xl font-bold text-cyan-300">Mon CV</h3>
              <div className="flex items-center gap-3">
                <a
                  href={pdfUrl}
                  download="CV_Teo_Debay.pdf"
                  className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors rounded border border-purple-400/50"
                >
                  <Download size={16} />
                  Télécharger
                </a>
                <button
                  onClick={onClose}
                  className="text-cyan-300 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="h-[80vh] p-4">
              <iframe
                src={pdfUrl}
                className="w-full h-full rounded-lg border border-cyan-400/30"
                title="CV Téo Debay"
              />
            </div>

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

export default PDFViewer;
