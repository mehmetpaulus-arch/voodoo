import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZDF Studio - ZDF Assistant',
  description: 'Projekte planen, produzieren und veröffentlichen',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}