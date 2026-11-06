import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import type { MonsterLine } from '../types/monster';

export type FilterValue = 'all' | MonsterLine;

const OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'juice', label: 'Juice' },
  { value: 'ultra', label: 'Ultra' },
  { value: 'classic', label: 'Original / Clássicos' },
];

interface Props {
  filter: FilterValue;
  onFilterChange: (f: FilterValue) => void;
  query: string;
  onQueryChange: (q: string) => void;
  counts: Record<FilterValue, number>;
}

export function MonsterFilters({ filter, onFilterChange, query, onQueryChange, counts }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div role="group" aria-label="Filtrar por linha" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-thin md:mx-0 md:px-0">
        {OPTIONS.map((o) => {
          const active = filter === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onFilterChange(o.value)}
              className={`relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${
                active ? 'text-ink' : 'text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-monster"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{o.label}</span>
              <span
                className={`relative rounded-full px-1.5 text-xs tabular-nums ${
                  active ? 'bg-ink/15' : 'bg-white/[0.08] text-white/55'
                }`}
              >
                {counts[o.value]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative md:w-72">
        <label htmlFor="busca" className="sr-only">
          Pesquisar energético pelo nome
        </label>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/40" aria-hidden />
        <input
          id="busca"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar sabor…"
          autoComplete="off"
          className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] pl-10 pr-10 text-sm text-white placeholder:text-white/35 transition focus:border-monster/50 focus:bg-white/[0.06] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Limpar busca"
            className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
