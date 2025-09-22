'use client';

import React from 'react';
import { 
  FileText,
  Star,
  Bug,
  Zap,
  Shield,
  Calendar,
  Tag,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const releases = [
  {
    version: 'v2.4.0',
    date: '27. Januar 2025',
    type: 'major',
    highlights: [
      'Neues Factchecking-System mit wissenschaftlichen Quellen',
      'Verbesserte Transkriptions-Genauigkeit um 15%',
      'Erweiterte Reels-Konzept Funktionen'
    ],
    features: [
      'Multi-Source Factchecking (Tavily, Semantic Scholar, PubMed)',
      'Wolfram Alpha Integration für mathematische Berechnungen',
      'Batch-Upload für Transkriptionen',
      'Neue Slideshow-Templates',
      'Verbesserte Rechtschreibprüfung'
    ],
    improvements: [
      'Schnellere API-Antwortzeiten',
      'Optimierte Benutzeroberfläche',
      'Bessere Fehlerbehandlung',
      'Mobile Responsiveness verbessert'
    ],
    bugfixes: [
      'Behoben: Transkription bricht bei langen Dateien ab',
      'Behoben: Dropdown-Menüs funktionieren nicht auf Touch-Geräten',
      'Behoben: Speicher-Leak bei großen Chat-Verläufen'
    ]
  },
  {
    version: 'v2.3.2',
    date: '15. Januar 2025',
    type: 'patch',
    highlights: [
      'Kritische Sicherheitsupdates',
      'Performance-Optimierungen',
      'Bug-Fixes für Chat-System'
    ],
    features: [],
    improvements: [
      'Reduzierte Ladezeiten um 30%',
      'Verbesserte Caching-Strategien',
      'Optimierte Datenbankabfragen'
    ],
    bugfixes: [
      'Behoben: Chat-Nachrichten werden doppelt angezeigt',
      'Behoben: Login-Session läuft zu früh ab',
      'Behoben: Datei-Upload schlägt bei großen Dateien fehl'
    ]
  },
  {
    version: 'v2.3.0',
    date: '8. Januar 2025',
    type: 'minor',
    highlights: [
      'Neue Headlines-Entwicklung Funktion',
      'Erweiterte Compliance-Tools',
      'Team-Forum Beta-Launch'
    ],
    features: [
      'Headlines-Generator mit A/B-Testing',
      'Compliance-Dashboard',
      'Forum-System für Team-Kommunikation',
      'Erweiterte Suchfunktionen'
    ],
    improvements: [
      'Bessere Navigation zwischen Modulen',
      'Vereinfachte Benutzerregistrierung',
      'Erweiterte Exportfunktionen'
    ],
    bugfixes: [
      'Behoben: Sidebar kollabiert nicht korrekt',
      'Behoben: Falsche Zeitstempel in Transkriptionen',
      'Behoben: CSS-Konflikte bei modalen Dialogen'
    ]
  }
];

const getVersionBadge = (type: string) => {
  switch (type) {
    case 'major':
      return <Badge className="bg-red-100 text-red-800">Major Release</Badge>;
    case 'minor':
      return <Badge className="bg-blue-100 text-blue-800">Minor Release</Badge>;
    case 'patch':
      return <Badge className="bg-green-100 text-green-800">Patch Release</Badge>;
    default:
      return <Badge variant="outline">Release</Badge>;
  }
};

export default function ReleaseNotesPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/changelog">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Changelog
          </Button>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-12 py-16 px-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Release Notes
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Neue Features, Verbesserungen und Bug-Fixes in chronologischer Reihenfolge.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {releases.map((release, index) => (
            <Card key={index} className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tag className="w-6 h-6 text-blue-600" />
                    <div>
                      <CardTitle className="text-gray-900 text-2xl">{release.version}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{release.date}</span>
                      </div>
                    </div>
                  </div>
                  {getVersionBadge(release.type)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Highlights */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {release.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="text-blue-800 text-sm flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✨</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                {release.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      Neue Features
                    </h3>
                    <ul className="space-y-2">
                      {release.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">+</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Improvements */}
                {release.improvements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Verbesserungen
                    </h3>
                    <ul className="space-y-2">
                      {release.improvements.map((improvement, iIndex) => (
                        <li key={iIndex} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-blue-500 mt-1">↗</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bug Fixes */}
                {release.bugfixes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Bug className="w-5 h-5 text-red-600" />
                      Bug-Fixes
                    </h3>
                    <ul className="space-y-2">
                      {release.bugfixes.map((bugfix, bIndex) => (
                        <li key={bIndex} className="text-gray-700 text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">🐛</span>
                          {bugfix}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Subscribe to Updates */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                Update-Benachrichtigungen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Bleiben Sie über neue Releases informiert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white h-auto py-4 flex-col">
                  <Bell className="w-6 h-6 mb-2" />
                  <span>E-Mail Benachrichtigungen</span>
                  <span className="text-xs opacity-75">Bei neuen Major Releases</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>RSS Feed</span>
                  <span className="text-xs opacity-75">Alle Updates im Feed-Reader</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}