import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    VITE_CHAT_API_URL: process.env.VITE_CHAT_API_URL || "http://localhost:8001",
  },
};

export default nextConfig;

