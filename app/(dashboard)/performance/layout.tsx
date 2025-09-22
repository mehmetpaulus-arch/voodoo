import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance - ZDF Assistant',
  description: 'KPIs, Dashboards und Reports',
};

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}