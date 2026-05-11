import React, { useState } from 'react';
import { Menu, X, Leaf, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

/**
 * Top navigation for the Orchid Continuum platform shell.
 *
 * The original twelve top-level destinations remain visible inline. The
 * "More" trigger now opens a grouped megamenu that surfaces the new
 * audience-aware hubs (Ecosystems, Conservation Hub, Orchid University,
 * Classroom, Societies) without flattening the primary nav.
 *
 * Mobile collapses every destination into a single drawer, grouped by
 * the same headings used in the megamenu.
 */

type Linkish = { label: string; route: string; description?: string };

const PRIMARY: Linkish[] = [
  { label: 'Home', route: '/' },
  { label: 'Explore', route: '/explore' },
  { label: 'Species', route: '/species' },
  { label: 'Atlas', route: '/atlas' },
  { label: 'My Collection', route: '/collection' },
  { label: 'OACS', route: '/oacs' },
  { label: 'Orchid Zoo', route: '/zoo' },
  { label: 'Widgets', route: '/widgets' },
];

interface MoreGroup {
  title: string;
  items: Linkish[];
}

const MORE_GROUPS: MoreGroup[] = [
  {
    title: 'Communities',
    items: [
      {
        label: 'Ecosystems',
        route: '/ecosystems',
        description: 'Seven communities of practice',
      },
      {
        label: 'Conservation Hub',
        route: '/conservation',
        description: 'Organizations & project workspaces',
      },
      {
        label: 'Orchid Societies',
        route: '/societies',
        description: 'Local chapters & member tools',
      },
    ],
  },
  {
    title: 'Learning',
    items: [
      {
        label: 'Orchid University',
        route: '/university',
        description: 'Guided scientific inquiry',
      },
      {
        label: 'Classroom',
        route: '/classroom',
        description: 'Teacher dashboards',
      },
      {
        label: 'Education',
        route: '/education',
        description: 'BloomBot · glossary · physiology',
      },
    ],
  },
  {
    title: 'Research & support',
    items: [
      {
        label: 'Research Center',
        route: '/research',
        description: 'Queries · traits · networks',
      },
      {
        label: 'Partners',
        route: '/partners',
        description: 'Advisors & institutions',
      },
      {
        label: 'Get Involved',
        route: '/get-involved',
        description: 'Volunteer · donate · join',
      },
    ],
  },
];

const ALL_SECONDARY: Linkish[] = MORE_GROUPS.flatMap(g => g.items);
const ALL_LINKS = [...PRIMARY, ...ALL_SECONDARY];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (l: Linkish) => {
    navigate(l.route);
    setOpen(false);
    setMoreOpen(false);
  };

  const isActive = (route: string) => {
    if (route === '/') return location.pathname === '/';
    return location.pathname.startsWith(route);
  };

  const anySecondaryActive = ALL_SECONDARY.some(s => isActive(s.route));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0d1f17]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white shrink-0"
          onClick={() => setOpen(false)}
        >
          <Leaf className="h-5 w-5 text-emerald-300" />
          <span className="font-serif text-lg tracking-wide">
            Orchid Continuum
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {PRIMARY.map(l => (
            <button
              key={l.route}
              onClick={() => go(l)}
              className={
                'text-[13px] tracking-wide transition-colors whitespace-nowrap ' +
                (isActive(l.route)
                  ? 'text-emerald-200'
                  : 'text-white/80 hover:text-emerald-200')
              }
            >
              {l.label}
            </button>
          ))}

          {/* Megamenu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreOpen(o => !o)}
              className={
                'inline-flex items-center gap-1 text-[13px] tracking-wide transition-colors ' +
                (anySecondaryActive
                  ? 'text-emerald-200'
                  : 'text-white/80 hover:text-emerald-200')
              }
            >
              More
              <ChevronDown
                className={
                  'h-3.5 w-3.5 transition-transform ' +
                  (moreOpen ? 'rotate-180' : '')
                }
              />
            </button>

            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-[640px] max-w-[calc(100vw-3rem)] rounded-2xl border border-white/10 bg-[#0a1812]/95 backdrop-blur-md shadow-2xl p-6">
                <div className="grid grid-cols-3 gap-6">
                  {MORE_GROUPS.map(g => (
                    <div key={g.title}>
                      <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-300/80 mb-3">
                        {g.title}
                      </div>
                      <ul className="space-y-1">
                        {g.items.map(it => (
                          <li key={it.route}>
                            <button
                              onClick={() => go(it)}
                              className={
                                'block w-full text-left rounded-lg px-3 py-2 transition-colors ' +
                                (isActive(it.route)
                                  ? 'bg-white/[0.05] text-emerald-200'
                                  : 'text-white/85 hover:bg-white/[0.04] hover:text-emerald-200')
                              }
                            >
                              <div className="text-[13px] font-medium">
                                {it.label}
                              </div>
                              {it.description && (
                                <div className="text-[11px] text-white/50 mt-0.5 leading-snug">
                                  {it.description}
                                </div>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/get-involved')}
            className="text-sm px-4 py-2 rounded-full bg-emerald-300/90 text-[#0d1f17] hover:bg-emerald-200 transition-colors font-medium whitespace-nowrap"
          >
            Join
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a1812]/97 border-t border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-6 py-5 flex flex-col gap-1">
            {PRIMARY.map(l => (
              <button
                key={l.route}
                onClick={() => go(l)}
                className={
                  'text-left py-2.5 transition-colors ' +
                  (isActive(l.route)
                    ? 'text-emerald-200'
                    : 'text-white/80 hover:text-emerald-200')
                }
              >
                {l.label}
              </button>
            ))}

            {MORE_GROUPS.map(g => (
              <div key={g.title} className="mt-4">
                <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-300/70 mb-2">
                  {g.title}
                </div>
                {g.items.map(it => (
                  <button
                    key={it.route}
                    onClick={() => go(it)}
                    className={
                      'block w-full text-left py-2 transition-colors ' +
                      (isActive(it.route)
                        ? 'text-emerald-200'
                        : 'text-white/80 hover:text-emerald-200')
                    }
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            ))}

            <button
              onClick={() => go({ label: 'Join', route: '/get-involved' })}
              className="mt-5 text-sm px-4 py-2.5 rounded-full bg-emerald-300/90 text-[#0d1f17] font-medium"
            >
              Join the Continuum
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
