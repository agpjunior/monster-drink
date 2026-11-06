import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Candy, ExternalLink, Gauge, Leaf, Palette, Sparkles, Tag, X } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Monster } from '../types/monster';
import { MonsterImage } from './MonsterImage';
import { MonsterNutrition } from './MonsterNutrition';
import { MonsterNavigation } from './MonsterNavigation';
import { MonsterOpinion } from './MonsterOpinion';
import { lockScroll } from '../hooks/useScrollLock';
import { alpha, getFocusable } from '../lib/utils';

interface Props {
  /** Lista navegável (a mesma exibida na galeria). */
  list: Monster[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
  /** Elemento que deve receber o foco quando o modal for desmontado. */
  getReturnFocus: () => HTMLElement | null;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function MonsterDetailsModal({ list, index, onNavigate, onClose, getReturnFocus }: Props) {
  const monster = list[index];
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);

  // Mantém as funções mais recentes acessíveis aos listeners.
  const latest = useRef({ onClose, onNavigate, index, total: list.length, getReturnFocus });
  latest.current = { onClose, onNavigate, index, total: list.length, getReturnFocus };

  const go = (to: number, dir: number) => {
    setDirection(dir);
    latest.current.onNavigate(to);
  };

  // Abertura: trava a rolagem, isola o resto da página e foca o botão de fechar.
  // Fechamento: desfaz tudo e devolve o foco ao card de origem.
  useLayoutEffect(() => {
    const unlock = lockScroll();
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');
    root?.setAttribute('aria-hidden', 'true');
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      root?.removeAttribute('inert');
      root?.removeAttribute('aria-hidden');
      unlock();
      latest.current.getReturnFocus()?.focus({ preventScroll: true });
    };
  }, []);

  // Teclado: ESC fecha, ←/→ navegam, Tab fica preso dentro do modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const { index: i, total } = latest.current;
      if (e.key === 'Escape') {
        e.preventDefault();
        latest.current.onClose();
        return;
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && total > 1) {
        const target = e.target as HTMLElement | null;
        if (target?.closest('input, textarea, select')) return;
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        go((i + dir + total) % total, dir);
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const items = getFocusable(panelRef.current);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Ao trocar de sabor, volta o conteúdo para o topo.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [monster.id]);

  const { accent, secondary } = monster.colors;
  const titleId = 'monster-modal-title';
  const descId = 'monster-modal-desc';

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-8" data-testid="monster-modal">
      {/* Fundo escurecido — clicar fora fecha */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-coal md:grid md:h-[min(780px,calc(100dvh-4rem))] md:max-w-6xl md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:rounded-[28px] md:border md:border-white/10"
        style={{ boxShadow: `0 40px 120px -30px ${alpha(accent, 0.45)}` }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes"
          className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:rotate-90 hover:bg-black/70 md:right-5 md:top-5"
        >
          <X className="size-5" aria-hidden />
        </button>

        {/* ESQUERDA / TOPO — imagem */}
        <div className="relative h-[38svh] min-h-[220px] shrink-0 overflow-hidden md:h-auto">
          <AnimatePresence initial={false}>
            <motion.div
              key={monster.id}
              aria-hidden
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: `radial-gradient(circle at 50% 55%, ${alpha(accent, 0.45)} 0%, ${alpha(secondary, 0.16)} 38%, transparent 70%), linear-gradient(160deg, ${alpha(accent, 0.18)} 0%, #0c0c0c 55%, ${alpha(secondary, 0.14)} 100%)`,
              }}
            />
          </AnimatePresence>
          <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />

          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={monster.id}
              custom={direction}
              className="absolute inset-0 flex items-center justify-center py-6 md:py-14"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 60, scale: 0.88 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -60, scale: 0.92 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <motion.div
                className="h-full"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MonsterImage monster={monster} priority className="h-full" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden
            className="absolute bottom-[6%] left-1/2 h-5 w-32 -translate-x-1/2 rounded-[50%] blur-lg md:w-44"
            style={{ background: alpha(accent, 0.45) }}
          />
        </div>

