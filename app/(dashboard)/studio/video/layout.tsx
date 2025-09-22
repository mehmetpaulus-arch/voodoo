import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Studio - ZDF Assistant',
  description: 'Videoproduktion und -bearbeitung',
};

export default function VideoStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}