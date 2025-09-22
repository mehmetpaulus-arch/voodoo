'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ExternalLink,
  Download,
  FileText,
  Loader2,
  Bell,
  Globe,
  BookOpen,
  Calculator,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Source {
  id: string;
  title: string;
  url: string;
  provider: string;
  type?: string;
  authors?: string[];
  venue?: string;
  year?: number;
  abstract?: string;
  snippet?: string;
  doi?: string;
  score?: number;
}

interface FactCheckVerdict {
  verdict: string;
  confidence: number;
  rationale: string;
}

interface FactCheckResponse {
  meta: {
    model: string;
    ts: string;
    counts: {
      sources: number;
    };
  };
  verdict: FactCheckVerdict;
  sources: Source[];
  wolfram?: any;
  gpt_raw?: any;
}

const verdictConfig = {
  'true': { 
    icon: CheckCircle, 
    color: 'text-green-600 bg-green-50 border-green-200', 
    label: 'Wahr',
    description: 'Die Aussage ist durch Belege gestützt'
  },
  'false': { 
    icon: XCircle, 
    color: 'text-red-600 bg-red-50 border-red-200', 
    label: 'Falsch',
    description: 'Die Aussage widerspricht den verfügbaren Belegen'
  },
  'unverified': { 
    icon: AlertTriangle, 
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
    label: 'Unbestätigt',
    description: 'Nicht genügend Belege für eine eindeutige Bewertung'
  },
  'misleading': { 
    icon: AlertTriangle, 
    color: 'text-orange-600 bg-orange-50 border-orange-200', 
    label: 'Irreführend',
    description: 'Die Aussage ist technisch korrekt, aber irreführend'
  },
  'needs-context': { 
    icon: Clock, 
    color: 'text-blue-600 bg-blue-50 border-blue-200', 
    label: 'Kontext erforderlich',
    description: 'Die Aussage benötigt zusätzlichen Kontext'
  },
  'outdated': { 
    icon: Clock, 
    color: 'text-gray-600 bg-gray-50 border-gray-200', 
    label: 'Veraltet',
    description: 'Die Information ist nicht mehr aktuell'
  },
  'cherry-picked': { 
    icon: AlertTriangle, 
    color: 'text-purple-600 bg-purple-50 border-purple-200', 
    label: 'Selektiv',
    description: 'Die Aussage basiert auf selektiven Daten'
  }
};

const providerIcons = {
  'tavily': Globe,
  'semantic_scholar': BookOpen,
  'crossref': BookOpen,
  'pubmed': BookOpen,
  'wolfram': Calculator
};

