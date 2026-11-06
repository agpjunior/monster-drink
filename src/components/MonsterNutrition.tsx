import { Candy, CupSoda, ExternalLink, Flame, Info, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { NutritionInfo } from '../types/monster';
import { alpha } from '../lib/utils';

interface Props {
  nutrition: NutritionInfo;
  accent: string;
}

export function MonsterNutrition({ nutrition, accent }: Props) {
  const items: { icon: LucideIcon; label: string; value: number | null; unit: string }[] = [
    { icon: Zap, label: 'Cafeína', value: nutrition.caffeineMg, unit: 'mg' },
    { icon: Candy, label: 'Açúcares', value: nutrition.sugarG, unit: 'g' },
    { icon: Flame, label: 'Calorias', value: nutrition.caloriesKcal, unit: 'kcal' },
    { icon: CupSoda, label: 'Volume', value: nutrition.volumeMl, unit: 'ml' },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, value, unit }) => (
          <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5">
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-white/50">
              <Icon className="size-3.5" style={{ color: accent }} aria-hidden />
              {label}
            </dt>
            <dd className="mt-1.5">
              {value === null ? (
                <span className="text-sm font-medium text-white/45">Não confirmado</span>
              ) : (
                <span className="font-display text-2xl font-bold tabular-nums">
                  {value}
                  <span className="ml-0.5 text-sm font-semibold text-white/50">{unit}</span>
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 space-y-2 text-xs leading-relaxed text-white/50">
        <p className="flex gap-2">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>{nutrition.reference}</span>
        </p>
        {nutrition.notes && (
          <p
            className="rounded-xl border px-3 py-2 text-white/60"
            style={{ borderColor: alpha(accent, 0.25), background: alpha(accent, 0.05) }}
          >
            {nutrition.notes}
          </p>
        )}
        {nutrition.source && (
          <a
            href={nutrition.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-white/20 underline-offset-2 hover:text-white"
          >
            Fonte: {nutrition.source.label}
            <ExternalLink className="size-3" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}
