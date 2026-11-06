import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MonsterFilters, type FilterValue } from './components/MonsterFilters';
import { MonsterGrid } from './components/MonsterGrid';
import { MonsterDetailsModal } from './components/MonsterDetailsModal';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { monsters } from './data/monsters';
import type { Monster } from './types/monster';
import { normalize } from './lib/utils';

const byId = (id: string) => monsters.find((m) => m.id === id);
const HERO_IDS = ['juice-mango-loco', 'original-green', 'ultra-white'];

export default function App() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const fallbackTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => {
    const q = normalize(query);
    return monsters.filter(
      (m) =>
        (filter === 'all' || m.line === filter) &&
        (!q || normalize(`${m.name} ${m.shortName} ${m.tastingNotes.join(' ')}`).includes(q)),
    );
  }, [filter, query]);

  const counts = useMemo<Record<FilterValue, number>>(
    () => ({
      all: monsters.length,
      juice: monsters.filter((m) => m.line === 'juice').length,
      ultra: monsters.filter((m) => m.line === 'ultra').length,
      classic: monsters.filter((m) => m.line === 'classic').length,
    }),
    [],
  );

  // O modal navega pela lista visível (todos os 9 quando não há filtro).
  const openIndex = openId ? visible.findIndex((m) => m.id === openId) : -1;

  const handleOpen = useCallback((m: Monster, trigger: HTMLButtonElement) => {
    fallbackTrigger.current = trigger;
    setOpenId(m.id);
  }, []);

  const handleClose = useCallback(() => setOpenId(null), []);

  // Ao fechar, foca o card do sabor que estava aberto (pode ter mudado via "Próximo").
  const getReturnFocus = useCallback(() => {
    const id = lastShownId.current;
    return (
      (id && document.querySelector<HTMLElement>(`[data-monster-trigger="${id}"]`)) || fallbackTrigger.current
    );
  }, []);
  const lastShownId = useRef<string | null>(null);
  if (openId) lastShownId.current = openId;

  const scrollToGallery = () => {
    document.getElementById('favoritos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const featured = HERO_IDS.map(byId).filter((m): m is Monster => Boolean(m));

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#favoritos"
        className="sr-only z-[60] rounded-full bg-monster px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para os favoritos
      </a>
      <Header />

      <main>
        <Hero featured={featured} onExplore={scrollToGallery} />

        <section id="favoritos" aria-labelledby="favoritos-title" className="relative scroll-mt-16 py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(149,214,0,0.08),transparent_60%)]"
          />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mb-10 max-w-2xl"
            >
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase text-monster">A seleção</p>
              <h2 id="favoritos-title" className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] font-extrabold uppercase">
                Meus favoritos
              </h2>
              <p className="mt-4 text-white/60">
                Toque em qualquer lata para ver sabor, características e informações nutricionais.
              </p>
            </motion.div>

            <div className="mb-8">
              <MonsterFilters
                filter={filter}
                onFilterChange={setFilter}
                query={query}
                onQueryChange={setQuery}
                counts={counts}
              />
            </div>

            <MonsterGrid
              monsters={visible}
              onOpen={handleOpen}
              onReset={() => {
                setFilter('all');
                setQuery('');
              }}
            />
          </div>
        </section>

        <About
          stats={{
            total: monsters.length,
            sugarFree: monsters.filter((m) => m.sugarFree).length,
            lines: new Set(monsters.map((m) => m.line)).size,
          }}
        />
      </main>

      <Footer />

      <AnimatePresence>
        {openIndex >= 0 && (
          <MonsterDetailsModal
            key="modal"
            list={visible}
            index={openIndex}
            onNavigate={(i) => setOpenId(visible[i].id)}
            onClose={handleClose}
            getReturnFocus={getReturnFocus}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
