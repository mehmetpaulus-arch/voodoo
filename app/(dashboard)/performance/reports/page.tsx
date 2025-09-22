'use client';

import React from 'react';
import { 
  FileText,
  Calendar,
  Download,
  Mail,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const reportPanels = [
  {
    id: 'weekly-reports',
    title: 'Wöchentliche Berichte',
    subtitle: 'Automatische Wochen-Zusammenfassungen',
    icon: Calendar,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'monthly-reports',
    title: 'Monatsberichte',
    subtitle: 'Detaillierte Monats-Analysen',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'quarterly-reports',
    title: 'Quartalsberichte',
    subtitle: 'Strategische Quartals-Übersichten',
    icon: TrendingUp,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'custom-reports',
    title: 'Custom Reports',
    subtitle: 'Benutzerdefinierte Berichte',
    icon: FileText,
    color: 'bg-[#E37222]'
  },
  {
    id: 'automated-reports',
    title: 'Automatisierte Berichte',
    subtitle: 'Geplante Report-Generierung',
    icon: Clock,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'email-reports',
    title: 'E-Mail Reports',
    subtitle: 'Berichte per E-Mail versenden',
    icon: Mail,
    color: 'bg-[#E37222]'
  },
  {
    id: 'export-center',
    title: 'Export Center',
    subtitle: 'Daten in verschiedene Formate',
    icon: Download,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'analytics-reports',
    title: 'Analytics Reports',
    subtitle: 'Tiefgehende Datenanalysen',
    icon: PieChart,
    color: 'bg-[#E37222]'
  }
];

export default function ReportsPage() {
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
          panels={reportPanels}
          title="Performance Reports"
          subtitle="Automatisierte Berichte und Datenexport"
        />
      </div>
    </div>
  );
}