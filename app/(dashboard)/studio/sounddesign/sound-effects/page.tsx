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
  Disc,
  Waves,
  FileAudio,
  Clock,
  Target,
  Star,
  Heart,
  Share2,
  Copy,
  Trash2,
  Plus,
  Edit,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2,
  Info,
  Lightbulb,
  Wand2,
  Palette,
  Layers,
  Filter,
  Search,
  Grid,
  List,
  MoreHorizontal,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Globe,
  Users,
  Crown,
  Award,
  Trophy,
  Flame,
  Rocket,
  Sun,
  Moon,
  Cloud,
  Wind,
  Droplets,
  TreePine,
  Mountain,
  Fish,
  Bird,
  Bug,
  Flower,
  Leaf,
  Apple,
  Carrot,
  Coffee,
  Pizza,
  Cake,
  IceCream,
  Wine,
  Beer,
  Utensils,
  ShoppingCart,
  CreditCard,
  Banknote,
  Receipt,
  Package,
  Truck,
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
  Key,
  Shield,
  Smile,
  Frown,
  ThumbsUp,
  ThumbsDown,
  Video,
  Camera,
  Image,
  Folder,
  File,
  Text,
  Type,
  Brush,
  Eraser,
  Crop,
  Rotate3D,
  Group,
  AlignLeft,
  AlignRight,
  AlignCenter,
  User,
  MapPin,
  DollarSign,
  Calendar,
  BarChart3,
  TrendingUp,
  Download,
  Upload,
  Settings
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