export default function FactcheckingPage() {
  const [claim, setClaim] = useState('');
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [topK, setTopK] = useState(8);
  const [language, setLanguage] = useState('de');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<FactCheckResponse | null>(null);
  const [error, setError] = useState('');

  const handleFactCheck = async () => {
    if (!claim.trim()) return;

    setIsLoading(true);
    setProgress(0);
    setError('');
    setResult(null);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const response = await fetch('/api/factcheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          claim: claim.trim(),
          question: question.trim() || undefined,
          context: context.trim() || undefined,
          top_k: topK,
          language: language
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Fact-Check fehlgeschlagen');
      }

      const data: FactCheckResponse = await response.json();
      setProgress(100);
      setResult(data);
    } catch (err) {
      console.error('Fact-Check error:', err);
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const generateReport = () => {
    if (!result) return;

    const verdictInfo = verdictConfig[result.verdict.verdict as keyof typeof verdictConfig] || verdictConfig.unverified;
    
    const content = `
FACT-CHECK BERICHT
==================

BEHAUPTUNG:
${claim}

${question ? `FRAGESTELLUNG:\n${question}\n` : ''}
${context ? `KONTEXT:\n${context}\n` : ''}

BEWERTUNG:
Ergebnis: ${verdictInfo.label}
Vertrauen: ${Math.round(result.verdict.confidence * 100)}%
Begründung: ${result.verdict.rationale}

QUELLEN (${result.sources.length}):
${result.sources.map((source, index) => `
${index + 1}. ${source.title}
   Provider: ${source.provider}
   ${source.authors ? `Autoren: ${source.authors.join(', ')}\n   ` : ''}${source.venue ? `Venue: ${source.venue}\n   ` : ''}${source.year ? `Jahr: ${source.year}\n   ` : ''}URL: ${source.url}
   ${source.doi ? `DOI: ${source.doi}\n   ` : ''}${source.abstract ? `Abstract: ${source.abstract.substring(0, 300)}...\n` : ''}${source.snippet ? `Snippet: ${source.snippet}\n` : ''}
`).join('')}

${result.wolfram ? `WOLFRAM ALPHA DATEN:\n${JSON.stringify(result.wolfram, null, 2)}\n` : ''}

METADATEN:
Modell: ${result.meta.model}
Zeitstempel: ${new Date(result.meta.ts).toLocaleString('de-DE')}
Anzahl Quellen: ${result.meta.counts.sources}

---
Erstellt mit ZDF Assistant - Factchecking Tool
Datum: ${new Date().toLocaleDateString('de-DE')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Factcheck_${claim.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generatePDFReport = () => {
    if (!result) return;

    const verdictInfo = verdictConfig[result.verdict.verdict as keyof typeof verdictConfig] || verdictConfig.unverified;
    
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fact-Check Bericht</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #FA7D19; border-bottom: 2px solid #FA7D19; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .verdict { padding: 15px; border-radius: 8px; margin: 20px 0; }
        .verdict.true { background: #f0f9ff; border: 1px solid #22c55e; }
        .verdict.false { background: #fef2f2; border: 1px solid #ef4444; }
        .verdict.unverified { background: #fffbeb; border: 1px solid #f59e0b; }
        .source { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .source-title { font-weight: bold; color: #333; }
        .source-meta { color: #666; font-size: 0.9em; }
        .confidence { font-size: 1.2em; font-weight: bold; }
        .footer { margin-top: 50px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>FACT-CHECK BERICHT</h1>
    
    <h2>BEHAUPTUNG</h2>
    <p><strong>${claim}</strong></p>
    
    ${question ? `<h2>FRAGESTELLUNG</h2><p>${question}</p>` : ''}
    ${context ? `<h2>KONTEXT</h2><p>${context}</p>` : ''}
    
    <h2>BEWERTUNG</h2>
    <div class="verdict ${result.verdict.verdict}">
        <div><strong>Ergebnis:</strong> ${verdictInfo.label}</div>
        <div class="confidence"><strong>Vertrauen:</strong> ${Math.round(result.verdict.confidence * 100)}%</div>
        <div><strong>Begründung:</strong> ${result.verdict.rationale}</div>
    </div>
    
    <h2>QUELLEN (${result.sources.length})</h2>
    ${result.sources.map((source, index) => `
        <div class="source">
            <div class="source-title">${index + 1}. ${source.title}</div>
            <div class="source-meta">
                <div><strong>Provider:</strong> ${source.provider}</div>
                ${source.authors ? `<div><strong>Autoren:</strong> ${source.authors.join(', ')}</div>` : ''}
                ${source.venue ? `<div><strong>Venue:</strong> ${source.venue}</div>` : ''}
                ${source.year ? `<div><strong>Jahr:</strong> ${source.year}</div>` : ''}
                <div><strong>URL:</strong> <a href="${source.url}" target="_blank">${source.url}</a></div>
                ${source.doi ? `<div><strong>DOI:</strong> ${source.doi}</div>` : ''}
            </div>
            ${source.abstract ? `<div style="margin-top: 10px;"><strong>Abstract:</strong> ${source.abstract.substring(0, 400)}...</div>` : ''}
        </div>
    `).join('')}
    
    <div class="footer">
        <div><strong>Modell:</strong> ${result.meta.model}</div>
        <div><strong>Zeitstempel:</strong> ${new Date(result.meta.ts).toLocaleString('de-DE')}</div>
        <div><strong>Anzahl Quellen:</strong> ${result.meta.counts.sources}</div>
        <br>
        Erstellt mit ZDF Assistant - Factchecking Tool<br>
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Zurück</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-800 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-200">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Redaktions-Workflows</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Styleguide (CI/CD)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Barrierefreiheit (WCAG)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">API-Dokumentation</a>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Bild- & Musikrechte</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Datenschutz & DSGVO</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Archiv & Lizenzen</a>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Systemstatus</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Release Notes</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Roadmap</a>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Hilfe-Center</Link>
                <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Ticket erstellen</Link>
                <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Onboarding & Schulungen</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-8 py-8 px-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-[#E37222] to-[#FF8C42]">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Wissenschaftliches Factchecking
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Die eingesetzten KI-Systeme sind so miteinander vernetzt, dass sie ihre Resultate wechselseitig kontrollieren. Durch diesen kontinuierlichen Abgleich entsteht ein mehrstufiges Prüfverfahren, das höchste Genauigkeit und Konsistenz garantiert.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="bg-gray-600 shadow-lg border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Search className="w-5 h-5 text-[#E37222]" />
                    Behauptung prüfen
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Geben Sie die zu prüfende Aussage ein
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Behauptung *</Label>
                    <Textarea
                      placeholder="z.B. Vitamin D Supplementierung reduziert die Gesamtsterblichkeit um 10% bei Erwachsenen."
                      value={claim}
                      onChange={(e) => setClaim(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Spezifische Fragestellung (optional)</Label>
                    <Input
                      placeholder="z.B. Ist die 10%-Reduktion statistisch signifikant?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Kontext (optional)</Label>
                    <Textarea
                      placeholder="z.B. Allgemeine Erwachsenenpopulation, RCT-Evidenz, Zeitraum 2020-2024"
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Anzahl Quellen</Label>
                      <Select value={topK.toString()} onValueChange={(value) => setTopK(parseInt(value))}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Quellen</SelectItem>
                          <SelectItem value="8">8 Quellen</SelectItem>
                          <SelectItem value="12">12 Quellen</SelectItem>
                          <SelectItem value="15">15 Quellen</SelectItem>
                          <SelectItem value="20">20 Quellen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-300">Sprache</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleFactCheck}
                    disabled={!claim.trim() || isLoading}
                    className="w-full bg-[#E37222] hover:bg-[#D16212] text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Prüfung läuft...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Fakten prüfen
                      </>
                    )}
                  </Button>

                  {isLoading && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 font-medium">Fortschritt</span>
                        <span className="text-[#E37222] font-bold text-lg">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-[#E37222] to-[#FF8C42] h-3 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-gray-300 text-sm text-center">
                        Quellen werden gesucht und analysiert...
                      </p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-red-700">
                        <XCircle className="w-4 h-4" />
                        <span className="font-medium">Fehler:</span>
                      </div>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {result && (
                <>
                  {/* Verdict Card */}
                  <Card className="bg-gray-600 shadow-lg border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Bewertung
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const verdictInfo = verdictConfig[result.verdict.verdict as keyof typeof verdictConfig] || verdictConfig.unverified;
                        const VerdictIcon = verdictInfo.icon;
                        
                        return (
                          <div className={`p-4 rounded-lg border ${verdictInfo.color}`}>
                            <div className="flex items-center gap-3 mb-3">
                              <VerdictIcon className="w-6 h-6" />
                              <div>
                                <div className="font-bold text-lg">{verdictInfo.label}</div>
                                <div className="text-sm opacity-75">{verdictInfo.description}</div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="text-sm font-medium mb-1">Vertrauen: {Math.round(result.verdict.confidence * 100)}%</div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-current h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${result.verdict.confidence * 100}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-sm">
                              <strong>Begründung:</strong> {result.verdict.rationale}
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>

                  {/* Sources Card */}
                  <Card className="bg-gray-600 shadow-lg border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        Quellen ({result.sources.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                      {result.sources && result.sources.length > 0 ? (
                        result.sources.map((source, index) => {
                          const ProviderIcon = providerIcons[source.provider as keyof typeof providerIcons] || Globe;
                          
                          return (
                            <div key={source.id} className="border border-gray-700 rounded-lg p-4 bg-gray-700">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="bg-[#E37222] text-white text-xs font-medium px-2 py-1 rounded">
                                    {index + 1}
                                  </span>
                                  <ProviderIcon className="w-4 h-4 text-gray-400" />
                                  <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                                    {source.provider}
                                  </Badge>
                                </div>
                                {source.year && (
                                  <Badge variant="secondary" className="text-xs bg-gray-600 text-gray-300">
                                    {source.year}
                                  </Badge>
                                )}
                              </div>
                              
                              <h4 className="font-medium text-white mb-2 line-clamp-2">
                                {source.title}
                              </h4>
                              
                              {source.authors && source.authors.length > 0 && (
                                <p className="text-sm text-gray-300 mb-1">
                                  <strong>Autoren:</strong> {source.authors.slice(0, 3).join(', ')}
                                  {source.authors.length > 3 && ` (+${source.authors.length - 3} weitere)`}
                                </p>
                              )}
                              
                              {source.venue && (
                                <p className="text-sm text-gray-300 mb-1">
                                  <strong>Venue:</strong> {source.venue}
                                </p>
                              )}
                              
                              {(source.abstract || source.snippet) && (
                                <p className="text-sm text-gray-300 mb-2 line-clamp-3">
                                  {source.abstract || source.snippet}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-2">
                                {source.url && (
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#E37222] hover:text-[#FF8C42] text-sm flex items-center gap-1"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Quelle öffnen
                                  </a>
                                )}
                                {source.doi && (
                                  <a
                                    href={`https://doi.org/${source.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 text-sm"
                                  >
                                    DOI: {source.doi}
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-400">Keine Quellen gefunden</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Export Section */}
                  <Card className="bg-gray-600 shadow-lg border border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-600" />
                        Bericht exportieren
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        onClick={generateReport}
                        className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        📄 Als Word herunterladen
                      </Button>
                      <Button
                        onClick={generatePDFReport}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        📑 Als PDF herunterladen
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}

              {!result && !isLoading && (
                <Card className="bg-gray-600 shadow-lg border border-gray-700">
                  <CardContent className="p-8 text-center">
                    <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Bereit für Faktenprüfung
                    </h3>
                    <p className="text-gray-300">
                      Geben Sie eine Behauptung ein, um mit der wissenschaftlichen Überprüfung zu beginnen.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}