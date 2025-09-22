'use client';

import React from 'react';
import { 
  Target,
  Calendar,
  BarChart3,
  Users,
  Mail,
  Share2,
  Zap,
  Eye,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const kampagnenPanels = [
  {
    id: 'campaign-planner',
    title: 'Kampagnen-Planer',
    subtitle: 'Neue Kampagnen erstellen',
    icon: Calendar,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'target-groups',
    title: 'Zielgruppen',
    subtitle: 'Audience-Segmentierung',
    icon: Users,
    color: 'bg-[#E37222]'
  },
  {
    id: 'multi-channel',
    title: 'Multi-Channel',
    subtitle: 'Kanalübergreifende Kampagnen',
    icon: Share2,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'performance-tracking',
    title: 'Performance Tracking',
    subtitle: 'Kampagnen-Erfolg messen',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'email-campaigns',
    title: 'E-Mail Kampagnen',
    subtitle: 'Newsletter und Automation',
    icon: Mail,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'social-campaigns',
    title: 'Social Campaigns',
    subtitle: 'Social Media Marketing',
    icon: Share2,
    color: 'bg-[#E37222]'
  },
  {
    id: 'ab-testing',
    title: 'A/B Testing',
    subtitle: 'Kampagnen optimieren',
    icon: Target,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'automation',
    title: 'Marketing Automation',
    subtitle: 'Automatisierte Workflows',
    icon: Zap,
    color: 'bg-[#E37222]'
  }
];

export default function KampagnenPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/growth">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Growth
          </Button>
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
          panels={kampagnenPanels}
          title="Kampagnen-Management"
          subtitle="Marketing-Kampagnen planen, durchführen und optimieren"
        />
      </div>
    </div>
  );
}