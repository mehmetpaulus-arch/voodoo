'use client';

import React from 'react';
import { 
  Palette,
  Type,
  Layout,
  Image,
  Download,
  Eye,
  Zap,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const colorPalette = [
  { name: 'ZDF Orange', hex: '#FA7D19', usage: 'Primary Brand Color' },
  { name: 'ZDF Orange Dark', hex: '#E86D0A', usage: 'Hover States' },
  { name: 'ZDF Blue', hex: '#0066CC', usage: 'Secondary Actions' },
  { name: 'Success Green', hex: '#22C55E', usage: 'Success Messages' },
  { name: 'Warning Yellow', hex: '#F59E0B', usage: 'Warnings' },
  { name: 'Error Red', hex: '#EF4444', usage: 'Error States' },
  { name: 'Neutral Gray', hex: '#6B7280', usage: 'Text & Borders' },
  { name: 'Background Dark', hex: '#2C363D', usage: 'Main Background' }
];

const typography = [
  { name: 'Headline 1', class: 'text-5xl font-bold', example: 'Hauptüberschrift' },
  { name: 'Headline 2', class: 'text-4xl font-bold', example: 'Seitenüberschrift' },
  { name: 'Headline 3', class: 'text-3xl font-semibold', example: 'Abschnittsüberschrift' },
  { name: 'Body Large', class: 'text-xl', example: 'Wichtiger Fließtext' },
  { name: 'Body Regular', class: 'text-base', example: 'Standard Fließtext' },
  { name: 'Body Small', class: 'text-sm', example: 'Kleinerer Text' },
  { name: 'Caption', class: 'text-xs text-gray-500', example: 'Bildunterschrift' }
];

const components = [
  {
    name: 'Primary Button',
    description: 'Hauptaktionen und wichtige CTAs',
    code: 'bg-[#FA7D19] hover:bg-[#E86D0A] text-white'
  },
  {
    name: 'Secondary Button',
    description: 'Sekundäre Aktionen',
    code: 'bg-gray-600 hover:bg-gray-700 text-white'
  },
  {
    name: 'Panel Card',
    description: 'Hauptnavigations-Karten',
    code: 'bg-[#F2F2F2] oder bg-[#E37222] für Highlights'
  },
  {
    name: 'Input Field',
    description: 'Formulareingaben',
    code: 'bg-gray-700 border-gray-600 text-white'
  }
];

export default function StyleguidePage() {
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
          <div className="p-4 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
            <Palette className="w-12 h-12 text-orange-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          ZDF Assistant Styleguide
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Corporate Identity, Design-System und Implementierungsrichtlinien für konsistente Benutzeroberflächen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Color Palette */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Palette className="w-5 h-5 text-orange-600" />
                Farbpalette
              </CardTitle>
              <CardDescription className="text-gray-600">
                Offizielle ZDF Assistant Farben und deren Verwendung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {colorPalette.map((color, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-full h-20 rounded-lg mb-3 border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <h4 className="font-semibold text-gray-900">{color.name}</h4>
                    <p className="text-sm text-gray-600 font-mono">{color.hex}</p>
                    <p className="text-xs text-gray-500 mt-1">{color.usage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Type className="w-5 h-5 text-blue-600" />
                Typografie
              </CardTitle>
              <CardDescription className="text-gray-600">
                Schriftgrößen und -gewichte für verschiedene Anwendungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {typography.map((typo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{typo.name}</h4>
                      <code className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                        {typo.class}
                      </code>
                    </div>
                    <div className={`${typo.class} text-gray-900`}>
                      {typo.example}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Components */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Layout className="w-5 h-5 text-green-600" />
                UI-Komponenten
              </CardTitle>
              <CardDescription className="text-gray-600">
                Standardisierte Komponenten und deren Styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {components.map((component, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{component.name}</h4>
                        <p className="text-sm text-gray-600">{component.description}</p>
                      </div>
                      <Button className={component.code}>
                        Beispiel
                      </Button>
                    </div>
                    <code className="text-sm text-gray-700 bg-gray-200 px-3 py-2 rounded block">
                      className="{component.code}"
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logo Usage */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-600" />
                Logo-Verwendung
              </CardTitle>
              <CardDescription className="text-gray-600">
                Richtlinien für die korrekte Verwendung des ZDF Assistant Logos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Korrekte Verwendung:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Mindestabstand: 2x Logo-Höhe zu anderen Elementen</li>
                    <li>• Auf dunklem Hintergrund: Vollversion verwenden</li>
                    <li>• Auf hellem Hintergrund: Standard-Version</li>
                    <li>• Minimalgröße: 120px Breite</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Nicht erlaubt:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Logo verzerren oder stauchen</li>
                    <li>• Farben des Logos ändern</li>
                    <li>• Logo auf unruhigem Hintergrund</li>
                    <li>• Schatten oder Effekte hinzufügen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Resources */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-600" />
                Design-Ressourcen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Logos, Vorlagen und Design-Assets herunterladen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white h-auto py-4 flex-col">
                  <Image className="w-6 h-6 mb-2" />
                  <span>Logo-Paket</span>
                  <span className="text-xs opacity-75">SVG, PNG, PDF</span>
                </Button>
                <Button className="bg-gray-600 hover:bg-gray-700 text-white h-auto py-4 flex-col">
                  <Palette className="w-6 h-6 mb-2" />
                  <span>Farbpalette</span>
                  <span className="text-xs opacity-75">ASE, ACO, CSS</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <Layout className="w-6 h-6 mb-2" />
                  <span>UI-Kit</span>
                  <span className="text-xs opacity-75">Figma, Sketch</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}