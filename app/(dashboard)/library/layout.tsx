import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Library - ZDF Assistant',
  description: 'Medienbibliothek und Asset-Management',
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}