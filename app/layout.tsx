import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "UBriss — Explose ta visibilité sur TikTok & Instagram",
  description:
    "UBriss génère tes scripts viraux, planifie tes publications et t'aide à comprendre ce qui cartonne en Afrique francophone. Paiement 100% Mobile Money.",
  manifest: "/manifest.json",
  applicationName: "UBriss",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "UBriss",
  },
  openGraph: {
    title: "UBriss — Explose ta visibilité sur TikTok & Instagram",
    description:
      "Scripts viraux générés par IA, planification multi-plateformes et paiement Mobile Money. Fait pour les créateurs et commerces d'Afrique francophone.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jakarta.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
