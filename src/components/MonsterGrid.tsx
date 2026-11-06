import { AnimatePresence, motion } from 'motion/react';
import { SearchX } from 'lucide-react';
import type { Monster } from '../types/monster';
import { MonsterCard } from './MonsterCard';

interface Props {
  monsters: Monster[];
  onOpen: (monster: Monster, trigger: HTMLButtonElement) => void;
  onReset: () => void;
}

export function MonsterGrid({ monsters, onOpen, onReset }: Props) {
  return (
    <>
      <p className="sr-only" role="status" aria-live="polite">
        {monsters.length === 1 ? '1 energético exibido' : `${monsters.length} energéticos exibidos`}
      </p>

      {monsters.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center"
        >
          <SearchX className="size-10 text-white/30" aria-hidden />
          <p className="text-white/60">Nenhum sabor encontrado com esses filtros.</p>
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 rounded-full border border-monster/40 px-5 text-sm font-semibold text-monster transition hover:bg-monster/10"
          >
            Limpar filtros
          </button>
        </motion.div>
      ) : (
        <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {monsters.map((m, i) => (
              <motion.li
                key={m.id}
                layout
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                transition={{ duration: 0.35 }}
                className="flex [&>article]:w-full"
              >
                <MonsterCard monster={m} index={i} onOpen={onOpen} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}
