import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rechtschreibung & Grammatik - ZDF Assistant',
  description: 'Professionelle Textprüfung mit LanguageTool',
};

export default function RechtschreibungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}