import type { Monster, MonsterLine, NutritionInfo, PersonalOpinion } from '../types/monster';
import { monsterImages } from './monsterImages';

/*
 * DADOS DOS MEUS MONSTER FAVORITOS
 * --------------------------------
 * - Valores nutricionais: retirados das páginas oficiais em monsterenergy.com/pt-br
 *   (consultadas em nov/2026). Os números são "por lata", como o site exibe.
 *   O volume de 473 ml é o da lata vendida no Brasil (o site oficial não o exibe
 *   junto dos números). Se algum valor mudar, edite aqui.
 * - `null` = não confirmado → o site mostra "Não confirmado".
 * - `opinion` = SUA opinião. Está vazia de propósito: preencha você mesmo.
 * - `colors.accent/secondary` foram tiradas das imagens das latas.
 */

const BR = 'https://www.monsterenergy.com/pt-br/energy-drinks';
const CHECKED = 'nov/2026';

/** Opinião vazia — substitua pelos seus textos, nota e posição. */
const emptyOpinion = (): PersonalOpinion => ({
  favoriteThing: '',
  description: '',
  score: null,
  rank: null,
  comments: '',
});

const brNutrition = (
  url: string,
  values: Pick<NutritionInfo, 'caffeineMg' | 'sugarG' | 'caloriesKcal'>,
  notes?: string,
): NutritionInfo => ({
  ...values,
  volumeMl: 473,
  reference: 'Valores por lata, conforme o site oficial brasileiro. Lata de 473 ml (formato vendido no Brasil).',
  notes,
  source: { label: `monsterenergy.com/pt-br (consultado em ${CHECKED})`, url },
});

export const LINE_LABELS: Record<MonsterLine, string> = {
  juice: 'Juice Monster',
  ultra: 'Monster Ultra',
  classic: 'Monster Energy (clássicos)',
};

