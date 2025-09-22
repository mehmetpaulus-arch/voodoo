'use client';

import React from 'react';
import { 
  BookOpen,
  Play,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Video,
  FileText,
  Bell,
  ChevronLeft,
  Rocket
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const onboardingModules = [
  {
    title: 'ZDF Assistant Grundlagen',
    duration: '30 Min.',
    type: 'video',
    description: 'Überblick über alle Funktionen und erste Schritte',
    topics: [
      'Navigation und Benutzeroberfläche',
      'Profil einrichten',
      'Erste Chat-Interaktion',
      'Grundlegende Workflows'
    ],
    completed: true
  },
  {
    title: 'Content-Erstellung Masterclass',
    duration: '45 Min.',
    type: 'interactive',
    description: 'Praktische Übungen für Reels, Headlines und Artikel',
    topics: [
      'Reels-Konzepte entwickeln',
      'Headlines A/B-Testing',
      'Slideshow-Erstellung',
      'Export und Sharing'
    ],
    completed: false
  },
  {
    title: 'Transkription & Factchecking',
    duration: '25 Min.',
    type: 'video',
    description: 'Effiziente Nutzung der KI-Tools',
    topics: [
      'Upload-Best-Practices',
      'Transkriptions-Einstellungen',
      'Factchecking-Strategien',
      'Quellen bewerten'
    ],
    completed: false
  },
  {
    title: 'Compliance & Rechtliches',
    duration: '20 Min.',
    type: 'document',
    description: 'Wichtige rechtliche Aspekte und Richtlinien',
    topics: [
      'Bildrechte und Lizenzen',
      'Datenschutz-Grundlagen',
      'Archiv-Nutzung',
      'Notfall-Kontakte'
    ],
    completed: false
  }
];

const upcomingTrainings = [
  {
    title: 'ZDF Assistant für Redakteure',
    date: '3. Februar 2025',
    time: '14:00-16:00',
    trainer: 'Anna Müller',
    spots: '8 von 12 Plätzen frei',
    type: 'live'
  },
  {
    title: 'Advanced Factchecking Workshop',
    date: '10. Februar 2025',
    time: '10:00-12:00',
    trainer: 'Dr. Michael Weber',
    spots: '5 von 8 Plätzen frei',
    type: 'live'
  },
  {
    title: 'Video-Tools Deep Dive',
    date: '17. Februar 2025',
    time: '15:00-17:00',
    trainer: 'Lisa Wagner',
    spots: '12 von 15 Plätzen frei',
    type: 'live'
  }
];

export default function OnboardingPage() {
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
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Onboarding & Schulungen
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Lernen Sie ZDF Assistant kennen und werden Sie zum Power-User.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Learning Modules */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Play className="w-5 h-5 text-blue-600" />
                Lernmodule
              </CardTitle>
              <CardDescription className="text-gray-600">
                Strukturierte Einführung in alle ZDF Assistant Funktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingModules.map((module, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {module.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full mt-1" />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-gray-600 text-sm">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {module.type === 'video' ? '📹 Video' :
                           module.type === 'interactive' ? '🎯 Interaktiv' :
                           module.type === 'document' ? '📄 Dokument' : module.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {module.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 mb-2">Inhalte:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-gray-400 mt-1">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className={module.completed 
                          ? "bg-gray-400 text-white cursor-not-allowed" 
                          : "bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                        }
                        disabled={module.completed}
                      >
                        {module.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Abgeschlossen
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Starten
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Trainings */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Users className="w-5 h-5 text-green-600" />
                Live-Schulungen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Persönliche Schulungen mit ZDF Assistant Experten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTrainings.map((training, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{training.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {training.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {training.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {training.trainer}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {training.spots}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        Anmelden
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Guide */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Rocket className="w-5 h-5 text-purple-600" />
                Quick Start Guide
              </CardTitle>
              <CardDescription className="text-gray-600">
                Die wichtigsten Schritte für den sofortigen Einstieg
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">In 5 Minuten startklar:</h4>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">1</div>
                      <span className="text-gray-700">Profil vervollständigen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">2</div>
                      <span className="text-gray-700">Erste Chat-Nachricht senden</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">3</div>
                      <span className="text-gray-700">Content Hub erkunden</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">4</div>
                      <span className="text-gray-700">Erstes Reels-Konzept erstellen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">5</div>
                      <span className="text-gray-700">Team-Forum besuchen</span>
                    </li>
                  </ol>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Hilfreiche Ressourcen:</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                      <Video className="w-4 h-4 mr-3" />
                      Einführungsvideo (5 Min.)
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                      <FileText className="w-4 h-4 mr-3" />
                      PDF-Handbuch herunterladen
                    </Button>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
                      <Users className="w-4 h-4 mr-3" />
                      1:1 Schulung buchen
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Ihr Fortschritt
              </CardTitle>
              <CardDescription className="text-gray-600">
                Verfolgen Sie Ihren Lernfortschritt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Gesamtfortschritt</span>
                  <span className="text-gray-900 font-semibold">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '25%' }} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-green-700">Module abgeschlossen</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-blue-700">Module verbleibend</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">30</div>
                    <div className="text-sm text-purple-700">Min. geschätzte Zeit</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}