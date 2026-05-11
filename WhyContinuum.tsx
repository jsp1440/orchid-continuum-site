import React from 'react';
import { Layers, Network, BookOpen, Sprout } from 'lucide-react';

/**
 * Section 2 — Why the Continuum Exists.
 *
 * The emotional & intellectual case for the platform. Keeps the canonical
 * line "Knowledge fragments, but biodiversity does not." Stripped of
 * forms or CTAs — this section is purely narrative so it carries weight.
 *
 * The four cards translate the abstract problem of "fragmented orchid
 * knowledge" into four concrete fractures the Continuum reconnects.
 */
const fractures = [
  {
    icon: BookOpen,
    title: 'Knowledge is scattered',
    body: 'Herbaria, monographs, field notes, and image archives live in disconnected silos — each holding a fragment of the same species.',
  },
  {
    icon: Layers,
    title: 'Conservation data is dispersed',
    body: 'Red List assessments, habitat layers, and field observations rarely meet in one operational view a steward can act on.',
  },
  {
    icon: Sprout,
    title: 'Cultivation is generalised',
    body: 'Genus-level culture sheets ignore the specific elevations, climates, and seasonality each species evolved within.',
  },
  {
    icon: Network,
    title: 'Ecology is disconnected',
    body: 'Pollinators, mycorrhizae, hosts, and habitats are studied separately — yet the orchid is the relationship between them.',
  },
];

const WhyContinuum: React.FC = () => {
  return (
    <section
      id="why"
      className="relative py-32 bg-[#1a3a2e] text-white overflow-hidden border-t border-white/5"
    >
      {/* Atmospheric bloom */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.3em] uppercase text-emerald-200/80 mb-6">
            Why the Continuum Exists
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] tracking-tight">
            Knowledge fragments,<br />
            <span className="italic text-emerald-200/95">but biodiversity does not.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/75 mt-8 leading-relaxed font-light">
            Orchidaceae is one of the largest, most ecologically intricate plant families on
            Earth — and one of the most fragmented in human knowledge. The Orchid Continuum
            exists to reconnect what has been scattered across herbaria, field notebooks,
            monographs, and living collections, into a single living system the planet can
            rely on.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden mt-16">
          {fractures.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[#1a3a2e] p-7">
                <div className="w-10 h-10 rounded-lg bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center mb-5">
                  <Icon className="h-4 w-4 text-emerald-200" />
                </div>
                <div className="font-serif text-xl text-white mb-2 leading-snug">{f.title}</div>
                <p className="text-sm text-white/65 leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-emerald-200/70 italic mt-10 max-w-2xl mx-auto">
          The Continuum is not a database. It is the connective tissue between
          observation, ecology, cultivation, and conservation.
        </p>
      </div>
    </section>
  );
};

export default WhyContinuum;
