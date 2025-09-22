'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Presentation,
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
  CloudLightning,
  Image,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  Folder,
  FolderOpen,
  Save,
  Upload,
  Copy,
  Scissors,
  Clipboard,
  ClipboardList,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardPaste,
  ClipboardX,
  ClipboardEdit,
  ClipboardType
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

export default function PraesentationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState('');
  const [presentationTopic, setPresentationTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('professional');

  const presentations = [
    {
      id: 'PRES-001',
      title: 'Q4 Marketing Strategy',
      description: 'Strategische Marketing-Planung für das vierte Quartal',
      template: 'Business',
      status: 'Fertig',
      priority: 'Hoch',
      votes: 45,
      author: 'Dr. Sarah Weber',
      created: '2024-06-15',
      tags: ['Marketing', 'Strategie', 'Q4'],
      aiScore: 92,
      slides: 24,
      duration: '45 Min',
      lastModified: '2024-06-15',
      views: 156,
      url: '/presentations/q4-marketing-strategy'
    },
    {
      id: 'PRES-002',
      title: 'Brand Guidelines 2024',
      description: 'Neue Markenrichtlinien und CI-Standards',
      template: 'Creative',
      status: 'In Bearbeitung',
      priority: 'Mittel',
      votes: 23,
      author: 'Tom Müller',
      created: '2024-06-14',
      tags: ['Brand', 'CI', 'Guidelines'],
      aiScore: 87,
      slides: 18,
      duration: '30 Min',
      lastModified: '2024-06-14',
      views: 89,
      url: '/presentations/brand-guidelines-2024'
    },
    {
      id: 'PRES-003',
      title: 'Social Media Campaign',
      description: 'Kampagnen-Übersicht für Social Media Aktivitäten',
      template: 'Modern',
      status: 'Entwurf',
      priority: 'Hoch',
      votes: 67,
      author: 'Anna Schmidt',
      created: '2024-06-13',
      tags: ['Social Media', 'Campaign', 'Marketing'],
      aiScore: 89,
      slides: 15,
      duration: '25 Min',
      lastModified: '2024-06-13',
      views: 234,
      url: '/presentations/social-media-campaign'
    }
  ];

  const templates = [
    { value: 'all', label: 'Alle Templates' },
    { value: 'Business', label: 'Business' },
    { value: 'Creative', label: 'Creative' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Minimal', label: 'Minimal' },
    { value: 'Academic', label: 'Academic' }
  ];

  const styles = [
    { value: 'professional', label: 'Professionell' },
    { value: 'creative', label: 'Kreativ' },
    { value: 'minimal', label: 'Minimalistisch' },
    { value: 'modern', label: 'Modern' },
    { value: 'corporate', label: 'Corporate' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fertig': return 'bg-green-100 text-green-800';
      case 'In Bearbeitung': return 'bg-yellow-100 text-yellow-800';
      case 'Entwurf': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fertig': return <CheckCircle2 className="w-4 h-4" />;
      case 'In Bearbeitung': return <Clock className="w-4 h-4" />;
      case 'Entwurf': return <Edit className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const createPresentation = async () => {
    if (!presentationTitle.trim() || !presentationTopic.trim()) return;
    
    setIsCreating(true);
    try {
      const response = await fetch('/api/gamma-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: presentationTitle,
          topic: presentationTopic,
          style: selectedStyle,
          aiEnabled: aiEnabled
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Reset form
        setPresentationTitle('');
        setPresentationTopic('');
        setSelectedStyle('professional');
        
        // Show success message and redirect to presentation
        if (data.presentationUrl) {
          window.open(data.presentationUrl, '_blank');
        }
        
        console.log('Presentation created successfully:', data);
      } else {
        const errorData = await response.json();
        console.error('Error creating presentation:', errorData);
        alert('Fehler beim Erstellen der Präsentation: ' + (errorData.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error('Error creating presentation:', error);
      alert('Fehler beim Erstellen der Präsentation. Bitte versuchen Sie es erneut.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/growth/marketing" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
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
              <Presentation className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Präsentationen</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Marketing</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Erstelle professionelle Präsentationen für Marketing-Kampagnen. 
                Nutze vorgefertigte Templates und Design-Vorlagen für konsistente 
                Markenkommunikation.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Design-Unterstützung</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Automatische Layouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Content-Optimierung</span>
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
                <h3 className="text-xl font-bold">KI-Assistent aktiv</h3>
                <p className="text-white/90">Erstellt Präsentationen mit professionellen Designs und optimiertem Content</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Presentations List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Presentation */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Plus className="w-5 h-5 text-[#E37222]" />
                  Neue Präsentation erstellen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Titel der Präsentation</Label>
                    <Input
                      id="title"
                      placeholder="z.B. Q4 Marketing Strategy"
                      value={presentationTitle}
                      onChange={(e) => setPresentationTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="style">Design-Stil</Label>
                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="topic">Thema/Beschreibung</Label>
                  <Textarea
                    id="topic"
                    placeholder="Beschreiben Sie das Thema und die Inhalte Ihrer Präsentation..."
                    value={presentationTopic}
                    onChange={(e) => setPresentationTopic(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={createPresentation}
                  disabled={!presentationTitle.trim() || !presentationTopic.trim() || isCreating}
                  className="w-full bg-[#E37222] hover:bg-[#D16212] text-white"
                >
                  {isCreating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Erstelle Präsentation...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Präsentation erstellen
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Präsentationen durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Präsentationen durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.value} value={template.value}>
                          {template.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Presentations Grid */}
            <div className="space-y-4">
              {presentations.map((presentation) => (
                <Card key={presentation.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{presentation.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {presentation.template}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(presentation.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(presentation.status)}
                              {presentation.status}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{presentation.description}</p>
                        
                        {/* Presentation Details */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{presentation.slides} Slides</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{presentation.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{presentation.views} Aufrufe</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{presentation.lastModified}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {presentation.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {presentation.created}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {presentation.votes} Stimmen
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4" />
                        </Button>
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
                          <span className="font-medium text-gray-900">KI-Analyse</span>
                          <Badge className="bg-[#E37222] text-white text-xs">
                            Score: {presentation.aiScore}/100
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Design-Qualität</span>
                            <span className="font-medium">{presentation.aiScore}%</span>
                          </div>
                          <Progress value={presentation.aiScore} className="h-2" />
                          <p className="text-sm text-gray-600">
                            Professionelles Design erkannt. Optimiert für {presentation.template.toLowerCase()}-Stil.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {presentation.tags.map((tag) => (
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
                  Neue Präsentation
                </Button>
                <Button variant="outline" className="w-full">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Template generieren
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Importieren
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
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
                    <span className="text-sm text-gray-600">5 neue Templates verfügbar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Design-Optimierungen erkannt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">3 Content-Vorschläge</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Presentation Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Präsentations-Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamt Präsentationen</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fertig</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">In Bearbeitung</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Entwürfe</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnitts-Score</span>
                    <span className="font-semibold text-[#E37222]">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Distribution */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Template-Verteilung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Business</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Creative</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Modern</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Andere</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
