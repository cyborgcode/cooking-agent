import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Seul l'hôte des fichiers de Wikimedia Commons est autorisé : la liste
    // reste volontairement courte, une entrée trop large laisserait
    // l'optimiseur d'images servir n'importe quelle URL distante.
    remotePatterns: [{ protocol: "https", hostname: "upload.wikimedia.org" }],
  },
};

export default nextConfig;
