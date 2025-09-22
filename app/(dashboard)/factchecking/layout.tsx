import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Factchecking - ZDF Assistant',
  description: 'Wissenschaftliche Faktenprüfung mit KI-Unterstützung',
};

export default function FactcheckingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}