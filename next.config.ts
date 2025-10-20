import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    // Next otimizará as imagens do public/time/
    // automaticamente quando usadas com <Image />
    formats: ['image/avif', 'image/webp'], // gera versões modernas e leves
    // Permite otimizar imagens do diretório público local
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // mantém compatibilidade com imagens externas
      },
    ],
  },
};

export default nextConfig;
