'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  FileText,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Download,
  Share2,
  Bookmark,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Trophy,
  Flame,
  Rocket,
  Globe,
  Lock,
  Unlock,
  Bell,
  Video,
  Film,
  Camera,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  Zap,
  Target,
  Users,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Brain,
  Sparkles,
  TrendingUp,
  Layers,
  Palette,
  Wand2,
  FileEdit,
  BookOpen,
  PenTool,
  Type,
  Calendar,
  MapPin,
  DollarSign,
  Timer,
  Lightbulb,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function KonzeptePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const concepts = [
    {
      id: 'CONCEPT-001',
      title: 'KI-gestützte Content-Pipeline',
      description: 'Vollautomatisierte Content-Erstellung und -Optimierung für verschiedene Plattformen mit KI-Unterstützung',
      category: 'Content-Strategie',
      status: 'In Entwicklung',
      priority: 'Hoch',
      votes: 89,
      author: 'Dr. Sarah Weber',
      created: '2024-06-15',
      tags: ['KI', 'Content', 'Automatisierung'],
      aiScore: 94,
      budget: '€250.000',
      timeline: '6 Monate',
      team: '8 Personen',
      stakeholders: ['Produktion', 'Technik', 'Redaktion']
    },
    {
      id: 'CONCEPT-002',
      title: 'Interaktive Nachrichten-App',
      description: 'Personalisierte Nachrichten-App mit KI-gestützter Content-Auswahl und Echtzeit-Feedback',
      category: 'Digital-Strategie',
      status: 'Konzept',
      priority: 'Hoch',
      votes: 67,
      author: 'Tom Müller',
      created: '2024-06-14',
      tags: ['App', 'KI', 'Nachrichten'],
      aiScore: 87,
      budget: '€180.000',
      timeline: '4 Monate',
      team: '6 Personen',
      stakeholders: ['Digital', 'Nachrichten', 'UX']
    },
    {
      id: 'CONCEPT-003',
      title: 'Virtual Reality Dokumentation',
      description: 'Immersive VR-Dokumentationen mit KI-gestützter Storytelling-Optimierung',
      category: 'Innovation',
      status: 'Pilot',
      priority: 'Mittel',
      votes: 34,
      author: 'Anna Schmidt',
      created: '2024-06-13',
      tags: ['VR', 'KI', 'Dokumentation'],
      aiScore: 79,
      budget: '€120.000',
      timeline: '3 Monate',
      team: '4 Personen',
      stakeholders: ['Innovation', 'Produktion', 'Technik']
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'Content-Strategie', label: 'Content-Strategie' },
    { value: 'Digital-Strategie', label: 'Digital-Strategie' },
    { value: 'Innovation', label: 'Innovation' },
    { value: 'Technologie', label: 'Technologie' },
    { value: 'Marketing', label: 'Marketing' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/innovation" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
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
                <Link href="/leitfaeden" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Leitfäden</Link>
                <Link href="/leitfaeden/redaktionsrichtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Redaktionsrichtlinien</Link>
                <Link href="/leitfaeden/ci-richtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">CI-Richtlinien</Link>
                <Link href="/leitfaeden/qualitaetsstandards" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Qualitätsstandards</Link>
                <Link href="/leitfaeden/barrierefreiheit" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Barrierefreiheit</Link>
                <Link href="/leitfaeden/datenschutz" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Datenschutz</Link>
              </div>
            </div>
          </div>
          
          <Link href="/forum" className="hover:text-white transition-colors font-medium text-xl">
            Forum
          </Link>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
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
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
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

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#E37222] rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">KI-Konzeptentwicklung</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Innovation Lab</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Entwickle strategische Konzepte mit KI-Unterstützung. Unser System analysiert Marktchancen, 
                bewertet Machbarkeit und optimiert Konzepte basierend auf Daten und Trends.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Strategie-Analyse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Marktchancen-Bewertung</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Umsetzungsplanung</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Status Banner */}
        <div className="bg-gradient-to-r from-[#E37222] to-[#F97316] rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KI-Konzept-Assistent aktiv</h3>
                <p className="text-white/90">Analysiert Strategien und optimiert Konzepte in Echtzeit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Concepts List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Konzepte durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Konzepte durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Concepts Grid */}
            <div className="space-y-4">
              {concepts.map((concept) => (
                <Card key={concept.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{concept.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {concept.category}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              concept.priority === 'Hoch' ? 'bg-red-100 text-red-800' :
                              concept.priority === 'Mittel' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {concept.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{concept.description}</p>
                        
                        {/* Concept Details */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{concept.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{concept.timeline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{concept.team}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{concept.stakeholders.length} Teams</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {concept.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {concept.created}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {concept.votes} Stimmen
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* AI Analysis */}
                    {aiEnabled && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-[#E37222]" />
                          <span className="font-medium text-gray-900">KI-Konzept-Analyse</span>
                          <Badge className="bg-[#E37222] text-white text-xs">
                            Score: {concept.aiScore}/100
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Strategisches Potential</span>
                            <span className="font-medium">{concept.aiScore}%</span>
                          </div>
                          <Progress value={concept.aiScore} className="h-2" />
                          <p className="text-sm text-gray-600">
                            Hohe strategische Relevanz erkannt. Empfohlene Stakeholder: {concept.stakeholders.join(', ')}.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Stakeholders */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Stakeholder</h4>
                      <div className="flex flex-wrap gap-2">
                        {concept.stakeholders.map((stakeholder) => (
                          <Badge key={stakeholder} variant="outline" className="text-xs">
                            {stakeholder}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {concept.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#E37222] hover:bg-[#D16212] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Neues Konzept
                </Button>
                <Button variant="outline" className="w-full">
                  <Wand2 className="w-4 h-4 mr-2" />
                  KI-Konzept generieren
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Marktanalyse
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  ROI-Berechnung
                </Button>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Brain className="w-5 h-5 text-[#E37222]" />
                  KI-Erkenntnisse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">3 neue Marktchancen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Budget-Optimierungen verfügbar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">2 Stakeholder-Updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Concept Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Konzept-Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Aktive Konzepte</span>
                    <span className="font-semibold">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">In Entwicklung</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pilotprojekte</span>
                    <span className="font-semibold">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">KI-Score Ø</span>
                    <span className="font-semibold text-[#E37222]">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Overview */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Budget-Übersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verfügbar</span>
                    <span className="font-medium">€2.5M</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verplant</span>
                    <span className="font-medium">€1.8M</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Verbraucht</span>
                    <span className="font-medium">€0.7M</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
