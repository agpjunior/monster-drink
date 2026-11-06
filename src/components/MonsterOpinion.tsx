import type { ReactNode } from 'react';
import { Heart, MessageSquareText, Star, Trophy } from 'lucide-react';
import type { PersonalOpinion } from '../types/monster';
import { alpha } from '../lib/utils';

interface Props {
  opinion: PersonalOpinion;
  accent: string;
}

const filled = (v: unknown) => (typeof v === 'string' ? v.trim().length > 0 : v !== null && v !== undefined);

/** Seção "Minha opinião". Mostra só o que foi preenchido em src/data/monsters.ts. */
export function MonsterOpinion({ opinion, accent }: Props) {
  const { favoriteThing, description, score, rank, comments } = opinion;
  const hasAny = [favoriteThing, description, score, rank, comments].some(filled);

  return (
    <div
      className="rounded-2xl border p-4 sm:p-5"
      style={{ borderColor: alpha(accent, 0.22), background: `linear-gradient(135deg, ${alpha(accent, 0.07)}, transparent 60%)` }}
    >
      <div className="flex flex-wrap gap-2.5">
        <Stat icon={<Star className="size-4" style={{ color: accent }} aria-hidden />} label="Minha nota">
          {filled(score) ? `${score}/10` : '—'}
        </Stat>
        <Stat icon={<Trophy className="size-4" style={{ color: accent }} aria-hidden />} label="Ranking">
          {filled(rank) ? `#${rank}` : '—'}
        </Stat>
      </div>

      {filled(score) && (
        <div className="mt-3 flex gap-1" role="img" aria-label={`Nota ${score} de 10`}>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{ background: i < Math.round(score ?? 0) ? accent : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>
      )}

      {hasAny ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">
          {filled(favoriteThing) && (
            <p className="flex gap-2">
              <Heart className="mt-0.5 size-4 shrink-0" style={{ color: accent }} aria-hidden />
              <span>
                <strong className="font-semibold text-white">O que mais gosto: </strong>
                {favoriteThing}
              </span>
            </p>
          )}
          {filled(description) && <p>{description}</p>}
          {filled(comments) && (
            <p className="flex gap-2 text-white/60">
              <MessageSquareText className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{comments}</span>
            </p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm italic text-white/45">
          [Provisório] Minha opinião sobre este sabor ainda não foi cadastrada.
        </p>
      )}
    </div>
  );
}

function Stat({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-black/30 py-1.5 pl-2.5 pr-3.5">
      {icon}
      <span className="text-xs text-white/50">{label}</span>
      <span className="font-display text-lg font-bold tabular-nums">{children}</span>
    </div>
  );
}
