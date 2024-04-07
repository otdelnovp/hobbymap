import type { Metadata, Viewport } from "next";

import "./globals.css";
import "reactflow/dist/style.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/shared/ui/utils";
import { AppProvider } from "./_providers/app-provider";
import { Toaster } from "@/shared/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Hobby Map",
    default: "Hobby Map",
  },
  description: "Locations for your hobby",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* polyfills */}
        <script
          src="https://unpkg.com/@ungap/global-this@0.4.4/min.js"
          noModule
          async
        ></script>
      </head>

      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-dvh bg-background font-sans antialiased flex flex-col items-stretch",
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
