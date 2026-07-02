import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CONFAD APS – Coordinamento Nazionale Famiglie con Disabilità",
  description:
    "CONFAD APS è l'associazione di promozione sociale che tutela i diritti delle famiglie con disabilità in Italia. Lotta per il riconoscimento del Caregiver Familiare, advocacy politica e supporto psicologico.",
  keywords: "CONFAD, caregiver familiare, disabilità grave, non autosufficienza, legge caregiver, famiglie disabilità, terzo settore, tutele assistenziali, inclusione, #unaleggesubito",
  openGraph: {
    title: "CONFAD APS – Per la promozione e la tutela dei diritti delle famiglie con disabilità",
    description: "Diamo voce a chi si prende cura ogni giorno. Lotta per i diritti del Caregiver Familiare.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
