import { motion } from 'motion/react';
import { CupSoda, Leaf, Zap } from 'lucide-react';

interface Props {
  stats: { total: number; sugarFree: number; lines: number };
}

export function About({ stats }: Props) {
  const items = [
    { icon: CupSoda, value: stats.total, label: 'sabores na seleção' },
    { icon: Leaf, value: stats.sugarFree, label: 'versões sem açúcar' },
    { icon: Zap, value: stats.lines, label: 'linhas diferentes' },
  ];

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase text-monster">Sobre</p>
          <h2 id="sobre-title" className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] font-extrabold uppercase">
            Sobre meus favoritos
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Este espaço foi criado para reunir os sabores de Monster Energy que mais gosto. Cada energético possui
            características próprias, desde opções frutadas e tropicais até versões mais clássicas. Aqui compartilho
            minha seleção pessoal e algumas informações sobre cada produto.
          </p>
        </motion.div>

        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {items.map(({ icon: Icon, value, label }, i) => (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-coal/70 p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-monster/10 ring-1 ring-monster/25">
                <Icon className="size-6 text-monster" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-4xl leading-none font-extrabold">{value}</span>
                <span className="text-sm text-white/55">{label}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
