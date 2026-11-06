#!/usr/bin/env node
/**
 * Baixa as imagens oficiais das latas para /public/images/monsters/
 * e gera src/data/monsterImages.ts.
 *
 *   npm run images          → tenta baixar das páginas oficiais e depois registra
 *   npm run images:scan     → só registra arquivos que você colocou manualmente
 *
 * Como funciona:
 * 1. Para cada sabor, usa a URL direta definida em scripts/image-sources.json
 *    (se você preencher) ou lê a página oficial e pega a imagem do produto
 *    (meta og:image / twitter:image).
 * 2. Salva como <id>.<png|webp|jpg>.
 * 3. Varre a pasta e escreve o mapa usado pelo site.
 *
 * Depois de rodar, CONFIRA visualmente cada imagem (sabor certo, sem cortes).
 * Requer Node 18+ (fetch nativo).
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'images', 'monsters');
const mapFile = join(root, 'src', 'data', 'monsterImages.ts');
const sourcesFile = join(root, 'scripts', 'image-sources.json');

const BR = 'https://www.monsterenergy.com/pt-br/energy-drinks';
/** id → página oficial (mesmos ids de src/data/monsters.ts). */
const PAGES = {
  'juice-mango-loco': `${BR}/juice-monster/monster-energy-juice-mango-loco/`,
  'juice-pipeline-punch': `${BR}/juice-monster/monster-energy-juice-pipeline-punch/`,
  'ultra-fiesta-mango': `${BR}/monster-ultra/monster-ultra-fiesta/`,
  'ultra-peachy-keen': `${BR}/monster-ultra/monster-energy-ultra-peachy-keen/`,
  'ultra-violet': `${BR}/monster-ultra/monster-energy-ultra-violet/`,
  'ultra-strawberry-dreams': `${BR}/monster-ultra/monster-ultra-strawberry-dreams/`,
  'absolutely-zero': `${BR}/monster-energy/monster-energy-absolutely-zero/`,
  'ultra-white': `${BR}/monster-ultra/monster-energy-zero-ultra/`,
  'original-green': `${BR}/monster-energy/monster-energy-original/`,
};

const EXT = { 'image/png': 'png', 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/avif': 'avif' };
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
  'Accept-Language': 'pt-BR,pt;q=0.9',
};

const scanOnly = process.argv.includes('--scan-only');

async function loadOverrides() {
  if (!existsSync(sourcesFile)) return {};
  const json = JSON.parse(await readFile(sourcesFile, 'utf8'));
  return Object.fromEntries(Object.entries(json).filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v));
}

function findImageInHtml(html, pageUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return new URL(m[1].replace(/&amp;/g, '&'), pageUrl).href;
  }
  return null;
}

async function download(id, imageUrl) {
  const res = await fetch(imageUrl, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} ao baixar a imagem`);
  const type = (res.headers.get('content-type') || '').split(';')[0].trim();
  const ext = EXT[type] || imageUrl.match(/\.(png|webp|jpe?g|avif)(?:\?|$)/i)?.[1]?.replace('jpeg', 'jpg');
  if (!ext) throw new Error(`tipo de arquivo inesperado (${type || 'desconhecido'})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5_000) throw new Error('arquivo muito pequeno — provavelmente não é a lata');
  await writeFile(join(outDir, `${id}.${ext}`), buf);
  return { ext, kb: Math.round(buf.length / 1024) };
}

async function fetchAll() {
  const overrides = await loadOverrides();
  for (const [id, page] of Object.entries(PAGES)) {
    try {
      let imageUrl = overrides[id];
      if (!imageUrl) {
        const res = await fetch(page, { headers: { ...HEADERS, Accept: 'text/html' } });
        if (!res.ok) throw new Error(`HTTP ${res.status} na página oficial`);
        imageUrl = findImageInHtml(await res.text(), page);
        if (!imageUrl) throw new Error('imagem não encontrada no HTML da página');
      }
      const { ext, kb } = await download(id, imageUrl);
      console.log(`✔ ${id}.${ext} (${kb} KB) ← ${imageUrl}`);
    } catch (err) {
      console.warn(`✖ ${id}: ${err.message}\n  → Salve a imagem manualmente como public/images/monsters/${id}.png`);
      console.warn(`    ou cole a URL direta em scripts/image-sources.json. Página: ${page}`);
    }
  }
}

async function writeMap() {
  const files = existsSync(outDir) ? await readdir(outDir) : [];
  const entries = [];
  for (const id of Object.keys(PAGES)) {
    const file = ['webp', 'png', 'avif', 'jpg'].map((e) => `${id}.${e}`).find((f) => files.includes(f));
    if (file) entries.push(`  '${id}': '/images/monsters/${file}',`);
  }
  const content = `// ARQUIVO GERADO por scripts/fetch-images.mjs — não edite à mão.
// Mapeia o id de cada Monster para o arquivo em /public/images/monsters/.
// Enquanto estiver vazio, o site mostra um placeholder identificado.
export const monsterImages: Partial<Record<string, string>> = {${entries.length ? `\n${entries.join('\n')}\n` : ''}};
`;
  await writeFile(mapFile, content);
  console.log(`\n${entries.length}/9 imagens registradas em src/data/monsterImages.ts`);
  const missing = Object.keys(PAGES).filter((id) => !entries.some((e) => e.includes(`'${id}'`)));
  if (missing.length) console.log(`Ainda sem imagem (placeholder): ${missing.join(', ')}`);
  console.log('Confira cada imagem visualmente antes de publicar.');
}

await mkdir(outDir, { recursive: true });
if (!scanOnly) await fetchAll();
await writeMap();
