import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anmelden - ZDF Assistant',
  description: 'Melden Sie sich bei ZDF Assistant an',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}