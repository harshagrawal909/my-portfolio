import type { Metadata } from "next";
import "./global.css";
import StarField from "@/components/effects/StarField";
import TechParticles from "@/components/effects/TechPartical";
import KeepAlive from "@/components/utils/KeepAlive";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsharsh.dev"),
  title: {
    default: "Harsh Agrawal | Full-Stack Developer & AI Systems Engineer",
    template: "%s | Harsh Agrawal",
  },
  description: "Portfolio of Harsh Agrawal, a Computer Science Engineer specializing in Full-Stack development, AI-driven solutions, and digital experiences.",
  keywords: [
    "Harsh Agrawal",
    "Harsh Agrawal Developer",
    "Harsh Agrawal KIIT",
    "Harsh Agrawal Portfolio",
    "Software Engineer",
    "KIIT University",
    "Full Stack Developer",
    "AI Systems Engineer",
    "React Developer",
    "Next.js Developer"
  ],
  authors: [{ name: "Harsh Agrawal", url: "https://itsharsh.dev" }],
  creator: "Harsh Agrawal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itsharsh.dev",
    title: "Harsh Agrawal | Full-Stack Developer & AI Systems Engineer",
    description: "Portfolio of Harsh Agrawal, a Computer Science Engineer specializing in Full-Stack development, AI-driven solutions, and digital experiences.",
    siteName: "Harsh Agrawal Portfolio",
    images: [
      {
        url: "/my-photo.jpeg",
        width: 1200,
        height: 630,
        alt: "Harsh Agrawal - Full-Stack Developer & AI Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Agrawal | Full-Stack Developer & AI Systems Engineer",
    description: "Portfolio of Harsh Agrawal, a Computer Science Engineer specializing in Full-Stack development, AI-driven solutions, and digital experiences.",
    images: ["/my-photo.jpeg"],
    creator: "@harshagrawal909",
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
  verification: {
    // Add the Google Search Console verification token here when received
    google: "YOUR_GOOGLE_VERIFICATION_TOKEN_HERE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StarField />
        <TechParticles />
        <KeepAlive />
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Harsh Agrawal",
              "url": "https://harshagrawal.dev", // Replace with your actual domain
              "image": "https://harshagrawal.dev/my-photo.jpeg",
              "sameAs": [
                "https://github.com/harshagrawal909",
                "https://linkedin.com/in/harshagrawal42",
                "https://instagram.com/harshagrawal909"
              ],
              "jobTitle": "Software Engineer & Full-Stack Developer",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "KIIT University"
              },
              "knowsAbout": [
                "Full-Stack Web Development",
                "AI Systems Engineering",
                "React",
                "Next.js",
                "Node.js",
                "Software Engineering",
                "Computer Science"
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}
