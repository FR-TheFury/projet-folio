
import React from 'react';
import { motion } from 'framer-motion';

const WelcomeContent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <motion.div
        className="text-center space-y-6 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Slogan principal */}
        <motion.p
          className="text-xl md:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Développeur Full Stack / Web Designer / Humain
        </motion.p>

        <motion.p
          className="text-lg text-cyan-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Sérieux • Volontaire • Motivé • Curieux
        </motion.p>

        {/* Message d'invitation */}
        <motion.p
          className="text-sm text-cyan-400/70 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Explorez mon univers technologique
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeContent;
