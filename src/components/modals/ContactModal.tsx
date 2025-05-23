
import React from 'react';
import { X, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const contacts = [
    { icon: Mail, label: "Email", value: "teodebaysio@gmail.com", link: "mailto:teodebaysio@gmail.com" },
    { icon: Phone, label: "Téléphone", value: "07.86.42.23.77", link: "tel:0786422377" },
    { icon: MapPin, label: "Localisation", value: "Ham-en-Artois, 62190", link: null },
    { icon: Linkedin, label: "LinkedIn", value: "Téo Debay", link: "https://linkedin.com/in/teo-debay" }
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
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
              <div className="space-y-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                  Me Contacter
                </h2>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-cyan-100 text-lg">
                      N'hésitez pas à me contacter pour toute opportunité professionnelle ou collaboration
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {contacts.map((contact, index) => (
                      <motion.div
                        key={contact.label}
                        className="flex items-center gap-4 p-6 border border-cyan-400/30 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-3 bg-cyan-400/20 rounded-lg">
                          <contact.icon className="text-cyan-300" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-cyan-300 font-medium mb-1">{contact.label}</p>
                          {contact.link ? (
                            <a 
                              href={contact.link}
                              className="text-cyan-100 hover:text-white transition-colors text-lg"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-cyan-100 text-lg">{contact.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-cyan-400/30">
                    <p className="text-center text-cyan-300 text-sm">
                      Disponible pour des missions freelance et opportunités professionnelles
                    </p>
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

export default ContactModal;
