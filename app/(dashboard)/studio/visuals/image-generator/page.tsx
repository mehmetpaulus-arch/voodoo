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

export default function ImageGeneratorPage() {
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);

  const generatedImages = [
    {
      id: 'IMG-001',
      title: 'Futuristic Cityscape',
      description: 'Eine futuristische Stadtlandschaft mit glänzenden Wolkenkratzern',
      style: 'Sci-Fi',
      resolution: '1024x1024',
      format: 'PNG',
      mood: 'Futuristic',
      tags: ['City', 'Futuristic', 'Sci-Fi', 'Architecture'],
      popularity: 95,
      downloads: 2100,
      rating: 4.9,
      price: '€9.99',
      imageUrl: '/images/generated1.png',
      isNew: true,
      isFeatured: true,
      prompt: 'A futuristic cityscape with glowing skyscrapers, neon lights, and flying cars'
    },
    {
      id: 'IMG-002',
      title: 'Nature Landscape',
      description: 'Eine wunderschöne Naturlandschaft mit Bergen und See',
      style: 'Realistic',
      resolution: '1024x1024',
      format: 'PNG',
      mood: 'Peaceful',
      tags: ['Nature', 'Landscape', 'Mountains', 'Lake'],
      popularity: 88,
      downloads: 1650,
      rating: 4.7,
      price: '€7.99',
      imageUrl: '/images/generated2.png',
      isNew: false,
      isFeatured: false,
      prompt: 'A beautiful mountain landscape with a crystal clear lake and forest'
    },
    {
      id: 'IMG-003',
      title: 'Abstract Art',
      description: 'Moderne abstrakte Kunst mit lebendigen Farben',
      style: 'Abstract',
      resolution: '1024x1024',
      format: 'PNG',
      mood: 'Creative',
      tags: ['Abstract', 'Art', 'Colors', 'Modern'],
      popularity: 82,
      downloads: 1200,
      rating: 4.6,
      price: '€6.99',
      imageUrl: '/images/generated3.png',
      isNew: false,
      isFeatured: true,
      prompt: 'Modern abstract art with vibrant colors and geometric shapes'
    }
  ];

  const styles = [
    { value: 'all', label: 'Alle Stile' },
    { value: 'Realistic', label: 'Realistisch' },
    { value: 'Abstract', label: 'Abstrakt' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Minimalist', label: 'Minimalistisch' },
    { value: 'Vintage', label: 'Vintage' }
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Futuristic': return 'bg-blue-100 text-blue-800';
      case 'Peaceful': return 'bg-green-100 text-green-800';
      case 'Creative': return 'bg-purple-100 text-purple-800';
      case 'Dramatic': return 'bg-red-100 text-red-800';
      case 'Happy': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateImage = () => {
    setIsGenerating(true);
    // Simulate image generation
    setTimeout(() => {
      setIsGenerating(false);
      // Add new image logic here
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/studio/visuals" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
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
              <Image className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">Image Generator</h2>
                <Badge className="bg-[#E37222] text-white">KI-Bilder</Badge>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Erstellen Sie professionelle Bilder mit KI-Unterstützung. 
                Von realistischen Fotos bis zu abstrakter Kunst - alles möglich.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">KI-Bild-Generierung</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#E37222]" />
                  <span className="text-gray-700 font-medium">Hohe Auflösung</span>
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
                <h3 className="text-xl font-bold">KI-Bild-Generator aktiv</h3>
                <p className="text-white/90">Erstellt maßgeschneiderte Bilder basierend auf Ihren Vorgaben</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <span className="font-medium">KI-Modus</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Generation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generate New Image */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Wand2 className="w-5 h-5 text-[#E37222]" />
                  Neues Bild generieren
                </CardTitle>
                <CardDescription>
                  Erstellen Sie maßgeschneiderte Bilder mit KI-Unterstützung
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="style">Stil</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Stil wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {styles.slice(1).map((style) => (
                          <SelectItem key={style.value} value={style.value}>
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Auflösung</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Auflösung wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="512x512">512x512</SelectItem>
                        <SelectItem value="1024x1024">1024x1024</SelectItem>
                        <SelectItem value="2048x2048">2048x2048</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea 
                    placeholder="Beschreiben Sie das gewünschte Bild..."
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Qualität</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Qualität wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="hd">HD</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aspect-ratio">Seitenverhältnis</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seitenverhältnis wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1:1">1:1 (Quadrat)</SelectItem>
                        <SelectItem value="16:9">16:9 (Breit)</SelectItem>
                        <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                        <SelectItem value="3:2">3:2 (Foto)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#E37222] hover:bg-[#D16212] text-white"
                  onClick={handleGenerateImage}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generiere Bild...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Bild generieren
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Images Grid */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Image className="w-5 h-5 text-[#E37222]" />
                  Generierte Bilder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedImages.map((img) => (
                    <div key={img.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-center">
                          <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Bildvorschau</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{img.title}</h3>
                          {img.isNew && <Badge className="bg-green-100 text-green-800 text-xs">Neu</Badge>}
                          {img.isFeatured && <Badge className="bg-[#E37222] text-white text-xs">Featured</Badge>}
                        </div>
                        
                        <p className="text-sm text-gray-600">{img.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {img.style}
                          </Badge>
                          <Badge className={`text-xs ${getMoodColor(img.mood)}`}>
                            {img.mood}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            {img.resolution}
                          </div>
                          <div className="flex items-center gap-1">
                            <File className="w-3 h-3" />
                            {img.format}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {img.price}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {img.rating}/5.0
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            Ansehen
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {img.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
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
                  Neues Bild
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Bild hochladen
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

            {/* Image Editor */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Bild-Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#E37222] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Image className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Kein Bild ausgewählt</h4>
                  <p className="text-sm text-gray-600">Wählen Sie ein Bild zum Bearbeiten</p>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Crop className="w-3 h-3 mr-1" />
                      Zuschneiden
                    </Button>
                    <Button size="sm" variant="outline">
                      <Rotate3D className="w-3 h-3 mr-1" />
                      Drehen
                    </Button>
                    <Button size="sm" variant="outline">
                      <Filter className="w-3 h-3 mr-1" />
                      Filter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Palette className="w-3 h-3 mr-1" />
                      Farben
                    </Button>
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
                    <span className="text-sm text-gray-600">Generierte Bilder</span>
                    <span className="font-semibold">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Downloads heute</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Umsatz heute</span>
                    <span className="font-semibold text-green-600">€1,870</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Durchschnittliche Bewertung</span>
                    <span className="font-semibold text-[#E37222]">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Style Distribution */}
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-900">Stil-Verteilung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Realistisch</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sci-Fi</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Abstrakt</span>
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
