import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innovation Lab - ZDF Assistant',
  description: 'Ideenentwicklung und experimentelle Projekte',
};

export default function InnovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}