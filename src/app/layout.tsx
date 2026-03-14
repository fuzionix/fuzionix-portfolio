import type { Metadata, Viewport } from "next";
import { Stack_Sans_Headline, DM_Mono } from "next/font/google";
import { JsonLd } from "@/app/components/seo/JsonLd";
import "./globals.css";

const stackSans = Stack_Sans_Headline({
  subsets: ["latin"],
  variable: "--font-stack-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: "400",
});

const BASE_URL = "https://fuzionix.dev";

export const metadata: Metadata = {
  title: "Fuzionix | Taylon Chan",
  description: "Independent designer & developer specializing in digital craft.",
  applicationName: "Fuzionix",
  authors: [{ name: "Taylon Chan", url: BASE_URL }],
  creator: "Taylon Chan",
  publisher: "Fuzionix",
  generator: "Next.js",
  keywords: [
    "Taylon Chan",
    "Fuzionix",
    "UI Designer",
    "Full-Stack Developer",
    "Design Systems",
    "Creative Technology",
    "Product Design",
    "Front-End Engineering",
    "Hong Kong Developer",
    "Digital Craft",
    "Design Engineering",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  category: "portfolio",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Fuzionix",
    title: "Fuzionix — Taylon Chan",
    description: "Independent designer & developer specializing in digital craft, product design systems, and creative technology. Based in Hong Kong.",
    images: [
      {
        url: "/og/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Fuzionix — Taylon Chan · Independent Designer & Developer",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)",  color: "#141412" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`${stackSans.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}