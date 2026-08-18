import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
  async redirects() {
    // Static config redirect rather than middleware, so nothing runs at request
    // time and every real page stays fully prerendered.
    return [
      { source: "/", destination: `/${defaultLocale}`, permanent: false },
    ];
  },
};

export default nextConfig;
