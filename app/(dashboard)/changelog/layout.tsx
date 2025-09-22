import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - ZDF Assistant',
  description: 'Systemstatus, Updates und Entwicklungsfortschritt',
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}