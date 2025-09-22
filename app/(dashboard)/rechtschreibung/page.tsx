'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Download, 
  FileText, 
  Loader2,
  Bell,
  Wand2,
  Eye,
  RotateCcw,
  ChevronLeft,
  BarChart3,
  Clock,
  Languages,
  Target,
  TrendingUp,
  Copy,
  RefreshCw,
  Settings,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Issue {
  index: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
  ruleId: string;
  issueType: string;
  offset: number;
  length: number;
  replacements: string;
  context?: string;
}

interface CheckResult {
  markedHtml: string;
  issues: Issue[];
  summary: string;
  meta?: {
    language: { name: string; code: string };
    software: { name: string; version: string };
    timestamp: string;
  };
}

interface TextStats {
  wordCount: number;
  charCount: number;
  sentenceCount: number;
  readingTime: number;
  complexityScore: number;
}

export default function RechtschreibungPage() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('de-DE');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [selectedIssueIndex, setSelectedIssueIndex] = useState<number | null>(null);
  const [correctedText, setCorrectedText] = useState('');
  const [textStats, setTextStats] = useState<TextStats | null>(null);
  const [autoCheck, setAutoCheck] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [checkHistory, setCheckHistory] = useState<CheckResult[]>([]);

  // Calculate text statistics
  const calculateTextStats = (text: string): TextStats => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const chars = text.length;
    const readingTime = Math.ceil(words.length / 200); // 200 words per minute
    const complexityScore = Math.min(100, Math.max(0, 
      (words.length / sentences.length) * 2 + // Average words per sentence
      (text.split(/[.!?]/).length / words.length) * 100 // Sentence complexity
    ));

    return {
      wordCount: words.length,
      charCount: chars,
      sentenceCount: sentences.length,
      readingTime,
      complexityScore: Math.round(complexityScore)
    };
  };

  // Auto-check effect
  useEffect(() => {
    if (autoCheck && text.trim()) {
      const timer = setTimeout(() => {
        handleCheck();
      }, 2000); // 2 second delay
      return () => clearTimeout(timer);
    }
  }, [text, autoCheck]);

  // Update text stats when text changes
  useEffect(() => {
    if (text.trim()) {
      setTextStats(calculateTextStats(text));
    } else {
      setTextStats(null);
    }
  }, [text]);

  const handleCheck = async () => {
    if (!text.trim()) return;

    setIsChecking(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/spellcheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          language: language
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Rechtschreibprüfung fehlgeschlagen');
      }

      const data = await response.json();
      setResult(data);
      
      // Add to history
      setCheckHistory(prev => [data, ...prev.slice(0, 9)]); // Keep last 10 checks
      
      // Generate corrected text by applying all first suggestions
      let corrected = text;
      
      // Sort issues by offset in descending order to avoid offset changes
      const sortedIssues = [...data.issues].sort((a, b) => b.offset - a.offset);
      
      console.log('Applying corrections:', { issues: data.issues.length, originalText: text });
      console.log('Sorted issues (descending offset):', sortedIssues.map(i => ({ offset: i.offset, original: text.substring(i.offset, i.offset + i.length), replacement: i.replacements.split(',')[0]?.trim() })));
      
      for (const issue of sortedIssues) {
        const firstReplacement = issue.replacements.split(',')[0]?.trim();
        if (firstReplacement) {
          const originalText = corrected.substring(issue.offset, issue.offset + issue.length);
          const before = corrected.substring(0, issue.offset);
          const after = corrected.substring(issue.offset + issue.length);
          corrected = before + firstReplacement + after;
          
          console.log('Applied correction:', { 
            original: originalText,
            replacement: firstReplacement,
            offset: issue.offset,
            length: issue.length,
            result: corrected
          });
        }
      }
      
      console.log('Final corrected text:', corrected);
      setCorrectedText(corrected);
    } catch (error) {
      console.error('Check failed:', error);
      // Show error to user
      setResult({
        markedHtml: text,
        issues: [],
        summary: `Fehler: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`
      });
    } finally {
      setIsChecking(false);
    }
  };


  const applyReplacement = (issueIndex: number) => {
    if (!result) return;
    
    const issue = result.issues[issueIndex];
    if (!issue || !issue.replacements) return;
    
    const firstReplacement = issue.replacements.split(',')[0].trim();
    const newText = text.substring(0, issue.offset) + 
                   firstReplacement + 
                   text.substring(issue.offset + issue.length);
    
    setText(newText);
    // Re-check after applying replacement
    setTimeout(() => handleCheck(), 100);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const exportToWord = () => {
    const content = `RECHTSCHREIBPRÜFUNG - BERICHT
=====================================

ORIGINALTEXT:
${text}

GEFUNDENE PROBLEME (${result?.issues.length || 0}):
${result?.issues.map((issue, index) => `
${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}
   Regel: ${issue.ruleId}
   Position: ${issue.offset}-${issue.offset + issue.length}
   Vorschläge: ${issue.replacements}
`).join('') || 'Keine Probleme gefunden.'}

---
Erstellt mit ZDF Assistant - Rechtschreibprüfung
Datum: ${new Date().toLocaleDateString('de-DE')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rechtschreibpruefung_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportToPDF = async () => {
    // Dynamic import for jsPDF
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rechtschreibprüfung - Bericht', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 20, 35);
    doc.text(`Sprache: ${result?.meta?.language?.name || language}`, 20, 45);
    doc.text(`Probleme gefunden: ${result?.issues.length || 0}`, 20, 55);
    
    let y = 70;
    doc.text('Originaltext:', 20, y);
    y += 10;
    
    const textLines = doc.splitTextToSize(text, 170);
    doc.text(textLines, 20, y);
    y += textLines.length * 5 + 10;
    
    if (result?.issues && result.issues.length > 0) {
      doc.text('Gefundene Probleme:', 20, y);
      y += 10;
      
      result.issues.forEach((issue, index) => {
        if (y > 250) {
          doc.addPage();
          y = 20;
        }
        
        doc.text(`${index + 1}. [${issue.severity.toUpperCase()}] ${issue.message}`, 20, y);
        y += 5;
        doc.text(`   Regel: ${issue.ruleId}`, 20, y);
        y += 5;
        doc.text(`   Vorschläge: ${issue.replacements}`, 20, y);
        y += 10;
      });
    }
    
    doc.save(`Rechtschreibpruefung_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Test function for the specific example
  const testWithExample = () => {
    const testText = "Ich binz eine Afghaneria";
    setText(testText);
    // Auto-trigger check after setting text
    setTimeout(() => {
      handleCheck();
    }, 100);
  };

  // Test function for the new example
  const testWithNewExample = () => {
    const testText = "Halo ichn binn neu in Deudschland";
    setText(testText);
    // Auto-trigger check after setting text
    setTimeout(() => {
      handleCheck();
    }, 100);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/studio/scripts" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/leitfaeden" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Leitfäden</Link>
                <Link href="/leitfaeden/redaktionsrichtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Redaktionsrichtlinien</Link>
                <Link href="/leitfaeden/ci-richtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">CI-Richtlinien</Link>
                <Link href="/leitfaeden/qualitaetsstandards" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Qualitätsstandards</Link>
                <Link href="/leitfaeden/barrierefreiheit" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Barrierefreiheit</Link>
                <Link href="/leitfaeden/datenschutz" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Datenschutz</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <Link href="/forum" className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-xl">
              Forum
            </Link>
          </div>
          
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1 font-medium text-xl">
              Compliance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/compliance" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Compliance</Link>
                <Link href="/compliance/richtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Richtlinien</Link>
                <Link href="/compliance/audit" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Audit</Link>
                <Link href="/compliance/schulungen" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Schulungen</Link>
                <Link href="/compliance/meldungen" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Meldungen</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1 font-medium text-xl">
              Changelog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/changelog" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Changelog</Link>
                <Link href="/changelog/systemstatus" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Systemstatus</Link>
                <Link href="/changelog/release-notes" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Release Notes</Link>
                <Link href="/changelog/roadmap" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Roadmap</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1 font-medium text-xl">
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
      <div className="text-center mb-12 py-16 px-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100 shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Rechtschreibung & Grammatik
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Professionelle Textprüfung mit LanguageTool – Rechtschreibung, Grammatik und Stil in Echtzeit überprüfen.
        </p>
        
        {/* Quick Stats */}
        {textStats && (
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{textStats.wordCount}</div>
              <div className="text-sm text-gray-600">Wörter</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{textStats.sentenceCount}</div>
              <div className="text-sm text-gray-600">Sätze</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{textStats.readingTime}</div>
              <div className="text-sm text-gray-600">Min. Lesezeit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{textStats.complexityScore}%</div>
              <div className="text-sm text-gray-600">Komplexität</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <Wand2 className="w-5 h-5 text-green-600" />
                    Text eingeben
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Fügen Sie hier Ihren Artikel, Teaser oder die Headline ein
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Füge hier deinen Artikel, Teaser oder die Headline ein…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 min-h-[300px]"
                  />
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de-DE">Deutsch</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="fr-FR">Français</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      onClick={handleCheck}
                      disabled={!text.trim() || isChecking}
                      className="bg-green-600 hover:bg-green-700 text-white px-8"
                    >
                      {isChecking ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Prüfung läuft...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Prüfen
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Test Buttons */}
                  <div className="mt-4 space-y-2">
                    <Button
                      onClick={testWithExample}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Test: "Ich binz eine Afghaneria"
                    </Button>
                    <Button
                      onClick={testWithNewExample}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Test: "Halo ichn binn neu in Deudschland"
                    </Button>
                  </div>

                  {/* Advanced Options */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-check" className="text-sm font-medium text-gray-700">
                        Auto-Prüfung
                      </Label>
                      <Switch
                        id="auto-check"
                        checked={autoCheck}
                        onCheckedChange={setAutoCheck}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="advanced" className="text-sm font-medium text-gray-700">
                        Erweiterte Optionen
                      </Label>
                      <Switch
                        id="advanced"
                        checked={showAdvanced}
                        onCheckedChange={setShowAdvanced}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Text Statistics Card */}
              {textStats && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Text-Statistiken
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{textStats.wordCount}</div>
                        <div className="text-sm text-gray-600">Wörter</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{textStats.charCount}</div>
                        <div className="text-sm text-gray-600">Zeichen</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{textStats.sentenceCount}</div>
                        <div className="text-sm text-gray-600">Sätze</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{textStats.readingTime}</div>
                        <div className="text-sm text-gray-600">Min. Lesezeit</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Komplexität</span>
                        <span className="text-gray-900">{textStats.complexityScore}%</span>
                      </div>
                      <Progress value={textStats.complexityScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Corrected Text Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Korrigierter Text
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Automatisch korrigierte Version mit ersten Vorschlägen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={correctedText}
                    onChange={(e) => setCorrectedText(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900 min-h-[300px]"
                    placeholder="Korrigierter Text erscheint hier nach der Prüfung..."
                  />
                  
                  {correctedText && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => copyToClipboard(correctedText)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Kopieren
                      </Button>
                      <Button
                        onClick={() => setText(correctedText)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Übernehmen
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {/* Results Section */}
            <div className="lg:col-span-1 space-y-6">
              {result && (
                <>
                  {/* Preview Card */}
                  <Card className="bg-white shadow-lg border border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-gray-900 flex items-center gap-3">
                          <Eye className="w-5 h-5 text-blue-600" />
                          Markierter Text
                        </CardTitle>
                        <Badge variant="outline" className="text-sm">
                          {result.summary}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="p-4 bg-gray-50 rounded-lg border min-h-[200px] whitespace-pre-wrap leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: result.markedHtml }}
                      />
                    </CardContent>
                  </Card>

                  {/* Issues List */}
                  <Card className="bg-white shadow-lg border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Gefundene Probleme ({result.issues.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                      {result.issues.map((issue, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)} cursor-pointer hover:shadow-sm transition-shadow`}
                          onClick={() => setSelectedIssueIndex(index)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(issue.severity)}
                              <Badge variant="outline" className="text-xs">
                                {issue.severity}
                              </Badge>
                              <span className="text-xs text-gray-500">#{index}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                applyReplacement(index);
                              }}
                              className="text-green-600 hover:text-green-700"
                            >
                              <RotateCcw className="w-3 h-3 mr-1" />
                              Anwenden
                            </Button>
                          </div>
                          
                          <p className="font-medium text-gray-900 mb-2">{issue.message}</p>
                          
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><strong>Regel:</strong> {issue.ruleId}</div>
                            <div><strong>Position:</strong> {issue.offset}-{issue.offset + issue.length}</div>
                            {issue.replacements && (
                              <div><strong>Vorschläge:</strong> {issue.replacements}</div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {result.issues.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                          <p className="text-lg font-medium">Keine Probleme gefunden!</p>
                          <p>Ihr Text ist grammatikalisch und orthographisch korrekt.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Export Section */}
                  <Card className="bg-white shadow-lg border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center gap-3">
                        <Download className="w-5 h-5 text-gray-600" />
                        Bericht exportieren
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          onClick={exportToWord}
                          className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Als Textdatei herunterladen
                        </Button>
                        <Button
                          onClick={exportToPDF}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Als PDF herunterladen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {!result && !isChecking && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Bereit für Textprüfung
                    </h3>
                    <p className="text-gray-600">
                      Geben Sie einen Text ein und klicken Sie auf "Prüfen", um mit der Analyse zu beginnen.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Check History */}
              {checkHistory.length > 0 && (
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      Prüfungsverlauf
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Ihre letzten {checkHistory.length} Textprüfungen
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-64 overflow-y-auto">
                    {checkHistory.map((historyItem, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => setResult(historyItem)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {historyItem.issues.length} Probleme
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(historyItem.meta?.timestamp || Date.now()).toLocaleTimeString('de-DE')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {historyItem.issues.filter(i => i.severity === 'error').length > 0 && (
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                            )}
                            {historyItem.issues.filter(i => i.severity === 'warning').length > 0 && (
                              <AlertTriangle className="w-3 h-3 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {historyItem.meta?.language?.name || 'Deutsch'} • {historyItem.meta?.software?.name || 'LanguageTool'}
                        </p>
                      </div>
                    ))}
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