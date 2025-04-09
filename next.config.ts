import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 🔥 build 시 ESLint 에러 무시
  },
  output: "export", // ✅ 추가: 정적 사이트로 export 가능하게 설정
};

export default nextConfig;
