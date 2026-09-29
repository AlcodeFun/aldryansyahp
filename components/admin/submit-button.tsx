"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/**
 * Submit button that reflects the enclosing form's pending state via
 * `useFormStatus`, which must be read from a child of the <form>.
 */
export function SubmitButton({
  children,
  pendingLabel,
  className = "",
  pendingClassName = "opacity-60",
  ...rest
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
  pendingClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} ${pending ? pendingClassName : ""}`.trim()}
      {...rest}
    >
      {pending ? (pendingLabel ?? children) : children}
    </button>
  );
}
