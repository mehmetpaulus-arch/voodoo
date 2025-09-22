import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - ZDF Assistant',
  description: 'Hilfe, Schulungen und technischer Support',
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}