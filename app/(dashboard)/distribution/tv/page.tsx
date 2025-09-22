'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Tv,
  Radio,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Settings,
  PlayCircle,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const tvPanels = [
  {
    id: 'sendeplaner',
    title: 'Sendeplaner',
    subtitle: 'TV-Programm planen und verwalten',
    icon: Calendar,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'live-streaming',
    title: 'Live-Streaming',
    subtitle: 'Live-Übertragungen steuern',
    icon: Radio,
    color: 'bg-[#E37222]'
  },
  {
    id: 'sendezeiten',
    title: 'Sendezeiten',
    subtitle: 'Optimale Sendezeiten analysieren',
    icon: Clock,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'zielgruppen',
    title: 'Zielgruppen-Analyse',
    subtitle: 'Viewer-Demographics und Präferenzen',
    icon: Users,
    color: 'bg-[#E37222]'
  },
  {
    id: 'quoten',
    title: 'Quoten-Dashboard',
    subtitle: 'Einschaltquoten in Echtzeit',
    icon: BarChart3,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'playout',
    title: 'Playout-Steuerung',
    subtitle: 'Technische Sendeabwicklung',
    icon: Settings,
    color: 'bg-[#E37222]'
  },
  {
    id: 'archiv-integration',
    title: 'Archiv-Integration',
    subtitle: 'Historisches Material einbinden',
    icon: PlayCircle,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'simulcast',
    title: 'Simulcast-Management',
    subtitle: 'Parallele Ausstrahlung koordinieren',
    icon: Tv,
    color: 'bg-[#E37222]'
  }
];

export default function TvPage() {
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
          panels={tvPanels}
          title="TV Distribution"
          subtitle="Fernsehausstrahlung und Programm-Management"
        />
      </div>
    </div>
  );
}