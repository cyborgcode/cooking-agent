/**
 * Remplit `lib/data/recipe-images.json` à partir d'une recherche web.
 *
 *   TAVILY_API_KEY=... node scripts/fetch-recipe-images.mjs
 *
 * À lancer à la main, jamais pendant un rendu : le manifeste produit est
 * versionné, et c'est lui que l'application lit. Les entrées déjà présentes
 * sont conservées, ce qui permet de corriger une image à la main sans que
 * le script ne l'écrase au passage suivant.
 *
 * Seules des sources sous licence libre sont interrogées : afficher une
 * photo de cuisine trouvée au hasard sur le web serait une contrefaçon.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = join(HERE, "..", "lib", "data", "recipe-images.json");
const RECIPES_DIR = join(HERE, "..", "lib", "data");

const ENDPOINT = process.env.TAVILY_API_URL ?? "https://api.tavily.com/search";
const API_KEY = process.env.TAVILY_API_KEY;
const ALLOWED_HOST = "upload.wikimedia.org";
const OPEN_DOMAINS = ["commons.wikimedia.org", "wikipedia.org"];
const IMAGE_EXTENSION = /\.(jpe?g|png|webp)$/i;

if (!API_KEY) {
  console.error("TAVILY_API_KEY manquante. Rien n'a été modifié.");
  process.exit(1);
}

/** Extrait les plats des fichiers de recettes sans compiler le TypeScript. */
function readDishes() {
  const dishes = [];
  for (const file of ["recipes.ts", "recipes-italiennes.ts"]) {
    const source = readFileSync(join(RECIPES_DIR, file), "utf8");
    const entries = source.matchAll(
      /slug: "([a-z-]+)",\s*\n\s*name: \{ fr: "([^"]+)"/g,
    );
    for (const [, slug, name] of entries) dishes.push({ slug, name });
  }
  return dishes;
}

async function searchImage(dish) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      query: `${dish.name} plat cuisine`,
      max_results: 6,
      search_depth: "advanced",
      include_images: true,
      include_image_descriptions: true,
      include_domains: OPEN_DOMAINS,
    }),
  });

  if (!response.ok) {
    console.warn(`  ! ${dish.slug} : HTTP ${response.status}`);
    return null;
  }

  const payload = await response.json();
  const images = (payload.images ?? []).map((image) =>
    typeof image === "string" ? { url: image } : image,
  );

  const candidate = images.find((image) => {
    if (typeof image?.url !== "string") return false;
    try {
      const parsed = new URL(image.url);
      return (
        parsed.protocol === "https:" &&
        parsed.hostname === ALLOWED_HOST &&
        IMAGE_EXTENSION.test(parsed.pathname)
      );
    } catch {
      return false;
    }
  });

  if (!candidate) return null;
  const page = payload.results?.[0];

  return {
    url: candidate.url,
    sourcePage: page?.url ?? "https://commons.wikimedia.org",
    sourceTitle: candidate.description || page?.title || dish.name,
    fetchedAt: new Date().toISOString(),
  };
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const dishes = readDishes();
const force = process.argv.includes("--force");
let added = 0;

console.log(`${dishes.length} plats à illustrer.\n`);

for (const dish of dishes) {
  if (manifest[dish.slug] && !force) {
    console.log(`  = ${dish.slug} (déjà présent)`);
    continue;
  }
  try {
    const image = await searchImage(dish);
    if (image) {
      manifest[dish.slug] = image;
      added += 1;
      console.log(`  + ${dish.slug}`);
    } else {
      console.log(`  - ${dish.slug} : aucune image libre trouvée`);
    }
  } catch (error) {
    console.warn(`  ! ${dish.slug} : ${error.message}`);
  }
}

writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\n${added} image(s) ajoutée(s). Manifeste : ${MANIFEST_PATH}`);
console.log("Relisez les images avant de committer : une recherche peut se tromper de plat.");
