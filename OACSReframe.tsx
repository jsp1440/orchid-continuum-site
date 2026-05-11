import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Mountain,
  Droplets,
  Sun,
  Thermometer,
  Calendar,
  Leaf,
  Gauge,
} from 'lucide-react';

const HABITAT_IMG =
  'https://d64gsuwffb70l.cloudfront.net/69fa6c8ae577acf1894f7208_1778350160189_54796da5.jpg';

/**
 * Section 5 — OACS Reframe.
 *
 * Public-facing reframing of the Orchid Adaptive Cultivation System.
 *
 * The narrative arc:
 *   1. Traditional culture sheets are usually genus-level and generalised.
 *   2. The Continuum offers species-level adaptive cultivation intelligence
 *      informed by the environments orchids actually evolved within.
 *   3. The system compares native habitat patterns (climate, elevation,
 *      seasonality, ecological signals) against your greenhouse, your
 *      telemetry, your microclimate.
 *   4. Then — and only then — does it introduce the acronym OACS.
 *
 * The visual is a habitat-vs-grow-space comparison — two columns of
 * environmental signals so the concept is legible without copy.
 */
const habitat = [
  { icon: Mountain,    label: 'Elevation',   value: '1,400 – 2,200 m',  hint: 'Andean cloud forest' },
  { icon: Thermometer, label: 'Temperature', value: '14 – 22 °C',       hint: 'Diurnal swing 8 °C' },
  { icon: Droplets,    label: 'Humidity',    value: '78 – 92 %',        hint: 'Mist saturation overnight' },
  { icon: Sun,         label: 'Light · DLI', value: '120 – 180 µmol',   hint: 'Filtered canopy light' },
  { icon: Calendar,    label: 'Seasonality', value: 'Wet Apr – Oct',    hint: 'Cool dry rest Dec – Feb' },
  { icon: Leaf,        label: 'Substrate',   value: 'Mossy branches',   hint: 'Epiphytic, well-drained' },
];

const grow = [
  { icon: Mountain,    label: 'Effective elevation', value: 'Equivalent 1,650 m', match: 'matched' as const },
  { icon: Thermometer, label: 'Greenhouse temperature', value: '16 – 23 °C',     match: 'matched' as const },
  { icon: Droplets,    label: 'Greenhouse humidity',    value: '62 – 74 %',      match: 'low' as const },
  { icon: Sun,         label: 'Measured DLI',           value: '95 µmol',        match: 'low' as const },
  { icon: Calendar,    label: 'Watering rhythm',        value: 'Year-round even', match: 'mismatch' as const },
  { icon: Leaf,        label: 'Mount type',             value: 'Slab + sphagnum', match: 'matched' as const },
];

const matchTone = {
  matched:  { dot: 'bg-emerald-300',  text: 'text-emerald-200',  label: 'Matched' },
  low:      { dot: 'bg-amber-300',    text: 'text-amber-200',    label: 'Adjust' },
  mismatch: { dot: 'bg-rose-300',     text: 'text-rose-200',     label: 'Mismatch' },
};

const OACSReframe: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="oacs"
      className="relative py-32 bg-[#0d1f17] text-white border-t border-white/5 overflow-hidden"
    >
      {/* Atmospheric habitat backdrop */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img
          src={HABITAT_IMG}
          alt=""
          aria-hidden
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f17]/90 via-[#0d1f17]/85 to-[#0d1f17]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Narrative reframe */}
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.3em] uppercase text-emerald-200/80 mb-6">
            Adaptive Cultivation Intelligence
          </div>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight">
            Cultivation guidance,<br />
            <span className="italic text-emerald-200/95">read from the habitat itself.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/75 mt-8 leading-relaxed font-light">
            Traditional orchid culture sheets are usually genus-level and generalised — useful,
            but blind to the specific elevations, climates, and seasonalities each species
            evolved within.
          </p>
          <p className="text-base text-white/65 mt-5 leading-relaxed">
            The Continuum offers species-level adaptive cultivation intelligence — drawn from
            the environments orchids actually inhabit. Native habitat patterns are compared,
            in real time, against your grow space, your local weather, your telemetry, and
            your microclimate.
          </p>
          <div className="inline-flex items-center gap-2 mt-7 px-3 py-1.5 rounded-full border border-emerald-300/30 bg-emerald-300/5 text-emerald-200 text-[11px] tracking-[0.22em] uppercase">
            <Gauge className="h-3 w-3" />
            OACS · Orchid Adaptive Cultivation System
          </div>
        </div>

        {/* Habitat ⇄ grow space comparison */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {/* Native habitat column */}
          <div className="bg-[#0d1f17]/95 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-200/70 mb-1">
                  Native Habitat Envelope
                </div>
                <div className="font-serif text-2xl text-white italic">
                  Masdevallia coccinea
                </div>
                <div className="text-xs text-white/50 mt-1">Andean cloud forest · demonstration profile</div>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-emerald-300/30 text-emerald-200 bg-emerald-300/5">
                Habitat signal
              </span>
            </div>
            <ul className="space-y-3">
              {habitat.map(h => {
                const Icon = h.icon;
                return (
                  <li
                    key={h.label}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-emerald-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">{h.label}</div>
                      <div className="text-sm text-white tabular-nums">{h.value}</div>
                    </div>
                    <div className="text-[11px] text-white/45 italic hidden sm:block">{h.hint}</div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Grow space column */}
          <div className="bg-[#102a20] p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-200/70 mb-1">
                  Your Grow Space
                </div>
                <div className="font-serif text-2xl text-white">
                  Greenhouse · East Bench
                </div>
                <div className="text-xs text-white/50 mt-1">Telemetry + local weather · last 7 days</div>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-amber-300/30 text-amber-200 bg-amber-300/5">
                Telemetry signal
              </span>
            </div>
            <ul className="space-y-3">
              {grow.map((g, i) => {
                const Icon = g.icon;
                const tone = matchTone[g.match];
                return (
                  <li
                    key={g.label}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-300/10 border border-emerald-300/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-emerald-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] tracking-[0.18em] uppercase text-white/45">{g.label}</div>
                      <div className="text-sm text-white tabular-nums">{g.value}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase ${tone.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tone.dot} ${i === 0 ? 'animate-pulse' : ''}`} />
                      {tone.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Adaptive interpretation panel */}
        <div className="mt-px bg-emerald-300/5 border border-emerald-300/20 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.25em] uppercase text-emerald-200/80 mb-2">
              Adaptive Interpretation
            </div>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              Two of six signals are drifting from the species' native envelope. The Continuum
              suggests raising humidity into the 75 – 85 % range overnight and shifting toward
              a cool dry rest in late autumn — mirroring the orchid's wild seasonality rather
              than a generic year-round regime.
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <button
              onClick={() => navigate('/oacs')}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-300 text-[#0d1f17] hover:bg-emerald-200 transition-all font-medium"
            >
              Open the OACS dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <div className="text-[10px] tracking-[0.22em] uppercase text-white/40 text-center mt-3">
              Demonstration · live telemetry once paired
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OACSReframe;
