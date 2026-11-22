import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { OSProvider } from "@/lib/os-context";
import "./globals.css";
import "@/styles/icons.css";
import "@/styles/os.css";
import "@/styles/apps.css";
import "@/styles/overlays.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Furqan Khan | Portfolio OS",
  description:
    "An interactive macOS-inspired portfolio for Furqan Khan, a full-stack developer and Master of Computer Applications graduate.",
  applicationName: "Portfolio OS",
  authors: [{ name: "Furqan Khan", url: "https://github.com/fk219" }],
  creator: "Furqan Khan",
  keywords: [
    "Furqan Khan",
    "full-stack developer",
    "portfolio",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "macOS",
  ],
  openGraph: {
    title: "Furqan Khan | Portfolio OS",
    description:
      "Explore Furqan Khan's work through an interactive desktop: a working Finder, Safari, Mail, Notes, Terminal, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furqan Khan | Portfolio OS",
    description:
      "An interactive macOS-inspired portfolio for full-stack developer Furqan Khan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a2230" },
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <OSProvider>{children}</OSProvider>
      </body>
    </html>
  );
}
