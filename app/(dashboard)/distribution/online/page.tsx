'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe,
  Smartphone,
  Monitor,
  Share2,
  BarChart3,
  Target,
  Zap,
  Users,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const onlinePanels = [
  {
    id: 'website-cms',
    title: 'Website CMS',
    subtitle: 'ZDF.de Content-Management',
    icon: Globe,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    subtitle: 'ZDF App Content-Distribution',
    icon: Smartphone,
    color: 'bg-[#E37222]'
  },
  {
    id: 'desktop-portal',
    title: 'Desktop Portal',
    subtitle: 'Web-basierte Inhalte optimieren',
    icon: Monitor,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'seo-optimization',
    title: 'SEO-Optimierung',
    subtitle: 'Suchmaschinenoptimierung',
    icon: Target,
    color: 'bg-[#E37222]'
  },
  {
    id: 'performance',
    title: 'Performance-Monitoring',
    subtitle: 'Ladezeiten und User Experience',
    icon: Zap,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'analytics',
    title: 'Web Analytics',
    subtitle: 'Nutzerverhalten und Statistiken',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'personalization',
    title: 'Personalisierung',
    subtitle: 'Individualisierte Inhalte',
    icon: Users,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'sharing',
    title: 'Content Sharing',
    subtitle: 'Social Sharing optimieren',
    icon: Share2,
    color: 'bg-[#E37222]'
  }
];

export default function OnlinePage() {
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
          panels={onlinePanels}
          title="Online Distribution"
          subtitle="Digitale Kanäle und Web-Präsenz optimieren"
        />
      </div>
    </div>
  );
}