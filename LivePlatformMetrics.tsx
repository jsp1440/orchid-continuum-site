import React, { useEffect, useState } from 'react';
import {
  Microscope,
  Image as ImageIcon,
  MapPin,
  BookOpen,
  Activity,
  CheckCircle2,
  Network,
  Building2,
  Users,
  Thermometer,
} from 'lucide-react';
import { speciesApi, type ApiMetrics } from '@/lib/api';

/**
 * Section 3 — Live Platform Metrics.
 *
 * Museum-quality scientific dashboard. The site previously felt
 * conceptual; this section adds operational credibility by foregrounding
 * the measurable surface of the platform.
 *
 * Metrics are sourced from /api/species/metrics. Fields the API has not
 * yet populated are rendered as a neutral em-dash with the label
 * "Coming online" — the platform is honest about what is wired up
 * without ever hiding what isn't.
 */
type MetricCard = {
  label: string;
  hint: string;
  value: string;
  status: 'live' | 'pending';
  icon: React.ComponentType<{ className?: string }>;
};

const fmt = (n?: number) => (n == null ? '—' : n.toLocaleString());

const LivePlatformMetrics: React.FC = () => {
  const [m, setM] = useState<ApiMetrics | null>(null);
  const [state, setState] = useState<'loading' | 'live' | 'fallback'>('loading');

  useEffect(() => {
    const c = new AbortController();
    speciesApi.metrics(c.signal).then(r => {
      if (c.signal.aborted) return;
      if (r.data) {
        setM(r.data);
        setState('live');
      } else {
        setState('fallback');
      }
    });
    return () => c.abort();
  }, []);

  // Cards that the metrics endpoint exposes today vs. cards reserved for
  // upstream services that come online incrementally (telemetry stream,
  // organizations registry, contributor graph). All ten render — the
  // "Coming online" status keeps the dashboard honest.
  const cards: MetricCard[] = [
    { label: 'Species profiles',         hint: 'Recognised taxa with structured records', value: fmt(m?.species_count),       status: 'live',    icon: Microscope },
    { label: 'Indexed photographs',      hint: 'Specimen, habitat, and field imagery',     value: fmt(m?.image_count),         status: 'live',    icon: ImageIcon },
    { label: 'Documented sightings',     hint: 'Verified spatial observations',            value: fmt(m?.occurrence_count),    status: 'live',    icon: MapPin },
    { label: 'Literature references',    hint: 'Monographs, papers, and floras',           value: '—',                         status: 'pending', icon: BookOpen },
    { label: 'Telemetry streams',        hint: 'Live greenhouse & field sensors',          value: '—',                         status: 'pending', icon: Activity },
    { label: 'Review queue',             hint: 'Identifications awaiting expert review',   value: '—',                         status: 'pending', icon: CheckCircle2 },
    { label: 'Ecological interactions',  hint: 'Pollinator, mycorrhizal & host links',     value: fmt(m?.pollinator_records),  status: m?.pollinator_records != null ? 'live' : 'pending', icon: Network },
    { label: 'Conservation organisations', hint: 'Institutional partners on the platform', value: '—',                       status: 'pending', icon: Building2 },
    { label: 'Active contributors',      hint: 'Researchers, growers & citizen scientists', value: '—',                        status: 'pending', icon: Users },
    { label: 'Greenhouse sensors online', hint: 'Devices currently reporting',             value: '—',                         status: 'pending', icon: Thermometer },
  ];

  return (
    <section
      id="metrics"
      className="relative py-28 bg-[#0d1f17] text-white border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.3em] uppercase text-emerald-200/70 mb-4">
              Live Platform Metrics
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              The Continuum, <span className="italic text-emerald-200/90">measured</span>.
            </h2>
          </div>
          <p className="text-white/70 max-w-md leading-relaxed">
            Operational signals from across the platform — species records, imagery, sightings,
            telemetry, review queues, and the institutions and people behind them.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {cards.map(c => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="bg-[#0d1f17] p-6 relative group hover:bg-[#102a20] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-emerald-200" />
                  </div>
                  <span
                    className={
                      'inline-flex items-center gap-1.5 text-[9px] tracking-[0.18em] uppercase px-1.5 py-0.5 rounded-full border ' +
                      (c.status === 'live'
                        ? 'border-emerald-300/40 text-emerald-200 bg-emerald-300/5'
                        : 'border-white/15 text-white/45 bg-white/5')
                    }
                  >
                    <span
                      className={
                        'w-1 h-1 rounded-full ' +
                        (c.status === 'live' ? 'bg-emerald-300 animate-pulse' : 'bg-white/40')
                      }
                    />
                    {c.status === 'live' ? 'Live' : 'Coming online'}
                  </span>
                </div>
                <div className="font-serif text-3xl md:text-4xl text-white tabular-nums leading-none">
                  {c.value}
                </div>
                <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70 mt-3">
                  {c.label}
                </div>
                <div className="text-[11px] text-white/45 mt-1.5 leading-snug">
                  {c.hint}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] tracking-[0.25em] uppercase">
          <div className="text-white/40">
            {state === 'live' && m?.last_updated
              ? `Synced ${new Date(m.last_updated).toLocaleString()}`
              : state === 'live'
              ? 'Streaming from the Continuum API'
              : state === 'loading'
              ? 'Connecting to the Continuum API…'
              : 'Metrics currently refreshing'}
          </div>
          <div className="text-emerald-200/50">
            All values sourced via the typed Continuum API · never the database directly
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePlatformMetrics;