export default function SoundEffectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [aiEnabled, setAiEnabled] = useState(true);

  const soundEffects = [
    {
      id: 'SFX-001',
      title: 'Thunder Storm',
      description: 'Realistischer Donner und Regen für atmosphärische Szenen',
      category: 'Nature',
      duration: '0:45',
      format: 'WAV',
      quality: '48kHz/24bit',
      mood: 'Dramatic',
      tags: ['Thunder', 'Rain', 'Storm', 'Nature'],
      popularity: 92,
      downloads: 2100,
      rating: 4.9,
      price: '€4.99',
      previewUrl: '/audio/sfx1.wav',
      isNew: true,
      isFeatured: true,
      waveform: [0.1, 0.3, 0.8, 0.9, 0.7, 0.4, 0.6, 0.8, 0.5, 0.2]
    },
    {
      id: 'SFX-002',
      title: 'City Traffic',
      description: 'Verkehrsgeräusche für urbane Szenen',
      category: 'Urban',
      duration: '1:20',
      format: 'WAV',
      quality: '48kHz/24bit',
      mood: 'Busy',
      tags: ['Traffic', 'City', 'Urban', 'Cars'],
      popularity: 85,
      downloads: 1650,
      rating: 4.7,
      price: '€3.99',
      previewUrl: '/audio/sfx2.wav',
      isNew: false,
      isFeatured: false,
      waveform: [0.4, 0.6, 0.5, 0.7, 0.6, 0.8, 0.5, 0.4, 0.6, 0.7]
    },
    {
      id: 'SFX-003',
      title: 'Forest Ambience',
      description: 'Entspannende Waldgeräusche mit Vögeln und Wind',
      category: 'Nature',
      duration: '2:15',
      format: 'WAV',
      quality: '48kHz/24bit',
      mood: 'Peaceful',
      tags: ['Forest', 'Birds', 'Wind', 'Nature'],
      popularity: 78,
      downloads: 1200,
      rating: 4.8,
      price: '€5.99',
      previewUrl: '/audio/sfx3.wav',
      isNew: false,
      isFeatured: true,
      waveform: [0.2, 0.3, 0.4, 0.3, 0.5, 0.4, 0.3, 0.4, 0.3, 0.2]
    }
  ];

  const categories = [
    { value: 'all', label: 'Alle Kategorien' },
    { value: 'Nature', label: 'Natur' },
    { value: 'Urban', label: 'Urban' },
    { value: 'Mechanical', label: 'Mechanisch' },
    { value: 'Human', label: 'Menschlich' },
    { value: 'Animal', label: 'Tiere' },
    { value: 'Sci-Fi', label: 'Sci-Fi' }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Dramatic': return 'bg-red-100 text-red-800';
      case 'Busy': return 'bg-orange-100 text-orange-800';
      case 'Peaceful': return 'bg-blue-100 text-blue-800';
      case 'Happy': return 'bg-yellow-100 text-yellow-800';
      case 'Sad': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateSoundEffect = () => {
    setIsGenerating(true);
    // Simulate sound effect generation
    setTimeout(() => {
      setIsGenerating(false);
      // Add new sound effect logic here
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/studio/sounddesign" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
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
              <Volume1 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Sound Effects</h2>
                <Badge className="bg-[#E37222] text-white">KI-Sound</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Erstellen Sie professionelle Sound Effects mit KI-Unterstützung. 
                Von Naturgeräuschen bis zu Sci-Fi-Effekten - alles möglich.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Volume1 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Sound-Generierung</span>
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
                <Wand2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">KI-Sound-Generator aktiv</h3>
                <p className="text-white/90">Erstellt maßgeschneiderte Sound Effects basierend auf Ihren Vorgaben</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sound Effects List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generate New Sound Effect */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Wand2 className="w-5 h-5 text-[#E37222]" />
                  Neuen Sound Effect generieren
                </CardTitle>
                <CardDescription>
                  Erstellen Sie maßgeschneiderte Sound Effects mit KI-Unterstützung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood">Stimmung</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Stimmung wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="peaceful">Peaceful</SelectItem>
                        <SelectItem value="happy">Happy</SelectItem>
                        <SelectItem value="sad">Sad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Dauer (Sekunden)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quality">Qualität</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="44.1kHz/16bit">44.1kHz/16bit</SelectItem>
                        <SelectItem value="48kHz/24bit">48kHz/24bit</SelectItem>
                        <SelectItem value="96kHz/32bit">96kHz/32bit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea 
                    placeholder="Beschreiben Sie den gewünschten Sound Effect..."
                    rows={3}
                  />
                </div>
                
                <Button 
                  className="w-full bg-[#E37222] hover:bg-[#D16212] text-white"
                  onClick={handleGenerateSoundEffect}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generiere Sound Effect...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Sound Effect generieren
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Sound Effects Grid */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Volume1 className="w-5 h-5 text-[#E37222]" />
                  Sound Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {soundEffects.map((sfx) => (
                    <div key={sfx.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{sfx.title}</h3>
                            {sfx.isNew && <Badge className="bg-green-100 text-green-800">Neu</Badge>}
                            {sfx.isFeatured && <Badge className="bg-[#E37222] text-white">Featured</Badge>}
                            <Badge variant="outline" className="text-xs">
                              {sfx.category}
                            </Badge>
                            <Badge className={`text-xs ${getMoodColor(sfx.mood)}`}>
                              {sfx.mood}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{sfx.description}</p>
                          
                          {/* Waveform Visualization */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                              {sfx.waveform.map((height, index) => (
                                <div
                                  key={index}
                                  className="bg-[#E37222] rounded-sm"
                                  style={{
                                    width: '4px',
                                    height: `${height * 20}px`
                                  }}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">{sfx.duration}</span>
                          </div>
                          
                          {/* Sound Effect Info */}
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{sfx.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileAudio className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{sfx.format}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{sfx.quality}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">{sfx.price}</span>
                            </div>
                          </div>
                          
                          {/* Popularity and Rating */}
                          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <BarChart3 className="w-4 h-4" />
                              {sfx.popularity}% Popularität
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="w-4 h-4" />
                              {sfx.downloads} Downloads
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              {sfx.rating}/5.0
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {sfx.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <Wand2 className="w-4 h-4 mr-2" />
                  Neuer Sound Effect
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Sound Effect hochladen
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

            {/* Sound Player */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Sound-Player</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E37222] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Volume1 className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Kein Sound ausgewählt</h4>
                  <p className="text-sm text-gray-600">Wählen Sie einen Sound Effect zum Abspielen</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Button size="sm" variant="outline">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>0:00</span>
                      <span>0:45</span>
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
                    <span className="text-sm text-gray-600">Gesamt Sound Effects</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Downloads heute</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Umsatz heute</span>
                    <span className="font-semibold text-green-600">€780</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittliche Bewertung</span>
                    <span className="font-semibold text-[#E37222]">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Kategorie-Verteilung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Natur</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Urban</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mechanisch</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Andere</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
