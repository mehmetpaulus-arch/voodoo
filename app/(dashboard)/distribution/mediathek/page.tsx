'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PlayCircle,
  Library,
  Search,
  Filter,
  Download,
  Share2,
  BarChart3,
  Clock,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const mediathekPanels = [
  {
    id: 'content-upload',
    title: 'Content Upload',
    subtitle: 'Videos in die Mediathek hochladen',
    icon: PlayCircle,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'mediathek-cms',
    title: 'Mediathek CMS',
    subtitle: 'Inhalte verwalten und organisieren',
    icon: Library,
    color: 'bg-[#E37222]'
  },
  {
    id: 'search-optimization',
    title: 'Such-Optimierung',
    subtitle: 'Findbarkeit verbessern',
    icon: Search,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'content-filtering',
    title: 'Content-Filter',
    subtitle: 'Kategorisierung und Tagging',
    icon: Filter,
    color: 'bg-[#E37222]'
  },
  {
    id: 'download-management',
    title: 'Download-Management',
    subtitle: 'Offline-Verfügbarkeit steuern',
    icon: Download,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'sharing-tools',
    title: 'Sharing-Tools',
    subtitle: 'Social Sharing und Embeds',
    icon: Share2,
    color: 'bg-[#E37222]'
  },
  {
    id: 'mediathek-analytics',
    title: 'Mediathek Analytics',
    subtitle: 'Nutzungsstatistiken und Trends',
    icon: BarChart3,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'scheduling',
    title: 'Zeitgesteuerte Veröffentlichung',
    subtitle: 'Automatisches Publishing',
    icon: Clock,
    color: 'bg-[#E37222]'
  }
];

export default function MediathekPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Zurück</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <PanelGrid
          panels={mediathekPanels}
          title="ZDF Mediathek"
          subtitle="Content-Management für die ZDF Mediathek"
        />
      </div>
    </div>
  );
}