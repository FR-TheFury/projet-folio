
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Phone, Mail, Linkedin } from 'lucide-react';

interface MainMenuProps {
  onOpenModal: (modalType: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onOpenModal }) => {
  const menuItems = [
    { id: 'projects', label: 'Projets', position: 'top-12 left-12', icon: '🚀' },
    { id: 'experience', label: 'Expériences', position: 'top-12 right-12', icon: '🎓' },
    { id: 'about', label: 'À propos', position: 'bottom-12 left-12', icon: '👨‍💻' },
    { id: 'contact', label: 'Contact', position: 'bottom-12 right-12', icon: '📡' },
    { id: 'rss', label: 'Flux RSS', position: 'top-1/2 left-12 -translate-y-1/2', icon: '📊' },
    { id: 'certification', label: 'Certification', position: 'top-1/2 right-12 -translate-y-1/2', icon: '🏆' },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <motion.button
          key={item.id}
          className={`fixed z-20 ${item.position} group`}
          onClick={() => onOpenModal(item.id)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.15 + 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <div className="relative bg-black/80 backdrop-blur-md border border-cyan-400/50 rounded-xl px-6 py-3 flex items-center space-x-3 group-hover:border-cyan-300 transition-all duration-300">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">{item.icon}</span>
              <span className="text-cyan-300 font-bold text-sm tracking-wider uppercase group-hover:text-white transition-colors duration-300 font-mono">
                {item.label}
              </span>
            </div>
            
            {/* Corner accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 group-hover:border-pink-400 transition-colors duration-300"></div>
          </div>
        </motion.button>
      ))}
      
      {/* Central Logo/Name avec informations */}
      <motion.div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 font-mono tracking-wider"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(0,255,255,0.5)",
              "0 0 40px rgba(255,0,255,0.5)",
              "0 0 20px rgba(0,255,255,0.5)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          TÉO DEBAY
        </motion.h1>
        
        {/* Informations personnelles centrales réorganisées */}
        <motion.div
          className="flex flex-col items-center space-y-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {/* Première ligne - Date et statut */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-cyan-200">
              <Calendar size={18} />
              <span>08/05/2004</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-200">
              <User size={18} />
              <span>Célibataire, Permis B</span>
            </div>
          </div>
          
          {/* Deuxième ligne - Lieu et téléphone */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-cyan-200">
              <MapPin size={18} />
              <span>Ham-en-Artois, 62190</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-200">
              <Phone size={18} />
              <a href="tel:0786422377" className="hover:text-white transition-colors">
                07.86.42.23.77
              </a>
            </div>
          </div>
        </motion.div>

        {/* Liens de contact centrés */}
        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <a
            href="mailto:teodebaypro@gmail.com"
            className="flex items-center gap-2 px-6 py-3 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors text-cyan-300 hover:text-white"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href="https://linkedin.com/in/teo-debay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-purple-400/50 rounded-lg hover:bg-purple-400/10 transition-colors text-purple-300 hover:text-white"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-8 -left-8 w-16 h-16 border border-cyan-400/30 rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-8 -right-8 w-12 h-12 border border-pink-400/30 rotate-45"
          animate={{ rotate: [45, -135, 45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </>
  );
};

export default MainMenu;
