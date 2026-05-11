import React from 'react';
import Navbar from './orchid/Navbar';
import Hero from './orchid/Hero';
import WhyContinuum from './orchid/WhyContinuum';
import LivePlatformMetrics from './orchid/LivePlatformMetrics';
import PlatformSystems from './orchid/PlatformSystems';
import OACSReframe from './orchid/OACSReframe';
import EcosystemsBand from './orchid/EcosystemsBand';
import Dashboard from './orchid/Dashboard';
import SpeciesGrid from './orchid/SpeciesGrid';
import EcoNetwork from './orchid/EcoNetwork';
import ConservationPartners from './orchid/ConservationPartners';
import BiodiversityInfrastructure from './orchid/BiodiversityInfrastructure';
import Mission from './orchid/Mission';
import GetInvolved from './orchid/GetInvolved';
import Footer from './orchid/Footer';

/**
 * Homepage composition for the Orchid Continuum.
 *
 * The narrative arc (top → bottom):
 *
 *   1. Hero                       — A living biodiversity intelligence platform
 *   2. WhyContinuum               — Knowledge fragments, but biodiversity does not
 *   3. LivePlatformMetrics        — Operational, museum-quality scientific dashboard
 *   4. PlatformSystems            — Ten interoperable systems, one orchid intelligence
 *   5. OACSReframe                — Cultivation guidance read from the habitat itself
 *   6. EcosystemsBand             — Seven communities of practice
 *   7. Dashboard                  — Atlas overview & species intelligence preview
 *   8. SpeciesGrid                — Species Explorer (live API)
 *   9. EcoNetwork                 — Ecological interaction intelligence
 *  10. ConservationPartners       — Partner organisations & education
 *  11. BiodiversityInfrastructure — Institutional credibility · API-first architecture
 *  12. Mission                    — Field updates signup
 *  13. GetInvolved                — Pathways CTA
 *
 * Sections reorder the platform from "what is it?" → "why?" → "is it real?" →
 * "what does it do?" → "show me" → "how do I participate?" — keeping the
 * cinematic dark-observatory aesthetic intact throughout.
 */
const AppLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-[#0d1f17] antialiased"
      style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
    >
      <style>{`
        .font-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; font-weight: 500; letter-spacing: -0.01em; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <WhyContinuum />
        <LivePlatformMetrics />
        <PlatformSystems />
        <OACSReframe />
        <EcosystemsBand />
        <Dashboard />
        <SpeciesGrid />
        <EcoNetwork />
        <ConservationPartners />
        <BiodiversityInfrastructure />
        <Mission />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
