import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { speciesApi, type ApiMetrics } from '@/lib/api';

const HERO_IMG = 'https://d64gsuwffb70l.cloudfront.net/69fa6c8ae577acf1894f7208_1778019741926_7edb40b7.png';

/**
 * Cinematic homepage hero.
 *
 * Editorial framing: the Orchid Continuum is positioned as a living
 * biodiversity intelligence platform — not a database, not a hobby site.
 *
 * The bottom strip carries a small, dignified live-metrics readout so
 * visitors immediately sense the platform is operational and data-driven.
 * The richer museum-quality dashboard lives in the next section
 * (LivePlatformMetrics).
 */
const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<ApiMetrics | null>(null);
  const [metricsState, setMetricsState] = useState<'loading' | 'live' | 'fallback'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    speciesApi.metrics(controller.signal).then(r => {
      if (controller.signal.aborted) return;
      if (r.data) {
        setMetrics(r.data);
        setMetricsState('live');
      } else {
        setMetricsState('fallback');
      }
    });
    return () => controller.abort();
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const fmt = (n?: number) => (n == null ? '—' : n.toLocaleString());
  const stats = [
    { v: fmt(metrics?.species_count), l: 'Species profiles' },
    { v: fmt(metrics?.occurrence_count), l: 'Documented sightings' },
    { v: fmt(metrics?.image_count), l: 'Indexed photographs' },
    { v: fmt(metrics?.countries_count), l: 'Countries observed' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cinematic background — habitat photography, deep gradient wash, faint
          telemetry particles & atlas lines for an "observatory" feel. */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Cloud forest with epiphytic orchids" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17]/85 via-[#0d1f17]/55 to-[#0d1f17]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f17]/80 via-transparent to-transparent" />
        {/* Faint atlas grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="atlas-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#a7f3d0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#atlas-grid)" />
        </svg>
        {/* Telemetry particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-emerald-200/60"
              style={{
                top: `${(i * 53) % 100}%`,
                left: `${(i * 71) % 100}%`,
                opacity: 0.3 + ((i * 7) % 5) / 10,
                animation: `float ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
              }}
            />
          ))}
        </div>
        <style>{`@keyframes float { from { transform: translateY(0px) } to { transform: translateY(-14px) } }`}</style>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-300/30 bg-emerald-300/5 text-emerald-200 text-xs tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Biodiversity Intelligence Platform
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-8">
            A living biodiversity<br />
            intelligence platform<br />
            for the world's <span className="italic text-emerald-200/95">orchids</span>.
          </h1>

          <p className="text-base sm:text-lg text-white/75 max-w-2xl mb-10 leading-relaxed">
            Connecting species, habitats, ecology, cultivation, conservation, telemetry,
            literature, and living collections through a unified orchid intelligence system.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('#systems')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-300 text-[#0d1f17] hover:bg-emerald-200 transition-all font-medium"
            >
              <Compass className="h-4 w-4" />
              <span>Explore the Continuum</span>
              <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
            <button
              onClick={() => navigate('/conservation')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              <Building2 className="h-4 w-4" />
              <span>For Conservation Organizations</span>
              <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          </div>
        </div>

        {/* Live metrics strip — small, dignified. The full museum-quality
            dashboard lives in the LivePlatformMetrics section below. */}
        <div className="mt-20 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
            {stats.map(s => (
              <div key={s.l} className="bg-[#0d1f17]/80 px-6 py-5">
                <div className="font-serif text-2xl md:text-3xl text-emerald-100 tabular-nums">
                  {s.v}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mt-3">
            {metricsState === 'live' && metrics?.last_updated
              ? `Live · synced ${new Date(metrics.last_updated).toLocaleString()}`
              : metricsState === 'live'
              ? 'Live · streaming from the Continuum API'
              : metricsState === 'loading'
              ? 'Connecting to the Continuum API…'
              : 'Metrics currently refreshing.'}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
