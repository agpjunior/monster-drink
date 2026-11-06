/** Linhas oficiais usadas nos filtros (seguem o catálogo da Monster, não apenas o nome). */
export type MonsterLine = 'juice' | 'ultra' | 'classic';

export type FlavorProfile = 'Doce' | 'Cítrico' | 'Frutado' | 'Tropical' | 'Leve' | 'Clássico';

export interface SourceLink {
  label: string;
  url: string;
}

/**
 * Informações nutricionais. Use `null` quando o valor não estiver confirmado
 * em uma fonte oficial — o site exibe "Não confirmado" em vez de um número.
 */
export interface NutritionInfo {
  caffeineMg: number | null;
  sugarG: number | null;
  caloriesKcal: number | null;
  volumeMl: number | null;
  /** Explica a que se referem os valores (ex.: "por lata, site oficial BR"). */
  reference: string;
  /** Observações sobre divergências entre países, dados ausentes etc. */
  notes?: string;
  source?: SourceLink;
}

/**
 * Minha opinião pessoal — preencha à vontade.
 * Campos vazios/null aparecem como "ainda não cadastrado" no site.
 */
export interface PersonalOpinion {
  favoriteThing?: string;
  description?: string;
  /** Nota de 0 a 10. */
  score?: number | null;
  /** Posição no meu ranking (1 = favorito). */
  rank?: number | null;
  comments?: string;
}

export interface MonsterColors {
  /** Cor de destaque principal (brilho, bordas, botões). */
  accent: string;
  /** Segunda cor para gradientes. */
  secondary: string;
  /** Cores predominantes da embalagem, em texto, para exibição. */
  packaging: string[];
}

export interface Monster {
  id: string;
  /** Nome completo, como no catálogo oficial. */
  name: string;
  /** Nome comercial resumido. */
  shortName: string;
  line: MonsterLine;
  lineLabel: string;
  /** Frase curta para o card. */
  tagline: string;
  flavorDescription: string;
  tastingNotes: string[];
  profile: FlavorProfile[];
  differentiator: string;
  sugarFree: boolean;
  colors: MonsterColors;
  /** Caminho da imagem local (gerado por scripts/fetch-images.mjs). */
  image?: string;
  officialUrl?: string;
  nutrition: NutritionInfo;
  opinion: PersonalOpinion;
}
