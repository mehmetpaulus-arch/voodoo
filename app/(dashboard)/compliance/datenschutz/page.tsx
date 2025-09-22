'use client';

import React from 'react';
import { 
  Lock,
  Shield,
  Database,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const dataCategories = [
  {
    category: 'Personenbezogene Daten',
    icon: Users,
    risk: 'high',
    examples: [
      'Namen, E-Mail-Adressen',
      'IP-Adressen, Cookies',
      'Nutzungsverhalten',
      'Standortdaten'
    ],
    requirements: [
      'Einwilligung erforderlich',
      'Zweckbindung beachten',
      'Löschfristen einhalten',
      'Betroffenenrechte gewährleisten'
    ]
  },
  {
    category: 'Redaktionelle Daten',
    icon: FileText,
    risk: 'medium',
    examples: [
      'Artikel-Entwürfe',
      'Interview-Aufzeichnungen',
      'Recherche-Notizen',
      'Bildmaterial'
    ],
    requirements: [
      'Interne Zugriffskontrollen',
      'Versionierung und Backup',
      'Archivierung nach Richtlinien',
      'Externe Weitergabe nur mit Freigabe'
    ]
  },
  {
    category: 'Technische Daten',
    icon: Database,
    risk: 'low',
    examples: [
      'System-Logs',
      'Performance-Metriken',
      'Fehlerberichte',
      'Konfigurationsdaten'
    ],
    requirements: [
      'Anonymisierung wo möglich',
      'Sichere Speicherung',
      'Regelmäßige Bereinigung',
      'Zugriffsprotokolle führen'
    ]
  }
];

const dsgvoRights = [
  { right: 'Auskunftsrecht (Art. 15)', description: 'Recht auf Information über gespeicherte Daten' },
  { right: 'Berichtigungsrecht (Art. 16)', description: 'Recht auf Korrektur falscher Daten' },
  { right: 'Löschungsrecht (Art. 17)', description: 'Recht auf Löschung ("Recht auf Vergessenwerden")' },
  { right: 'Einschränkungsrecht (Art. 18)', description: 'Recht auf Einschränkung der Verarbeitung' },
  { right: 'Datenübertragbarkeit (Art. 20)', description: 'Recht auf Datenportabilität' },
  { right: 'Widerspruchsrecht (Art. 21)', description: 'Recht auf Widerspruch gegen Verarbeitung' }
];

export default function DatenschutzPage() {
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
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100">
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Datenschutz & DSGVO
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Datenschutzbestimmungen und DSGVO-Compliance für ZDF Assistant Anwendungen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Data Categories */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                Datenkategorien
              </CardTitle>
              <CardDescription className="text-gray-600">
                Klassifizierung und Behandlung verschiedener Datentypen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dataCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3 mb-4">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                        <Badge className={
                          category.risk === 'high' ? 'bg-red-100 text-red-800' :
                          category.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {category.risk === 'high' ? 'Hohes Risiko' :
                           category.risk === 'medium' ? 'Mittleres Risiko' : 'Niedriges Risiko'}
                        </Badge>
                      </div>
                      
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
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Anforderungen:</h4>
                          <ul className="space-y-1">
                            {category.requirements.map((requirement, rIndex) => (
                              <li key={rIndex} className="text-sm text-gray-700 flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                {requirement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* DSGVO Rights */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                Betroffenenrechte (DSGVO)
              </CardTitle>
              <CardDescription className="text-gray-600">
                Rechte der betroffenen Personen und deren Umsetzung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dsgvoRights.map((right, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{right.right}</h4>
                    <p className="text-sm text-gray-700">{right.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Notfall-Kontakte
              </CardTitle>
              <CardDescription className="text-gray-600">
                Bei Datenschutzverletzungen oder rechtlichen Fragen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Datenschutzbeauftragte/r</h4>
                  <p className="text-red-700 text-sm mb-2">
                    Bei Datenschutzverletzungen
                  </p>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Sofort kontaktieren
                  </Button>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Rechtsabteilung</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    Für rechtliche Beratung
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Beratung anfragen
                  </Button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">IT-Security</h4>
                  <p className="text-green-700 text-sm mb-2">
                    Für technische Sicherheit
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Security-Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}