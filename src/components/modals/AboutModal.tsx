
import React, { useState } from 'react';
import { X, Heart, MapPin, Calendar, User, Phone, FileText, GraduationCap, Music } from 'lucide-react';
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
      status: "En cours",
      statusColor: "bg-green-500/20 text-green-300"
    },
    {
      title: "Bachelor Alternance DevOps Dev IA et Data Science",
      school: "EPSI Arras",
      year: "2024-2025",
      status: "Obtenu",
      statusColor: "bg-cyan-500/20 text-cyan-300"
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

  const musicLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@Himely_pup",
      color: "hover:text-red-500",
      bgColor: "hover:bg-red-500/20",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/fr/artist/328787671",
      color: "hover:text-orange-500",
      bgColor: "hover:bg-orange-500/20",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.81 8.23h2.14v1.67h-2.14V8.23zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm-2.81-8.84h2.14v1.67h-2.14V8.23zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm-2.81-8.84h2.14v1.67h-2.14V8.23zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm-2.81-6.63h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm0 2.21h2.14v1.67h-2.14v-1.67zm-2.81-6.63h2.14v1.67H7.35v-1.67zm0 2.21h2.14v1.67H7.35v-1.67zm0 2.21h2.14v1.67H7.35v-1.67zm0 2.21h2.14v1.67H7.35v-1.67zm-2.81-4.42h2.14v1.67H4.54v-1.67zm0 2.21h2.14v1.67H4.54v-1.67zm0 2.21h2.14v1.67H4.54v-1.67zm-2.81-2.21h2.14v1.67H1.73v-1.67zm0 2.21h2.14v1.67H1.73v-1.67z"/>
        </svg>
      )
    },
    {
      name: "SoundCloud",
      url: "https://soundcloud.com/himely_pup",
      color: "hover:text-orange-400",
      bgColor: "hover:bg-orange-400/20",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.104.101.104s.094-.046.101-.104l.258-2.105-.258-2.154c-.007-.054-.05-.1-.101-.1zm1.49.409c-.075 0-.139.067-.149.148l-.203 1.745.203 1.692c.01.081.074.148.149.148s.139-.067.149-.148l.229-1.692-.229-1.745c-.01-.081-.074-.148-.149-.148zm1.49.622c-.075 0-.139.063-.149.141l-.178 1.123.178 1.067c.01.078.074.141.149.141s.139-.063.149-.141l.203-1.067-.203-1.123c-.01-.078-.074-.141-.149-.141zm1.49.151c-.075 0-.139.067-.149.148l-.15.972.15.915c.01.081.074.148.149.148s.139-.067.149-.148l.174-.915-.174-.972c-.01-.081-.074-.148-.149-.148zm1.49.326c-.075 0-.139.063-.149.141l-.124.646.124.612c.01.078.074.141.149.141s.139-.063.149-.141l.145-.612-.145-.646c-.01-.078-.074-.141-.149-.141zm1.49.235c-.075 0-.139.067-.149.148l-.099.411.099.378c.01.081.074.148.149.148s.139-.067.149-.148l.115-.378-.115-.411c-.01-.081-.074-.148-.149-.148zm1.49.326c-.075 0-.139.063-.149.141l-.071.085.071.07c.01.078.074.141.149.141s.139-.063.149-.141l.082-.07-.082-.085c-.01-.078-.074-.141-.149-.141zm1.49 0c-.075 0-.139.063-.149.141l-.071.085.071.07c.01.078.074.141.149.141s.139-.063.149-.141l.082-.07-.082-.085c-.01-.078-.074-.141-.149-.141zm9.671-1.89c-.825 0-1.628.306-2.235.852-.05.047-.067.12-.04.185.025.064.083.109.154.118l.72.09c.075.01.15-.019.194-.078.316-.421.805-.668 1.325-.668.943 0 1.709.766 1.709 1.709v.591c0 .082.067.149.149.149h2.832c.943 0 1.709.766 1.709 1.709s-.766 1.709-1.709 1.709H9.5c-.082 0-.149.067-.149.149v.591c0 .082.067.149.149.149h12.299c1.404 0 2.542-1.138 2.542-2.542s-1.138-2.542-2.542-2.542c-.354 0-.693.073-1.008.205-.05-.825-.766-1.464-1.616-1.464z"/>
        </svg>
      )
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-fr/artist/0Lms7v1qvEfqjLRGMCJUuY?si=dp8YHuQ1SBym95YX1ihknA",
      color: "hover:text-green-500",
      bgColor: "hover:bg-green-500/20",
      svg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      )
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

                  {/* Section Artiste */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-purple-300 flex items-center gap-2">
                      <Music size={24} />
                      Artiste
                    </h3>
                    <p className="text-cyan-100">
                      Découvrez ma musique sur toutes les plateformes de streaming :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {musicLinks.map((link, index) => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-4 p-4 border border-purple-400/30 rounded-lg bg-black/20 transition-all duration-300 ${link.color} ${link.bgColor}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="p-2 bg-purple-400/20 rounded-lg">
                            {link.svg}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-purple-300 font-bold">{link.name}</h4>
                            <p className="text-sm text-cyan-100">@Himely_pup</p>
                          </div>
                        </motion.a>
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
