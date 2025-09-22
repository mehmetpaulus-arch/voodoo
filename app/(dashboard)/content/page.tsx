'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb,
  FileAudio,
  Video,
  Presentation,
  Image,
  Type,
  FileText,
  CheckCircle,
  Shield,
  Bell,
  ArrowLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const contentPanels = [
  {
    id: 'brainstorming',
    title: 'Brainstorming',
    subtitle: 'Themen sammeln, bewerten und priorisieren',
    icon: Lightbulb,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'transkription',
    title: 'Transkription',
    subtitle: 'Audio- und Videomaterial automatisch verschriftlichen',
    icon: FileAudio,
    color: 'bg-[#F2F2F2]',
    href: '/transcription'
  },
  {
    id: 'reels',
    title: 'Reels',
    subtitle: 'Idee, Hook, Struktur und Call-to-Action für Kurzvideos',
    icon: Video,
    color: 'bg-[#E37222]',
    href: '/reels'
  },
  {
    id: 'slideshows',
    title: 'Slideshows',
    subtitle: 'Storyboard, Bildabfolge und Textbausteine',
    icon: Presentation,
    color: 'bg-[#E37222]',
    href: '/slideshows'
  },
  {
    id: 'sharepics',
    title: 'Sharepics',
    subtitle: 'Kernaussage, Bildidee und CI-Textvorlagen',
    icon: Image,
    color: 'bg-[#E37222]'
  },
  {
    id: 'ueberschriften',
    title: 'Überschriften',
    subtitle: 'Varianten testen: informativ, zugespitzt, SEO',
    icon: Type,
    color: 'bg-[#F2F2F2]',
    href: '/headlines'
  },
  {
    id: 'artikel',
    title: 'Artikel',
    subtitle: 'Gliederung, Schreibstil und Feinschliff',
    icon: FileText,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'rechtschreibung',
    title: 'Rechtschreibung',
    subtitle: 'Texte auf Fehler prüfen und korrigieren',
    icon: CheckCircle,
    color: 'bg-[#F2F2F2]',
    href: '/rechtschreibung'
  }
];

export default function ContentPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 bg-[#FA7D19] hover:bg-[#E86D0A] text-white px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
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
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</a>
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
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</a>
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
                <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</Link>
                <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</Link>
                <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <PanelGrid
          panels={contentPanels}
          title="Content Hub"
          subtitle="Zentrale Verwaltung aller redaktionellen Inhalte"
        />
      </div>
    </div>
  );
}