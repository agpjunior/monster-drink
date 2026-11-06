import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import type { Monster } from '../types/monster';
import { MonsterImage } from './MonsterImage';
import { alpha } from '../lib/utils';

interface Props {
  featured: Monster[];
  onExplore: () => void;
}

export function Hero({ featured, onExplore }: Props) {
  const reduce = useReducedMotion();
  const [left, center, right] = featured;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Fundo: grade + iluminação */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[55%] -z-10 size-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${alpha('#95D600', 0.22)} 0%, transparent 62%)` }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-monster/25 bg-monster/[0.07] px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-monster"
          >
            <Sparkles className="size-3.5" aria-hidden /> Seleção pessoal · 9 sabores
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.86] font-extrabold tracking-tight uppercase"
          >
            Meus <span className="text-monster">Monster</span>
            <br />
            <span className="text-stroke">Favoritos</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 lg:mx-0"
          >
            Uma seleção pessoal dos sabores de Monster Energy que mais gosto. Explore cada lata e descubra suas
            características.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <motion.button
              type="button"
              onClick={onExplore}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex min-h-12 items-center gap-3 whitespace-nowrap rounded-full bg-monster px-6 font-display text-base sm:px-7 sm:text-lg font-bold tracking-wide uppercase text-ink shadow-[0_0_40px_-6px_rgba(149,214,0,0.6)] transition-shadow hover:shadow-[0_0_56px_-4px_rgba(149,214,0,0.75)]"
            >
              Explorar meus favoritos
              <ArrowDown className="size-5 transition-transform group-hover:translate-y-0.5" aria-hidden />
            </motion.button>
          </motion.div>
        </div>

        {/* Latas em destaque */}
        <div className="relative mx-auto flex h-[min(56vh,520px)] w-full max-w-md items-end justify-center lg:max-w-lg" aria-hidden>
          {[left, center, right].map((m, i) =>
            m ? (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: i === 0 ? -9 : i === 2 ? 9 : 0 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={
                  i === 1
                    ? 'relative z-10 h-full'
                    : `absolute bottom-[4%] h-[78%] opacity-90 ${i === 0 ? 'left-[2%]' : 'right-[2%]'}`
                }
              >
                <motion.div
                  className="h-full"
                  animate={reduce ? undefined : { y: [0, i === 1 ? -14 : -9, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MonsterImage monster={m} priority className="h-full" />
                </motion.div>
              </motion.div>
            ) : null,
          )}
        </div>
      </div>

      <motion.a
        href="#favoritos"
        onClick={(e) => {
          e.preventDefault();
          onExplore();
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/45 transition hover:text-white/80 sm:flex"
      >
        Role para ver
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span
            className="block h-2 w-1 rounded-full bg-monster"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
