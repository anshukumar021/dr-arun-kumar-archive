import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Arun Kumar | Hindi Scholar, Author & Retired Head of Hindi (Ranchi University)",
  description: "Explore the literary legacy, publications, digital library, and academic criticism of Dr. Arun Kumar, distinguished Hindi scholar, public intellectual, and cultural thinker.",
  keywords: ["Dr. Arun Kumar", "Arun Kumar Hindi", "Hindi Scholar Ranchi University", "Hindi Literary Critic", "Hindi Literature Archive", "Cinema Studies Hindi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory text-charcoal selection:bg-gold/20 selection:text-gold-dark">
        {children}
      </body>
    </html>
  );
}
