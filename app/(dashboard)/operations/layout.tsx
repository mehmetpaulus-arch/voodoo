import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operations - ZDF Assistant',
  description: 'HR, Finanzen und IT-Support',
};

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}