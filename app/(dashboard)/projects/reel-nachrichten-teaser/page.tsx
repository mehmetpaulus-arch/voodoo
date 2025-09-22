'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Play,
  Pause,
  Download,
  Share,
  Edit,
  Settings,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  Bell,
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  RotateCw,
  Scissors,
  Upload,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  FileText,
  Image,
  Video,
  Mic,
  Camera,
  Zap,
  Target,
  Award,
  Star,
  Heart,
  Bookmark,
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Trash2,
  Save,
  RefreshCw,
  DollarSign,
  PieChart,
  ChevronDown,
  ChevronUp,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ReelNachrichtenTeaserPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVersion, setSelectedVersion] = useState('final');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', description: '' });
  const [budgetAdjustment, setBudgetAdjustment] = useState({ category: '', newBudget: '' });

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  // Funktionen für Budget-Management
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description) {
      console.log('Neue Ausgabe hinzugefügt:', newExpense);
      setNewExpense({ category: '', amount: '', description: '' });
      alert('Ausgabe erfolgreich hinzugefügt!');
    } else {
      alert('Bitte füllen Sie alle Felder aus.');
    }
  };

  const handleBudgetAdjustment = () => {
    if (budgetAdjustment.category && budgetAdjustment.newBudget) {
      console.log('Budget angepasst:', budgetAdjustment);
      setBudgetAdjustment({ category: '', newBudget: '' });
      alert('Budget erfolgreich angepasst!');
    } else {
      alert('Bitte wählen Sie eine Kategorie und geben Sie ein neues Budget ein.');
    }
  };

  const videoStats = {
    views: 2400,
    likes: 187,
    comments: 23,
    shares: 45,
    completionRate: 89.2,
    engagementRate: 12.4,
    reach: 3200,
    impressions: 4500,
    clickThroughRate: 8.7,
    watchTime: 125.5
  };

  const videoVersions = [
    {
      id: 'final',
      name: 'Final Version',
      duration: '1:30',
      size: '45.2 MB',
      resolution: '1920x1080',
      format: 'MP4',
      status: 'published',
      uploadDate: '2025-01-15',
      views: 2400,
      likes: 187
    },
    {
      id: 'draft',
      name: 'Draft V3',
      duration: '1:28',
      size: '43.8 MB',
      resolution: '1920x1080',
      format: 'MP4',
      status: 'draft',
      uploadDate: '2025-01-14',
      views: 12,
      likes: 3
    },
    {
      id: 'test',
      name: 'Test Version',
      duration: '1:32',
      size: '46.1 MB',
      resolution: '1920x1080',
      format: 'MP4',
      status: 'archived',
      uploadDate: '2025-01-13',
      views: 5,
      likes: 1
    }
  ];

  const analyticsData = [
    { date: '2025-01-15', views: 1200, likes: 95, comments: 12 },
    { date: '2025-01-16', views: 800, likes: 67, comments: 8 },
    { date: '2025-01-17', views: 400, likes: 25, comments: 3 }
  ];

  const budgetCategories = [
    { 
      id: 'production', 
      name: 'Produktion', 
      budget: 12000, 
      spent: 8500, 
      color: 'bg-blue-500',
      subcategories: [
        { name: 'Studio-Miete', budget: 3000, spent: 2000, description: 'Kleines Studio Berlin' },
        { name: 'Kamera-Equipment', budget: 2500, spent: 1800, description: 'Professionelle Kamera' },
        { name: 'Beleuchtung', budget: 1500, spent: 1000, description: 'LED-Panels' },
        { name: 'Post-Production', budget: 3000, spent: 2500, description: 'Schnitt & Bearbeitung' },
        { name: 'Musik & Sound', budget: 1000, spent: 800, description: 'Lizenzgebühren' },
        { name: 'Sonstiges', budget: 1000, spent: 400, description: 'Verschiedene Kosten' }
      ]
    },
    { 
      id: 'personnel', 
      name: 'Personal', 
      budget: 8000, 
      spent: 5600, 
      color: 'bg-purple-500',
      subcategories: [
        { name: 'Kameramann', budget: 2000, spent: 1400, description: 'Marcus Klein - 20h à €70' },
        { name: 'Redakteur', budget: 1500, spent: 1050, description: 'Anna Schmidt - 15h à €70' },
        { name: 'Cutter', budget: 2000, spent: 1400, description: 'Lisa Brown - 20h à €70' },
        { name: 'Tontechniker', budget: 1000, spent: 700, description: 'Mike Johnson - 10h à €70' },
        { name: 'Projektleiter', budget: 1500, spent: 1050, description: 'Tom Weber - 15h à €70' }
      ]
    },
    { 
      id: 'marketing', 
      name: 'Marketing', 
      budget: 5000, 
      spent: 3200, 
      color: 'bg-green-500',
      subcategories: [
        { name: 'Social Media Ads', budget: 2000, spent: 1500, description: 'Instagram, TikTok' },
        { name: 'Online-Werbung', budget: 1500, spent: 1000, description: 'Google Ads' },
        { name: 'Influencer Marketing', budget: 1000, spent: 500, description: 'Kooperationen' },
        { name: 'Sonstiges Marketing', budget: 500, spent: 200, description: 'Verschiedene Kanäle' }
      ]
    },
    { 
      id: 'equipment', 
      name: 'Equipment', 
      budget: 3000, 
      spent: 1800, 
      color: 'bg-orange-500',
      subcategories: [
        { name: 'Speicher & Backup', budget: 800, spent: 500, description: 'SSDs, Cloud' },
        { name: 'Software-Lizenzen', budget: 1000, spent: 600, description: 'Adobe, Final Cut' },
        { name: 'Zubehör', budget: 600, spent: 400, description: 'Kabel, Adapter' },
        { name: 'Sonstiges Equipment', budget: 600, spent: 300, description: 'Verschiedenes' }
      ]
    }
  ];

  const comments = [
    {
      id: 1,
      user: 'Max Mustermann',
      avatar: 'MM',
      text: 'Sehr guter Teaser! Kurz und prägnant.',
      timestamp: 'vor 2 Stunden',
      likes: 5,
      isLiked: false
    },
    {
      id: 2,
      user: 'Anna Schmidt',
      avatar: 'AS',
      text: 'Die Musik passt perfekt zur Stimmung.',
      timestamp: 'vor 4 Stunden',
      likes: 3,
      isLiked: true
    },
    {
      id: 3,
      user: 'Tom Weber',
      avatar: 'TW',
      text: 'Könnte man noch etwas kürzer machen?',
      timestamp: 'vor 6 Stunden',
      likes: 1,
      isLiked: false
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link href="/leitfaeden/redaktions-workflows" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Redaktions-Workflows</Link>
                <Link href="/leitfaeden/styleguide" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Styleguide (CI/CD)</Link>
                <Link href="/leitfaeden/barrierefreiheit" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Barrierefreiheit (WCAG)</Link>
                <Link href="/leitfaeden/api-dokumentation" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">API-Dokumentation</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <a href="/forum" className="text-gray-300 hover:text-white transition-colors font-medium text-xl">
              Forum
            </a>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Compliance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link href="/compliance/bild-musikrechte" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</Link>
                <Link href="/compliance/datenschutz" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</Link>
                <Link href="/compliance/archiv-lizenzen" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Changelog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link href="/changelog/systemstatus" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</Link>
                <Link href="/changelog/release-notes" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</Link>
                <Link href="/changelog/roadmap" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1 font-medium text-xl">
              Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</Link>
                <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</Link>
                <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                Clip
              </Badge>
              <span className="text-gray-400 text-sm">vor 2 Std.</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Reel – Nachrichten Teaser
            </h1>
            <p className="text-xl text-gray-300">
              Kurzer Teaser für die Hauptnachrichtensendung um 19:00 Uhr
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Play className="w-4 h-4 mr-2 inline" />
              Übersicht
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2 inline" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('versions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'versions'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Video className="w-4 h-4 mr-2 inline" />
              Versionen
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'comments'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageCircle className="w-4 h-4 mr-2 inline" />
              Kommentare
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <DollarSign className="w-4 h-4 mr-2 inline" />
              Budget
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-[#FA7D19] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Settings className="w-4 h-4 mr-2 inline" />
              Einstellungen
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Play className="w-5 h-5" />
                        Video Player
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                          <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {videoVersions.map((version) => (
                              <SelectItem key={version.id} value={version.id}>
                                {version.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-black rounded-lg aspect-video mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={handlePlayPause}
                          className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>
                      </div>
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <Progress value={progress} className="mb-2" />
                        <div className="flex items-center justify-between text-white text-sm">
                          <div className="flex items-center gap-4">
                            <span>0:15</span>
                            <button onClick={handleVolumeToggle} className="hover:bg-white/20 p-1 rounded">
                              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <div className="w-16 h-1 bg-white/30 rounded">
                              <div className="w-4/5 h-full bg-white rounded" style={{ width: `${volume}%` }}></div>
                            </div>
                          </div>
                          <span>1:30</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Herunterladen
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Share className="w-4 h-4 mr-2" />
                        Teilen
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Edit className="w-4 h-4 mr-2" />
                        Bearbeiten
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplizieren
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Neue Version
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

            {/* Project Details */}
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Projekt Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-white">Fertiggestellt</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Dauer</label>
                    <p className="text-white">1:30 Min</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Auflösung</label>
                    <p className="text-white">1920x1080 (Full HD)</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Format</label>
                    <p className="text-white">MP4 (H.264)</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Erstellt von</label>
                    <p className="text-white">Redaktion Nachrichten</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Letzte Änderung</label>
                    <p className="text-white">vor 2 Stunden</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Aufrufe</span>
                    </div>
                    <span className="text-white font-medium">2.4K</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Likes</span>
                    </div>
                    <span className="text-white font-medium">187</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Kommentare</span>
                    </div>
                    <span className="text-white font-medium">23</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Veröffentlichung</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Geplant für</label>
                    <p className="text-white">Heute, 19:00 Uhr</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Kanäle</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-blue-400 border-blue-400">ZDF</Badge>
                      <Badge variant="outline" className="text-green-400 border-green-400">Social Media</Badge>
                      <Badge variant="outline" className="text-purple-400 border-purple-400">App</Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Veröffentlichung verwalten
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Aufrufe</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{videoStats.views.toLocaleString()}</div>
                    <div className="text-xs text-blue-400">+340 vs. gestern</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400 text-sm">Likes</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{videoStats.likes}</div>
                    <div className="text-xs text-green-400">+23 vs. gestern</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400 text-sm">Engagement</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{videoStats.engagementRate}%</div>
                    <div className="text-xs text-purple-400">+2.1% vs. gestern</div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400 text-sm">Watch Time</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{videoStats.watchTime}h</div>
                    <div className="text-xs text-orange-400">+15h vs. gestern</div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Metriken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Completion Rate</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{videoStats.completionRate}%</div>
                      <Progress value={videoStats.completionRate} className="h-2" />
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Globe className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Reach</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{videoStats.reach.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Personen erreicht</div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">CTR</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{videoStats.clickThroughRate}%</div>
                      <div className="text-sm text-gray-400">Click-Through Rate</div>
                    </div>

                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-orange-400" />
                        <span className="text-white font-medium">Impressions</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">{videoStats.impressions.toLocaleString()}</div>
                      <div className="text-sm text-gray-400">Anzeigen</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Chart */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Verlauf
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium">{data.date}</h3>
                          <p className="text-gray-400 text-sm">Tägliche Performance</p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-white font-bold">{data.views}</div>
                            <div className="text-gray-400 text-xs">Aufrufe</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-bold">{data.likes}</div>
                            <div className="text-gray-400 text-xs">Likes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-bold">{data.comments}</div>
                            <div className="text-gray-400 text-xs">Kommentare</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'versions' && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Video Versionen
                    </CardTitle>
                    <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Neue Version hochladen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {videoVersions.map((version) => (
                      <div key={version.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center">
                            <Video className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{version.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span>{version.duration}</span>
                              <span>{version.size}</span>
                              <span>{version.resolution}</span>
                              <span>{version.format}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Hochgeladen: {version.uploadDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-white font-bold">{version.views} Aufrufe</div>
                            <div className="text-gray-400 text-sm">{version.likes} Likes</div>
                          </div>
                          <Badge variant="outline" className={
                            version.status === 'published' ? 'text-green-400 border-green-400' :
                            version.status === 'draft' ? 'text-yellow-400 border-yellow-400' : 'text-gray-400 border-gray-400'
                          }>
                            {version.status === 'published' ? 'Veröffentlicht' :
                             version.status === 'draft' ? 'Entwurf' : 'Archiviert'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Kommentare ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3 p-4 bg-gray-700 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {comment.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-white font-medium">{comment.user}</h4>
                            <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-300 mb-2">{comment.text}</p>
                          <div className="flex items-center gap-4">
                            <button className={`flex items-center gap-1 text-sm ${comment.isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}>
                              <Heart className="w-4 h-4" />
                              {comment.likes}
                            </button>
                            <button className="text-gray-400 text-sm hover:text-white">Antworten</button>
                            <button className="text-gray-400 text-sm hover:text-white">Melden</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        DU
                      </div>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Kommentar hinzufügen..."
                          className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm" className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
                            Kommentieren
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="space-y-8">
              {/* Budget Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400 text-sm">Gesamt Budget</span>
                    </div>
                    <div className="text-2xl font-bold text-white">€28.000</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-gray-400 text-sm">Ausgegeben</span>
                    </div>
                    <div className="text-2xl font-bold text-white">€19.100</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400 text-sm">Verbleibend</span>
                    </div>
                    <div className="text-2xl font-bold text-white">€8.900</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <PieChart className="w-4 h-4 text-purple-400" />
                      <span className="text-gray-400 text-sm">Fortschritt</span>
                    </div>
                    <div className="text-2xl font-bold text-white">68%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Budget Kategorien */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Budget Kategorien
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {budgetCategories.map((category) => {
                      const percentage = (category.spent / category.budget) * 100;
                      const remaining = category.budget - category.spent;
                      const isOverBudget = percentage > 100;
                      
                      return (
                        <div key={category.id} className="p-4 bg-gray-700 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                              <h3 className="text-white font-medium">{category.name}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-white font-bold">€{category.spent.toLocaleString()}</div>
                                <div className="text-gray-400 text-sm">von €{category.budget.toLocaleString()}</div>
                              </div>
                              <Badge variant="outline" className={
                                isOverBudget ? 'text-red-400 border-red-400' :
                                percentage > 80 ? 'text-yellow-400 border-yellow-400' : 'text-green-400 border-green-400'
                              }>
                                {Math.round(percentage)}%
                              </Badge>
                              <button
                                onClick={() => toggleCategory(category.id)}
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                              >
                                {expandedCategories.includes(category.id) ? 
                                  <ChevronUp className="w-4 h-4" /> : 
                                  <ChevronDown className="w-4 h-4" />
                                }
                              </button>
                            </div>
                          </div>
                          <Progress value={Math.min(percentage, 100)} className="h-2 mb-3" />
                          <div className="flex justify-between text-sm mb-4">
                            <span className="text-gray-400">
                              {isOverBudget ? `Über Budget: €${Math.abs(remaining).toLocaleString()}` : `Verbleibend: €${remaining.toLocaleString()}`}
                            </span>
                            <span className="text-gray-400">
                              {isOverBudget ? 'Über Budget' : percentage > 80 ? 'Achtung' : 'Im Plan'}
                            </span>
                          </div>
                          
                          {/* Detaillierte Unterkategorien */}
                          {expandedCategories.includes(category.id) && (
                            <div className="space-y-2">
                              <h4 className="text-gray-300 text-sm font-medium mb-2">Detaillierte Aufschlüsselung:</h4>
                              {category.subcategories?.map((sub, index) => {
                              const subPercentage = (sub.spent / sub.budget) * 100;
                              const subRemaining = sub.budget - sub.spent;
                              const isSubOverBudget = subPercentage > 100;
                              
                              return (
                                <div key={index} className="p-3 bg-gray-600 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                      <span className="text-gray-200 text-sm font-medium">{sub.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="text-right">
                                        <div className="text-gray-200 text-sm font-medium">€{sub.spent.toLocaleString()}</div>
                                        <div className="text-gray-500 text-xs">von €{sub.budget.toLocaleString()}</div>
                                      </div>
                                      <Badge variant="outline" className={`text-xs ${
                                        isSubOverBudget ? 'text-red-300 border-red-300' :
                                        subPercentage > 80 ? 'text-yellow-300 border-yellow-300' : 'text-green-300 border-green-300'
                                      }`}>
                                        {Math.round(subPercentage)}%
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-400 mb-1">{sub.description}</div>
                                  <Progress value={Math.min(subPercentage, 100)} className="h-1" />
                                  <div className="flex justify-between text-xs mt-1">
                                    <span className="text-gray-500">
                                      {isSubOverBudget ? `+€${Math.abs(subRemaining).toLocaleString()}` : `€${subRemaining.toLocaleString()} übrig`}
                                    </span>
                                    <span className="text-gray-500">
                                      {isSubOverBudget ? 'Über Budget' : subPercentage > 80 ? 'Achtung' : 'OK'}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Budget Calculator */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Budget Rechner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Neue Ausgabe hinzufügen</h3>
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Kategorie</label>
                        <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Kategorie wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Betrag (€)</label>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-gray-700 border-gray-600"
                          value={newExpense.amount}
                          onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm mb-2 block">Beschreibung</label>
                        <Textarea 
                          placeholder="Beschreibung der Ausgabe..." 
                          className="bg-gray-700 border-gray-600"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                        />
                      </div>
                      <Button 
                        onClick={handleAddExpense}
                        className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Ausgabe hinzufügen
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-white font-medium">Budget anpassen</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-gray-300 text-sm mb-2 block">Kategorie</label>
                          <Select value={budgetAdjustment.category} onValueChange={(value) => setBudgetAdjustment({...budgetAdjustment, category: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600">
                              <SelectValue placeholder="Kategorie wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm mb-2 block">Neues Budget (€)</label>
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="bg-gray-700 border-gray-600"
                            value={budgetAdjustment.newBudget}
                            onChange={(e) => setBudgetAdjustment({...budgetAdjustment, newBudget: e.target.value})}
                          />
                        </div>
                        <Button 
                          onClick={handleBudgetAdjustment}
                          className="w-full bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                        >
                          <Calculator className="w-4 h-4 mr-2" />
                          Budget anpassen
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Video Einstellungen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Titel</label>
                      <Input value="Reel – Nachrichten Teaser" className="bg-gray-700 border-gray-600" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Status</label>
                      <Select defaultValue="published">
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Veröffentlicht</SelectItem>
                          <SelectItem value="draft">Entwurf</SelectItem>
                          <SelectItem value="private">Privat</SelectItem>
                          <SelectItem value="archived">Archiviert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Kategorie</label>
                      <Select defaultValue="news">
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">Nachrichten</SelectItem>
                          <SelectItem value="entertainment">Unterhaltung</SelectItem>
                          <SelectItem value="sports">Sport</SelectItem>
                          <SelectItem value="documentary">Dokumentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Sichtbarkeit</label>
                      <Select defaultValue="public">
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Öffentlich</SelectItem>
                          <SelectItem value="unlisted">Nicht gelistet</SelectItem>
                          <SelectItem value="private">Privat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Beschreibung</label>
                    <Textarea 
                      value="Kurzer Teaser für die Hauptnachrichtensendung um 19:00 Uhr. Enthält die wichtigsten Themen des Tages."
                      className="bg-gray-700 border-gray-600 h-24"
                    />
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm mb-2 block">Tags</label>
                    <Input value="nachrichten, teaser, zdf, 19:00" className="bg-gray-700 border-gray-600" />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
                      <Save className="w-4 h-4 mr-2" />
                      Einstellungen speichern
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Zurücksetzen
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
