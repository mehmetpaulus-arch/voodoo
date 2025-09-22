'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  Lightbulb,
  Target,
  Download,
  FileText,
  Eye,
  Sparkles,
  Play,
  Bell,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ReelConcept {
  thema: string;
  hook: string;
  struktur: string;
  callToAction: string;
}

const strukturOptionen = [
  { value: 'klassisch', label: 'Klassisch (Intro → Hauptteil → Outro)' },
  { value: 'storytelling', label: 'Storytelling (Problem → Lösung → Ergebnis)' },
  { value: 'countdown', label: 'Countdown (Top 5, 3 Tipps, etc.)' },
  { value: 'faktenreihe', label: 'Faktenreihe (Wusstest du schon...)' },
  { value: 'interview', label: 'Interview-Stil (Frage & Antwort)' }
];

const hookBeispiele = [
  "Wusstest du, dass...",
  "Das passiert, wenn...",
  "3 Dinge, die niemand über... weiß",
  "So funktioniert...",
  "Der Grund, warum..."
];

const ctaVorschlaege = [
  "Folge uns für mehr Tipps!",
  "Was denkst du? Kommentiere unten!",
  "Teile deine Erfahrung mit uns",
  "Mehr dazu in der ZDF Mediathek",
  "Abonniere für weitere Insights"
];