        {/* DIREITA / BASE — informações */}
        <div className="flex min-h-0 flex-1 flex-col border-t border-white/[0.06] md:border-l md:border-t-0">
          <div ref={scrollRef} className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <motion.div
              key={monster.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="space-y-7 px-5 py-6 sm:px-8 md:px-10 md:py-10"
            >
              {/* 1–2. Nome e linha */}
              <header className="space-y-3 pr-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase"
                    style={{ borderColor: alpha(accent, 0.4), color: accent, background: alpha(accent, 0.08) }}
                  >
                    {monster.lineLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-white/70">
                    {monster.sugarFree ? <Leaf className="size-3" aria-hidden /> : <Candy className="size-3" aria-hidden />}
                    {monster.sugarFree ? 'Zero açúcar' : 'Com açúcar'}
                  </span>
                </div>
                <h2 id={titleId} className="font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.95] font-extrabold tracking-wide uppercase">
                  {monster.name}
                </h2>
                <p className="text-sm text-white/50">
                  Nome comercial: <span className="text-white/80">{monster.shortName}</span>
                </p>
              </header>

              {/* 3. Descrição */}
              <Section title="Sobre o sabor" icon={<Sparkles className="size-4" style={{ color: accent }} aria-hidden />}>
                <p id={descId} className="text-[15px] leading-relaxed text-white/75">
                  {monster.flavorDescription}
                </p>
              </Section>

              {/* 4. Características */}
              <Section title="Características" icon={<Gauge className="size-4" style={{ color: accent }} aria-hidden />}>
                <dl className="grid gap-3 sm:grid-cols-2">
                  <Feature icon={<Tag className="size-3.5" aria-hidden />} label="Notas de sabor">
                    <Chips items={monster.tastingNotes} accent={accent} />
                  </Feature>
                  <Feature icon={<Gauge className="size-3.5" aria-hidden />} label="Perfil">
                    <Chips items={monster.profile} accent={accent} />
                  </Feature>
                  <Feature icon={<Palette className="size-3.5" aria-hidden />} label="Cores da embalagem">
                    <Chips items={monster.colors.packaging} accent={accent} />
                  </Feature>
                  <Feature icon={<Candy className="size-3.5" aria-hidden />} label="Açúcar">
                    <span className="text-sm text-white/80">
                      {monster.sugarFree ? 'Sem açúcar (adoçado com edulcorantes)' : 'Contém açúcar'}
                    </span>
                  </Feature>
                  <Feature icon={<Sparkles className="size-3.5" aria-hidden />} label="Diferencial" wide>
                    <span className="text-sm leading-relaxed text-white/80">{monster.differentiator}</span>
                  </Feature>
                </dl>
              </Section>

              {/* 5. Nutrição */}
              <Section title="Informações nutricionais" icon={<Candy className="size-4" style={{ color: accent }} aria-hidden />}>
                <MonsterNutrition nutrition={monster.nutrition} accent={accent} />
              </Section>

              {/* 6. Minha opinião */}
              <Section title="Minha opinião" icon={<Sparkles className="size-4" style={{ color: accent }} aria-hidden />}>
                <MonsterOpinion opinion={monster.opinion} accent={accent} />
              </Section>

              {/* 7. Link oficial */}
              {monster.officialUrl && (
                <a
                  href={monster.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold text-ink transition hover:brightness-110"
                  style={{ background: accent }}
                >
                  Página oficial do produto
                  <ExternalLink className="size-4" aria-hidden />
                  <span className="sr-only">(abre em nova aba)</span>
                </a>
              )}
            </motion.div>
          </div>

          <div className="shrink-0 border-t border-white/[0.06] bg-coal/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 md:px-10 md:py-4">
            <MonsterNavigation
              list={list}
              index={index}
              accent={accent}
              onNavigate={(to) => go(to, to === (index + 1) % list.length ? 1 : -1)}
            />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

function Section({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.18em] uppercase text-white/55">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

function Feature({ icon, label, children, wide }: { icon: ReactNode; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5 ${wide ? 'sm:col-span-2' : ''}`}>
      <dt className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-white/45">
        {icon}
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

function Chips({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border px-2.5 py-1 text-xs font-medium text-white/85"
          style={{ borderColor: alpha(accent, 0.25), background: alpha(accent, 0.07) }}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
