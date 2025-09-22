import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team-Forum - ZDF Assistant',
  description: 'Fragen stellen, Antworten finden, Wissen teilen',
};

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}