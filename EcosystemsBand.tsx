import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sprout,
  GraduationCap,
  Presentation,
  Microscope,
  Trees,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import RoleBadge, { type RoleKey } from './RoleBadge';

/**
 * EcosystemsBand
 * --------------
 * Homepage band that introduces the seven Orchid Continuum communities
 * of practice, then links into the dedicated /ecosystems page. Designed
 * to read as a single, coherent ecological commons rather than a SaaS
 * pricing grid.
 */

const items: {
  role: RoleKey;
  Icon: typeof Compass;
  label: string;
  blurb: string;
  route: string;
}[] = [
  {
    role: 'public',
    Icon: Compass,
    label: 'Public Explorer',
    blurb: 'Atlas, galleries, stories.',
    route: '/explore',
  },
  {
    role: 'grower',
    Icon: Sprout,
    label: 'Orchid Grower',
    blurb: 'Living collection & OACS.',
    route: '/collection',
  },
  {
    role: 'student',
    Icon: GraduationCap,
    label: 'Student',
    blurb: 'Guided scientific inquiry.',
    route: '/university',
  },
  {
    role: 'teacher',
    Icon: Presentation,
    label: 'Teacher',
    blurb: 'Classroom investigations.',
    route: '/classroom',
  },
  {
    role: 'researcher',
    Icon: Microscope,
    label: 'Researcher',
    blurb: 'Traits, networks, exports.',
    route: '/research',
  },
  {
    role: 'organization',
    Icon: Trees,
    label: 'Conservation',
    blurb: 'Project workspaces & protocols.',
    route: '/conservation',
  },
  {
    role: 'society',
    Icon: Users,
    label: 'Orchid Society',
    blurb: 'Events, members, judging.',
    route: '/societies',
  },
];

const EcosystemsBand: React.FC = () => {
  return (
    <section
      id="ecosystems"
      className="bg-[#0d1f17] text-white py-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-emerald-200/80 mb-4">
              Communities of practice
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05] max-w-3xl">
              One living platform,{' '}
              <span className="italic text-emerald-200/95">
                seven ways to belong
              </span>
            </h2>
            <p className="text-base text-white/70 mt-5 max-w-2xl leading-relaxed font-light">
              The Continuum is not built around a single user. It is built
              around the relationships between everyone who studies, grows,
              teaches, conserves, and celebrates orchids.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/ecosystems"
              className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-emerald-100 border border-emerald-300/30 hover:border-emerald-300/60 rounded-full px-5 py-2.5 transition-colors"
            >
              Explore all seven
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {items.map(it => (
            <Link
              key={it.role}
              to={it.route}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-emerald-300/30 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-emerald-200 mb-3 group-hover:text-emerald-100 transition-colors">
                <it.Icon className="h-4 w-4" />
              </div>
              <div className="font-serif text-base text-white leading-tight mb-1">
                {it.label}
              </div>
              <div className="text-[12px] text-white/60 leading-snug mb-3">
                {it.blurb}
              </div>
              <RoleBadge role={it.role} size="sm" withLabel={false} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemsBand;
