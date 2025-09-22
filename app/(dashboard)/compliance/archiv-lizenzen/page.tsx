'use client';

import React from 'react';
import { 
  Archive,
  Clock,
  FileText,
  Search,
  Download,
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

const archiveCategories = [
  {
    category: 'Historisches Filmmaterial',
    description: 'Archivaufnahmen und dokumentarisches Material',
    retention: '50+ Jahre',
    access: 'Eingeschränkt',
    examples: [
      'Nachrichtensendungen seit 1963',
      'Dokumentationen und Reportagen',
      'Sportübertragungen',
      'Kulturelle Veranstaltungen'
    ]
  },
  {
    category: 'Produktionsmaterial',
    description: 'Rohmaterial und Produktionsdaten',
    retention: '7 Jahre',
    access: 'Redaktionell',
    examples: [
      'Ungeschnittenes Filmmaterial',
      'Interview-Aufzeichnungen',
      'B-Roll Material',
      'Produktionsnotizen'
    ]
  },
  {
    category: 'Digitale Assets',
    description: 'Moderne digitale Inhalte',
    retention: '10 Jahre',
    access: 'Vollzugriff',
    examples: [
      'Online-Artikel und Texte',
      'Social Media Content',
      'Podcast-Aufzeichnungen',
      'Interaktive Inhalte'
    ]
  }
];

const licenseTypes = [
  {
    type: 'Vollrechte',
    description: 'Unbeschränkte Nutzung',
    color: 'bg-green-100 text-green-800',
    usage: 'Alle Medien, zeitlich unbegrenzt',
    cost: 'Hoch'
  },
  {
    type: 'Zeitlich begrenzt',
    description: 'Befristete Nutzungsrechte',
    color: 'bg-yellow-100 text-yellow-800',
    usage: 'Bestimmter Zeitraum (1-5 Jahre)',
    cost: 'Mittel'
  },
  {
    type: 'Einmalige Nutzung',
    description: 'Single-Use Lizenz',
    color: 'bg-blue-100 text-blue-800',
    usage: 'Nur für spezifisches Projekt',
    cost: 'Niedrig'
  },
  {
    type: 'Creative Commons',
    description: 'Freie Lizenzen',
    color: 'bg-purple-100 text-purple-800',
    usage: 'Je nach CC-Lizenz',
    cost: 'Kostenlos'
  }
];

const retentionPolicies = [
  { content: 'Nachrichtenmaterial', period: '50 Jahre', reason: 'Historischer Wert' },
  { content: 'Produktionsdaten', period: '7 Jahre', reason: 'Rechtliche Anforderungen' },
  { content: 'Nutzerdaten', period: '2 Jahre', reason: 'DSGVO-Compliance' },
  { content: 'System-Logs', period: '1 Jahr', reason: 'Technische Analyse' },
  { content: 'Temporäre Dateien', period: '30 Tage', reason: 'Speicheroptimierung' }
];

export default function ArchivLizenzenPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/compliance">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Compliance
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
          <div className="p-4 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
            <Archive className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Archiv & Lizenzen
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Archivmaterial-Management und Lizenzierung für ZDF-Produktionen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Archive Categories */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Archive className="w-5 h-5 text-orange-600" />
                Archiv-Kategorien
              </CardTitle>
              <CardDescription className="text-gray-600">
                Verschiedene Arten von Archivmaterial und deren Verwaltung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {archiveCategories.map((category, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                      <Badge className="bg-blue-100 text-blue-800">
                        {category.access}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Beispiele:</h4>
                        <ul className="space-y-1">
                          {category.examples.map((example, eIndex) => (
                            <li key={eIndex} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-gray-400 mt-1">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            <strong>Aufbewahrung:</strong> {category.retention}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            <strong>Zugriff:</strong> {category.access}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* License Types */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Tag className="w-5 h-5 text-purple-600" />
                Lizenz-Arten
              </CardTitle>
              <CardDescription className="text-gray-600">
                Verschiedene Lizenzmodelle und deren Anwendung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {licenseTypes.map((license, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{license.type}</h3>
                      <Badge className={license.color}>
                        {license.cost}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{license.description}</p>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Verwendung:</span>
                        <span className="text-gray-600 ml-2">{license.usage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Retention Policies */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                Aufbewahrungsfristen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Gesetzliche und interne Aufbewahrungsrichtlinien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {retentionPolicies.map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{policy.content}</h4>
                        <p className="text-sm text-gray-600">{policy.reason}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {policy.period}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Archive Search */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-600" />
                Archiv-Suche
              </CardTitle>
              <CardDescription className="text-gray-600">
                Zugang zum ZDF-Archiv und Lizenz-Datenbank
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white h-auto py-4 flex-col">
                  <Search className="w-6 h-6 mb-2" />
                  <span>Archiv durchsuchen</span>
                  <span className="text-xs opacity-75">Volltext- und Metadaten-Suche</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  <span>Lizenz-Datenbank</span>
                  <span className="text-xs opacity-75">Aktuelle Lizenzstatus prüfen</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}