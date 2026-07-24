/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_UNITS } from './data/primeRodasData';
import { UnitInfo } from './types';
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
import { AdminPanelDrawer } from './components/AdminPanelDrawer';
import { LegalModal } from './components/LegalModal';

export default function App() {
  const [units, setUnits] = useState<UnitInfo[]>(INITIAL_UNITS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | null>(null);
  
  const [prefilledService, setPrefilledService] = useState('Recuperação de rodas');
  const [prefilledUnitId, setPrefilledUnitId] = useState('mor-gouveia');

  // Check if there are unconfirmed fields in units
  const hasPendingFields = units.some(
    (u) => !u.address || u.phone.includes('CONFIRMAR')
  );

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
        onOpenAdminPanel={() => setIsAdminOpen(true)}
        hasPendingFields={hasPendingFields}
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

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalType('privacy')}
        onOpenTerms={() => setLegalType('terms')}
      />

      {/* Floating Buttons Group */}
      <FloatingControls units={units} />

      {/* Admin Panel Drawer for Pending Fields */}
      <AdminPanelDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        units={units}
        onSaveUnits={(updated) => setUnits(updated)}
      />

      {/* Privacy Policy / Terms Modal */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

    </div>
  );
}
