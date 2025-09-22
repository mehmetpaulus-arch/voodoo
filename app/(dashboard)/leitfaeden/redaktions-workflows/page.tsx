'use client';

import React, { useState } from 'react';
import { 
  Workflow,
  FileText,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  Target,
  Zap,
  Shield,
  TrendingUp,
  BarChart3,
  Settings,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  User,
  Building,
  Globe,
  Smartphone,
  Monitor,
  Camera,
  Mic,
  Headphones,
  Video,
  Image as ImageIcon,
  Type,
  Palette,
  Code,
  Database,
  Cloud,
  Lock,
  Key,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Send,
  Archive,
  Folder,
  File,
  FolderOpen,
  Upload,
  Link as LinkIcon,
  Tag,
  Hash,
  AtSign,
  Grid,
  List,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const workflowCategories = [
  {
    id: 'content-creation',
    name: 'Content-Erstellung',
    icon: FileText,
    color: 'bg-[#E37222]',
    description: 'Workflows für Text-, Video- und Audio-Content'
  },
  {
    id: 'production',
    name: 'Produktion',
    icon: Video,
    color: 'bg-[#2E7D32]',
    description: 'Video- und Audio-Produktionsprozesse'
  },
  {
    id: 'distribution',
    name: 'Distribution',
    icon: Globe,
    color: 'bg-[#1976D2]',
    description: 'Veröffentlichung und Verteilung von Inhalten'
  },
  {
    id: 'quality',
    name: 'Qualitätssicherung',
    icon: Shield,
    color: 'bg-[#D32F2F]',
    description: 'Review- und QA-Prozesse'
  }
];

const workflows = [
  {
    id: 'artikel-workflow',
    title: 'Artikel-Workflow',
    description: 'Von der Idee bis zur Veröffentlichung',
    category: 'content-creation',
    icon: FileText,
    color: 'bg-[#E37222]',
    duration: '3-5 Tage',
    responsible: 'Redaktion',
    priority: 'high',
    status: 'active',
    lastUpdated: '2024-01-15',
    steps: [
      {
        id: 1,
        title: 'Themenrecherche und -bewertung',
        description: 'Recherche relevanter Themen und Bewertung der Umsetzbarkeit',
        duration: '2-4 Stunden',
        responsible: 'Redakteur',
        tools: ['Google Trends', 'ZDF Archiv', 'Social Media Monitoring'],
        deliverables: ['Themenvorschlag', 'Recherchebericht'],
        dependencies: [],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Redaktionelle Freigabe',
        description: 'Genehmigung des Themas durch die Redaktionsleitung',
        duration: '1-2 Stunden',
        responsible: 'Redaktionsleiter',
        tools: ['ZDF CMS', 'E-Mail'],
        deliverables: ['Freigabe-Dokument'],
        dependencies: [1],
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Recherche und Interviews',
        description: 'Vertiefende Recherche und Durchführung von Interviews',
        duration: '1-2 Tage',
        responsible: 'Redakteur',
        tools: ['Interview-Software', 'Recherche-Datenbanken'],
        deliverables: ['Interview-Transkripte', 'Recherche-Material'],
        dependencies: [2],
        status: 'pending'
      },
      {
        id: 4,
        title: 'Texterstellung',
        description: 'Verfassen des Artikels nach ZDF-Standards',
        duration: '4-6 Stunden',
        responsible: 'Redakteur',
        tools: ['ZDF CMS', 'Text-Editor'],
        deliverables: ['Artikel-Entwurf'],
        dependencies: [3],
        status: 'pending'
      },
      {
        id: 5,
        title: 'Lektorat und Korrektorat',
        description: 'Sprachliche und inhaltliche Überarbeitung',
        duration: '2-3 Stunden',
        responsible: 'Lektor',
        tools: ['Lektorat-Software', 'Style Guide'],
        deliverables: ['Korrigierter Artikel'],
        dependencies: [4],
        status: 'pending'
      },
      {
        id: 6,
        title: 'SEO-Optimierung',
        description: 'Suchmaschinenoptimierung und Metadaten',
        duration: '1-2 Stunden',
        responsible: 'SEO-Spezialist',
        tools: ['SEO-Tools', 'Keyword-Research'],
        deliverables: ['SEO-optimierter Artikel'],
        dependencies: [5],
        status: 'pending'
      },
      {
        id: 7,
        title: 'Veröffentlichung',
        description: 'Finale Freigabe und Veröffentlichung',
        duration: '30 Minuten',
        responsible: 'Redaktionsleiter',
        tools: ['ZDF CMS', 'Publishing-System'],
        deliverables: ['Veröffentlichter Artikel'],
        dependencies: [6],
        status: 'pending'
      }
    ],
    metrics: {
      averageCompletionTime: '4.2 Tage',
      successRate: '94%',
      teamSatisfaction: '4.6/5',
      lastOptimization: '2024-01-10'
    },
    resources: [
      { name: 'ZDF Style Guide', type: 'PDF', url: '#' },
      { name: 'Interview-Template', type: 'DOCX', url: '#' },
      { name: 'SEO-Checkliste', type: 'PDF', url: '#' }
    ]
  },
  {
    id: 'video-workflow',
    title: 'Video-Produktions-Workflow',
    description: 'Kompletter Produktionsprozess für Videos',
    category: 'production',
    icon: Video,
    color: 'bg-[#2E7D32]',
    duration: '1-3 Wochen',
    responsible: 'Video-Team',
    priority: 'high',
    status: 'active',
    lastUpdated: '2024-01-12',
    steps: [
      {
        id: 1,
        title: 'Konzeptentwicklung',
        description: 'Entwicklung des Video-Konzepts und Storytelling',
        duration: '1-2 Tage',
        responsible: 'Creative Director',
        tools: ['Storyboard-Software', 'Moodboards'],
        deliverables: ['Video-Konzept', 'Storyboard'],
        dependencies: [],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Drehbuch und Storyboard',
        description: 'Detailliertes Drehbuch und visuelles Storyboard',
        duration: '2-3 Tage',
        responsible: 'Scriptwriter',
        tools: ['Final Draft', 'Storyboard-Tools'],
        deliverables: ['Drehbuch', 'Storyboard'],
        dependencies: [1],
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Produktionsplanung',
        description: 'Planung von Drehterminen, Equipment und Personal',
        duration: '1-2 Tage',
        responsible: 'Produktionsleiter',
        tools: ['Produktions-Software', 'Kalender'],
        deliverables: ['Produktionsplan', 'Equipment-Liste'],
        dependencies: [2],
        status: 'pending'
      },
      {
        id: 4,
        title: 'Dreh',
        description: 'Durchführung der Videoaufnahmen',
        duration: '1-5 Tage',
        responsible: 'Kameramann',
        tools: ['Kamera-Equipment', 'Audio-Equipment'],
        deliverables: ['Rohmaterial'],
        dependencies: [3],
        status: 'pending'
      },
      {
        id: 5,
        title: 'Post-Produktion',
        description: 'Schnitt, Farbkorrektur und Audio-Bearbeitung',
        duration: '3-7 Tage',
        responsible: 'Cutter',
        tools: ['Adobe Premiere', 'After Effects', 'Pro Tools'],
        deliverables: ['Fertig geschnittenes Video'],
        dependencies: [4],
        status: 'pending'
      },
      {
        id: 6,
        title: 'Review und Freigabe',
        description: 'Interne Überprüfung und finale Freigabe',
        duration: '1-2 Tage',
        responsible: 'Redaktionsleiter',
        tools: ['Review-System', 'Feedback-Tools'],
        deliverables: ['Freigabe-Dokument'],
        dependencies: [5],
        status: 'pending'
      },
      {
        id: 7,
        title: 'Distribution',
        description: 'Veröffentlichung auf verschiedenen Plattformen',
        duration: '2-4 Stunden',
        responsible: 'Distribution-Team',
        tools: ['CMS', 'Social Media Tools'],
        deliverables: ['Veröffentlichtes Video'],
        dependencies: [6],
        status: 'pending'
      }
    ],
    metrics: {
      averageCompletionTime: '2.1 Wochen',
      successRate: '89%',
      teamSatisfaction: '4.3/5',
      lastOptimization: '2024-01-08'
    },
    resources: [
      { name: 'Drehbuch-Template', type: 'DOCX', url: '#' },
      { name: 'Equipment-Checkliste', type: 'PDF', url: '#' },
      { name: 'Post-Production Guide', type: 'PDF', url: '#' }
    ]
  },
  {
    id: 'social-media-workflow',
    title: 'Social Media Workflow',
    description: 'Content-Erstellung für soziale Medien',
    category: 'distribution',
    icon: Smartphone,
    color: 'bg-[#1976D2]',
    duration: '1-2 Tage',
    responsible: 'Social Media Team',
    priority: 'medium',
    status: 'active',
    lastUpdated: '2024-01-14',
    steps: [
      {
        id: 1,
        title: 'Content-Planung',
        description: 'Planung der Social Media Inhalte und Themen',
        duration: '2-3 Stunden',
        responsible: 'Social Media Manager',
        tools: ['Content-Kalender', 'Trend-Analyse'],
        deliverables: ['Content-Plan', 'Themen-Liste'],
        dependencies: [],
        status: 'completed'
      },
      {
        id: 2,
        title: 'Asset-Erstellung',
        description: 'Erstellung von Bildern, Videos und Grafiken',
        duration: '4-6 Stunden',
        responsible: 'Grafik-Designer',
        tools: ['Adobe Creative Suite', 'Canva'],
        deliverables: ['Social Media Assets'],
        dependencies: [1],
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Text und Hashtags',
        description: 'Verfassen der Texte und Auswahl der Hashtags',
        duration: '1-2 Stunden',
        responsible: 'Content-Writer',
        tools: ['Text-Editor', 'Hashtag-Tools'],
        deliverables: ['Social Media Texte'],
        dependencies: [2],
        status: 'pending'
      },
      {
        id: 4,
        title: 'Review',
        description: 'Überprüfung der Inhalte auf Compliance und Qualität',
        duration: '1 Stunde',
        responsible: 'Social Media Manager',
        tools: ['Review-System', 'Compliance-Checkliste'],
        deliverables: ['Freigabe-Dokument'],
        dependencies: [3],
        status: 'pending'
      },
      {
        id: 5,
        title: 'Scheduling',
        description: 'Planung der Veröffentlichungszeiten',
        duration: '30 Minuten',
        responsible: 'Social Media Manager',
        tools: ['Scheduling-Tools', 'Analytics'],
        deliverables: ['Veröffentlichungsplan'],
        dependencies: [4],
        status: 'pending'
      },
      {
        id: 6,
        title: 'Monitoring',
        description: 'Überwachung der Performance und Interaktionen',
        duration: '2-3 Stunden',
        responsible: 'Social Media Analyst',
        tools: ['Analytics-Tools', 'Monitoring-Software'],
        deliverables: ['Performance-Report'],
        dependencies: [5],
        status: 'pending'
      },
      {
        id: 7,
        title: 'Reporting',
        description: 'Erstellung von Performance-Reports',
        duration: '1-2 Stunden',
        responsible: 'Social Media Analyst',
        tools: ['Reporting-Tools', 'Dashboard'],
        deliverables: ['Performance-Report'],
        dependencies: [6],
        status: 'pending'
      }
    ],
    metrics: {
      averageCompletionTime: '1.5 Tage',
      successRate: '96%',
      teamSatisfaction: '4.7/5',
      lastOptimization: '2024-01-11'
    },
    resources: [
      { name: 'Social Media Guidelines', type: 'PDF', url: '#' },
      { name: 'Hashtag-Liste', type: 'XLSX', url: '#' },
      { name: 'Content-Templates', type: 'ZIP', url: '#' }
    ]
  }
];

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-[#E37222]',
  pending: 'bg-gray-400',
  blocked: 'bg-red-500'
};

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
};

