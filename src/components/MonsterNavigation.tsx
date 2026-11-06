import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Monster } from '../types/monster';

interface Props {
  list: Monster[];
  index: number;
  onNavigate: (index: number) => void;
  accent: string;
}

export function MonsterNavigation({ list, index, onNavigate, accent }: Props) {
  const total = list.length;
  const prev = list[(index - 1 + total) % total];
  const next = list[(index + 1) % total];
  const single = total < 2;

  return (
    <nav aria-label="Navegar entre sabores" className="flex items-center justify-between gap-3">
      <button
        type="button"
        disabled={single}
        onClick={() => onNavigate((index - 1 + total) % total)}
        aria-label={`Anterior: ${prev.name}`}
        className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] pl-2.5 pr-4 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white disabled:opacity-40"
      >
        <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        Anterior
      </button>

      <div className="flex items-center gap-1.5" aria-hidden>
        {list.map((m, i) => (
          <span
            key={m.id}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === index ? 18 : 6, background: i === index ? accent : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        Sabor {index + 1} de {total}
      </span>

      <button
        type="button"
        disabled={single}
        onClick={() => onNavigate((index + 1) % total)}
        aria-label={`Próximo: ${next.name}`}
        className="group inline-flex min-h-11 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-2.5 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white disabled:opacity-40"
      >
        Próximo
        <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>
    </nav>
  );
}
