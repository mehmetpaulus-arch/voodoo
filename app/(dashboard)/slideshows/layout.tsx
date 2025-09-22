import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Slideshows - ZDF Assistant',
  description: 'Storyboard, Bildabfolge und Textbausteine entwickeln',
};

export default function SlideshowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}