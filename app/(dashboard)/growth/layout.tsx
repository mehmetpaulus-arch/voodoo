import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Growth - ZDF Assistant',
  description: 'Marketing, CRM und Kampagnen-Management',
};

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}