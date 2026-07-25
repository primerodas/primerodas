/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_UNITS } from './data/primeRodasData';
import { UnitInfo } from './types';
import { SiteAssetsProvider, useSiteAssets } from './context/SiteAssetsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesTicker } from './components/ServicesTicker';
import { About } from './components/About';
import { ServicesGrid } from './components/ServicesGrid';
import { HighlightBanner } from './components/HighlightBanner';
import { ProcessSection } from './components/ProcessSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { UnitsSection } from './components/UnitsSection';
import { ContactFormSection } from './components/ContactFormSection';
import { SocialSection } from './components/SocialSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { LegalModal } from './components/LegalModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminImageTerminalModal } from './components/AdminImageTerminalModal';

function MainApp() {
  const [localUnits, setLocalUnits] = useState<UnitInfo[]>(INITIAL_UNITS);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  
  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);

  const [prefilledService, setPrefilledService] = useState('Recuperação de rodas');
  const [prefilledUnitId, setPrefilledUnitId] = useState('mor-gouveia');

  const { isLoggedIn, serverUnits } = useSiteAssets();

  const units = serverUnits && serverUnits.length > 0 ? serverUnits : localUnits;

  const handleOpenAdminFlow = () => {
    if (isLoggedIn) {
      setIsTerminalModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsTerminalModalOpen(true);
  };

  const handleSelectServiceWhatsApp = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUnitWhatsApp = (unit: UnitInfo) => {
    setPrefilledUnitId(unit.id);
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsAppGeneral = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E30613] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Fixed Header */}
      <Header
        onOpenWhatsAppModal={handleOpenWhatsAppGeneral}
        onOpenAdminPanel={handleOpenAdminFlow}
        hasPendingFields={false}
      />

      {/* Main Page Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero
          onOpenConsultantModal={handleOpenWhatsAppGeneral}
        />

        {/* Services Marquee Ribbon */}
        <ServicesTicker />

        {/* About Section */}
        <About />

        {/* Services Grid with Filters */}
        <ServicesGrid
          onSelectServiceWhatsApp={handleSelectServiceWhatsApp}
        />

        {/* Highlight Banner */}
        <HighlightBanner
          onOpenEvaluationModal={handleOpenWhatsAppGeneral}
        />

        {/* Process Section */}
        <ProcessSection />

        {/* Interactive Before & After Comparison */}
        <BeforeAfterSection />

        {/* Stores / Units Section */}
        <UnitsSection
          units={units}
          onSelectUnitWhatsApp={handleSelectUnitWhatsApp}
        />

        {/* Contact Form & WhatsApp Direct */}
        <ContactFormSection
          units={units}
          prefilledService={prefilledService}
          prefilledUnitId={prefilledUnitId}
        />

        {/* Social Media Grid */}
        <SocialSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer with Discrete Admin Link */}
      <Footer
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
        onOpenAdmin={handleOpenAdminFlow}
      />

      {/* Floating Buttons Group */}
      <FloatingControls units={units} />

      {/* Admin Auth Modal (Master Setup or Login) */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccessLogin={handleAuthSuccess}
      />

      {/* Terminal / Painel de Gerenciamento de Fotos */}
      <AdminImageTerminalModal
        isOpen={isTerminalModalOpen}
        onClose={() => setIsTerminalModalOpen(false)}
        units={units}
        onSaveUnits={(updated) => setLocalUnits(updated)}
      />

      {/* Privacy Policy / Terms Modal */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <SiteAssetsProvider>
      <MainApp />
    </SiteAssetsProvider>
  );
}
