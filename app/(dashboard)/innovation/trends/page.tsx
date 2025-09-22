'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
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
  StopCircle,
  User,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin as Location,
  Briefcase,
  GraduationCap,
  Languages,
  Coffee,
  Heart,
  Smile,
  Frown,
  Meh,
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingDown,
  LineChart,
  BarChart,
  PieChart as PieChartIcon,
  AreaChart,
  Radar,
  Gauge,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning
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

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const trends = [
    {
      id: 'TREND-001',
      title: 'KI-gestützte Personalisierung',
      description: 'Automatisierte Content-Anpassung basierend auf Nutzerverhalten und Präferenzen',
      category: 'Technologie',
      status: 'Steigend',
      priority: 'Hoch',
      votes: 234,
      author: 'Dr. Sarah Weber',
      created: '2024-06-15',
      tags: ['KI', 'Personalisierung', 'Content'],
      aiScore: 96,
      impact: 'Hoch',
      timeframe: '6-12 Monate',
      confidence: 94,
      marketSize: '€2.5B',
      growthRate: '+45%',
      competitors: 12,
      opportunities: ['Content-Optimierung', 'User Experience', 'Engagement'],
      risks: ['Datenschutz', 'Technische Komplexität', 'Kosten']
    },
    {
      id: 'TREND-002',
      title: 'Immersive VR/AR Inhalte',
      description: 'Virtual und Augmented Reality für interaktive Medieninhalte',
      category: 'Technologie',
      status: 'Steigend',
      priority: 'Mittel',
      votes: 156,
      author: 'Tom Müller',
      created: '2024-06-14',
      tags: ['VR', 'AR', 'Immersive'],
      aiScore: 87,
      impact: 'Mittel',
      timeframe: '12-18 Monate',
      confidence: 78,
      marketSize: '€1.8B',
      growthRate: '+67%',
      competitors: 8,
      opportunities: ['Neue Formate', 'Engagement', 'Innovation'],
      risks: ['Technische Hürden', 'Kosten', 'Adoption']
    },
    {
      id: 'TREND-003',
      title: 'Nachhaltige Produktion',
      description: 'Umweltfreundliche und nachhaltige Content-Produktion',
      category: 'Nachhaltigkeit',
      status: 'Stabil',
      priority: 'Hoch',
      votes: 189,
      author: 'Anna Schmidt',
      created: '2024-06-13',
      tags: ['Nachhaltigkeit', 'Umwelt', 'Produktion'],
      aiScore: 92,
      impact: 'Hoch',
      timeframe: '3-6 Monate',
      confidence: 89,
      marketSize: '€3.2B',
      growthRate: '+23%',
      competitors: 15,
      opportunities: ['CSR', 'Kosteneinsparung', 'Image'],
      risks: ['Implementierung', 'Kosten', 'Messbarkeit']
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'Technologie', label: 'Technologie' },
    { value: 'Nachhaltigkeit', label: 'Nachhaltigkeit' },
    { value: 'Content', label: 'Content' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Gesellschaft', label: 'Gesellschaft' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Steigend': return 'bg-green-100 text-green-800';
      case 'Stabil': return 'bg-blue-100 text-blue-800';
      case 'Fallend': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Steigend': return <TrendingUp className="w-4 h-4" />;
      case 'Stabil': return <Minus className="w-4 h-4" />;
      case 'Fallend': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Hoch': return 'bg-red-100 text-red-800';
      case 'Mittel': return 'bg-yellow-100 text-yellow-800';
      case 'Niedrig': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">KI-Trend Analysis</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Innovation Lab</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Entdecke und analysiere Markttrends mit KI-Unterstützung. Unser System überwacht globale Entwicklungen, 
                bewertet Chancen und Risiken und schlägt strategische Maßnahmen vor.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Trend-Erkennung</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Marktanalyse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Strategische Empfehlungen</span>
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
                <h3 className="text-xl font-bold">KI-Trend-Monitor aktiv</h3>
                <p className="text-white/90">Überwacht 247 globale Trends und analysiert Marktchancen in Echtzeit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trends List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Trends durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Trends durchsuchen..."
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

            {/* Trends Grid */}
            <div className="space-y-4">
              {trends.map((trend) => (
                <Card key={trend.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{trend.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {trend.category}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(trend.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(trend.status)}
                              {trend.status}
                            </div>
                          </Badge>
                          <Badge className={`text-xs ${getImpactColor(trend.impact)}`}>
                            {trend.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{trend.description}</p>
                        
                        {/* Trend Metrics */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{trend.marketSize}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{trend.growthRate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{trend.competitors} Konkurrenten</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{trend.timeframe}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {trend.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {trend.created}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {trend.votes} Stimmen
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
                          <span className="font-medium text-gray-900">KI-Trend-Analyse</span>
                          <Badge className="bg-[#E37222] text-white text-xs">
                            Score: {trend.aiScore}/100
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Confidence: {trend.confidence}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Chancen</h4>
                            <div className="space-y-1">
                              {trend.opportunities.map((opportunity) => (
                                <div key={opportunity} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                                  <span className="text-xs text-gray-600">{opportunity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Risiken</h4>
                            <div className="space-y-1">
                              {trend.risks.map((risk) => (
                                <div key={risk} className="flex items-center gap-2">
                                  <AlertTriangle className="w-3 h-3 text-red-600" />
                                  <span className="text-xs text-gray-600">{risk}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {trend.tags.map((tag) => (
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
                  Neuen Trend hinzufügen
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trend-Analyse starten
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Markt-Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Strategie-Empfehlungen
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
                    <span className="text-sm text-gray-600">5 neue aufkommende Trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">3 Marktchancen identifiziert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">2 Risiken erkannt</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trend Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Trend-Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Aktive Trends</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Steigend</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stabil</span>
                    <span className="font-semibold">134</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fallend</span>
                    <span className="font-semibold">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Overview */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Markt-Übersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Technologie</span>
                    <span className="font-medium">€2.5B</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nachhaltigkeit</span>
                    <span className="font-medium">€3.2B</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Content</span>
                    <span className="font-medium">€1.8B</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
