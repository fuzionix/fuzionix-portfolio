import type { Metadata } from "next";
import { Stack_Sans_Headline, DM_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Fuzionix | Taylon Chan",
  description: "Independent designer & developer specializing in digital craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${stackSans.variable} ${dmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}