export default function ReelsPage() {
  const [concept, setConcept] = useState<ReelConcept>({
    thema: '',
    hook: '',
    struktur: '',
    callToAction: ''
  });

  const [showHookBeispiele, setShowHookBeispiele] = useState(false);
  const [showCtaVorschlaege, setShowCtaVorschlaege] = useState(false);

  const updateConcept = (field: keyof ReelConcept, value: string) => {
    setConcept(prev => ({ ...prev, [field]: value }));
  };

  const generateWordDocument = () => {
    const content = `
REEL-KONZEPT
============

THEMA: ${concept.thema || '[Nicht angegeben]'}

HOOK:
${concept.hook || '[Nicht angegeben]'}

STRUKTUR: ${strukturOptionen.find(s => s.value === concept.struktur)?.label || '[Nicht ausgewählt]'}

ABLAUF:
${getStrukturDetails(concept.struktur)}

CALL-TO-ACTION:
${concept.callToAction || '[Nicht angegeben]'}

---
Erstellt mit ZDF Assistant - Reels Konzept Tool
Datum: ${new Date().toLocaleDateString('de-DE')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reel-Konzept_${concept.thema.replace(/[^a-zA-Z0-9]/g, '_') || 'Unbenannt'}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generatePDFDocument = () => {
    // Für eine echte PDF-Generierung würde man eine Library wie jsPDF verwenden
    // Hier erstellen wir eine HTML-Version die als PDF gedruckt werden kann
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reel-Konzept</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #FA7D19; border-bottom: 2px solid #FA7D19; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .section { margin-bottom: 25px; }
        .content { background: #f9f9f9; padding: 15px; border-left: 4px solid #FA7D19; }
        .footer { margin-top: 50px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>REEL-KONZEPT</h1>
    
    <div class="section">
        <h2>THEMA</h2>
        <div class="content">${concept.thema || '[Nicht angegeben]'}</div>
    </div>
    
    <div class="section">
        <h2>HOOK</h2>
        <div class="content">${concept.hook || '[Nicht angegeben]'}</div>
    </div>
    
    <div class="section">
        <h2>STRUKTUR</h2>
        <div class="content">${strukturOptionen.find(s => s.value === concept.struktur)?.label || '[Nicht ausgewählt]'}</div>
    </div>
    
    <div class="section">
        <h2>ABLAUF</h2>
        <div class="content">${getStrukturDetails(concept.struktur).replace(/\n/g, '<br>')}</div>
    </div>
    
    <div class="section">
        <h2>CALL-TO-ACTION</h2>
        <div class="content">${concept.callToAction || '[Nicht angegeben]'}</div>
    </div>
    
    <div class="footer">
        Erstellt mit ZDF Assistant - Reels Konzept Tool<br>
        Datum: ${new Date().toLocaleDateString('de-DE')}
    </div>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 500);
      };
    }
  };

  const getStrukturDetails = (struktur: string): string => {
    switch (struktur) {
      case 'klassisch':
        return `1. Intro (0-3s): Aufmerksamkeit wecken
2. Hauptteil (3-25s): Kerninhalt vermitteln
3. Outro (25-30s): Call-to-Action`;
      case 'storytelling':
        return `1. Problem vorstellen (0-5s)
2. Lösungsweg zeigen (5-20s)
3. Ergebnis präsentieren (20-30s)`;
      case 'countdown':
        return `1. Ankündigung der Liste (0-3s)
2. Punkt für Punkt abarbeiten (3-25s)
3. Zusammenfassung & CTA (25-30s)`;
      case 'faktenreihe':
        return `1. Überraschender Fakt (0-5s)
2. Weitere interessante Fakten (5-25s)
3. Abschluss mit Frage an Zuschauer (25-30s)`;
      case 'interview':
        return `1. Vorstellung der Person (0-5s)
2. Kernfragen & Antworten (5-25s)
3. Key Takeaway & CTA (25-30s)`;
      default:
        return '[Struktur auswählen für Details]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/content" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ChevronLeft className="w-4 h-4" />
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Reels-Konzept entwickeln
            </h1>
            <p className="text-lg text-gray-300">
              Von der Idee bis zum Call-to-Action – erstellen Sie in wenigen Schritten ein professionelles Kurzvideo-Konzept.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Schritt 1: Thema */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">1</div>
                    <Lightbulb className="w-5 h-5 text-[#FA7D19]" />
                    Thema definieren
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Worum soll es in Ihrem Reel gehen?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="z.B. Klimawandel, Bundestagswahl, Neue Technologie..."
                    value={concept.thema}
                    onChange={(e) => updateConcept('thema', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </CardContent>
              </Card>

              {/* Schritt 2: Hook */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">2</div>
                    <Sparkles className="w-5 h-5 text-[#FA7D19]" />
                    Hook entwickeln
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Der erste Satz, der Aufmerksamkeit weckt
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="z.B. Wusstest du, dass 90% der Menschen diesen Fehler machen?"
                    value={concept.hook}
                    onChange={(e) => updateConcept('hook', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHookBeispiele(!showHookBeispiele)}
                      className="text-[#FA7D19] border-[#FA7D19] hover:bg-[#FA7D19] hover:text-white"
                    >
                      💡 Beispiele anzeigen
                    </Button>
                  </div>
                  {showHookBeispiele && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      {hookBeispiele.map((beispiel, index) => (
                        <button
                          key={index}
                          onClick={() => updateConcept('hook', beispiel)}
                          className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          {beispiel}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Schritt 3: Struktur */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">3</div>
                    <Play className="w-5 h-5 text-[#FA7D19]" />
                    Struktur wählen
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Wie soll Ihr Reel aufgebaut sein?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={concept.struktur} onValueChange={(value) => updateConcept('struktur', value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Struktur auswählen..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {strukturOptionen.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-600">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {concept.struktur && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Ablauf:</h4>
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                        {getStrukturDetails(concept.struktur)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Schritt 4: Call-to-Action */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">4</div>
                    <Target className="w-5 h-5 text-[#FA7D19]" />
                    Call-to-Action
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Was sollen die Zuschauer tun?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="z.B. Folge uns für mehr Tipps zu diesem Thema!"
                    value={concept.callToAction}
                    onChange={(e) => updateConcept('callToAction', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCtaVorschlaege(!showCtaVorschlaege)}
                      className="text-[#FA7D19] border-[#FA7D19] hover:bg-[#FA7D19] hover:text-white"
                    >
                      🎯 Vorschläge anzeigen
                    </Button>
                  </div>
                  {showCtaVorschlaege && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {ctaVorschlaege.map((vorschlag, index) => (
                        <button
                          key={index}
                          onClick={() => updateConcept('callToAction', vorschlag)}
                          className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                        >
                          {vorschlag}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#FA7D19]" />
                    Live-Vorschau
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    So könnte Ihr Reel-Konzept aussehen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Titel */}
                  <div>
                    <Label className="text-[#FA7D19] font-semibold">TITEL</Label>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                      <p className="text-white font-medium">
                        {concept.thema || '[Thema eingeben]'}
                      </p>
                    </div>
                  </div>

                  {/* Hook */}
                  <div>
                    <Label className="text-[#FA7D19] font-semibold">HOOK</Label>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        {concept.hook || '[Hook entwickeln]'}
                      </p>
                    </div>
                  </div>

                  {/* Ablauf */}
                  <div>
                    <Label className="text-[#FA7D19] font-semibold">ABLAUF</Label>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                      <pre className="text-gray-300 text-xs whitespace-pre-wrap">
                        {concept.struktur ? getStrukturDetails(concept.struktur) : '[Struktur wählen]'}
                      </pre>
                    </div>
                  </div>

                  {/* Call-to-Action */}
                  <div>
                    <Label className="text-[#FA7D19] font-semibold">CALL-TO-ACTION</Label>
                    <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300 text-sm">
                        {concept.callToAction || '[Call-to-Action definieren]'}
                      </p>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="pt-4 border-t border-gray-700 space-y-3">
                    <Button
                      onClick={generateWordDocument}
                      className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      disabled={!concept.thema}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      📄 Als Word herunterladen
                    </Button>
                    <Button
                      onClick={generatePDFDocument}
                      className="w-full bg-gray-600 hover:bg-gray-500 text-white"
                      disabled={!concept.thema}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      📑 Als PDF herunterladen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Box */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FA7D19]" />
                    Tipps & Tricks
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Hilfreiche Informationen für bessere Reels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">📱 Optimale Länge</h4>
                      <p className="text-gray-300 text-sm">
                        Reels funktionieren am besten zwischen 15-30 Sekunden. Kürzer ist oft besser!
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">🎯 Hook-Formeln</h4>
                      <p className="text-gray-300 text-sm">
                        "Wusstest du, dass...", "Das passiert, wenn...", "3 Dinge, die..."
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">⚡ Aufmerksamkeit</h4>
                      <p className="text-gray-300 text-sm">
                        Die ersten 3 Sekunden entscheiden über Erfolg oder Misserfolg.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">📊 Engagement</h4>
                      <p className="text-gray-300 text-sm">
                        Fragen und Call-to-Actions erhöhen die Interaktion deutlich.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">🎨 Visuell</h4>
                      <p className="text-gray-300 text-sm">
                        Große, klare Schrift und kontrastreiche Farben für bessere Lesbarkeit.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}