'use client';

import React from 'react';
import { 
  BarChart3,
  TrendingUp,
  Target,
  PieChart,
  LineChart,
  Activity,
  Users,
  Globe,
  Bell
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const performancePanels = [
  {
    id: 'kpis',
    title: 'KPIs',
    subtitle: 'Key Performance Indicators',
    icon: Target,
    color: 'bg-[#F2F2F2]',
    href: '/performance/kpis'
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    subtitle: 'Interaktive Daten-Dashboards',
    icon: BarChart3,
    color: 'bg-[#E37222]',
    href: '/performance/dashboards'
  },
  {
    id: 'reports',
    title: 'Reports',
    subtitle: 'Automatisierte Berichte',
    icon: LineChart,
    color: 'bg-[#F2F2F2]',
    href: '/performance/reports'
  },
  {
    id: 'audience-analytics',
    title: 'Audience Analytics',
    subtitle: 'Zielgruppen-Analyse',
    icon: Users,
    color: 'bg-[#E37222]'
  },
  {
    id: 'content-performance',
    title: 'Content Performance',
    subtitle: 'Inhalts-Leistung messen',
    icon: TrendingUp,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'real-time-monitoring',
    title: 'Real-time Monitoring',
    subtitle: 'Live-Daten und Alerts',
    icon: Activity,
    color: 'bg-[#E37222]'
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Analytics',
    subtitle: 'Plattformübergreifende Analyse',
    icon: Globe,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'custom-metrics',
    title: 'Custom Metrics',
    subtitle: 'Benutzerdefinierte Kennzahlen',
    icon: PieChart,
    color: 'bg-[#E37222]'
  }
];

export default function PerformancePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-end px-8 py-6">
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
          panels={performancePanels}
          title="Performance Analytics"
          subtitle="Datenanalyse und Leistungsmessung"
        />
      </div>
    </div>
  );
}