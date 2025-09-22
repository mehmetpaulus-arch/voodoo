'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FolderOpen,
  Image,
  Video,
  Music,
  FileText,
  Search,
  Upload,
  Download,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const assetsPanels = [
  {
    id: 'frame-io',
    title: 'Frame.io',
    subtitle: 'Externe Kollaborationsplattform',
    icon: ExternalLink,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    href: 'https://frame.io/home'
  },
  {
    id: 'images',
    title: 'Bilder',
    subtitle: 'Fotos und Grafiken verwalten',
    icon: Image,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'videos',
    title: 'Videos',
    subtitle: 'Videodateien und Clips',
    icon: Video,
    color: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    id: 'audio',
    title: 'Audio',
    subtitle: 'Musik und Soundeffekte',
    icon: Music,
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'documents',
    title: 'Dokumente',
    subtitle: 'PDFs und Textdateien',
    icon: FileText,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: 'search',
    title: 'Asset Suche',
    subtitle: 'KI-gestützte Mediensuche',
    icon: Search,
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
  },
  {
    id: 'upload',
    title: 'Upload Center',
    subtitle: 'Neue Assets hochladen',
    icon: Upload,
    color: 'bg-gradient-to-br from-gray-500 to-gray-600'
  },
  {
    id: 'export',
    title: 'Export & Sharing',
    subtitle: 'Assets teilen und exportieren',
    icon: Download,
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  },
  {
    id: 'collections',
    title: 'Sammlungen',
    subtitle: 'Asset-Kollektionen verwalten',
    icon: FolderOpen,
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  }
];

export default function AssetsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Zurück</span>
        </Link>
      </nav>
      
      <div className="px-8">
        <PanelGrid
          panels={assetsPanels}
          title="Assets"
          subtitle="Medienbibliothek und Asset-Management"
        />
      </div>
    </div>
  );
}