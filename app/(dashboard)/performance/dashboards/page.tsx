'use client';

import React from 'react';
import { 
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Monitor,
  Smartphone,
  Globe,
  Users,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const dashboardPanels = [
  {
    id: 'audience-dashboard',
    title: 'Audience Dashboard',
    subtitle: 'Zielgruppen-Analyse in Echtzeit',
    icon: Users,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'content-dashboard',
    title: 'Content Dashboard',
    subtitle: 'Content-Performance verfolgen',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'social-dashboard',
    title: 'Social Media Dashboard',
    subtitle: 'Social Media Metriken',
    icon: Globe,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'technical-dashboard',
    title: 'Technical Dashboard',
    subtitle: 'System-Performance und Uptime',
    icon: Activity,
    color: 'bg-[#E37222]'
  },
  {
    id: 'mobile-dashboard',
    title: 'Mobile Dashboard',
    subtitle: 'Mobile App Statistiken',
    icon: Smartphone,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'web-dashboard',
    title: 'Web Dashboard',
    subtitle: 'Website-Analytics',
    icon: Monitor,
    color: 'bg-[#E37222]'
  },
  {
    id: 'custom-dashboard',
    title: 'Custom Dashboard',
    subtitle: 'Personalisierte Dashboards',
    icon: PieChart,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'executive-dashboard',
    title: 'Executive Dashboard',
    subtitle: 'Management-Übersicht',
    icon: LineChart,
    color: 'bg-[#E37222]'
  }
];

export default function DashboardsPage() {
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
          panels={dashboardPanels}
          title="Performance Dashboards"
          subtitle="Interaktive Daten-Visualisierung und Analytics"
        />
      </div>
    </div>
  );
}