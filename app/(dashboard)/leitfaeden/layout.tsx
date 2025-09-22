import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leitfäden - ZDF Assistant',
  description: 'Richtlinien, Standards und Best Practices',
};

export default function LeitfaedenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}