import type { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
