'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Share2,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  TrendingUp,
  Calendar,
  BarChart3,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const socialPanels = [
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Stories, Reels und Posts verwalten',
    icon: Instagram,
    color: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    subtitle: 'Kurzvideo-Content optimieren',
    icon: Share2,
    color: 'bg-gradient-to-br from-black to-gray-800'
  },
  {
    id: 'youtube',
    title: 'YouTube',
    subtitle: 'Video-Content und Kanäle',
    icon: Youtube,
    color: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'Community-Management',
    icon: Facebook,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'twitter',
    title: 'X (Twitter)',
    subtitle: 'News und Real-time Updates',
    icon: Twitter,
    color: 'bg-gradient-to-br from-gray-800 to-black'
  },
  {
    id: 'content-planner',
    title: 'Content-Planer',
    subtitle: 'Cross-Platform Scheduling',
    icon: Calendar,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'social-analytics',
    title: 'Social Analytics',
    subtitle: 'Engagement und Reichweite',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'trending',
    title: 'Trending Topics',
    subtitle: 'Aktuelle Trends verfolgen',
    icon: TrendingUp,
    color: 'bg-[#F2F2F2]'
  }
];

export default function SocialPage() {
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
          panels={socialPanels}
          title="Social Media Distribution"
          subtitle="Content für soziale Medien optimieren und verteilen"
        />
      </div>
    </div>
  );
}