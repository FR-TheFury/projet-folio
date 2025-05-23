
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User, Phone, Mail, Linkedin } from 'lucide-react';

const WelcomeContent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <motion.div
        className="text-center space-y-8 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Nom principal */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-mono tracking-wider"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          TÉO DEBAY
        </motion.h1>

        {/* Slogan */}
        <motion.p
          className="text-xl md:text-2xl text-cyan-100 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Développeur Full Stack / Web Designer / Humain
        </motion.p>

        <motion.p
          className="text-lg text-cyan-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Sérieux • Volontaire • Motivé • Curieux
        </motion.p>

        {/* Informations personnelles */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-cyan-200">
            <Calendar size={18} />
            <span>08/05/2004</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-cyan-200">
            <User size={18} />
            <span>Célibataire, Permis B</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-cyan-200">
            <MapPin size={18} />
            <span>Ham-en-Artois, 62190</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-cyan-200">
            <Phone size={18} />
            <a href="tel:0786422377" className="hover:text-white transition-colors">
              07.86.42.23.77
            </a>
          </div>
        </motion.div>

        {/* Liens de contact */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <a
            href="mailto:teodebaysio@gmail.com"
            className="flex items-center gap-2 px-4 py-2 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-colors text-cyan-300"
          >
            <Mail size={16} />
            Email
          </a>
          <a
            href="https://linkedin.com/in/teo-debay"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-purple-400/50 rounded-lg hover:bg-purple-400/10 transition-colors text-purple-300"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>

        {/* Message d'invitation */}
        <motion.p
          className="text-sm text-cyan-400/70 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Explorez mon univers technologique
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeContent;
