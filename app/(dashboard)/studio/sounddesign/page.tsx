'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PlayCircle,
  AudioLines,
  SlidersHorizontal,
  Music,
  Upload,
  Download,
  Mic2,
  Radio,
  BarChart3,
  ArrowLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';
import NotificationDropdown from '@/components/NotificationDropdown';

// Core Features (Row 1)
const coreFeatures = [
  {
    id: 'audio-editor',
    title: 'Audio Editor (AI)',
    subtitle: 'Rauschen entfernen, Pegel, Mastering integriert',
    icon: SlidersHorizontal,
    color: 'bg-[#E37222]',
    href: '/studio/sounddesign/audio-editor'
  },
  {
    id: 'sound-effects',
    title: 'Soundeffekte',
    subtitle: 'KI-Soundeffekte & Effekte',
    icon: Music,
    color: 'bg-[#E37222]',
    href: '/studio/sounddesign/sound-effects'
  },
  {
    id: 'music-generator',
    title: 'Musikgenerator',
    subtitle: 'KI-generierte Musik',
    icon: Music,
    color: 'bg-[#E37222]',
    href: '/studio/sounddesign/music-generator'
  }
];

// Additional Tools (Row 2)
const additionalTools = [
  {
    id: 'new-project',
    title: 'Neues Projekt (AI)',
    subtitle: 'KI-Assistent für Audio-Projekte',
    icon: PlayCircle,
    color: 'bg-gray-400'
  },
  {
    id: 'speech-recognition',
    title: 'Spracherkennung (ASR)',
    subtitle: 'Automatische Transkription',
    icon: AudioLines,
    color: 'bg-gray-400'
  },
  {
    id: 'voice-cloning',
    title: 'Voice Cloning (TTS)',
    subtitle: 'Stimmen synthetisieren',
    icon: Mic2,
    color: 'bg-gray-400'
  },
  {
    id: 'upload',
    title: 'Upload & Analyse',
    subtitle: 'Qualitätsprüfung (AI)',
    icon: Upload,
    color: 'bg-gray-400'
  },
  {
    id: 'export',
    title: 'Export Optimizer',
    subtitle: 'MP3/WAV mit KI-Mastering',
    icon: Download,
    color: 'bg-gray-400'
  },
  {
    id: 'podcast-assistant',
    title: 'Podcast Assistent',
    subtitle: 'KI-Schnitt & Zusammenfassung',
    icon: Radio,
    color: 'bg-gray-400'
  }
];

export default function SounddesignPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <NotificationDropdown count={3} />
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
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
            <a href="/forum" className="text-gray-800 hover:text-gray-900 transition-colors font-medium text-xl">
              Forum
            </a>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
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
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
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
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Sounddesign</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KI-gestützte Audioproduktion und -bearbeitung
            </p>
          </div>

          {/* Core Features Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Core-Features für Bearbeitung & Generierung
              </h2>
              <p className="text-gray-600">
                Die wichtigsten Tools für professionelle Audioproduktion
              </p>
            </div>
            <PanelGrid
              panels={coreFeatures}
              title=""
              subtitle=""
            />
          </div>

          {/* Additional Tools Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Zusätzliche Tools
              </h2>
              <p className="text-gray-600">
                Erweiterte Funktionen für spezielle Anwendungsfälle
              </p>
            </div>
            <PanelGrid
              panels={additionalTools}
              title=""
              subtitle=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
