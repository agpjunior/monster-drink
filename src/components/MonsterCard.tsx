import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Leaf } from 'lucide-react';
import type { Monster } from '../types/monster';
import { MonsterImage } from './MonsterImage';
import { alpha } from '../lib/utils';

interface Props {
  monster: Monster;
  index: number;
  onOpen: (monster: Monster, trigger: HTMLButtonElement) => void;
}

/**
 * Card da galeria. O botão "Ver detalhes" se estende por todo o card
 * (técnica de "stretched link"), então qualquer ponto — inclusive a lata —
 * abre o modal, mantendo a semântica correta para leitores de tela.
 */
export function MonsterCard({ monster, index, onOpen }: Props) {
  const { accent, secondary } = monster.colors;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-coal/80 transition-[border-color,box-shadow] duration-300 focus-within:border-white/25 hover:border-white/20"
      style={{ '--accent': accent } as CSSProperties}
    >
      {/* Área da lata */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden sm:h-72">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${alpha(accent, 0.28)} 0%, ${alpha(secondary, 0.08)} 40%, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-6 h-6 w-28 rounded-[50%] blur-md transition-all duration-500 group-hover:w-36"
          style={{ background: alpha(accent, 0.35) }}
        />
        <div className="relative h-[86%] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.06] group-hover:-rotate-2">
          <MonsterImage monster={monster} className="h-full" />
        </div>

        <span
          className="absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase backdrop-blur"
          style={{ borderColor: alpha(accent, 0.4), color: accent, background: alpha('#080808', 0.55) }}
        >
          {monster.lineLabel.replace(' (clássicos)', '')}
        </span>
        {monster.sugarFree && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur">
            <Leaf className="size-3" aria-hidden /> Zero açúcar
          </span>
        )}
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col gap-3 border-t border-white/[0.06] p-5 sm:p-6">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="size-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}` }} />
          <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>
        <h3 className="font-display text-2xl leading-tight font-bold tracking-wide uppercase transition-colors duration-300 group-hover:text-[var(--accent)]">
          {monster.shortName}
        </h3>
        <p className="text-sm leading-relaxed text-white/60">{monster.tagline}</p>

        <button
          data-monster-trigger={monster.id}
          type="button"
          onClick={(e) => onOpen(monster, e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={`Ver detalhes de ${monster.name}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white after:absolute after:inset-0 after:z-10 after:rounded-3xl after:content-[''] focus-visible:outline-none"
        >
          Ver detalhes
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ color: accent }}
            aria-hidden
          />
        </button>
      </div>

      {/* Brilho da borda no hover/foco */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${alpha(accent, 0.45)}, 0 20px 60px -20px ${alpha(accent, 0.45)}` }}
      />
    </motion.article>
  );
}
