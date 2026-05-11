import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Microscope,
  PawPrint,
  Sprout,
  Globe2,
  BookOpen,
  ShieldCheck,
  KeySquare,
  Library,
  Thermometer,
  FlaskConical,
  ArrowUpRight,
} from 'lucide-react';

/**
 * Section 4 — Platform Systems.
 *
 * Concise modular cards replacing the previous sprawl. Ten interoperable
 * systems are presented as a single unified surface — each card is a
 * tile in the larger orchid intelligence picture rather than an
 * isolated product page.
 *
 * Module names that act as proper nouns (OACS, TraitBank, Atlas, etc.)
 * are introduced through human-readable framing first; the acronym is
 * exposed in a small "tag" beneath the title.
 */
type SystemModule = {
  name: string;
  acronym?: string;
  tag: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  to: { route?: string; anchor?: string };
};

const systems: SystemModule[] = [
  {
    name: 'Species Intelligence',
    tag: 'Living catalogue · taxonomy · ecology',
    body: 'Structured profiles for every recognised orchid species — combining nomenclature, imagery, ecology, and evolutionary context into one canonical record.',
    icon: Microscope,
    to: { anchor: '#species' },
  },
  {
    name: 'Orchid Zoo',
    tag: 'Citizen science · reviewer-led identification',
    body: 'A reviewer-mediated participation network where the public helps validate observations and surface knowledge gaps in the living orchid record.',
    icon: PawPrint,
    to: { route: '/zoo' },
  },
  {
    name: 'Adaptive Cultivation Intelligence',
    acronym: 'OACS',
    tag: 'Species-level cultivation guidance',
    body: 'Cultivation guidance informed by the environments each species evolved within — habitat, climate, elevation, and seasonality, compared against your grow space.',
    icon: Sprout,
    to: { anchor: '#oacs' },
  },
  {
    name: 'Atlas',
    tag: 'Geospatial layer · biodiversity hotspots',
    body: 'Global distribution, biodiversity hotspots, and ecological habitat layers across six continents — composed from verified sightings and habitat envelopes.',
    icon: Globe2,
    to: { route: '/atlas' },
  },
  {
    name: 'Trait & Literature Intelligence',
    acronym: 'TraitBank',
    tag: 'Morphology · monographs · references',
    body: 'Structured orchid characteristics linked to the published literature — so every measurement, photograph, and claim is traceable to a source.',
    icon: BookOpen,
    to: { anchor: '#metrics' },
  },
  {
    name: 'Conservation Intelligence',
    tag: 'Red List signals · habitat risk · stewardship',
    body: 'Conservation status, threat trajectories, and stewardship priorities woven into the same surface researchers and growers already use.',
    icon: ShieldCheck,
    to: { route: '/conservation' },
  },
  {
    name: 'Matrix Identification Keys',
    tag: 'Interactive determination',
    body: 'Polythetic, multi-character keys that let researchers, growers, and students converge on a species identification through observable traits.',
    icon: KeySquare,
    to: { route: '/explore' },
  },
  {
    name: 'Living Collections',
    tag: 'Personal & institutional collections',
    body: 'Connect a private greenhouse, a society collection, or an institutional living collection to the broader Continuum knowledge graph.',
    icon: Library,
    to: { route: '/my-collection' },
  },
  {
    name: 'Environmental Monitoring',
    tag: 'Telemetry · habitat envelopes · microclimate',
    body: 'Greenhouse and field telemetry — temperature, humidity, light, and VPD — compared against the natural envelopes orchids evolved within.',
    icon: Thermometer,
    to: { route: '/oacs' },
  },
  {
    name: 'Research & Collaboration Tools',
    tag: 'Querying · projects · exports',
    body: 'Advanced querying, project workspaces, ecological networks, and institutional exports for researchers and conservation organisations.',
    icon: FlaskConical,
    to: { route: '/research' },
  },
];

const PlatformSystems: React.FC = () => {
  const navigate = useNavigate();
  const open = (m: SystemModule) => {
    if (m.to.route) navigate(m.to.route);
    else if (m.to.anchor)
      document.querySelector(m.to.anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="systems" className="relative py-28 bg-[#f4f1e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.25em] uppercase text-emerald-800/70 mb-4">
              Platform Systems
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a3a2e] leading-tight">
              Ten interoperable systems,<br />
              <span className="italic">one orchid intelligence</span>.
            </h2>
          </div>
          <p className="text-[#4a4238]/80 max-w-md leading-relaxed">
            Each system stands on its own — and each one strengthens the others.
            Together they form a continuous flow from observation, through
            ecological interpretation, to conservation action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#1a3a2e]/15 border border-[#1a3a2e]/15 rounded-2xl overflow-hidden">
          {systems.map(m => {
            const Icon = m.icon;
            return (
              <button
                key={m.name}
                onClick={() => open(m)}
                className="group bg-[#f4f1e8] hover:bg-white text-left p-7 transition-all duration-500 relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-5 right-5 text-[#1a3a2e]/40 group-hover:text-emerald-700 group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#1a3a2e]/5 border border-[#1a3a2e]/10 flex items-center justify-center mb-5 group-hover:bg-[#1a3a2e] group-hover:border-[#1a3a2e] transition-colors">
                  <Icon className="h-4 w-4 text-[#1a3a2e] group-hover:text-emerald-200 transition-colors" />
                </div>
                <h3 className="font-serif text-xl text-[#1a3a2e] mb-1 leading-snug">
                  {m.name}
                  {m.acronym && (
                    <span className="ml-2 text-[10px] tracking-[0.2em] uppercase text-emerald-800/70 font-sans align-middle">
                      {m.acronym}
                    </span>
                  )}
                </h3>
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#4a4238]/60 mb-3">
                  {m.tag}
                </div>
                <p className="text-sm text-[#4a4238]/80 leading-relaxed">{m.body}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#1a3a2e] group-hover:text-emerald-800">
                  Learn more
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformSystems;
