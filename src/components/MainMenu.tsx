
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

interface MainMenuProps {
  onOpenModal: (modalType: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onOpenModal }) => {
  const menuItems = [
    { id: 'projects', label: 'Projets', position: 'top-4 left-4 md:top-12 md:left-12', icon: '🚀' },
    { id: 'skills', label: 'Compétences', position: 'top-4 right-4 md:top-12 md:right-12', icon: '⚡' },
    { id: 'experience', label: 'Expériences', position: 'top-1/2 left-4 -translate-y-1/2 md:left-12', icon: '🎓' },
    { id: 'about', label: 'À propos', position: 'bottom-4 left-4 md:bottom-12 md:left-12', icon: '👨‍💻' },
    { id: 'contact', label: 'Contact', position: 'bottom-4 right-4 md:bottom-12 md:right-12', icon: '📡' },
    { id: 'rss', label: 'Flux RSS', position: 'top-1/2 right-4 -translate-y-1/2 md:right-12', icon: '📊' },
    { id: 'certification', label: 'Certification', position: 'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 md:bottom-6 md:left-1/2', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Menu buttons - cachés sur très petit écran */}
      <div className="hidden sm:block">
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
              <div className="relative bg-black/80 backdrop-blur-md border border-cyan-400/50 rounded-xl px-3 py-2 md:px-6 md:py-3 flex items-center space-x-2 md:space-x-3 group-hover:border-cyan-300 transition-all duration-300">
                <span className="text-lg md:text-2xl filter drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">{item.icon}</span>
                <span className="text-cyan-300 font-bold text-xs md:text-sm tracking-wider uppercase group-hover:text-white transition-colors duration-300 font-mono">
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
      </div>
      
      {/* Contenu central parfaitement centré */}
      <motion.div 
        className="text-center z-10 px-4 w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Nom principal */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-8 font-mono tracking-wider"
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
        
        {/* Slogan */}
        <motion.div
          className="space-y-2 md:space-y-4 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-base sm:text-lg md:text-2xl text-cyan-100 leading-relaxed">
            Développeur Full Stack / Web Designer / Humain
          </p>
          <p className="text-sm sm:text-base md:text-lg text-cyan-300 font-medium">
            Sérieux • Volontaire • Motivé • Curieux
          </p>
        </motion.div>

        {/* Liens de contact */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <a
            href="mailto:teodebaypro@gmail.com"
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors text-cyan-300 hover:text-white text-sm md:text-base"
          >
            <Mail size={14} className="md:w-4 md:h-4" />
            Email
          </a>
          <a
            href="https://linkedin.com/in/teo-debay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-purple-400/50 rounded-lg hover:bg-purple-400/10 transition-colors text-purple-300 hover:text-white text-sm md:text-base"
          >
            <Linkedin size={14} className="md:w-4 md:h-4" />
            LinkedIn
          </a>
        </motion.div>

        {/* Menu mobile - affiché seulement sur très petit écran */}
        <motion.div
          className="sm:hidden flex flex-wrap justify-center gap-2 max-w-xs mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenModal(item.id)}
              className="flex items-center gap-1 px-3 py-2 bg-black/60 backdrop-blur-md border border-cyan-400/30 rounded-lg text-cyan-300 hover:text-white hover:border-cyan-300 transition-all duration-300 text-xs"
            >
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Message d'invitation */}
        <motion.p
          className="text-xs md:text-sm text-cyan-400/70 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Explorez mon univers technologique
        </motion.p>
        
        {/* Decorative elements - cachés sur mobile */}
        <div className="hidden md:block">
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
        </div>
      </motion.div>
    </div>
  );
};

export default MainMenu;
