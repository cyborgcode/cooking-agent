"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon, type IconName } from "@/components/icons";
import type { RecipeImage as RecipeImageData } from "@/lib/recipe-images";

/**
 * Photo d'un plat, avec repli sur son pictogramme.
 *
 * Toutes les recettes n'ont pas d'image : le manifeste ne couvre que celles
 * pour lesquelles une photo sous licence libre a été trouvée. L'absence
 * d'image n'est donc pas un défaut à masquer — le pictogramme reste un
 * affichage légitime, et c'est lui qu'on montre.
 *
 * Une URL peut aussi mourir entre deux régénérations du manifeste : en cas
 * d'échec de chargement, on retombe sur le même pictogramme plutôt que de
 * laisser un cadre vide.
 */
export function RecipeImage({
  image,
  fallbackIcon,
  alt,
  className = "",
  iconSize = 21,
  sizes,
  priority = false,
}: {
  image: RecipeImageData | null;
  fallbackIcon: IconName;
  alt: string;
  className?: string;
  iconSize?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  if (!image || broken) {
    return (
      <span
        className={`grid place-items-center bg-primary-soft text-primary ${className}`}
        aria-hidden
      >
        <Icon name={fallbackIcon} size={iconSize} />
      </span>
    );
  }

  return (
    <span className={`relative block overflow-hidden bg-surface-2 ${className}`}>
      <Image
        src={image.url}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 768px"}
        className="object-cover"
        priority={priority}
        onError={() => setBroken(true)}
      />
    </span>
  );
}

/**
 * Bandeau photo en tête de fiche, crédit compris.
 *
 * Contrairement à la vignette d'une carte, il ne se replie pas sur un
 * pictogramme : un grand cadre vide surmonté d'un crédit orphelin est plus
 * disgracieux que pas de photo du tout. Sans image — ou si l'URL a cessé de
 * répondre depuis la dernière génération du manifeste — le bandeau
 * disparaît, et la fiche commence directement par son titre.
 */
export function RecipeHero({
  image,
  alt,
}: {
  image: RecipeImageData | null;
  alt: string;
}) {
  const [broken, setBroken] = useState(false);

  if (!image || broken) return null;

  return (
    <figure>
      <span className="relative block aspect-[16/9] w-full overflow-hidden bg-surface-2">
        <Image
          src={image.url}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          priority
          onError={() => setBroken(true)}
        />
      </span>
      <figcaption className="px-4 pt-2">
        <a
          href={image.sourcePage}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[10px] text-muted hover:underline"
        >
          <Icon name="link" size={10} />
          <span className="truncate">{image.sourceTitle}</span>
        </a>
      </figcaption>
    </figure>
  );
}
