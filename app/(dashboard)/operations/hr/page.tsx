'use client';

import React from 'react';
import { 
  Users,
  UserPlus,
  Calendar,
  FileText,
  BarChart3,
  Award,
  Clock,
  Settings,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const hrPanels = [
  {
    id: 'mitarbeiter-verwaltung',
    title: 'Mitarbeiter-Verwaltung',
    subtitle: 'Personal-Stammdaten verwalten',
    icon: Users,
    color: 'bg-[#F2F2F2]',
    href: '/operations/hr/mitarbeiter-verwaltung'
  },
  {
    id: 'recruiting',
    title: 'Recruiting',
    subtitle: 'Stellenausschreibungen und Bewerbungen',
    icon: UserPlus,
    color: 'bg-[#E37222]',
    href: '/operations/hr/recruiting'
  },
  {
    id: 'urlaubsplanung',
    title: 'Urlaubsplanung',
    subtitle: 'Abwesenheiten koordinieren',
    icon: Calendar,
    color: 'bg-[#F2F2F2]',
    href: '/operations/hr/urlaubsplanung'
  },
  {
    id: 'arbeitszeiten',
    title: 'Arbeitszeiten',
    subtitle: 'Zeiterfassung und Schichtplanung',
    icon: Clock,
    color: 'bg-[#E37222]',
    href: '/operations/hr/arbeitszeiten'
  },
  {
    id: 'performance-reviews',
    title: 'Performance Reviews',
    subtitle: 'Mitarbeiter-Bewertungen',
    icon: Award,
    color: 'bg-[#F2F2F2]',
    href: '/operations/hr/performance-reviews'
  },
  {
    id: 'schulungen',
    title: 'Schulungen',
    subtitle: 'Weiterbildung und Training',
    icon: FileText,
    color: 'bg-[#E37222]',
    href: '/operations/hr/schulungen'
  },
  {
    id: 'hr-analytics',
    title: 'HR Analytics',
    subtitle: 'Personal-Kennzahlen',
    icon: BarChart3,
    color: 'bg-[#F2F2F2]',
    href: '/operations/hr/analytics'
  },
  {
    id: 'hr-settings',
    title: 'HR Einstellungen',
    subtitle: 'System-Konfiguration',
    icon: Settings,
    color: 'bg-[#E37222]',
    href: '/operations/hr/einstellungen'
  }
];

export default function HrPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Zurück</span>
        </Link>
        
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
          panels={hrPanels}
          title="Human Resources"
          subtitle="Personal-Management und Mitarbeiter-Services"
        />
      </div>
    </div>
  );
}