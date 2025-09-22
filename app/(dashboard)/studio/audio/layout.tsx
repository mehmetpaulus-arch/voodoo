import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio Studio - ZDF Assistant',
  description: 'Audioproduktion und -bearbeitung',
};

export default function AudioStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}