export default function RedaktionsWorkflowsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      workflow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedWorkflowData = selectedWorkflow ? workflows.find(w => w.id === selectedWorkflow) : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-600">
        <div className="flex items-center gap-8">
          <Link href="/leitfaeden" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Zurück</span>
        </Link>
          <div className="h-6 w-px bg-gray-600" />
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E37222] rounded-lg">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Redaktions-Workflows</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Standardisierte Arbeitsabläufe
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Effiziente Content-Produktion und Qualitätssicherung mit strukturierten Workflows
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Workflows durchsuchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border-gray-600 text-white placeholder-gray-400 rounded-lg w-80"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    {workflowCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-[#E37222] text-white' : 'border-gray-600 text-gray-300'}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-[#E37222] text-white' : 'border-gray-600 text-gray-300'}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Workflow Categories */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Kategorien</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowCategories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-[#E37222] bg-[#E37222]/10' 
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-white">{category.name}</span>
                    </div>
                    <p className="text-sm text-gray-400 text-left">{category.description}</p>
                  </button>
                );
              })}
        </div>
      </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow) => {
              const Icon = workflow.icon;
              const category = workflowCategories.find(c => c.id === workflow.category);
              const completedSteps = workflow.steps.filter(step => step.status === 'completed').length;
              const totalSteps = workflow.steps.length;
              const progress = (completedSteps / totalSteps) * 100;

              return (
                <Card key={workflow.id} className="bg-gray-800 border-gray-700 hover:border-[#E37222] transition-all duration-200 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${workflow.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg group-hover:text-[#E37222] transition-colors">
                    {workflow.title}
                  </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                              {category?.name}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${priorityColors[workflow.priority as keyof typeof priorityColors]} text-white`}
                            >
                              {workflow.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-600">
                          <DropdownMenuItem className="text-gray-300 hover:text-white">
                            <Edit className="w-4 h-4 mr-2" />
                            Bearbeiten
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white">
                            <Copy className="w-4 h-4 mr-2" />
                            Duplizieren
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white">
                            <Share2 className="w-4 h-4 mr-2" />
                            Teilen
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-600" />
                          <DropdownMenuItem className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Löschen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-gray-300">
                      {workflow.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Fortschritt</span>
                        <span className="text-sm text-[#E37222] font-semibold">
                          {completedSteps}/{totalSteps} Schritte
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                  </div>

                  {/* Metadata */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{workflow.duration}</span>
                      </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{workflow.responsible}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">{workflow.metrics.successRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-300">{workflow.metrics.teamSatisfaction}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1 bg-[#E37222] hover:bg-[#D16212] text-white"
                        onClick={() => setSelectedWorkflow(workflow.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details anzeigen
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
                  </div>

          {/* Workflow Detail Modal */}
          {selectedWorkflowData && (
            <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
              <DialogContent className="max-w-4xl bg-gray-800 border-gray-700 text-white max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className={`p-3 rounded-xl ${selectedWorkflowData.color}`}>
                      <selectedWorkflowData.icon className="w-6 h-6 text-white" />
                    </div>
                    {selectedWorkflowData.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-300 text-lg">
                    {selectedWorkflowData.description}
                  </DialogDescription>
                </DialogHeader>
                
                <ScrollArea className="max-h-[60vh] pr-4">
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                      <TabsTrigger value="steps" className="data-[state=active]:bg-[#E37222]">Schritte</TabsTrigger>
                      <TabsTrigger value="metrics" className="data-[state=active]:bg-[#E37222]">Metriken</TabsTrigger>
                      <TabsTrigger value="resources" className="data-[state=active]:bg-[#E37222]">Ressourcen</TabsTrigger>
                      <TabsTrigger value="settings" className="data-[state=active]:bg-[#E37222]">Einstellungen</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="steps" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        {selectedWorkflowData.steps.map((step, index) => (
                          <Card key={step.id} className="bg-gray-700 border-gray-600">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  step.status === 'completed' ? 'bg-green-500' :
                                  step.status === 'in-progress' ? 'bg-[#E37222]' :
                                  'bg-gray-500'
                                } text-white`}>
                                  {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-semibold text-white">{step.title}</h4>
                                    <Badge variant="secondary" className={`text-xs ${
                                      step.status === 'completed' ? 'bg-green-500' :
                                      step.status === 'in-progress' ? 'bg-[#E37222]' :
                                      'bg-gray-500'
                                    } text-white`}>
                                      {step.status}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-300">{step.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-gray-400" />
                                      <span className="text-gray-300">{step.responsible}</span>
                                    </div>
                                  </div>
                                  {step.tools.length > 0 && (
                                    <div className="mt-3">
                                      <p className="text-sm text-gray-400 mb-1">Tools:</p>
                                      <div className="flex flex-wrap gap-1">
                                        {step.tools.map((tool, toolIndex) => (
                                          <Badge key={toolIndex} variant="outline" className="text-xs border-gray-500 text-gray-300">
                                            {tool}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="metrics" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-5 h-5 text-[#E37222]" />
                              <h4 className="font-semibold text-white">Durchschnittliche Dauer</h4>
                            </div>
                            <p className="text-2xl font-bold text-[#E37222]">{selectedWorkflowData.metrics.averageCompletionTime}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                              <h4 className="font-semibold text-white">Erfolgsrate</h4>
                            </div>
                            <p className="text-2xl font-bold text-green-400">{selectedWorkflowData.metrics.successRate}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="w-5 h-5 text-yellow-400" />
                              <h4 className="font-semibold text-white">Team-Zufriedenheit</h4>
                            </div>
                            <p className="text-2xl font-bold text-yellow-400">{selectedWorkflowData.metrics.teamSatisfaction}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gray-700 border-gray-600">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-5 h-5 text-blue-400" />
                              <h4 className="font-semibold text-white">Letzte Optimierung</h4>
                            </div>
                            <p className="text-lg font-semibold text-blue-400">{selectedWorkflowData.metrics.lastOptimization}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="resources" className="space-y-4 mt-6">
                      <div className="space-y-3">
                        {selectedWorkflowData.resources.map((resource, index) => (
                          <Card key={index} className="bg-gray-700 border-gray-600">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <File className="w-5 h-5 text-[#E37222]" />
                                  <div>
                                    <h4 className="font-semibold text-white">{resource.name}</h4>
                                    <p className="text-sm text-gray-400">{resource.type}</p>
                                  </div>
                                </div>
                                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-600">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                  </Button>
                              </div>
                </CardContent>
              </Card>
            ))}
          </div>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-4 mt-6">
                      <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                          <CardTitle className="text-white">Workflow-Einstellungen</CardTitle>
              </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">Automatische Benachrichtigungen</Label>
                              <p className="text-sm text-gray-400">E-Mail-Benachrichtigungen bei Statusänderungen</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">Deadline-Erinnerungen</Label>
                              <p className="text-sm text-gray-400">Automatische Erinnerungen vor Ablaufzeiten</p>
                            </div>
                            <Switch />
                  </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-white">Team-Kollaboration</Label>
                              <p className="text-sm text-gray-400">Freigabe für Team-Mitglieder</p>
                  </div>
                            <Switch />
                </div>
              </CardContent>
            </Card>
                    </TabsContent>
                  </Tabs>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}