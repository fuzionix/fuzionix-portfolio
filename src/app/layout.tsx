import type { Metadata } from "next";
import { Space_Grotesk, Stack_Sans_Headline } from "next/font/google";
import "./globals.css";

const stackSans = Stack_Sans_Headline({
  subsets: ["latin"],
  variable: "--font-stack-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
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
      <body className={`${stackSans.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}