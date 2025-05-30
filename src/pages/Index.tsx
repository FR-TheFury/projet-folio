
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import RetroNeonBackground from '@/components/RetroNeonBackground';
import MainMenu from '@/components/MainMenu';
import ProjectsModal from '@/components/modals/ProjectsModal';
import AboutModal from '@/components/modals/AboutModal';
import ContactModal from '@/components/modals/ContactModal';
import ExperienceModal from '@/components/modals/ExperienceModal';
import CertificationModal from '@/components/modals/CertificationModal';
import SkillsModal from '@/components/modals/SkillsModal';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    // Disable scrolling when modal is open
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  console.log("Index page rendering with RetroNeonBackground");

  return (
    <div className="min-h-screen relative">
      {/* Fond Three.js - doit être le premier élément */}
      <RetroNeonBackground />
      
      <MainMenu onOpenModal={openModal} />

      <AnimatePresence>
        {activeModal === 'projects' && (
          <ProjectsModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === 'skills' && (
          <SkillsModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === 'about' && (
          <AboutModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === 'contact' && (
          <ContactModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === 'experience' && (
          <ExperienceModal isOpen={true} onClose={closeModal} />
        )}
        {activeModal === 'certification' && (
          <CertificationModal isOpen={true} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
