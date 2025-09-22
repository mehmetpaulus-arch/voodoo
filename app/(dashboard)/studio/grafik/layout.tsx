import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grafik Studio - ZDF Assistant',
  description: 'Grafikdesign und -bearbeitung',
};

export default function GrafikStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}