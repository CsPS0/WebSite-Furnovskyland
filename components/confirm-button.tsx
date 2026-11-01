"use client";

import type { ReactNode } from "react";

/** A submit button that asks first, for actions that can't be undone. */
export function ConfirmButton({ message, className, children }: { message: string; className: string; children: ReactNode }) {
  return (
    <button className={className} onClick={(e) => !confirm(message) && e.preventDefault()}>
      {children}
    </button>
  );
}
