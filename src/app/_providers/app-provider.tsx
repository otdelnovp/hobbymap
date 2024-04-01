"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { AppSessionProvider } from "@/kernel/lib/next-auth/client";
import { ComposeChildren } from "@/shared/lib/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <ThemeProvider />
      <AppSessionProvider />
      {children}
    </ComposeChildren>
  );
}
