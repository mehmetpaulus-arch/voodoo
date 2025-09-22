'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Brain,
  Cpu,
  Database,
  Shield,
  BarChart3,
  Settings,
  Zap,
  Target,
  Users,
  FileText,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PanelGrid from '@/components/PanelGrid';
import NotificationDropdown from '@/components/NotificationDropdown';

const kiManagementPanels = [
  {
    id: 'ai-strategy',
    title: 'KI-Strategie',
    subtitle: 'KI-Roadmap und Ziele definieren',
    icon: Target,
    color: 'bg-gray-400'
  },
  {
    id: 'model-management',
    title: 'Model Management',
    subtitle: 'KI-Modelle verwalten und optimieren',
    icon: Brain,
    color: 'bg-gray-400'
  },
  {
    id: 'data-governance',
    title: 'Data Governance',
    subtitle: 'Datenqualität und -sicherheit sicherstellen',
    icon: Database,
    color: 'bg-[#E37222]'
  },
  {
    id: 'ai-ethics',
    title: 'KI-Ethik',
    subtitle: 'Ethische KI-Prinzipien umsetzen',
    icon: Shield,
    color: 'bg-[#E37222]'
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring',
    subtitle: 'KI-Systeme überwachen und optimieren',
    icon: BarChart3,
    color: 'bg-gray-400'
  },
  {
    id: 'ai-integration',
    title: 'KI-Integration',
    subtitle: 'KI in bestehende Prozesse integrieren',
    icon: Zap,
    color: 'bg-[#E37222]'
  }
];

export default function KIManagementPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-1 sm:gap-2 bg-[#E37222] text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium text-sm sm:text-base">Zurück</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <NotificationDropdown count={3} />
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              Leitfäden
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Redaktions-Workflows</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Styleguide (CI/CD)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Barrierefreiheit (WCAG)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">API-Dokumentation</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <a href="/forum" className="text-gray-800 hover:text-gray-900 transition-colors font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              Forum
            </a>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              Compliance
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              Changelog
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              Support
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <PanelGrid
          panels={kiManagementPanels}
          title="KI-Management"
          subtitle="KI-Strategien entwickeln, Modelle verwalten und ethische Standards sicherstellen"
        />
      </div>
    </div>
  );
}
