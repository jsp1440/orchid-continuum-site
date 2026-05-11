import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

/**
 * Closing CTA · field updates signup.
 *
 * The longer narrative case for the platform now lives in WhyContinuum.
 * This block is intentionally narrow: a single, dignified invitation to
 * receive field updates from the Continuum. Email collection routes
 * through the CRM subscribe endpoint per platform standard.
 */
const Mission: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await fetch('/api/crm/69fa6c8ae577acf1894f7208/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'orchid-continuum-mission' }),
      });
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mission" className="relative py-24 bg-[#1a3a2e] text-white overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald-200/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-emerald-200/80 mb-6">
          Field Updates
        </div>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tight">
          Stay close to <span className="italic text-emerald-200/95">the work</span>.
        </h2>
        <p className="text-base md:text-lg text-white/70 mt-6 leading-relaxed max-w-2xl mx-auto font-light">
          Quarterly notes from the platform — new species intelligence, conservation findings,
          institutional partnerships, and open invitations to participate.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
          {!submitted ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="researcher@institution.org"
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-emerald-200/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-300 text-[#0d1f17] hover:bg-emerald-200 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Joining…' : 'Join the Continuum'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-300/15 border border-emerald-300/40 text-emerald-100 text-sm">
              <Check className="h-4 w-4" /> Welcome — you're now part of the Continuum.
            </div>
          )}
          {error && <div className="text-xs text-red-300 mt-3">{error}</div>}
        </form>

        <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mt-6">
          Open knowledge · No tracking · Unsubscribe anytime
        </div>
      </div>
    </section>
  );
};

export default Mission;
