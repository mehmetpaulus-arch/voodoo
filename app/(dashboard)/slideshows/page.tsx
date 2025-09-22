'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Presentation,
  Upload,
  Image as ImageIcon,
  Type,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  GripVertical,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SlideData {
  id: string;
  image?: File | string;
  imageUrl?: string;
  text: string;
}

interface SlideshowData {
  title: string;
  storyboardType: string;
  slides: SlideData[];
}

const storyboardOptions = [
  { value: 'info', label: 'Info-Slideshow (Fakten präsentieren)' },
  { value: 'countdown', label: 'Countdown (Top 10, 5 Tipps, etc.)' },
  { value: 'quotes', label: 'Zitat-Reihe (Statements & Meinungen)' },
  { value: 'reportage', label: 'Mini-Reportage (Geschichte erzählen)' }
];

export default function SlideshowsPage() {
  const [slideshowData, setSlideshowData] = useState<SlideshowData>({
    title: '',
    storyboardType: '',
    slides: [{ id: '1', text: '' }]
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateTitle = (title: string) => {
    setSlideshowData(prev => ({ ...prev, title }));
  };

  const updateStoryboardType = (storyboardType: string) => {
    setSlideshowData(prev => ({ ...prev, storyboardType }));
  };

  const addSlide = () => {
    if (slideshowData.slides.length >= 20) return;
    
    const newSlide: SlideData = {
      id: Date.now().toString(),
      text: ''
    };
    
    setSlideshowData(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide]
    }));
  };

  const removeSlide = (slideId: string) => {
    if (slideshowData.slides.length <= 1) return;
    
    setSlideshowData(prev => ({
      ...prev,
      slides: prev.slides.filter(slide => slide.id !== slideId)
    }));
    
    // Adjust current slide if necessary
    if (currentSlide >= slideshowData.slides.length - 1) {
      setCurrentSlide(Math.max(0, slideshowData.slides.length - 2));
    }
  };

  const updateSlideText = (slideId: string, text: string) => {
    setSlideshowData(prev => ({
      ...prev,
      slides: prev.slides.map(slide => 
        slide.id === slideId ? { ...slide, text } : slide
      )
    }));
  };

  const handleImageUpload = (slideId: string, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSlideshowData(prev => ({
      ...prev,
      slides: prev.slides.map(slide => 
        slide.id === slideId ? { ...slide, image: file, imageUrl } : slide
      )
    }));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slideshowData.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slideshowData.slides.length) % slideshowData.slides.length);
  };

  const toggleAutoplay = () => {
    if (isAutoplay) {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        setAutoplayInterval(null);
      }
      setIsAutoplay(false);
    } else {
      const interval = setInterval(nextSlide, 3000);
      setAutoplayInterval(interval);
      setIsAutoplay(true);
    }
  };

  const generateWordDocument = () => {
    const content = `
SLIDESHOW-KONZEPT
==================

TITEL: ${slideshowData.title || '[Nicht angegeben]'}

STORYBOARD-TYP: ${storyboardOptions.find(opt => opt.value === slideshowData.storyboardType)?.label || '[Nicht ausgewählt]'}

SLIDES (${slideshowData.slides.length} von max. 20):
${slideshowData.slides.map((slide, index) => `
Slide ${index + 1}:
${slide.image ? `- Bild: ${slide.image instanceof File ? slide.image.name : 'Bild hochgeladen'}` : '- Bild: [Kein Bild]'}
- Text: ${slide.text || '[Kein Text]'}
`).join('')}

---
Erstellt mit ZDF Assistant - Slideshows Tool
Datum: ${new Date().toLocaleDateString('de-DE')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Slideshow-Konzept_${slideshowData.title.replace(/[^a-zA-Z0-9]/g, '_') || 'Unbenannt'}.txt`;
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
    <title>Slideshow-Konzept</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #FA7D19; border-bottom: 2px solid #FA7D19; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 30px; }
        .section { margin-bottom: 25px; }
        .content { background: #f9f9f9; padding: 15px; border-left: 4px solid #FA7D19; }
        .slide { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .slide-number { font-weight: bold; color: #FA7D19; }
        .footer { margin-top: 50px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <h1>SLIDESHOW-KONZEPT</h1>
    
    <div class="section">
        <h2>TITEL</h2>
        <div class="content">${slideshowData.title || '[Nicht angegeben]'}</div>
    </div>
    
    <div class="section">
        <h2>STORYBOARD-TYP</h2>
        <div class="content">${storyboardOptions.find(opt => opt.value === slideshowData.storyboardType)?.label || '[Nicht ausgewählt]'}</div>
    </div>
    
    <div class="section">
        <h2>SLIDES (${slideshowData.slides.length} von max. 20)</h2>
        ${slideshowData.slides.map((slide, index) => `
            <div class="slide">
                <div class="slide-number">Slide ${index + 1}:</div>
                <p><strong>Bild:</strong> ${slide.image ? (slide.image instanceof File ? slide.image.name : 'Bild hochgeladen') : '[Kein Bild]'}</p>
                <p><strong>Text:</strong> ${slide.text || '[Kein Text]'}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        Erstellt mit ZDF Assistant - Slideshows Tool<br>
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
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
    }}>
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
          <div className="p-4 rounded-full bg-gray-100">
            <Presentation className="w-12 h-12 text-gray-700" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Slideshows entwickeln
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Storyboard, Bildabfolge und Textbausteine für Social Media oder Präsentationen.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Schritt 1: Titel */}
              <Card className="bg-white shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">1</div>
                    <Type className="w-5 h-5 text-[#FA7D19]" />
                    Titel definieren
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Wie soll Ihre Slideshow heißen?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="z.B. Klimawandel erklärt, Top 10 Reisetipps..."
                    value={slideshowData.title}
                    onChange={(e) => updateTitle(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  />
                </CardContent>
              </Card>

              {/* Schritt 2: Storyboard-Typ */}
              <Card className="bg-white shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">2</div>
                    <Presentation className="w-5 h-5 text-[#FA7D19]" />
                    Storyboard-Typ wählen
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Welche Art von Slideshow möchten Sie erstellen?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={slideshowData.storyboardType} onValueChange={updateStoryboardType}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Storyboard-Typ auswählen..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      {storyboardOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Schritt 3: Slides */}
              <Card className="bg-white shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA7D19] text-white flex items-center justify-center font-bold">3</div>
                    <ImageIcon className="w-5 h-5 text-[#FA7D19]" />
                    Slides erstellen ({slideshowData.slides.length}/20)
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Fügen Sie Bilder hinzu und schreiben Sie Texte für jede Folie
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {slideshowData.slides.map((slide, index) => (
                    <div key={slide.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Slide {index + 1}</h4>
                        {slideshowData.slides.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSlide(slide.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {/* Image Upload */}
                      <div className="mb-3">
                        <Label className="text-gray-700 text-sm">Bild</Label>
                        <div className="mt-1">
                          {slide.imageUrl ? (
                            <div className="relative">
                              <img 
                                src={slide.imageUrl} 
                                alt={`Slide ${index + 1}`}
                                className="w-full h-32 object-cover rounded border"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSlideshowData(prev => ({
                                    ...prev,
                                    slides: prev.slides.map(s => 
                                      s.id === slide.id ? { ...s, image: undefined, imageUrl: undefined } : s
                                    )
                                  }));
                                }}
                                className="absolute top-1 right-1 bg-white/80 hover:bg-white text-gray-600"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0];
                                  if (file) {
                                    handleImageUpload(slide.id, file);
                                  }
                                };
                                input.click();
                              }}
                            >
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500 text-sm">Bild hochladen</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Text Input */}
                      <div>
                        <Label className="text-gray-700 text-sm">Text</Label>
                        <Textarea
                          placeholder="Text für diese Folie (1-3 Zeilen)..."
                          value={slide.text}
                          onChange={(e) => updateSlideText(slide.id, e.target.value)}
                          className="mt-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {slideshowData.slides.length < 20 && (
                    <Button
                      onClick={addSlide}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
                    >
                      + Neue Folie hinzufügen
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-md border border-gray-200 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Presentation className="w-5 h-5 text-[#FA7D19]" />
                    Live-Vorschau
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    So sieht Ihre Slideshow aus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Slideshow Preview */}
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    {slideshowData.slides.length > 0 && (
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <div className="text-center">
                          {slideshowData.slides[currentSlide]?.imageUrl ? (
                            <img 
                              src={slideshowData.slides[currentSlide].imageUrl} 
                              alt={`Slide ${currentSlide + 1}`}
                              className="max-w-full max-h-32 object-contain mx-auto mb-3 rounded"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center mx-auto mb-3">
                              <ImageIcon className="w-8 h-8 text-gray-500" />
                            </div>
                          )}
                          <p className="text-gray-800 text-sm leading-relaxed">
                            {slideshowData.slides[currentSlide]?.text || '[Kein Text]'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Navigation Controls */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevSlide}
                        disabled={slideshowData.slides.length <= 1}
                        className="bg-white/80 hover:bg-white text-gray-700"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleAutoplay}
                          className="bg-white/80 hover:bg-white text-gray-700"
                        >
                          {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                          {currentSlide + 1} / {slideshowData.slides.length}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextSlide}
                        disabled={slideshowData.slides.length <= 1}
                        className="bg-white/80 hover:bg-white text-gray-700"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Button
                      onClick={generateWordDocument}
                      className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      disabled={!slideshowData.title}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      📄 Als Word herunterladen
                    </Button>
                    <Button
                      onClick={generatePDFDocument}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white"
                      disabled={!slideshowData.title}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      📑 Als PDF herunterladen
                    </Button>
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