import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Überschriften - ZDF Assistant',
  description: 'Von der ersten Idee bis zur finalen Headline',
};

export default function HeadlinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}