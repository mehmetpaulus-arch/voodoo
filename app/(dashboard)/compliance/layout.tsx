import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance - ZDF Assistant',
  description: 'Rechtliche Bestimmungen, Lizenzen und Datenschutz',
};

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}