
import React from 'react';
import { motion } from 'framer-motion';

interface MainMenuProps {
  onOpenModal: (modalType: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onOpenModal }) => {
  const menuItems = [
    { id: 'projects', label: 'Projets', position: 'top-8 left-8' },
    { id: 'experience', label: 'Stage & BTS', position: 'top-8 right-8' },
    { id: 'about', label: 'À propos', position: 'bottom-8 left-8' },
    { id: 'contact', label: 'Contact', position: 'bottom-8 right-8' },
    { id: 'rss', label: 'Flux RSS', position: 'top-1/2 left-8 -translate-y-1/2' },
    { id: 'certification', label: 'Certification', position: 'top-1/2 right-8 -translate-y-1/2' },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <motion.button
          key={item.id}
          className={`fixed nav-button z-10 ${item.position}`}
          onClick={() => onOpenModal(item.id)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 1.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.button>
      ))}
      
      {/* Central Logo/Name */}
      <motion.div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          TÉO DEBAY
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Développeur Web Full-Stack
        </motion.p>
        <motion.p 
          className="text-lg text-blue-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          Passionné d'Espace & Technologies
        </motion.p>
      </motion.div>
    </>
  );
};

export default MainMenu;
