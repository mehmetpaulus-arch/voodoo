'use client';

import React from 'react';
import { 
  Map,
  Calendar,
  Target,
  Lightbulb,
  Rocket,
  Clock,
  Users,
  Zap,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const roadmapItems = [
  {
    quarter: 'Q1 2025',
    status: 'in-progress',
    items: [
      {
        title: 'KI-Video-Editor Integration',
        description: 'Automatischer Videoschnitt mit KI-Unterstützung',
        priority: 'high',
        team: 'Video-Team',
        progress: 75
      },
      {
        title: 'Erweiterte Factchecking-Quellen',
        description: 'Integration von Reuters, AP und weiteren Nachrichtenagenturen',
        priority: 'high',
        team: 'Backend-Team',
        progress: 60
      },
      {
        title: 'Mobile App (iOS/Android)',
        description: 'Native mobile Anwendung für ZDF Assistant',
        priority: 'medium',
        team: 'Mobile-Team',
        progress: 30
      }
    ]
  },
  {
    quarter: 'Q2 2025',
    status: 'planned',
    items: [
      {
        title: 'Real-time Collaboration',
        description: 'Gemeinsame Bearbeitung von Dokumenten in Echtzeit',
        priority: 'high',
        team: 'Frontend-Team',
        progress: 0
      },
      {
        title: 'Advanced Analytics Dashboard',
        description: 'Detaillierte Nutzungsstatistiken und Performance-Metriken',
        priority: 'medium',
        team: 'Data-Team',
        progress: 0
      },
      {
        title: 'Voice Commands',
        description: 'Sprachsteuerung für häufige Aktionen',
        priority: 'low',
        team: 'AI-Team',
        progress: 0
      }
    ]
  },
  {
    quarter: 'Q3 2025',
    status: 'planned',
    items: [
      {
        title: 'Multi-Language Support',
        description: 'Vollständige Unterstützung für Englisch und Französisch',
        priority: 'medium',
        team: 'Localization-Team',
        progress: 0
      },
      {
        title: 'Advanced AI Models',
        description: 'Integration neuester GPT und Claude Modelle',
        priority: 'high',
        team: 'AI-Team',
        progress: 0
      },
      {
        title: 'Workflow Automation',
        description: 'Automatisierung wiederkehrender Aufgaben',
        priority: 'medium',
        team: 'Backend-Team',
        progress: 0
      }
    ]
  },
  {
    quarter: 'Q4 2025',
    status: 'research',
    items: [
      {
        title: 'AR/VR Content Tools',
        description: 'Tools für immersive Content-Erstellung',
        priority: 'low',
        team: 'Innovation-Team',
        progress: 0
      },
      {
        title: 'Blockchain Integration',
        description: 'Dezentrale Rechteverwaltung und Authentifizierung',
        priority: 'low',
        team: 'Research-Team',
        progress: 0
      },
      {
        title: 'Quantum Computing Prep',
        description: 'Vorbereitung auf Quantum-Computing-Integration',
        priority: 'research',
        team: 'Research-Team',
        progress: 0
      }
    ]
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'research':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'planned':
      return 'bg-yellow-100 text-yellow-800';
    case 'research':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/changelog">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Changelog
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
          <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
            <Map className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Entwicklungs-Roadmap
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Geplante Features und Entwicklungen für die Zukunft des ZDF Assistant.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {roadmapItems.map((quarter, index) => (
            <Card key={index} className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    {quarter.quarter}
                  </CardTitle>
                  <Badge className={getStatusColor(quarter.status)}>
                    {quarter.status === 'in-progress' ? 'In Entwicklung' :
                     quarter.status === 'planned' ? 'Geplant' :
                     quarter.status === 'research' ? 'Forschung' : quarter.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quarter.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority === 'high' ? 'Hoch' :
                             item.priority === 'medium' ? 'Mittel' :
                             item.priority === 'low' ? 'Niedrig' :
                             item.priority === 'research' ? 'Forschung' : item.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{item.team}</span>
                        </div>
                        
                        {item.progress > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{item.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Feedback Section */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Feature-Vorschläge
              </CardTitle>
              <CardDescription className="text-gray-600">
                Haben Sie Ideen für neue Features? Teilen Sie sie mit uns!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white h-auto py-4 flex-col">
                  <Lightbulb className="w-6 h-6 mb-2" />
                  <span>Feature Request</span>
                  <span className="text-xs opacity-75">Neue Idee vorschlagen</span>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <Target className="w-6 h-6 mb-2" />
                  <span>Feedback geben</span>
                  <span className="text-xs opacity-75">Bestehende Features bewerten</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}