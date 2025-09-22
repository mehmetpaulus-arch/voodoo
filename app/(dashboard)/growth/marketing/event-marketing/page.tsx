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

export default function EventMarketingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);

  const events = [
    {
      id: 'EVT-001',
      title: 'ZDF Sommerfest 2024',
      description: 'Großes Mitarbeiterfest mit Live-Musik und kulinarischen Highlights',
      category: 'Corporate',
      status: 'Geplant',
      priority: 'Hoch',
      date: '2024-07-15',
      location: 'ZDF Hauptsitz, Mainz',
      attendees: 500,
      budget: '€25,000',
      organizer: 'HR Team',
      tags: ['Sommer', 'Mitarbeiter', 'Fest']
    },
    {
      id: 'EVT-002',
      title: 'Medienkonferenz 2024',
      description: 'Jährliche Konferenz für Medienvertreter und Partner',
      category: 'Business',
      status: 'In Vorbereitung',
      priority: 'Mittel',
      date: '2024-09-20',
      location: 'Berlin, Hotel Adlon',
      attendees: 200,
      budget: '€50,000',
      organizer: 'PR Team',
      tags: ['Konferenz', 'Medien', 'Networking']
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'Corporate', label: 'Corporate Events' },
    { value: 'Business', label: 'Business Events' },
    { value: 'Marketing', label: 'Marketing Events' },
    { value: 'Social', label: 'Social Events' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Geplant': return 'bg-blue-100 text-blue-800';
      case 'In Vorbereitung': return 'bg-yellow-100 text-yellow-800';
      case 'Läuft': return 'bg-green-100 text-green-800';
      case 'Abgeschlossen': return 'bg-gray-100 text-gray-800';
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
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Event Marketing</h2>
                <Badge className="bg-[#E37222] text-white">ZDF Marketing</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Planen und verwalten Sie erfolgreiche Events und Veranstaltungen. 
                Von der Konzeption bis zur Nachbereitung - alles an einem Ort.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Event-Planung</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Analytics & ROI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Teilnehmer-Management</span>
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
                <p className="text-white/90">Optimiert Event-Planung und Teilnehmer-Engagement</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Event */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Plus className="w-5 h-5 text-[#E37222]" />
                  Neues Event erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#E37222] hover:bg-[#D16212] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Event erstellen
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Events durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Events durchsuchen..."
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

            {/* Events Grid */}
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.category}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{event.attendees} Teilnehmer</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{event.budget}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {event.organizer}
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
                      {event.tags.map((tag) => (
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
                  Neues Event
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Kalender anzeigen
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Berichte
                </Button>
              </CardContent>
            </Card>

            {/* Event Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Event-Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamt Events</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Geplant</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">In Vorbereitung</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Abgeschlossen</span>
                    <span className="font-semibold">4</span>
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