const raw: Omit<Monster, 'image'>[] = [
  {
    id: 'juice-mango-loco',
    name: 'Monster Energy Juice Mango Loco',
    shortName: 'Mango Loco',
    line: 'juice',
    lineLabel: LINE_LABELS.juice,
    tagline: 'Manga com mix de frutas cítricas e suco de fruta.',
    flavorDescription:
      'Combina suco de manga com um mix de frutas cítricas e o blend energético da Monster. É uma versão com suco, intensa e bem frutada.',
    tastingNotes: ['Manga', 'Frutas cítricas'],
    profile: ['Tropical', 'Frutado', 'Doce'],
    differentiator: 'Leva suco de fruta na fórmula — a manga é a protagonista.',
    sugarFree: false,
    colors: {
      accent: '#3DB5E6',
      secondary: '#F9A31B',
      packaging: ['Azul', 'Laranja', 'Arte de caveiras mexicanas'],
    },
    officialUrl: `${BR}/juice-monster/monster-energy-juice-mango-loco/`,
    nutrition: brNutrition(`${BR}/juice-monster/monster-energy-juice-mango-loco/`, {
      caffeineMg: 147,
      caloriesKcal: 237,
      sugarG: 57,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'juice-pipeline-punch',
    name: 'Monster Energy Juice Pipeline Punch',
    shortName: 'Pipeline Punch',
    line: 'juice',
    lineLabel: LINE_LABELS.juice,
    tagline: 'Maracujá, laranja e goiaba com inspiração havaiana.',
    flavorDescription:
      'Mistura tropical de maracujá, laranja e goiaba, com suco de fruta e o blend energético da Monster. O nome homenageia a Banzai Pipeline, onda famosa do North Shore de Oahu, no Havaí.',
    tastingNotes: ['Maracujá', 'Laranja', 'Goiaba'],
    profile: ['Tropical', 'Frutado', 'Doce'],
    differentiator: 'Trio de frutas tropicais com um toque levemente ácido do maracujá.',
    sugarFree: false,
    colors: {
      accent: '#F57FA4',
      secondary: '#FFC2D3',
      packaging: ['Rosa', 'Garra rosa-claro'],
    },
    officialUrl: `${BR}/juice-monster/monster-energy-juice-pipeline-punch/`,
    nutrition: brNutrition(`${BR}/juice-monster/monster-energy-juice-pipeline-punch/`, {
      caffeineMg: 144,
      caloriesKcal: 142,
      sugarG: 38,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'ultra-fiesta-mango',
    name: 'Monster Ultra Fiesta Mango',
    shortName: 'Ultra Fiesta Mango',
    line: 'ultra',
    lineLabel: LINE_LABELS.ultra,
    tagline: 'Manga tropical na versão Ultra, sem açúcar.',
    flavorDescription:
      'Versão zero açúcar da linha Ultra com sabor tropical de manga. Mais leve e menos doce que os Monster tradicionais, mantendo o blend energético completo.',
    tastingNotes: ['Manga'],
    profile: ['Tropical', 'Frutado', 'Leve'],
    differentiator: 'Manga sem açúcar: o perfil leve da linha Ultra com fruta tropical.',
    sugarFree: true,
    colors: {
      accent: '#2BB7A9',
      secondary: '#F39A2B',
      packaging: ['Verde-água', 'Laranja', 'Desenhos festivos'],
    },
    officialUrl: `${BR}/monster-ultra/monster-ultra-fiesta/`,
    nutrition: brNutrition(
      `${BR}/monster-ultra/monster-ultra-fiesta/`,
      { caffeineMg: null, caloriesKcal: 14, sugarG: 0 },
      'A página brasileira não exibe a quantidade de cafeína. Sites oficiais de outros países informam 150 mg por lata, mas com volumes diferentes (16 oz / 500 ml), então o valor não é mostrado como confirmado.',
    ),
    opinion: emptyOpinion(),
  },
  {
    id: 'ultra-peachy-keen',
    name: 'Monster Energy Ultra Peachy Keen',
    shortName: 'Ultra Peachy Keen',
    line: 'ultra',
    lineLabel: LINE_LABELS.ultra,
    tagline: 'Pêssego refrescante, zero açúcar.',
    flavorDescription:
      'Sabor de pêssego com o blend da Monster Energy, sem açúcares. Uma opção frutada, suave e refrescante dentro da linha Ultra.',
    tastingNotes: ['Pêssego'],
    profile: ['Frutado', 'Leve', 'Doce'],
    differentiator: 'Único da seleção com pêssego como sabor principal.',
    sugarFree: true,
    colors: {
      accent: '#F7A08A',
      secondary: '#FFD6C9',
      packaging: ['Pêssego / salmão', 'Branco', 'Traços em preto'],
    },
    officialUrl: `${BR}/monster-ultra/monster-energy-ultra-peachy-keen/`,
    nutrition: brNutrition(`${BR}/monster-ultra/monster-energy-ultra-peachy-keen/`, {
      caffeineMg: 150,
      caloriesKcal: 10,
      sugarG: 0,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'ultra-violet',
    name: 'Monster Energy Ultra Violet',
    shortName: 'Ultra Violet',
    line: 'ultra',
    lineLabel: LINE_LABELS.ultra,
    tagline: 'Doce e levemente ácido, com clima anos 70.',
    flavorDescription:
      'Refrescante, com sabor doce e um toque ácido. Em outros mercados a Monster descreve o perfil como cítrico leve com uva. Inspirado na estética psicodélica dos anos 70.',
    tastingNotes: ['Uva', 'Cítrico leve'],
    profile: ['Doce', 'Cítrico', 'Leve'],
    differentiator: 'O "Monster roxo": combinação de doce e ácido difícil de comparar.',
    sugarFree: true,
    colors: {
      accent: '#A06BFF',
      secondary: '#5B2BD9',
      packaging: ['Roxo', 'Lilás', 'Garra prateada'],
    },
    officialUrl: `${BR}/monster-ultra/monster-energy-ultra-violet/`,
    nutrition: brNutrition(`${BR}/monster-ultra/monster-energy-ultra-violet/`, {
      caffeineMg: 147,
      caloriesKcal: 14,
      sugarG: 0,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'ultra-strawberry-dreams',
    name: 'Monster Ultra Strawberry Dreams',
    shortName: 'Ultra Strawberry Dreams',
    line: 'ultra',
    lineLabel: LINE_LABELS.ultra,
    tagline: 'Morango doce com um toque de acidez.',
    flavorDescription:
      'Sabor de morango, doce e com leve acidez, suave e sem açúcares. Mantém o mix energético da Monster na versão Ultra.',
    tastingNotes: ['Morango'],
    profile: ['Frutado', 'Doce', 'Leve'],
    differentiator: 'Morango suave e "sonhador", com menos calorias da seleção.',
    sugarFree: true,
    colors: {
      accent: '#F49AC2',
      secondary: '#E8505B',
      packaging: ['Rosa-claro', 'Vermelho', 'Ilustrações em linha'],
    },
    officialUrl: `${BR}/monster-ultra/monster-ultra-strawberry-dreams/`,
    nutrition: brNutrition(`${BR}/monster-ultra/monster-ultra-strawberry-dreams/`, {
      caffeineMg: 147,
      caloriesKcal: 9,
      sugarG: 0,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'absolutely-zero',
    name: 'Monster Energy Absolutely Zero',
    shortName: 'Absolutely Zero',
    line: 'classic',
    lineLabel: LINE_LABELS.classic,
    tagline: 'O sabor do original, sem açúcares.',
    flavorDescription:
      'Traz o sabor clássico da Monster Energy com um leve toque cítrico, menos calorias e zero açúcares. No varejo também é descrito como doce e salgado com toque cítrico.',
    tastingNotes: ['Sabor Monster clássico', 'Toque cítrico'],
    profile: ['Clássico', 'Cítrico'],
    differentiator: 'É o Original repensado sem açúcar — faz parte da linha clássica, não da Ultra.',
    sugarFree: true,
    colors: {
      accent: '#5EC8F2',
      secondary: '#1F6FA8',
      packaging: ['Preto', 'Azul-claro', 'Garra prateada'],
    },
    officialUrl: `${BR}/monster-energy/monster-energy-absolutely-zero/`,
    nutrition: brNutrition(`${BR}/monster-energy/monster-energy-absolutely-zero/`, {
      caffeineMg: 142,
      caloriesKcal: 14,
      sugarG: 0,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'ultra-white',
    name: 'Monster Energy Ultra White',
    shortName: 'Ultra White',
    line: 'ultra',
    lineLabel: LINE_LABELS.ultra,
    tagline: 'Cítrico, leve e sem açúcar.',
    flavorDescription:
      'Sabor cítrico, mais refrescante e mais leve, sem açúcar e com a carga completa do blend energético da Monster. É o sabor que deu origem à linha Ultra.',
    tastingNotes: ['Cítrico'],
    profile: ['Cítrico', 'Leve'],
    differentiator: 'O "White Monster": o mais leve e menos doce da seleção.',
    sugarFree: true,
    colors: {
      accent: '#E6EEF3',
      secondary: '#9AA7B2',
      packaging: ['Branco', 'Prata', 'Detalhes azul-claro'],
    },
    officialUrl: `${BR}/monster-ultra/monster-energy-zero-ultra/`,
    nutrition: brNutrition(`${BR}/monster-ultra/monster-energy-zero-ultra/`, {
      caffeineMg: 147,
      caloriesKcal: 14,
      sugarG: 0,
    }),
    opinion: emptyOpinion(),
  },
  {
    id: 'original-green',
    name: 'Monster Energy Original Green',
    shortName: 'Original Green',
    line: 'classic',
    lineLabel: LINE_LABELS.classic,
    tagline: 'O clássico que começou tudo.',
    flavorDescription:
      'O sabor original da Monster: marcante e ao mesmo tempo suave. Em outros países a marca o descreve como doce e salgado, com notas cítricas.',
    tastingNotes: ['Sabor Monster clássico', 'Doce', 'Notas cítricas'],
    profile: ['Clássico', 'Doce'],
    differentiator: 'A lata preta com a garra verde — referência de toda a marca.',
    sugarFree: false,
    colors: {
      accent: '#95D600',
      secondary: '#2F6B00',
      packaging: ['Preto', 'Garra verde'],
    },
    officialUrl: `${BR}/monster-energy/monster-energy-original/`,
    nutrition: brNutrition(`${BR}/monster-energy/monster-energy-original/`, {
      caffeineMg: 156,
      caloriesKcal: 170,
      sugarG: 40,
    }),
    opinion: emptyOpinion(),
  },
];

export const monsters: Monster[] = raw.map((m) => ({ ...m, image: monsterImages[m.id] }));

/** Ids usados pelo script de imagens (mantém os dois arquivos em sincronia). */
export const monsterIds = monsters.map((m) => m.id);
