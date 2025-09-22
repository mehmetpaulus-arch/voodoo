import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const zdfTypeSemiBold = localFont({
  src: '../public/fonts/ZDFType-SemiBold.ttf',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZDF Assistant Kontrollzentrum',
  description: 'ZDF Assistant - KI-gestützte Website-Verwaltung',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={zdfTypeSemiBold.className}>{children}</body>
    </html>
  );
}
