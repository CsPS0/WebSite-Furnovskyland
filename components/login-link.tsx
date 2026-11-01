"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Login sends people back to the page they were on. A plain <a>: the API route must not be prefetched. */
export function LoginLink({ className, children }: { className: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <a href={`/api/auth/login/?next=${encodeURIComponent(pathname)}`} className={className}>
      {children}
    </a>
  );
}
