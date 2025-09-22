'use client';

import React from 'react';
import { 
  Rocket,
  TrendingUp,
  Users,
  Target,
  Mail,
  BarChart3,
  Megaphone,
  Heart,
  Bell
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const growthPanels = [
  {
    id: 'marketing',
    title: 'Marketing',
    subtitle: 'Kampagnen und Werbemaßnahmen',
    icon: Megaphone,
    color: 'bg-[#F2F2F2]',
    href: '/growth/marketing'
  },
  {
    id: 'crm',
    title: 'Abo/CRM',
    subtitle: 'Kundenbindung und Abonnements',
    icon: Users,
    color: 'bg-[#E37222]',
    href: '/growth/crm'
  },
  {
    id: 'kampagnen',
    title: 'Kampagnen',
    subtitle: 'Marketing-Kampagnen planen',
    icon: Target,
    color: 'bg-[#F2F2F2]',
    href: '/growth/kampagnen'
  },
  {
    id: 'audience-development',
    title: 'Audience Development',
    subtitle: 'Zielgruppen erweitern',
    icon: TrendingUp,
    color: 'bg-[#E37222]'
  },
  {
    id: 'email-marketing',
    title: 'E-Mail Marketing',
    subtitle: 'Newsletter und Automation',
    icon: Mail,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'growth-analytics',
    title: 'Growth Analytics',
    subtitle: 'Wachstums-Metriken verfolgen',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'retention',
    title: 'User Retention',
    subtitle: 'Nutzerbindung optimieren',
    icon: Heart,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'conversion',
    title: 'Conversion Optimization',
    subtitle: 'Conversion-Rate verbessern',
    icon: Target,
    color: 'bg-[#E37222]'
  }
];

export default function GrowthPage() {
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
          panels={growthPanels}
          title="Growth & Marketing"
          subtitle="Wachstum fördern und Zielgruppen erweitern"
        />
      </div>
    </div>
  );
}