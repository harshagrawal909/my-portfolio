import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarField from "@/components/effects/StarField";
import TechParticles from "@/components/effects/TechPartical";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harsh Agrawal | Full-Stack Developer & AI Systems Engineer",
  description: "Portfolio of Harsh Agrawal, a Computer Science Engineer specializing in Full-Stack development, AI-driven solutions, and digital experiences.",
  keywords: ["Harsh Agrawal", "Software Engineer", "KIIT University", "Full Stack Developer", "AI Systems"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarField />
        <TechParticles />
        {children}
      </body>
    </html>
  );
}
