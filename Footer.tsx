import React from 'react';
import { Leaf, Github, Twitter, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type Item = { label: string; route?: string; anchor?: string; external?: string };

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  const go = (it: Item) => {
    if (it.external) {
      window.open(it.external, '_blank', 'noopener,noreferrer');
      return;
    }
    if (it.route) {
      navigate(it.route);
      return;
    }
    if (it.anchor) {
      if (!onHome) {
        navigate('/' + it.anchor);
      } else {
        document
          .querySelector(it.anchor)
          ?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const cols: { title: string; items: Item[] }[] = [
    {
      title: 'Discover',
      items: [
        { label: 'Home', route: '/' },
        { label: 'Explore', route: '/explore' },
        { label: 'Species', route: '/species' },
        { label: 'Atlas', route: '/atlas' },
      ],
    },
    {
      title: 'Modules',
      items: [
        { label: 'My Collection', route: '/collection' },
        { label: 'OACS', route: '/oacs' },
        { label: 'Orchid Zoo', route: '/zoo' },
        { label: 'Widgets', route: '/widgets' },
      ],
    },
    {
      title: 'Communities',
      items: [
        { label: 'Ecosystems', route: '/ecosystems' },
        { label: 'Conservation Hub', route: '/conservation' },
        { label: 'Orchid Societies', route: '/societies' },
        { label: 'Partners', route: '/partners' },
      ],
    },
    {
      title: 'Learning & Research',
      items: [
        { label: 'Orchid University', route: '/university' },
        { label: 'Classroom', route: '/classroom' },
        { label: 'Education', route: '/education' },
        { label: 'Research Center', route: '/research' },
      ],
    },
  ];

  return (
    <footer className="bg-[#0d1f17] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2 text-emerald-200">
              <Leaf className="h-5 w-5" />
              <span className="font-serif text-xl tracking-wide">
                Orchid Continuum
              </span>
            </Link>
            <p className="text-sm text-white/60 mt-5 max-w-sm leading-relaxed">
              A global biodiversity intelligence and conservation platform
              connecting the science, ecology, and stewardship of Orchidaceae —
              one living catalogue, seven communities of practice.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Mail, label: 'Email' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go({ label, route: '/get-involved' })}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-emerald-300/60 hover:text-emerald-200 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <Link
              to="/get-involved"
              className="inline-block mt-6 text-sm px-4 py-2 rounded-full bg-emerald-300/90 text-[#0d1f17] hover:bg-emerald-200 transition-colors font-medium"
            >
              Join the Continuum
            </Link>
          </div>

          {cols.map(c => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-300/70 mb-5">
                {c.title}
              </div>
              <ul className="space-y-3">
                {c.items.map(it => (
                  <li key={it.label}>
                    <button
                      onClick={() => go(it)}
                      className="text-sm text-white/70 hover:text-emerald-200 transition-colors text-left"
                    >
                      {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Orchid Continuum. Open knowledge for
            living systems.
          </div>
          <div className="text-xs text-white/65">
            Orchid Continuum is fiscally sponsored by{' '}
            <span className="text-emerald-200 font-medium">EcoLogistics</span>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
