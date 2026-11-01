import http from "node:http";
import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

// Node 27 compatibility: Node 27 makes incoming headers null-prototype ({ __proto__: null }),
// which breaks packages and Next.js internals that call headers.hasOwnProperty(...).
// `_addHeaderLine` is internal, so @types/node doesn't declare it.
type AddHeaderLine = (field: string, val: string, dest: Record<string, unknown> | null) => void;
const incomingProto = http.IncomingMessage?.prototype as
  | (http.IncomingMessage & { _addHeaderLine?: AddHeaderLine })
  | undefined;
if (incomingProto?._addHeaderLine) {
  const origAddHeaderLine = incomingProto._addHeaderLine;
  incomingProto._addHeaderLine = function (
    field: string,
    val: string,
    dest: Record<string, unknown> | null
  ) {
    if (dest && Object.getPrototypeOf(dest) === null) {
      Object.setPrototypeOf(dest, Object.prototype);
    }
    return origAddHeaderLine.call(this, field, val, dest);
  };
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Keep the old Eleventy URLs (/en/politika/) working.
  trailingSlash: true,
  // PGlite (local dev database) loads its WASM from its own folder, which breaks when bundled.
  serverExternalPackages: ["@electric-sql/pglite"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withWorkflow(nextConfig);
