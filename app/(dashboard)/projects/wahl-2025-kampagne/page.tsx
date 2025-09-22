'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  Plus,
  Edit,
  Eye,
  BarChart3,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
  Search,
  Settings,
  Download,
  Upload,
  Share2,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Laptop,
  Tv,
  Radio,
  Lightbulb,
  Rocket,
  Sparkles,
  Award,
  Trophy,
  Sun,
  Moon,
  Cloud,
  Wind,
  TreePine,
  Mountain,
  Waves,
  Fish,
  Bird,
  Flower,
  Leaf,
  Apple,
  Coffee,
  Pizza,
  Cake,
  Wine,
  Beer,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Home,
  Building,
  Factory,
  Store,
  School,
  Hospital,
  Church,
  Castle,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Printer,
  Server,
  Database,
  Lock,
  Key,
  Shield,
  Star,
  Heart,
  Smile,
  Frown,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume1,
  VolumeX,
  Music,
  Headphones,
  Video,
  Camera,
  Image,
  Folder,
  File,
  Text,
  Type,
  Palette,
  Brush,
  Eraser,
  Crop,
  Filter as FilterIcon,
  Layers,
  Group,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Users,
  User,
  MapPin,
  DollarSign
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

export default function Wahl2025KampagnePage() {
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const campaignItems = [
    {
      id: 'CAMP-001',
      title: 'Social Media Kampagne',
      description: 'Umfassende Social Media Strategie für die Wahl 2025',
      phase: 'Planung',
      status: 'In Bearbeitung',
      priority: 'Hoch',
      budget: '€150,000',
      team: 'Marketing Team',
      deadline: '2024-12-31',
      progress: 65,
      tags: ['Social Media', 'Wahl 2025', 'Marketing'],
      metrics: {
        reach: 2500000,
        engagement: 12.5,
        conversion: 8.3
      }
    },
    {
      id: 'CAMP-002',
      title: 'TV-Werbung Produktion',
      description: 'Produktion von TV-Spots für die Wahlkampagne',
      phase: 'Produktion',
      status: 'Läuft',
      priority: 'Hoch',
      budget: '€500,000',
      team: 'Produktion Team',
      deadline: '2024-11-15',
      progress: 45,
      tags: ['TV', 'Produktion', 'Werbung'],
      metrics: {
        reach: 8000000,
        engagement: 15.2,
        conversion: 6.8
      }
    },
    {
      id: 'CAMP-003',
      title: 'Digital Marketing',
      description: 'Online-Marketing und SEO-Optimierung',
      phase: 'Optimierung',
      status: 'Geplant',
      priority: 'Mittel',
      budget: '€75,000',
      team: 'Digital Team',
      deadline: '2024-10-30',
      progress: 25,
      tags: ['Digital', 'SEO', 'Online'],
      metrics: {
        reach: 1200000,
        engagement: 9.8,
        conversion: 11.2
      }
    }
  ];

  const phases = [
    { value: 'all', label: 'Alle Phasen' },
    { value: 'Planung', label: 'Planung' },
    { value: 'Produktion', label: 'Produktion' },
    { value: 'Optimierung', label: 'Optimierung' },
    { value: 'Launch', label: 'Launch' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Läuft': return 'bg-green-100 text-green-800';
      case 'In Bearbeitung': return 'bg-yellow-100 text-yellow-800';
      case 'Geplant': return 'bg-blue-100 text-blue-800';
      case 'Abgeschlossen': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
            <Link href="/projects" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/forum" className="hover:text-white transition-colors font-medium text-xl">
            Forum
          </Link>
          <Link href="/compliance" className="hover:text-white transition-colors font-medium text-xl">
            Compliance
          </Link>
          <Link href="/changelog" className="hover:text-white transition-colors font-medium text-xl">
            Changelog
          </Link>
          <Link href="/support" className="hover:text-white transition-colors font-medium text-xl">
            Support
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg border border-gray-300 p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#E37222] rounded-lg flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Wahl 2025 Kampagne</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Projekte</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Koordinieren Sie die umfassende Wahlkampagne für 2025. 
                Von der Planung bis zur Umsetzung - alle Aspekte der Kampagne an einem Ort.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Kampagnen-Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Performance-Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Team-Koordination</span>
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
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KI-Assistent aktiv</h3>
                <p className="text-white/90">Optimiert Kampagnen-Performance und schlägt Verbesserungen vor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaign Items List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Campaign Item */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Plus className="w-5 h-5 text-[#E37222]" />
                  Neues Kampagnen-Element
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#E37222] hover:bg-[#D16212] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Element erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Kampagnen-Elemente durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Elemente durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase.value} value={phase.value}>
                          {phase.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Items Grid */}
            <div className="space-y-4">
              {campaignItems.map((item) => (
                <Card key={item.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.phase}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Fortschritt</span>
                            <span className="font-medium">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.team}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.metrics.reach.toLocaleString()} Reichweite</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {item.metrics.engagement}% Engagement
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {item.metrics.conversion}% Conversion
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
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
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
                  Neues Element
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Kampagnen-Dashboard
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline anzeigen
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Team verwalten
                </Button>
              </CardContent>
            </Card>

            {/* Campaign Overview */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Kampagnen-Übersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamt Budget</span>
                    <span className="font-semibold">€725,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Verbraucht</span>
                    <span className="font-semibold">€425,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Verbleibend</span>
                    <span className="font-semibold text-green-600">€300,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittlicher Fortschritt</span>
                    <span className="font-semibold text-[#E37222]">45%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Performance-Metriken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamte Reichweite</span>
                    <span className="font-semibold">11.7M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittliches Engagement</span>
                    <span className="font-semibold text-blue-600">12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-green-600">8.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className="font-semibold text-[#E37222]">285%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phase Distribution */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Phasen-Verteilung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Planung</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Produktion</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Optimierung</span>
                    <span className="font-medium">33%</span>
                  </div>
                  <Progress value={33} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
