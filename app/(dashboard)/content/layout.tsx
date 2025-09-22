import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Hub',
};

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}