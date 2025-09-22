'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Rocket,
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
  ThumbsDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PlayCircle,
  PauseCircle,
  StopCircle
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

export default function PilotenPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const pilots = [
    {
      id: 'PILOT-001',
      title: 'KI-gestützte Nachrichtenproduktion',
      description: 'Automatisierte Nachrichtenerstellung mit KI-gestützter Recherche und Personalisierung',
      category: 'Nachrichten',
      status: 'Läuft',
      priority: 'Hoch',
      votes: 156,
      author: 'Dr. Sarah Weber',
      created: '2024-06-15',
      tags: ['KI', 'Nachrichten', 'Automatisierung'],
      aiScore: 91,
      progress: 75,
      budget: '€180.000',
      timeline: '4 Monate',
      team: '6 Personen',
      startDate: '2024-05-01',
      endDate: '2024-08-31',
      metrics: {
        engagement: '+23%',
        efficiency: '+45%',
        quality: '94%'
      }
    },
    {
      id: 'PILOT-002',
      title: 'Interaktive Dokumentation VR',
      description: 'Immersive VR-Dokumentation mit Echtzeit-Interaktion und KI-gestützter Storytelling',
      category: 'Dokumentation',
      status: 'Pausiert',
      priority: 'Mittel',
      votes: 89,
      author: 'Tom Müller',
      created: '2024-06-14',
      tags: ['VR', 'KI', 'Dokumentation'],
      aiScore: 78,
      progress: 45,
      budget: '€120.000',
      timeline: '3 Monate',
      team: '4 Personen',
      startDate: '2024-04-15',
      endDate: '2024-07-15',
      metrics: {
        engagement: '+67%',
        efficiency: '+12%',
        quality: '87%'
      }
    },
    {
      id: 'PILOT-003',
      title: 'Personalisierte Content-App',
      description: 'KI-gestützte Content-Personalisierung für mobile Endgeräte',
      category: 'Digital',
      status: 'Abgeschlossen',
      priority: 'Hoch',
      votes: 234,
      author: 'Anna Schmidt',
      created: '2024-06-13',
      tags: ['App', 'KI', 'Personalisierung'],
      aiScore: 95,
      progress: 100,
      budget: '€95.000',
      timeline: '2 Monate',
      team: '5 Personen',
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      metrics: {
        engagement: '+89%',
        efficiency: '+78%',
        quality: '96%'
      }
    }
  ];

  const statuses = [
    { value: 'all', label: 'Alle Status' },
    { value: 'Läuft', label: 'Läuft' },
    { value: 'Pausiert', label: 'Pausiert' },
    { value: 'Abgeschlossen', label: 'Abgeschlossen' },
    { value: 'Geplant', label: 'Geplant' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Läuft': return 'bg-green-100 text-green-800';
      case 'Pausiert': return 'bg-yellow-100 text-yellow-800';
      case 'Abgeschlossen': return 'bg-blue-100 text-blue-800';
      case 'Geplant': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Läuft': return <PlayCircle className="w-4 h-4" />;
      case 'Pausiert': return <PauseCircle className="w-4 h-4" />;
      case 'Abgeschlossen': return <CheckCircle2 className="w-4 h-4" />;
      case 'Geplant': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

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
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">KI-Pilotprojekte</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Innovation Lab</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Teste innovative Konzepte in der Praxis. Unser KI-System überwacht Pilotprojekte in Echtzeit, 
                analysiert Performance und schlägt Optimierungen vor.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Performance-Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Echtzeit-Analyse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Optimierungsvorschläge</span>
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
                <h3 className="text-xl font-bold">KI-Pilot-Monitor aktiv</h3>
                <p className="text-white/90">Überwacht 3 aktive Pilotprojekte und analysiert Performance in Echtzeit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pilots List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Pilotprojekte durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Pilotprojekte durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pilots Grid */}
            <div className="space-y-4">
              {pilots.map((pilot) => (
                <Card key={pilot.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{pilot.title}</h3>
                          <Badge className={`text-xs ${getStatusColor(pilot.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(pilot.status)}
                              {pilot.status}
                            </div>
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              pilot.priority === 'Hoch' ? 'bg-red-100 text-red-800' :
                              pilot.priority === 'Mittel' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {pilot.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{pilot.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Fortschritt</span>
                            <span className="font-medium">{pilot.progress}%</span>
                          </div>
                          <Progress value={pilot.progress} className="h-2" />
                        </div>
                        
                        {/* Pilot Details */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{pilot.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{pilot.timeline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{pilot.team}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{pilot.endDate}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {pilot.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {pilot.created}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {pilot.votes} Stimmen
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
                          <span className="font-medium text-gray-900">KI-Pilot-Analyse</span>
                          <Badge className="bg-[#E37222] text-white text-xs">
                            Score: {pilot.aiScore}/100
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{pilot.metrics.engagement}</div>
                            <div className="text-xs text-gray-600">Engagement</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{pilot.metrics.efficiency}</div>
                            <div className="text-xs text-gray-600">Effizienz</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{pilot.metrics.quality}</div>
                            <div className="text-xs text-gray-600">Qualität</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {pilot.status === 'Läuft' ? 'Pilot läuft erfolgreich. Empfohlene Optimierungen verfügbar.' :
                           pilot.status === 'Pausiert' ? 'Pilot pausiert. KI schlägt Anpassungen vor.' :
                           'Pilot erfolgreich abgeschlossen. Ergebnisse für Skalierung verfügbar.'}
                        </p>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {pilot.tags.map((tag) => (
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
                  Neues Pilotprojekt
                </Button>
                <Button variant="outline" className="w-full">
                  <Rocket className="w-4 h-4 mr-2" />
                  Pilot starten
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance-Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Optimierungen
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
                    <span className="text-sm text-gray-600">2 Piloten überperforming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">1 Pilot benötigt Anpassung</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">3 Optimierungen verfügbar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pilot Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Pilot-Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Aktive Piloten</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pausiert</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Abgeschlossen</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnitts-Score</span>
                    <span className="font-semibold text-[#E37222]">88%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Performance-Übersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engagement</span>
                    <span className="font-medium">+60%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Effizienz</span>
                    <span className="font-medium">+45%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Qualität</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
