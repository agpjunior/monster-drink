import { useState } from 'react';
import type { Monster } from '../types/monster';
import { alpha, asset } from '../lib/utils';

interface Props {
  monster: Monster;
  className?: string;
  /** Imagens acima da dobra (hero/modal) carregam com prioridade. */
  priority?: boolean;
}

/**
 * Imagem da lata. Usa a imagem oficial local quando existe; caso contrário
 * (ou se falhar ao carregar) mostra um placeholder claramente identificado.
 * A proporção 2:5 (a mesma das imagens das latas) é reservada para evitar mudanças de layout.
 */
export function MonsterImage({ monster, className = '', priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(monster.image) && !failed;

  return (
    <div className={`relative aspect-[2/5] ${className}`}>
      {hasImage ? (
        <img
          src={asset(monster.image!)}
          alt={`Lata de ${monster.name}`}
          width={250}
          height={625}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain select-none"
          style={{ filter: `drop-shadow(0 24px 40px ${alpha(monster.colors.accent, 0.35)})` }}
        />
      ) : (
        <CanPlaceholder monster={monster} />
      )}
    </div>
  );
}

/** Lata genérica (sem marcas) usada até a imagem oficial ser adicionada. */
function CanPlaceholder({ monster }: { monster: Monster }) {
  const { accent, secondary } = monster.colors;
  const gid = `can-${monster.id}`;
  const label = monster.shortName.replace(/^Ultra /, '').toUpperCase();
  // Ajusta o tamanho da fonte para o nome caber na largura da lata.
  const fontSize = Math.min(24, 118 / (label.length * 0.62));
  return (
    <svg
      viewBox="0 0 200 400"
      role="img"
      aria-label={`${monster.name} — imagem oficial pendente`}
      className="h-full w-full"
      style={{ filter: `drop-shadow(0 24px 40px ${alpha(accent, 0.3)})` }}
    >
      <defs>
        <linearGradient id={`${gid}-body`} x1="0" x2="1">
          <stop offset="0" stopColor="#0d0d0d" />
          <stop offset="0.45" stopColor="#262626" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id={`${gid}-band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
        <linearGradient id={`${gid}-metal`} x1="0" x2="1">
          <stop offset="0" stopColor="#6b6b6b" />
          <stop offset="0.5" stopColor="#d9d9d9" />
          <stop offset="1" stopColor="#6b6b6b" />
        </linearGradient>
      </defs>
      {/* tampa e fundo metálicos */}
      <path d="M44 22 Q100 8 156 22 L162 44 L38 44 Z" fill={`url(#${gid}-metal)`} />
      <path d="M38 356 L162 356 L156 380 Q100 394 44 380 Z" fill={`url(#${gid}-metal)`} />
      {/* corpo */}
      <rect x="34" y="42" width="132" height="316" rx="10" fill={`url(#${gid}-body)`} />
      {/* faixa de cor do sabor */}
      <rect x="34" y="120" width="132" height="150" fill={`url(#${gid}-band)`} opacity="0.9" />
      <rect x="34" y="42" width="132" height="316" rx="10" fill="none" stroke="rgba(255,255,255,0.12)" />
      {/* reflexo */}
      <rect x="58" y="48" width="10" height="304" rx="5" fill="rgba(255,255,255,0.08)" />
      <text
        x="100"
        y="190"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        fill="#080808"
      >
        {label}
      </text>
      <text
        x="100"
        y="214"
        textAnchor="middle"
        fontFamily="Barlow, sans-serif"
        fontWeight="600"
        fontSize="11"
        fill="rgba(8,8,8,0.75)"
        letterSpacing="1.5"
      >
        {monster.line === 'ultra' ? 'ULTRA' : monster.line === 'juice' ? 'JUICE' : 'CLÁSSICO'}
      </text>
      <g transform="translate(100 312)">
        <rect x="-52" y="-12" width="104" height="22" rx="11" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
        <text textAnchor="middle" y="3" fontFamily="Barlow, sans-serif" fontSize="9" fontWeight="600" fill="#fff" letterSpacing="1">
          IMAGEM PENDENTE
        </text>
      </g>
    </svg>
  );
}
