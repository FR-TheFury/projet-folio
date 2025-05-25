
import React, { useState } from 'react';
import { X, Heart, MapPin, Calendar, User, Phone, FileText, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PDFViewer from '../PDFViewer';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [showPDF, setShowPDF] = useState(false);

  const personalInfo = [
    { icon: Calendar, label: "Date de naissance", value: "08/05/2004" },
    { icon: User, label: "Statut", value: "Célibataire, Permis B" },
    { icon: MapPin, label: "Localisation", value: "Ham-en-Artois, 62190" },
    { icon: Phone, label: "Téléphone", value: "07.86.42.23.77" }
  ];

  const education = [
    {
      title: "Mastère Développeur Fullstack",
      school: "EPSI Arras",
      year: "2025-2027",
      status: "À venir",
      statusColor: "bg-blue-500/20 text-blue-300"
    },
    {
      title: "Bachelor Alternance DevOps Dev IA et Data Science",
      school: "EPSI Arras",
      year: "2024-2025",
      status: "En cours",
      statusColor: "bg-green-500/20 text-green-300"
    },
    {
      title: "BTS SIO option SLAM",
      school: "Lycée André Malraux Béthune",
      year: "2022-2024",
      status: "Obtenu",
      statusColor: "bg-cyan-500/20 text-cyan-300"
    },
    {
      title: "Baccalauréat Technologique STI2D",
      school: "Lycée Ozanam Lille",
      year: "2020-2022",
      status: "Obtenu",
      statusColor: "bg-cyan-500/20 text-cyan-300"
    },
    {
      title: "Brevet des Collèges",
      school: "Saint Marie Pérenchies",
      year: "2018",
      status: "Obtenu",
      statusColor: "bg-cyan-500/20 text-cyan-300"
    }
  ];

  const interests = [
    { icon: Heart, name: "Modélisation 3D", details: "Unity, Blender, Sketchup, SolidWorks" },
    { icon: Heart, name: "Jeux vidéo", details: "Passion gaming" },
    { icon: Heart, name: "Musique", details: "Écoute et création" },
    { icon: Heart, name: "Voyages", details: "Grèce, Italie, Japon" }
  ];

  const sports = [
    "Natation", "Airsoft", "Golf", "Tennis", "Plongée", "Équitation", "Autre"
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
            className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto custom-scrollbar"
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
                {/* Header avec titre et bouton CV - amélioration mobile */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-mono">
                    Moi et mon Parcours
                  </h2>
                  <button
                    onClick={() => setShowPDF(true)}
                    className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold"
                  >
                    <FileText size={20} />
                    Voir mon CV
                  </button>
                </div>
                
                <div className="space-y-8 text-cyan-100">
                  <p className="text-lg leading-relaxed">
                    Passionné par le développement web, je travaille principalement avec React et développe 
                    des projets personnels innovants. J'ai aussi de l'expérience avec Prestashop et d'autres 
                    technologies web modernes.
                  </p>
                  
                  {/* Parcours scolaire */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                      <GraduationCap size={24} />
                      Parcours Scolaire
                    </h3>
                    <div className="space-y-4">
                      {education.map((edu, index) => (
                        <motion.div
                          key={edu.title}
                          className="p-6 border border-cyan-400/30 rounded-lg bg-black/30 hover:bg-black/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-cyan-300 mb-1">{edu.title}</h4>
                              <p className="text-purple-300 font-medium">{edu.school}</p>
                              <p className="text-cyan-100 text-sm">{edu.year}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs rounded-full ${edu.statusColor}`}>
                              {edu.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Informations personnelles */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-300">Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {personalInfo.map((info, index) => (
                        <motion.div
                          key={info.label}
                          className="flex items-center gap-4 p-4 border border-cyan-400/30 rounded-lg bg-black/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="p-2 bg-cyan-400/20 rounded-lg">
                            <info.icon className="text-cyan-300" size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-cyan-300 font-medium">{info.label}</p>
                            <p className="text-cyan-100">{info.value}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Centres d'intérêt */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
                      <Heart size={20} />
                      Centres d'intérêt
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {interests.map((interest, index) => (
                        <motion.div
                          key={interest.name}
                          className="p-4 border border-purple-400/30 rounded-lg bg-black/20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <interest.icon className="text-purple-300" size={20} />
                            <h4 className="text-purple-300 font-bold">{interest.name}</h4>
                          </div>
                          <p className="text-sm text-cyan-100">{interest.details}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Sports */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-cyan-300">Sports pratiqués</h3>
                    <div className="flex flex-wrap gap-2">
                      {sports.map((sport) => (
                        <span key={sport} className="px-3 py-1 text-sm bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-400/30">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PDF Viewer Modal */}
          {showPDF && (
            <PDFViewer
              isOpen={showPDF}
              onClose={() => setShowPDF(false)}
              pdfUrl="/assets/cv.pdf"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
