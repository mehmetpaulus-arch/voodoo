import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distribution - ZDF Assistant',
  description: 'Content-Verteilung und Publishing',
};

export default function DistributionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}