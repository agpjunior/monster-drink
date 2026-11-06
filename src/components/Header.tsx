import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#favoritos', label: 'Favoritos' },
  { href: '#sobre', label: 'Sobre' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/[0.06] bg-ink/75 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="group flex items-center gap-2.5" aria-label="Meus Monster Favoritos — início">
          <span className="grid size-9 place-items-center rounded-xl bg-monster/10 ring-1 ring-monster/30 transition group-hover:bg-monster/20">
            <Zap className="size-5 text-monster" strokeWidth={2.5} aria-hidden />
          </span>
          <span className="font-display text-lg font-bold tracking-wide uppercase">
            Meus <span className="text-monster">Monster</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl text-white/80 transition hover:bg-white/[0.06] md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-t border-white/[0.06] py-4 font-display text-xl font-semibold tracking-wide uppercase text-white/85"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
