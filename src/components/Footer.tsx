import { ArrowUp, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="space-y-2">
          <p className="flex items-center gap-2 font-display text-lg font-bold tracking-wide uppercase">
            <Zap className="size-4 text-monster" aria-hidden /> Meus Monster Favoritos
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-white/45">
            Projeto pessoal e independente, sem vínculo oficial com a Monster Energy. Imagens e marcas pertencem aos
            respectivos titulares.
          </p>
        </div>
        <a
          href="#inicio"
          className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/10 px-4 text-sm font-semibold text-white/70 transition hover:border-white/25 hover:text-white sm:self-auto"
        >
          <ArrowUp className="size-4" aria-hidden /> Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
