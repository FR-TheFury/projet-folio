
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

interface MainMenuProps {
  onOpenModal: (modalType: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onOpenModal }) => {
  const menuItems = [
    // 3 boutons à gauche
    { id: 'projects', label: 'Projets', position: 'top-4 left-4 md:top-12 md:left-12', icon: '🚀' },
    { id: 'experience', label: 'Expériences', position: 'top-1/2 left-4 -translate-y-1/2 md:left-12', icon: '🎓' },
    { id: 'about', label: 'Moi et mon Parcours', position: 'bottom-4 left-4 md:bottom-12 md:left-12', icon: '👨‍💻' },
    
    // 3 boutons à droite
    { id: 'skills', label: 'Compétences', position: 'top-4 right-4 md:top-12 md:right-12', icon: '⚡' },
    { id: 'certification', label: 'Certification', position: 'top-1/2 right-4 -translate-y-1/2 md:right-12', icon: '🏆' },
    { id: 'contact', label: 'Contact', position: 'bottom-4 right-4 md:bottom-12 md:right-12', icon: '📡' },
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
      
      {/* Contenu central parfaitement centré avec contour */}
      <motion.div 
        className="text-center z-10 px-4 w-full max-w-4xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Contour avec fond semi-transparent */}
        <div className="relative bg-black/60 backdrop-blur-md border border-cyan-400/60 rounded-2xl p-6 md:p-12">
          {/* Corner accents pour le contour principal */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-cyan-400/80"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-cyan-400/80"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-400/80"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-cyan-400/80"></div>

          {/* Nom principal */}
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-8 font-mono tracking-wider drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
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
            <p className="text-base sm:text-lg md:text-2xl text-gray-100 leading-relaxed font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
              Développeur Full Stack / Web
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 font-medium drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
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
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-cyan-400/60 bg-black/60 rounded-lg hover:bg-cyan-400/20 transition-colors text-gray-100 hover:text-cyan-200 text-sm md:text-base font-semibold backdrop-blur-sm"
            >
              <Mail size={14} className="md:w-4 md:h-4" />
              Email
            </a>
            <a
              href="https://linkedin.com/in/teo-debay"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-purple-400/60 bg-black/60 rounded-lg hover:bg-purple-400/20 transition-colors text-gray-100 hover:text-purple-200 text-sm md:text-base font-semibold backdrop-blur-sm"
            >
              <Linkedin size={14} className="md:w-4 md:h-4" />
              LinkedIn
            </a>
          </motion.div>

          {/* Menu mobile */}
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
                className="flex items-center gap-1 px-3 py-2 bg-black/70 backdrop-blur-md border border-cyan-400/40 rounded-lg text-gray-100 hover:text-cyan-200 hover:border-cyan-300 transition-all duration-300 text-xs font-semibold"
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Message d'invitation */}
          <motion.p
            className="text-xs md:text-sm text-cyan-200/80 mt-6 font-medium drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Explorez mon univers technologique
          </motion.p>
        </div>
        
        {/* Decorative elements - 2 carrés en diagonal plus proches du titre */}
        <div className="hidden md:block">
          <motion.div 
            className="absolute -top-6 -left-8 w-16 h-16 border-2 border-cyan-400/60 rotate-45"
            animate={{ 
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-8 w-16 h-16 border-2 border-pink-400/60 rotate-45"
            animate={{ 
              rotate: [45, -135, 45],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MainMenu;
