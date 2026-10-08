"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { LangProvider } from "@/lib/i18n";
import { CompareProvider } from "@/lib/compare";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <LangProvider>
        <CompareProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </CompareProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
