'use client';

import React from 'react';
import { 
  Activity,
  GitBranch,
  Map,
  Server,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Bell
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const changelogPanels = [
  {
    id: 'systemstatus',
    title: 'Systemstatus',
    subtitle: 'Aktuelle Verfügbarkeit und Performance',
    icon: Server,
    color: 'bg-[#F2F2F2]',
    href: '/changelog/systemstatus'
  },
  {
    id: 'release-notes',
    title: 'Release Notes',
    subtitle: 'Neue Features und Verbesserungen',
    icon: FileText,
    color: 'bg-[#E37222]',
    href: '/changelog/release-notes'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    subtitle: 'Geplante Features und Entwicklungen',
    icon: Map,
    color: 'bg-[#F2F2F2]',
    href: '/changelog/roadmap'
  },
  {
    id: 'version-history',
    title: 'Versionshistorie',
    subtitle: 'Chronologische Übersicht aller Updates',
    icon: GitBranch,
    color: 'bg-[#E37222]'
  },
  {
    id: 'performance-metrics',
    title: 'Performance Metriken',
    subtitle: 'System-Performance und Statistiken',
    icon: TrendingUp,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'maintenance',
    title: 'Wartungsfenster',
    subtitle: 'Geplante Wartungsarbeiten',
    icon: Clock,
    color: 'bg-[#E37222]'
  },
  {
    id: 'incident-reports',
    title: 'Incident Reports',
    subtitle: 'Störungsberichte und Lösungen',
    icon: AlertCircle,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'api-changes',
    title: 'API-Änderungen',
    subtitle: 'Breaking Changes und Deprecations',
    icon: Activity,
    color: 'bg-[#E37222]'
  },
  {
    id: 'security-updates',
    title: 'Sicherheitsupdates',
    subtitle: 'Security Patches und Fixes',
    icon: CheckCircle,
    color: 'bg-[#F2F2F2]'
  }
];

export default function ChangelogPage() {
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
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/leitfaeden/redaktions-workflows" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Redaktions-Workflows</a>
                <a href="/leitfaeden/styleguide" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Styleguide (CI/CD)</a>
                <a href="/leitfaeden/barrierefreiheit" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Barrierefreiheit (WCAG)</a>
                <a href="/leitfaeden/api-dokumentation" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">API-Dokumentation</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <a href="/forum" className="text-gray-300 hover:text-white transition-colors font-medium text-xl">
              Forum
            </a>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Compliance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/compliance/bild-musikrechte" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</a>
                <a href="/compliance/datenschutz" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</a>
                <a href="/compliance/archiv-lizenzen" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Changelog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/changelog/systemstatus" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</a>
                <a href="/changelog/release-notes" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</a>
                <a href="/changelog/roadmap" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</a>
                <a href="/support/ticket" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</a>
                <a href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <PanelGrid
          panels={changelogPanels}
          title="Changelog"
          subtitle="Systemstatus, Updates und Entwicklungsfortschritt"
        />
      </div>
    </div>
  );
}