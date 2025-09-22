'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Calendar,
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  Share2,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Smartphone,
  Monitor,
  Radio,
  Newspaper,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Flag,
  ExternalLink,
  DollarSign,
  Users,
  MousePointer,
  MousePointerClick,
  UserPlus,
  UserMinus,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  PieChart,
  LineChart,
  Activity,
  Play,
  Pause,
  Volume2,
  Camera,
  Mic,
  PenTool,
  Code,
  Palette,
  Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon,
  Radio as RadioIcon,
  Newspaper as NewspaperIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContentPromotionPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Content promotion campaigns data
  const promotionCampaigns = [
    {
      id: 1,
      name: 'Dokumentation: Klimawandel',
      type: 'Video',
      status: 'active',
      content: 'Klimawandel-Dokumentation',
      channels: ['YouTube', 'Facebook', 'Instagram'],
      budget: 15000,
      spent: 8500,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      views: 450000,
      engagement: 12500,
      shares: 3200,
      comments: 850,
      reach: 380000,
      impressions: 680000,
      ctr: 4.2,
      cpc: 0.28
    },
    {
      id: 2,
      name: 'Newsletter: Tech-Update',
      type: 'Article',
      status: 'completed',
      content: 'Neueste Technologie-Trends',
      channels: ['E-Mail', 'LinkedIn', 'Twitter'],
      budget: 8000,
      spent: 8000,
      startDate: '2023-12-15',
      endDate: '2023-12-31',
      views: 125000,
      engagement: 3200,
      shares: 850,
      comments: 420,
      reach: 95000,
      impressions: 180000,
      ctr: 6.8,
      cpc: 0.45
    },
    {
      id: 3,
      name: 'Podcast: Interview Serie',
      type: 'Audio',
      status: 'active',
      content: 'Experten-Interviews',
      channels: ['Spotify', 'Apple Podcasts', 'YouTube'],
      budget: 12000,
      spent: 6200,
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      views: 280000,
      engagement: 8900,
      shares: 2100,
      comments: 650,
      reach: 220000,
      impressions: 420000,
      ctr: 5.5,
      cpc: 0.35
    }
  ];

  const contentTypes = [
    { name: 'Video', icon: Video, color: 'text-red-500', count: 15 },
    { name: 'Article', icon: FileText, color: 'text-blue-500', count: 28 },
    { name: 'Audio', icon: Mic, color: 'text-green-500', count: 12 },
    { name: 'Image', icon: Image, color: 'text-purple-500', count: 45 },
    { name: 'Infographic', icon: BarChart3, color: 'text-yellow-500', count: 8 },
    { name: 'Interactive', icon: Code, color: 'text-orange-500', count: 5 }
  ];

  const promotionChannels = [
    { name: 'YouTube', icon: Video, color: 'text-red-500', reach: '2.7B', cost: '€0.15' },
    { name: 'Facebook', icon: Share2, color: 'text-blue-600', reach: '2.9B', cost: '€0.25' },
    { name: 'Instagram', icon: Camera, color: 'text-pink-500', reach: '1.4B', cost: '€0.20' },
    { name: 'LinkedIn', icon: Users, color: 'text-blue-700', reach: '900M', cost: '€0.35' },
    { name: 'Twitter', icon: MessageSquare, color: 'text-blue-400', reach: '450M', cost: '€0.30' },
    { name: 'TikTok', icon: Play, color: 'text-black', reach: '1.0B', cost: '€0.18' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'completed': return 'Abgeschlossen';
      case 'paused': return 'Pausiert';
      case 'draft': return 'Entwurf';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return Video;
      case 'Article': return FileText;
      case 'Audio': return Mic;
      case 'Image': return Image;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/growth/marketing">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zu Marketing
          </Button>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-white">Content Promotion</h1>
            <p className="text-gray-400">Inhalte bewerben</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
              <Plus className="w-4 h-4 mr-2" />
              Neue Promotion
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#FA7D19]">
              <BarChart3 className="w-4 h-4 mr-2" />
              Übersicht
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#FA7D19]">
              <Megaphone className="w-4 h-4 mr-2" />
              Kampagnen
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-[#FA7D19]">
              <Globe className="w-4 h-4 mr-2" />
              Kanäle
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#FA7D19]">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Aktive Promotions</p>
                      <p className="text-2xl font-bold text-white">2</p>
                    </div>
                    <Megaphone className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Gesamt Views</p>
                      <p className="text-2xl font-bold text-white">855K</p>
                    </div>
                    <Eye className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Engagement</p>
                      <p className="text-2xl font-bold text-white">24.6K</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Gesamtausgaben</p>
                      <p className="text-2xl font-bold text-white">€22.7K</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Types Performance */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Content-Typen Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div key={type.name} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`w-6 h-6 ${type.color}`} />
                          <div>
                            <h4 className="text-white font-medium">{type.name}</h4>
                            <p className="text-gray-400 text-sm">{type.count} Inhalte</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Ø Views</span>
                            <span className="text-white">-</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Ø Engagement</span>
                            <span className="text-white">-</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Ø CTR</span>
                            <span className="text-white">-</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Content Promotion Kampagnen</span>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Kampagne suchen..." className="w-64" />
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {promotionCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <div key={campaign.id} className="p-6 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <TypeIcon className="w-6 h-6 text-gray-400" />
                            <div>
                              <h3 className="text-white font-semibold text-lg">{campaign.name}</h3>
                              <p className="text-gray-400 text-sm">{campaign.content}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
                            <Badge variant="outline" className="text-gray-300 border-gray-500">
                              {getStatusText(campaign.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm">Views</p>
                            <p className="text-white font-medium">{campaign.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Engagement</p>
                            <p className="text-white font-medium">{campaign.engagement.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Shares</p>
                            <p className="text-white font-medium">{campaign.shares.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Reach</p>
                            <p className="text-white font-medium">{campaign.reach.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm">Budget</p>
                            <p className="text-white font-medium">€{campaign.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Ausgegeben</p>
                            <p className="text-white font-medium">€{campaign.spent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">CTR</p>
                            <p className="text-white font-medium">{campaign.ctr}%</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Kanäle:</span>
                            <div className="flex gap-1">
                              {campaign.channels.map((channel, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-2" />
                              Teilen
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Channels Tab */}
          <TabsContent value="channels" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotionChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <Card key={channel.name} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${channel.color}`} />
                        {channel.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {channel.reach} monatliche Nutzer
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Durchschnittlicher CPC</span>
                          <span className="text-white">{channel.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Durchschnittlicher CTR</span>
                          <span className="text-white">4.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Engagement Rate</span>
                          <span className="text-white">2.8%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-white font-medium text-sm">Content-Formate</h4>
                        <div className="flex flex-wrap gap-1">
                          {channel.name === 'YouTube' && ['Video Ads', 'Display Ads', 'Overlay Ads'].map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                          {channel.name === 'Facebook' && ['Feed Posts', 'Stories', 'Video Ads'].map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                          {channel.name === 'Instagram' && ['Feed Posts', 'Stories', 'Reels'].map((format) => (
                            <Badge key={format} variant="secondary" className="text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full bg-[#FA7D19] hover:bg-[#E86D0A]">
                        Promotion erstellen
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Übersicht</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittliche Views</span>
                      <span className="text-white font-semibold">285K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittliches Engagement</span>
                      <span className="text-white font-semibold">8.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittlicher CTR</span>
                      <span className="text-white font-semibold">5.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittlicher CPC</span>
                      <span className="text-white font-semibold">€0.33</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Kampagnen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {promotionCampaigns.sort((a, b) => b.views - a.views).map((campaign, index) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">#{index + 1}</span>
                          <span className="text-white text-sm">{campaign.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm font-medium">{campaign.views.toLocaleString()} Views</span>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

