'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText,
  Plus,
  Search,
  Filter,
  BookOpen,
  PenTool,
  Type,
  FileEdit,
  Clock,
  User,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Lightbulb,
  FileAudio,
  Video,
  Presentation,
  Image,
  CheckCircle,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PanelGrid from '@/components/PanelGrid';
import NotificationDropdown from '@/components/NotificationDropdown';

export default function ScriptsPage() {
  // Content Hub Panels für Scripts
  const contentPanels = [
    {
      id: 'brainstorming',
      title: 'Brainstorming',
      subtitle: 'Themen sammeln, bewerten und priorisieren',
      icon: Lightbulb,
      color: 'bg-gray-400',
      locked: true
    },
    {
      id: 'transkription',
      title: 'Transkription',
      subtitle: 'Audio- und Videomaterial verschriftlichen',
      icon: FileAudio,
      color: 'bg-gray-400',
      href: '/transcription',
      isReady: true
    },
    {
      id: 'factchecking2',
      title: 'Factchecking',
      subtitle: 'Multi-Agent Fact-Checking System',
      icon: CheckCircle,
      color: 'bg-gray-400',
      href: '/factchecking2',
      isReady: true
    },
    {
      id: 'reels',
      title: 'Reels',
      subtitle: 'Idee, Hook, Struktur für Kurzvideos',
      icon: Video,
      color: 'bg-[#E37222]',
      href: '/reels',
      inProgress: true
    },
    {
      id: 'slideshows',
      title: 'Slideshows',
      subtitle: 'Storyboard, Bildabfolge und Textbausteine',
      icon: Presentation,
      color: 'bg-[#E37222]',
      href: '/slideshows',
      inProgress: true
    },
    {
      id: 'sharepics',
      title: 'Sharepics',
      subtitle: 'Kernaussage, Bildidee und CI-Vorlagen',
      icon: Image,
      color: 'bg-[#E37222]',
      isReady: true
    },
    {
      id: 'ueberschriften',
      title: 'Überschriften',
      subtitle: 'Varianten testen: informativ, zugespitzt',
      icon: Type,
      color: 'bg-gray-400',
      href: '/headlines',
      isReady: true
    },
    {
      id: 'artikel',
      title: 'Artikel',
      subtitle: 'Gliederung, Schreibstil und Feinschliff',
      icon: FileText,
      color: 'bg-gray-400',
      inProgress: true
    },
    {
      id: 'rechtschreibung',
      title: 'Rechtschreibung',
      subtitle: 'Texte auf Fehler prüfen',
      icon: CheckCircle,
      color: 'bg-gray-400',
      href: '/rechtschreibung',
      isReady: true
    }
  ];

  // Mock data for scripts
  const scripts = [
    {
      id: 'SCRIPT-001',
      title: 'Wahl 2025 Hauptkampagne',
      type: 'TV-Script',
      status: 'Draft',
      author: 'Dr. Sarah Weber',
      created: '2024-06-15',
      lastModified: '2024-06-15',
      duration: '2:30',
      description: 'Hauptscript für die Wahl 2025 Kampagne'
    },
    {
      id: 'SCRIPT-002',
      title: 'Sommer-Programm Intro',
      type: 'Video-Script',
      status: 'Review',
      author: 'Tom Müller',
      created: '2024-06-14',
      lastModified: '2024-06-15',
      duration: '0:45',
      description: 'Intro-Script für das Sommer-Programm'
    },
    {
      id: 'SCRIPT-003',
      title: 'Nachrichten-Format',
      type: 'News-Script',
      status: 'Approved',
      author: 'Anna Schmidt',
      created: '2024-06-10',
      lastModified: '2024-06-12',
      duration: '5:00',
      description: 'Standard-Script für Nachrichten-Formate'
    }
  ];

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
          panels={contentPanels}
          title="Scripts"
          subtitle="Text- und Script-Erstellung mit Content Hub Tools"
        />
      </div>
    </div>
  );
}
