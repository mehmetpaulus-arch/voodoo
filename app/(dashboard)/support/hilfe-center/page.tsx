'use client';

import React, { useState } from 'react';
import { 
  HelpCircle,
  Search,
  BookOpen,
  Video,
  FileText,
  MessageCircle,
  ChevronRight,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const faqCategories = [
  {
    category: 'Erste Schritte',
    icon: BookOpen,
    questions: [
      {
        q: 'Wie melde ich mich bei ZDF Assistant an?',
        a: 'Verwenden Sie Ihre ZDF-E-Mail-Adresse und das bereitgestellte Passwort. Bei Problemen wenden Sie sich an die IT-Abteilung.'
      },
      {
        q: 'Welche Browser werden unterstützt?',
        a: 'ZDF Assistant funktioniert optimal mit Chrome, Firefox, Safari und Edge (neueste Versionen).'
      },
      {
        q: 'Wie kann ich mein Profil bearbeiten?',
        a: 'Klicken Sie auf Ihr Profilbild in der Sidebar und wählen Sie "Profil bearbeiten".'
      }
    ]
  },
  {
    category: 'Transkription',
    icon: FileText,
    questions: [
      {
        q: 'Welche Dateiformate werden für Transkription unterstützt?',
        a: 'Video: MP4, MOV, AVI, WebM. Audio: MP3, WAV, M4A, FLAC. Maximale Dateigröße: 4 GB.'
      },
      {
        q: 'Wie genau ist die automatische Transkription?',
        a: 'Die Genauigkeit liegt bei 85-95%, abhängig von Audioqualität und Sprache. Deutsche Sprache wird am besten erkannt.'
      },
      {
        q: 'Kann ich mehrere Dateien gleichzeitig transkribieren?',
        a: 'Ja, Sie können bis zu 10 Dateien gleichzeitig hochladen. Die Verarbeitung erfolgt parallel.'
      }
    ]
  },
  {
    category: 'Factchecking',
    icon: Search,
    questions: [
      {
        q: 'Welche Quellen nutzt das Factchecking-System?',
        a: 'Wir verwenden Tavily Web Search, Semantic Scholar, PubMed, Crossref und Wolfram Alpha für umfassende Faktenprüfung.'
      },
      {
        q: 'Wie interpretiere ich die Factcheck-Ergebnisse?',
        a: 'Die Bewertungen reichen von "wahr" bis "falsch" mit Vertrauenswerten. Beachten Sie immer die Begründung und Quellen.'
      },
      {
        q: 'Kann ich eigene Quellen hinzufügen?',
        a: 'Aktuell nicht direkt, aber Sie können zusätzlichen Kontext in das Kontextfeld eingeben.'
      }
    ]
  },
  {
    category: 'Content-Erstellung',
    icon: Video,
    questions: [
      {
        q: 'Wie erstelle ich ein Reels-Konzept?',
        a: 'Gehen Sie zu Content Hub > Reels und folgen Sie dem 4-Schritte-Prozess: Thema, Hook, Struktur, Call-to-Action.'
      },
      {
        q: 'Kann ich meine Konzepte exportieren?',
        a: 'Ja, alle Tools bieten Export-Funktionen für Word und PDF-Formate.'
      },
      {
        q: 'Gibt es Vorlagen für verschiedene Content-Typen?',
        a: 'Ja, jedes Tool bietet vorgefertigte Vorlagen und Beispiele für schnellen Einstieg.'
      }
    ]
  }
];

const tutorials = [
  {
    title: 'ZDF Assistant Grundlagen',
    duration: '5 Min.',
    type: 'video',
    description: 'Erste Schritte und Überblick über alle Funktionen'
  },
  {
    title: 'Transkription Schritt-für-Schritt',
    duration: '8 Min.',
    type: 'video',
    description: 'Vom Upload bis zum fertigen Untertitel'
  },
  {
    title: 'Factchecking Best Practices',
    duration: '12 Min.',
    type: 'video',
    description: 'Effektive Nutzung des Factchecking-Systems'
  },
  {
    title: 'Content-Workflows optimieren',
    duration: '15 Min.',
    type: 'video',
    description: 'Tipps für effiziente Content-Erstellung'
  }
];

export default function HilfeCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredFAQs = faqCategories.filter(category => {
    if (selectedCategory && category.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    
    return category.questions.some(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Hilfe-Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Antworten auf häufige Fragen, Tutorials und Anleitungen für ZDF Assistant.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Search */}
          <Card className="bg-white shadow-lg border border-gray-200 mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Suchen Sie nach Antworten..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="faq">Häufige Fragen</TabsTrigger>
              <TabsTrigger value="tutorials">Video-Tutorials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-6">
              {/* FAQ Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('')}
                  className="h-auto py-3"
                >
                  Alle Kategorien
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.category}
                    variant={selectedCategory === category.category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.category)}
                    className="h-auto py-3 flex items-center gap-2"
                  >
                    <category.icon className="w-4 h-4" />
                    {category.category}
                  </Button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-6">
                {filteredFAQs.map((category, index) => (
                  <Card key={index} className="bg-white shadow-lg border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-blue-600" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.questions
                          .filter(q => 
                            !searchQuery || 
                            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            q.a.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((qa, qaIndex) => (
                            <div key={qaIndex} className="p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-semibold text-gray-900 mb-2">{qa.q}</h4>
                              <p className="text-gray-700 text-sm">{qa.a}</p>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tutorials" className="space-y-6">
              {/* Video Tutorials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <Card key={index} className="bg-white shadow-lg border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center gap-3">
                        <Video className="w-5 h-5 text-red-600" />
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Dauer: {tutorial.duration}</span>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          <Video className="w-4 h-4 mr-2" />
                          Ansehen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Weitere Hilfe benötigt?
              </CardTitle>
              <CardDescription className="text-gray-600">
                Kontaktieren Sie unser Support-Team für persönliche Unterstützung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white h-auto py-4 flex-col">
                  <MessageCircle className="w-6 h-6 mb-2" />
                  <span>Live Chat</span>
                  <span className="text-xs opacity-75">Sofortige Hilfe</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>Ticket erstellen</span>
                  <span className="text-xs opacity-75">Detaillierte Anfrage</span>
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white h-auto py-4 flex-col">
                  <BookOpen className="w-6 h-6 mb-2" />
                  <span>Schulung buchen</span>
                  <span className="text-xs opacity-75">Persönliche Einführung</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}