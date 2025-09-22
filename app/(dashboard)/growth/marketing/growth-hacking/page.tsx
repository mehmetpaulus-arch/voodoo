'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  Zap,
  Rocket,
  Brain,
  Sparkles,
  Award,
  Trophy,
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
  AlignCenter
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

export default function GrowthHackingPage() {
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const strategies = [
    {
      id: 'STRAT-001',
      title: 'Viral Content Marketing',
      description: 'Erstelle viralen Content für maximale Reichweite und Engagement',
      category: 'Content',
      status: 'Aktiv',
      priority: 'Hoch',
      impact: 'Hoch',
      effort: 'Mittel',
      roi: '350%',
      metrics: {
        reach: 125000,
        engagement: 8.5,
        conversion: 12.3
      },
      tags: ['Viral', 'Content', 'Social Media']
    },
    {
      id: 'STRAT-002',
      title: 'A/B Testing Optimierung',
      description: 'Systematische Optimierung durch kontinuierliche Tests',
      category: 'Optimization',
      status: 'In Entwicklung',
      priority: 'Mittel',
      impact: 'Mittel',
      effort: 'Niedrig',
      roi: '180%',
      metrics: {
        reach: 45000,
        engagement: 6.2,
        conversion: 8.7
      },
      tags: ['Testing', 'Optimization', 'Data']
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Strategien' },
    { value: 'Content', label: 'Content Marketing' },
    { value: 'Optimization', label: 'Optimierung' },
    { value: 'Automation', label: 'Automatisierung' },
    { value: 'Analytics', label: 'Analytics' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktiv': return 'bg-green-100 text-green-800';
      case 'In Entwicklung': return 'bg-yellow-100 text-yellow-800';
      case 'Geplant': return 'bg-blue-100 text-blue-800';
      case 'Pausiert': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <Link href="/growth/marketing" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
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
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Growth Hacking</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Marketing</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Experimentelle Marketing-Strategien für exponentielles Wachstum. 
                Datengetriebene Ansätze für maximale Effizienz und ROI.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Experimente</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Automatisierung</span>
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
                <p className="text-white/90">Analysiert Daten und schlägt optimale Growth-Strategien vor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Strategies List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Strategy */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Rocket className="w-5 h-5 text-[#E37222]" />
                  Neue Growth-Strategie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#E37222] hover:bg-[#D16212] text-white">
                  <Rocket className="w-4 h-4 mr-2" />
                  Strategie erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Strategien durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Strategien durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
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

            {/* Strategies Grid */}
            <div className="space-y-4">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{strategy.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {strategy.category}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(strategy.status)}`}>
                            {strategy.status}
                          </Badge>
                          <Badge className={`text-xs ${getImpactColor(strategy.impact)}`}>
                            {strategy.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{strategy.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">ROI: {strategy.roi}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{strategy.metrics.reach.toLocaleString()} Reichweite</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{strategy.metrics.conversion}% Conversion</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {strategy.effort} Aufwand
                          </div>
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {strategy.metrics.engagement}% Engagement
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {strategy.tags.map((tag) => (
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
                  <Rocket className="w-4 h-4 mr-2" />
                  Neue Strategie
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
                <Button variant="outline" className="w-full">
                  <Zap className="w-4 h-4 mr-2" />
                  Automatisierung
                </Button>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Growth-Metriken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Aktive Strategien</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittlicher ROI</span>
                    <span className="font-semibold text-green-600">245%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamte Reichweite</span>
                    <span className="font-semibold">2.1M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="font-semibold text-blue-600">8.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
