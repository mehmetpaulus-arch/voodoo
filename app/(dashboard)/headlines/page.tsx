'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Type,
  Lightbulb,
  Target,
  Star,
  Download,
  FileText,
  Sparkles,
  TrendingUp,
  Heart,
  Search,
  Smartphone,
  Monitor,
  Share2,
  Bell,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HeadlineVariant {
  id: string;
  text: string;
  type: 'informativ' | 'emotional' | 'seo';
  rating: number;
}

interface HeadlineData {
  topic: string;
  rawIdeas: string[];
  variants: HeadlineVariant[];
  finalChoice: string;
}

export default function HeadlinesPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [headlineData, setHeadlineData] = useState<HeadlineData>({
    topic: '',
    rawIdeas: [],
    variants: [],
    finalChoice: ''
  });

  const generateRawIdeas = () => {
    if (!headlineData.topic.trim()) return;

    const ideas = [
      `${headlineData.topic}: Die wichtigsten Fakten`,
      `Alles was Sie über ${headlineData.topic} wissen müssen`,
      `${headlineData.topic} - Ein Überblick`,
      `Die Wahrheit über ${headlineData.topic}`,
      `${headlineData.topic}: So funktioniert es wirklich`,
      `Experten erklären: ${headlineData.topic}`,
      `${headlineData.topic} - Hintergründe und Fakten`,
      `Das sollten Sie über ${headlineData.topic} wissen`
    ];

    setHeadlineData(prev => ({ ...prev, rawIdeas: ideas }));
    setCurrentStep(2);
  };

  const generateVariants = () => {
    const topic = headlineData.topic;
    
    const variants: HeadlineVariant[] = [
      // Informativ
      { id: '1', text: `${topic}: Die wichtigsten Fakten im Überblick`, type: 'informativ', rating: 0 },
      { id: '2', text: `Was Sie über ${topic} wissen sollten`, type: 'informativ', rating: 0 },
      { id: '3', text: `${topic} - Hintergründe und Entwicklungen`, type: 'informativ', rating: 0 },
      
      // Emotional
      { id: '4', text: `${topic}: Das bewegt Deutschland`, type: 'emotional', rating: 0 },
      { id: '5', text: `Warum ${topic} uns alle betrifft`, type: 'emotional', rating: 0 },
      { id: '6', text: `${topic} - Eine Geschichte, die berührt`, type: 'emotional', rating: 0 },
      
      // SEO
      { id: '7', text: `${topic} 2025: Aktuelle Entwicklungen`, type: 'seo', rating: 0 },
      { id: '8', text: `${topic} erklärt - Einfach und verständlich`, type: 'seo', rating: 0 },
      { id: '9', text: `${topic}: Tipps und Tricks für Einsteiger`, type: 'seo', rating: 0 }
    ];

    setHeadlineData(prev => ({ ...prev, variants }));
    setCurrentStep(3);
  };

  const rateHeadline = (id: string, rating: number) => {
    setHeadlineData(prev => ({
      ...prev,
      variants: prev.variants.map(variant => 
        variant.id === id ? { ...variant, rating } : variant
      )
    }));
  };

  const selectFinalHeadline = (headline: string) => {
    setHeadlineData(prev => ({ ...prev, finalChoice: headline }));
    setCurrentStep(4);
  };

  const generateWordDocument = () => {
    const content = `
ÜBERSCHRIFTEN-ENTWICKLUNG
==========================

THEMA: ${headlineData.topic || '[Nicht angegeben]'}

ROHIDEEN:
${headlineData.rawIdeas.map((idea, index) => `${index + 1}. ${idea}`).join('\n')}

GETESTETE VARIANTEN:

INFORMATIV:
${headlineData.variants.filter(v => v.type === 'informativ').map(v => `- ${v.text} (${v.rating}/5 Sterne)`).join('\n')}

EMOTIONAL:
${headlineData.variants.filter(v => v.type === 'emotional').map(v => `- ${v.text} (${v.rating}/5 Sterne)`).join('\n')}

SEO-FOKUSSIERT:
${headlineData.variants.filter(v => v.type === 'seo').map(v => `- ${v.text} (${v.rating}/5 Sterne)`).join('\n')}

FINALE AUSWAHL:
${headlineData.finalChoice || '[Nicht ausgewählt]'}

TOP-BEWERTETE HEADLINES:
${headlineData.variants
  .filter(v => v.rating > 0)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 5)
  .map((v, index) => `${index + 1}. ${v.text} (${v.rating}/5 Sterne)`)
  .join('\n')}

---
Erstellt mit ZDF Assistant - Headlines Tool
Datum: ${new Date().toLocaleDateString('de-DE')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Headlines_${headlineData.topic.replace(/[^a-zA-Z0-9]/g, '_') || 'Unbenannt'}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generatePDFDocument = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Überschriften-Entwicklung</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #FA7D19; border-bottom: 2px solid #FA7D19; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .section { margin-bottom: 25px; }
        .content { background: #f9f9f9; padding: 15px; border-left: 4px solid #FA7D19; }
        .variant { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .final-choice { background: #e8f5e8; border-color: #4caf50; font-weight: bold; }
        .stars { color: #ffc107; }
        .footer { margin-top: 50px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>ÜBERSCHRIFTEN-ENTWICKLUNG</h1>
    
    <div class="section">
        <h2>THEMA</h2>
        <div class="content">${headlineData.topic || '[Nicht angegeben]'}</div>
    </div>
    
    <div class="section">
        <h2>ROHIDEEN</h2>
        <div class="content">
            ${headlineData.rawIdeas.map((idea, index) => `<p>${index + 1}. ${idea}</p>`).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>GETESTETE VARIANTEN</h2>
        
        <h3>Informativ</h3>
        ${headlineData.variants.filter(v => v.type === 'informativ').map(v => `
            <div class="variant">
                <div>${v.text}</div>
                <div class="stars">Bewertung: ${'★'.repeat(v.rating)}${'☆'.repeat(5-v.rating)} (${v.rating}/5)</div>
            </div>
        `).join('')}
        
        <h3>Emotional</h3>
        ${headlineData.variants.filter(v => v.type === 'emotional').map(v => `
            <div class="variant">
                <div>${v.text}</div>
                <div class="stars">Bewertung: ${'★'.repeat(v.rating)}${'☆'.repeat(5-v.rating)} (${v.rating}/5)</div>
            </div>
        `).join('')}
        
        <h3>SEO-fokussiert</h3>
        ${headlineData.variants.filter(v => v.type === 'seo').map(v => `
            <div class="variant">
                <div>${v.text}</div>
                <div class="stars">Bewertung: ${'★'.repeat(v.rating)}${'☆'.repeat(5-v.rating)} (${v.rating}/5)</div>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2>FINALE AUSWAHL</h2>
        <div class="content final-choice">${headlineData.finalChoice || '[Nicht ausgewählt]'}</div>
    </div>
    
    <div class="footer">
        Erstellt mit ZDF Assistant - Headlines Tool<br>
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

  const getTopRatedHeadlines = () => {
    return headlineData.variants
      .filter(v => v.rating > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)'
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
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Redaktions-Workflows</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Styleguide (CI/CD)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Barrierefreiheit (WCAG)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">API-Dokumentation</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <a href="/forum" className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-xl">
              Forum
            </a>
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
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Bild- & Musikrechte</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Datenschutz & DSGVO</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Archiv & Lizenzen</a>
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
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Systemstatus</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Release Notes</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Roadmap</a>
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
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
            <Type className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Überschriften entwickeln
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Von der ersten Idee bis zur finalen Headline – Schritt für Schritt zur perfekten Überschrift.
        </p>
        
        {/* Progress Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-[#FA7D19] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-[#FA7D19]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Step 1: Topic Input */}
          {currentStep === 1 && (
            <Card className="bg-white shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">1</div>
                  <Lightbulb className="w-5 h-5 text-[#FA7D19]" />
                  Rohideen sammeln
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Beschreiben Sie Ihr Thema oder den Artikelinhalt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="z.B. Klimawandel, neue Technologie, politische Entwicklung..."
                  value={headlineData.topic}
                  onChange={(e) => setHeadlineData(prev => ({ ...prev, topic: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 min-h-[100px]"
                />
                <Button
                  onClick={generateRawIdeas}
                  disabled={!headlineData.topic.trim()}
                  className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Rohideen generieren
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Variants */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">2</div>
                    <Target className="w-5 h-5 text-[#FA7D19]" />
                    Varianten testen
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Verschiedene Ansätze für Ihre Überschrift
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-800">Informativ</span>
                      </div>
                      <p className="text-sm text-blue-600">Sachlich, faktisch, neutral</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-800">Emotional</span>
                      </div>
                      <p className="text-sm text-red-600">Gefühlvoll, persönlich, bewegend</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">SEO-fokussiert</span>
                      </div>
                      <p className="text-sm text-green-600">Suchmaschinenoptimiert, keywords</p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={generateVariants}
                    className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Varianten generieren
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Rating */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">3</div>
                    <Star className="w-5 h-5 text-[#FA7D19]" />
                    Feinschliff & Ranking
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Bewerten Sie die Überschriften mit 1-5 Sternen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="informativ" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="informativ">Informativ</TabsTrigger>
                      <TabsTrigger value="emotional">Emotional</TabsTrigger>
                      <TabsTrigger value="seo">SEO-fokussiert</TabsTrigger>
                    </TabsList>
                    
                    {['informativ', 'emotional', 'seo'].map((type) => (
                      <TabsContent key={type} value={type} className="space-y-4">
                        {headlineData.variants
                          .filter(variant => variant.type === type)
                          .map((variant) => (
                            <div key={variant.id} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-900 font-medium">{variant.text}</p>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => rateHeadline(variant.id, star)}
                                      className={`w-6 h-6 ${
                                        star <= variant.rating 
                                          ? 'text-yellow-400' 
                                          : 'text-gray-300'
                                      } hover:text-yellow-400 transition-colors`}
                                    >
                                      <Star className="w-full h-full fill-current" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                  
                  <div className="mt-6">
                    <Button
                      onClick={() => setCurrentStep(4)}
                      disabled={!headlineData.variants.some(v => v.rating > 0)}
                      className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                    >
                      Zur finalen Auswahl
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Final Selection */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">4</div>
                    <Target className="w-5 h-5 text-[#FA7D19]" />
                    Finale Auswahl
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Wählen Sie Ihre finale Überschrift und sehen Sie die Vorschau
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Top Rated Headlines */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top bewertete Überschriften:</h3>
                    <div className="space-y-3">
                      {getTopRatedHeadlines().map((variant, index) => (
                        <div 
                          key={variant.id} 
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            headlineData.finalChoice === variant.text
                              ? 'border-[#FA7D19] bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => selectFinalHeadline(variant.text)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">#{index + 1}</span>
                              <p className="text-gray-900 font-medium">{variant.text}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= variant.rating 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">({variant.rating}/5)</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preview Formats */}
                  {headlineData.finalChoice && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vorschau in verschiedenen Formaten:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Desktop Teaser */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Monitor className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Desktop Teaser</span>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-lg font-bold text-gray-900 leading-tight">
                              {headlineData.finalChoice}
                            </h4>
                          </div>
                        </div>

                        {/* Mobile Ansicht */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Mobile Ansicht</span>
                          </div>
                          <div className="bg-white p-3 rounded border max-w-48">
                            <h4 className="text-sm font-bold text-gray-900 leading-tight">
                              {headlineData.finalChoice}
                            </h4>
                          </div>
                        </div>

                        {/* Social Media */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Share2 className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Social Media</span>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <h4 className="text-base font-bold text-gray-900 leading-tight">
                              {headlineData.finalChoice}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Export Buttons */}
                  <div className="pt-6 border-t border-gray-200 space-y-3">
                    <Button
                      onClick={generateWordDocument}
                      className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      disabled={!headlineData.finalChoice}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      📄 Als Word herunterladen
                    </Button>
                    <Button
                      onClick={generatePDFDocument}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                      disabled={!headlineData.finalChoice}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      📑 Als PDF herunterladen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}