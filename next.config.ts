import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `postgres` ships native bindings and must stay outside the server bundle.
  serverExternalPackages: ["postgres"],

  experimental: {
    // Server Function request bodies default to 1MB, which is smaller than a
    // single phone screenshot. Gallery uploads are capped at 5MB per file
    // (see MAX_IMAGE_BYTES in lib/storage.ts, matching the bucket's
    // file_size_limit), and this leaves headroom for multipart overhead.
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },

  images: {
    // Gallery screenshots are served from a Supabase public bucket, so
    // next/image needs the host allowlisted. The pathname is constrained too so
    // the wildcard cannot be pointed at another project on the same host.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zunulpyfjkramvebvzvy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
