'use client';

import React from 'react';
import { 
  Image,
  Music,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const imageRights = [
  {
    category: 'Eigenproduktion',
    description: 'Selbst erstellte Inhalte',
    status: 'allowed',
    guidelines: [
      'Alle selbst fotografierten/gefilmten Inhalte',
      'Grafiken und Designs von ZDF-Mitarbeitern',
      'KI-generierte Bilder (mit Kennzeichnung)',
      'Screenshots von eigenen Anwendungen'
    ]
  },
  {
    category: 'Lizenzierte Inhalte',
    description: 'Gekaufte oder lizenzierte Medien',
    status: 'conditional',
    guidelines: [
      'Getty Images, Shutterstock (mit gültiger Lizenz)',
      'Creative Commons (Lizenz beachten)',
      'Pressematerial (nur für Berichterstattung)',
      'Archivmaterial (Rechte prüfen)'
    ]
  },
  {
    category: 'Verbotene Inhalte',
    description: 'Nicht verwendbare Medien',
    status: 'forbidden',
    guidelines: [
      'Urheberrechtlich geschützte Bilder ohne Lizenz',
      'Social Media Posts ohne Erlaubnis',
      'Paparazzi-Fotos',
      'Markenlogos ohne Genehmigung'
    ]
  }
];

const musicRights = [
  {
    provider: 'GEMA',
    description: 'Deutsche Verwertungsgesellschaft',
    coverage: 'Deutsche und internationale Musik',
    process: 'Lizenzierung über ZDF-Musikredaktion'
  },
  {
    provider: 'GVL',
    description: 'Gesellschaft zur Verwertung von Leistungsschutzrechten',
    coverage: 'Künstler- und Labelrechte',
    process: 'Automatische Abrechnung über Rahmenvertrag'
  },
  {
    provider: 'Creative Commons',
    description: 'Freie Lizenzen',
    coverage: 'CC-lizenzierte Musik',
    process: 'Lizenzbestimmungen beachten und Attribution'
  },
  {
    provider: 'Eigenproduktion',
    description: 'ZDF-eigene Musik',
    coverage: 'Hauseigene Kompositionen',
    process: 'Freie Verwendung mit interner Freigabe'
  }
];

export default function BildMusikrechtePage() {
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
          <div className="p-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
            <Image className="w-12 h-12 text-purple-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Bild- & Musikrechte
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Rechtliche Richtlinien für die Verwendung von Bildern, Videos und Musik in ZDF-Produktionen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Image Rights */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Image className="w-5 h-5 text-blue-600" />
                Bildrechte
              </CardTitle>
              <CardDescription className="text-gray-600">
                Richtlinien für die Verwendung von Bildern und Videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {imageRights.map((category, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      {category.status === 'allowed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {category.status === 'conditional' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                      {category.status === 'forbidden' && <Shield className="w-5 h-5 text-red-500" />}
                      <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                      <Badge className={
                        category.status === 'allowed' ? 'bg-green-100 text-green-800' :
                        category.status === 'conditional' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {category.status === 'allowed' ? 'Erlaubt' :
                         category.status === 'conditional' ? 'Bedingt' : 'Verboten'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <ul className="space-y-1">
                      {category.guidelines.map((guideline, gIndex) => (
                        <li key={gIndex} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Music Rights */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Music className="w-5 h-5 text-green-600" />
                Musikrechte
              </CardTitle>
              <CardDescription className="text-gray-600">
                Lizenzierung und Verwendung von Musik in ZDF-Produktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {musicRights.map((provider, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{provider.provider}</h3>
                    <p className="text-gray-600 text-sm mb-3">{provider.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Abdeckung:</span>
                        <span className="text-gray-600 ml-2">{provider.coverage}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Prozess:</span>
                        <span className="text-gray-600 ml-2">{provider.process}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                Schnellreferenz
              </CardTitle>
              <CardDescription className="text-gray-600">
                Wichtige Kontakte und Ressourcen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Rechtsabteilung</h4>
                  <p className="text-blue-700 text-sm mb-2">
                    Für komplexe Rechtsfragen
                  </p>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Kontakt
                  </Button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Musikredaktion</h4>
                  <p className="text-green-700 text-sm mb-2">
                    Für Musik-Lizenzierung
                  </p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Kontakt
                  </Button>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Archiv</h4>
                  <p className="text-purple-700 text-sm mb-2">
                    Für historisches Material
                  </p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Kontakt
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