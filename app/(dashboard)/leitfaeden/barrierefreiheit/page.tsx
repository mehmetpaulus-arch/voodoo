'use client';

import React from 'react';
import { 
  Shield,
  Eye,
  Ear,
  MousePointer,
  Keyboard,
  CheckCircle,
  AlertTriangle,
  Info,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const wcagGuidelines = [
  {
    principle: 'Wahrnehmbar',
    icon: Eye,
    color: 'text-blue-600',
    guidelines: [
      'Textalternativen für Bilder und Grafiken',
      'Untertitel für Videos',
      'Ausreichender Farbkontrast (4.5:1 für normalen Text)',
      'Text skalierbar bis 200% ohne Funktionsverlust'
    ]
  },
  {
    principle: 'Bedienbar',
    icon: MousePointer,
    color: 'text-green-600',
    guidelines: [
      'Alle Funktionen per Tastatur erreichbar',
      'Keine blinkenden Inhalte (Epilepsie-Schutz)',
      'Ausreichend Zeit für Interaktionen',
      'Klare Navigation und Orientierung'
    ]
  },
  {
    principle: 'Verständlich',
    icon: Ear,
    color: 'text-purple-600',
    guidelines: [
      'Einfache und klare Sprache',
      'Vorhersagbare Navigation',
      'Hilfe bei Eingabefehlern',
      'Konsistente Bedienung'
    ]
  },
  {
    principle: 'Robust',
    icon: Shield,
    color: 'text-orange-600',
    guidelines: [
      'Kompatibilität mit Screenreadern',
      'Semantisches HTML verwenden',
      'ARIA-Labels wo nötig',
      'Zukunftssichere Technologien'
    ]
  }
];

const checklistItems = [
  { category: 'Farben & Kontrast', items: [
    'Farbkontrast mindestens 4.5:1 für normalen Text',
    'Farbkontrast mindestens 3:1 für große Texte (18pt+)',
    'Information nicht nur durch Farbe vermitteln',
    'Fokus-Indikatoren deutlich sichtbar'
  ]},
  { category: 'Tastatur-Navigation', items: [
    'Alle interaktiven Elemente per Tab erreichbar',
    'Logische Tab-Reihenfolge',
    'Escape-Taste schließt Dialoge',
    'Enter/Space aktiviert Buttons'
  ]},
  { category: 'Screenreader', items: [
    'Alt-Texte für alle Bilder',
    'Überschriften-Hierarchie (h1, h2, h3...)',
    'ARIA-Labels für komplexe Widgets',
    'Landmark-Rollen für Navigation'
  ]},
  { category: 'Formulare', items: [
    'Labels mit Eingabefeldern verknüpft',
    'Fehlermeldungen klar und hilfreich',
    'Pflichtfelder deutlich markiert',
    'Eingabehilfen und Beispiele'
  ]}
];

export default function BarrierefreiheitPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Zurück</span>
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
          <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Barrierefreiheit (WCAG)
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Web Content Accessibility Guidelines für inklusive und zugängliche ZDF Assistant Anwendungen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* WCAG Principles */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                WCAG 2.1 Grundprinzipien
              </CardTitle>
              <CardDescription className="text-gray-600">
                Die vier Säulen der Web-Barrierefreiheit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wcagGuidelines.map((principle, index) => {
                  const IconComponent = principle.icon;
                  return (
                    <div key={index} className="p-6 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className={`w-6 h-6 ${principle.color}`} />
                        <h3 className="text-xl font-semibold text-gray-900">{principle.principle}</h3>
                      </div>
                      <ul className="space-y-2">
                        {principle.guidelines.map((guideline, gIndex) => (
                          <li key={gIndex} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{guideline}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Checklist */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Barrierefreiheits-Checkliste
              </CardTitle>
              <CardDescription className="text-gray-600">
                Praktische Checkliste für die Umsetzung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {checklistItems.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      {category.category}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <input 
                            type="checkbox" 
                            className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Testing Tools */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Eye className="w-5 h-5 text-blue-600" />
                Test-Tools und Ressourcen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Empfohlene Tools für Barrierefreiheitstests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Browser-Extensions</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• axe DevTools</li>
                    <li>• WAVE</li>
                    <li>• Lighthouse</li>
                    <li>• Colour Contrast Analyser</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Screenreader</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• NVDA (Windows)</li>
                    <li>• JAWS (Windows)</li>
                    <li>• VoiceOver (macOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Online-Tools</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• WebAIM Contrast Checker</li>
                    <li>• Pa11y Command Line</li>
                    <li>• Accessibility Insights</li>
                    <li>• Stark (Figma Plugin)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}