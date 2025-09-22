'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Archive,
  Search,
  Calendar,
  Film,
  Image,
  Music,
  FileText,
  Clock,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const archivPanels = [
  {
    id: 'video-archiv',
    title: 'Video-Archiv',
    subtitle: 'Historische Videoaufnahmen',
    icon: Film,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'foto-archiv',
    title: 'Foto-Archiv',
    subtitle: 'Bildmaterial und Fotografien',
    icon: Image,
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'audio-archiv',
    title: 'Audio-Archiv',
    subtitle: 'Tonaufnahmen und Interviews',
    icon: Music,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 'dokument-archiv',
    title: 'Dokument-Archiv',
    subtitle: 'Textdokumente und Skripte',
    icon: FileText,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: 'zeitraum-suche',
    title: 'Zeitraum-Suche',
    subtitle: 'Nach Datum und Epoche filtern',
    icon: Calendar,
    color: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    id: 'erweiterte-suche',
    title: 'Erweiterte Suche',
    subtitle: 'KI-gestützte Inhaltssuche',
    icon: Search,
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
  },
  {
    id: 'digitalisierung',
    title: 'Digitalisierung',
    subtitle: 'Analoge Medien digitalisieren',
    icon: Archive,
    color: 'bg-gradient-to-br from-gray-500 to-gray-600'
  },
  {
    id: 'aufbewahrung',
    title: 'Aufbewahrungsfristen',
    subtitle: 'Rechtliche Archivierung',
    icon: Clock,
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  }
];

export default function ArchivPage() {
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
          panels={archivPanels}
          title="Archiv"
          subtitle="Historisches Material und Langzeitarchivierung"
        />
      </div>
    </div>
  );
}