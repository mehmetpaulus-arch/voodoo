'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Play,
  Pause,
  Volume1,
  VolumeX,
  Music,
  Headphones,
  Mic,
  Radio,
  Tv,
  Smartphone,
  Laptop,
  Monitor,
  Speaker,
  Settings,
  Download,
  Upload,
  Share2,
  Heart,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Trophy,
  Sparkles,
  Lightbulb,
  Rocket,
  Zap,
  Shield,
  Lock,
  Key,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Home,
  Building,
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
  Cloud,
  Folder,
  File,
  Image,
  Video,
  Camera,
  Text,
  Type,
  Palette,
  Brush,
  Eraser,
  Crop,
  Layers,
  Group,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Users,
  User,
  MapPin,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Package,
  Truck,
  Coffee,
  Pizza,
  Cake,
  Wine,
  Beer,
  Apple,
  Leaf,
  TreePine,
  Mountain,
  Waves,
  Fish,
  Bird,
  Flower,
  Sun,
  Moon,
  Cloud as CloudIcon,
  Wind
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
import { Slider } from '@/components/ui/slider';

export default function MusicGeneratorLandingPage() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [aiEnabled, setAiEnabled] = useState(true);

  const musicTracks = [
    {
      id: 'TRACK-001',
      title: 'Epic Cinematic Score',
      description: 'Dramatische Orchestermusik für Filme und Videos',
      genre: 'Cinematic',
      duration: '3:45',
      bpm: 120,
      key: 'C Major',
      mood: 'Epic',
      instruments: ['Orchestra', 'Strings', 'Brass'],
      tags: ['Cinematic', 'Epic', 'Orchestra'],
      popularity: 95,
      downloads: 1250,
      rating: 4.8,
      price: '€29.99',
      previewUrl: '/audio/preview1.mp3',
      isNew: true,
      isFeatured: true
    },
    {
      id: 'TRACK-002',
      title: 'Upbeat Electronic',
      description: 'Moderne elektronische Musik für Werbung und Events',
      genre: 'Electronic',
      duration: '2:30',
      bpm: 128,
      key: 'A Minor',
      mood: 'Energetic',
      instruments: ['Synthesizer', 'Drums', 'Bass'],
      tags: ['Electronic', 'Upbeat', 'Modern'],
      popularity: 87,
      downloads: 890,
      rating: 4.6,
      price: '€24.99',
      previewUrl: '/audio/preview2.mp3',
      isNew: false,
      isFeatured: false
    },
    {
      id: 'TRACK-003',
      title: 'Ambient Soundscape',
      description: 'Entspannende Ambient-Musik für Meditation und Entspannung',
      genre: 'Ambient',
      duration: '5:20',
      bpm: 60,
      key: 'D Major',
      mood: 'Calm',
      instruments: ['Pads', 'Strings', 'Nature Sounds'],
      tags: ['Ambient', 'Relaxing', 'Meditation'],
      popularity: 72,
      downloads: 650,
      rating: 4.7,
      price: '€19.99',
      previewUrl: '/audio/preview3.mp3',
      isNew: false,
      isFeatured: true
    }
  ];

  const genres = [
    { value: 'all', label: 'Alle Genres' },
    { value: 'Cinematic', label: 'Cinematic' },
    { value: 'Electronic', label: 'Electronic' },
    { value: 'Ambient', label: 'Ambient' },
    { value: 'Rock', label: 'Rock' },
    { value: 'Jazz', label: 'Jazz' },
    { value: 'Classical', label: 'Classical' }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Epic': return 'bg-red-100 text-red-800';
      case 'Energetic': return 'bg-orange-100 text-orange-800';
      case 'Calm': return 'bg-blue-100 text-blue-800';
      case 'Happy': return 'bg-yellow-100 text-yellow-800';
      case 'Sad': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/studio/audio" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
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
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Music Generator</h2>
                <Badge className="bg-[#E37222] text-white">KI-Musik</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Erstellen Sie professionelle Musik mit KI-Unterstützung. 
                Von Cinematic Scores bis zu Electronic Beats - alles möglich.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Musik-Generierung</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Professionelle Qualität</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Sofortiger Download</span>
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
                <h3 className="text-xl font-bold">KI-Musik-Generator aktiv</h3>
                <p className="text-white/90">Erstellt maßgeschneiderte Musik basierend auf Ihren Vorgaben</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Music Tracks List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create New Track */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Plus className="w-5 h-5 text-[#E37222]" />
                  Neuen Track erstellen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#E37222] hover:bg-[#D16212] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Track generieren
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Search className="w-5 h-5 text-[#E37222]" />
                  Musik durchsuchen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Musik durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre.value} value={genre.value}>
                          {genre.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Music Tracks Grid */}
            <div className="space-y-4">
              {musicTracks.map((track) => (
                <Card key={track.id} className="border-gray-300 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
                          {track.isNew && <Badge className="bg-green-100 text-green-800">Neu</Badge>}
                          {track.isFeatured && <Badge className="bg-[#E37222] text-white">Featured</Badge>}
                          <Badge variant="outline" className="text-xs">
                            {track.genre}
                          </Badge>
                          <Badge className={`text-xs ${getMoodColor(track.mood)}`}>
                            {track.mood}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{track.description}</p>
                        
                        {/* Track Info */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{track.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{track.bpm} BPM</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Music className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{track.key}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{track.price}</span>
                          </div>
                        </div>
                        
                        {/* Popularity and Rating */}
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-4 h-4" />
                            {track.popularity}% Popularität
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {track.downloads} Downloads
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {track.rating}/5.0
                          </div>
                        </div>
                        
                        {/* Instruments */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Instrumente:</p>
                          <div className="flex flex-wrap gap-2">
                            {track.instruments.map((instrument) => (
                              <Badge key={instrument} variant="secondary" className="text-xs">
                                {instrument}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
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
                  Neuer Track
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Track hochladen
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Einstellungen
                </Button>
              </CardContent>
            </Card>

            {/* Music Player */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Musik-Player</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E37222] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Kein Track ausgewählt</h4>
                  <p className="text-sm text-gray-600">Wählen Sie einen Track zum Abspielen</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>0:00</span>
                      <span>3:45</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <VolumeX className="w-4 h-4" />
                      <span>Lautstärke</span>
                      <Volume1 className="w-4 h-4" />
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Statistiken</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gesamt Tracks</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Downloads heute</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Umsatz heute</span>
                    <span className="font-semibold text-green-600">€2,340</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittliche Bewertung</span>
                    <span className="font-semibold text-[#E37222]">4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Genre Distribution */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Genre-Verteilung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cinematic</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Electronic</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ambient</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Andere</span>
                    <span className="font-medium">17%</span>
                  </div>
                  <Progress value={17} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
