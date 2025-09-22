'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Mail,
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
  Phone,
  Globe,
  Smartphone,
  Monitor,
  Radio,
  Newspaper,
  Megaphone,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Flag,
  ExternalLink,
  Send,
  Users,
  MousePointer,
  MousePointerClick,
  UserPlus,
  UserMinus,
  DollarSign,
  FileText,
  Image,
  Video,
  Link as LinkIcon
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

export default function EmailCampaignsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Email campaigns data
  const emailCampaigns = [
    {
      id: 1,
      name: 'Newsletter Januar 2024',
      type: 'Newsletter',
      status: 'sent',
      subject: 'Neue Features & Updates',
      recipients: 25000,
      sent: 25000,
      delivered: 24800,
      opened: 12400,
      clicked: 1860,
      unsubscribed: 125,
      bounced: 200,
      openRate: 50.0,
      clickRate: 7.5,
      unsubscribeRate: 0.5,
      sentDate: '2024-01-15',
      template: 'newsletter-template-1'
    },
    {
      id: 2,
      name: 'Black Friday Promotion',
      type: 'Promotion',
      status: 'sent',
      subject: '50% Rabatt - Nur heute!',
      recipients: 45000,
      sent: 45000,
      delivered: 44500,
      opened: 26700,
      clicked: 5400,
      unsubscribed: 225,
      bounced: 500,
      openRate: 60.0,
      clickRate: 12.0,
      unsubscribeRate: 0.5,
      sentDate: '2023-11-24',
      template: 'promotion-template-2'
    },
    {
      id: 3,
      name: 'Welcome Series #1',
      type: 'Automation',
      status: 'active',
      subject: 'Willkommen bei uns!',
      recipients: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      sentDate: '2024-01-01',
      template: 'welcome-template-1'
    },
    {
      id: 4,
      name: 'Produkt-Update',
      type: 'Announcement',
      status: 'draft',
      subject: 'Neue Version verfügbar',
      recipients: 30000,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      sentDate: null,
      template: 'announcement-template-1'
    }
  ];

  const emailTemplates = [
    {
      id: 1,
      name: 'Newsletter Standard',
      category: 'Newsletter',
      preview: '/templates/newsletter-standard.jpg',
      lastUsed: '2024-01-15',
      usage: 15
    },
    {
      id: 2,
      name: 'Promotion Sale',
      category: 'Promotion',
      preview: '/templates/promotion-sale.jpg',
      lastUsed: '2023-11-24',
      usage: 8
    },
    {
      id: 3,
      name: 'Welcome Series',
      category: 'Automation',
      preview: '/templates/welcome-series.jpg',
      lastUsed: '2024-01-01',
      usage: 25
    },
    {
      id: 4,
      name: 'Product Update',
      category: 'Announcement',
      preview: '/templates/product-update.jpg',
      lastUsed: '2023-12-10',
      usage: 5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      case 'scheduled': return 'bg-purple-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Gesendet';
      case 'active': return 'Aktiv';
      case 'draft': return 'Entwurf';
      case 'scheduled': return 'Geplant';
      case 'paused': return 'Pausiert';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Newsletter': return FileText;
      case 'Promotion': return Megaphone;
      case 'Automation': return Zap;
      case 'Announcement': return AlertCircle;
      default: return Mail;
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
            <h1 className="text-2xl font-bold text-white">E-Mail Kampagnen</h1>
            <p className="text-gray-400">Newsletter und Automation</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
              <Plus className="w-4 h-4 mr-2" />
              Neue Kampagne
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
              <Mail className="w-4 h-4 mr-2" />
              Kampagnen
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#FA7D19]">
              <FileText className="w-4 h-4 mr-2" />
              Templates
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
                      <p className="text-gray-400 text-sm">Gesendete E-Mails</p>
                      <p className="text-2xl font-bold text-white">70K</p>
                    </div>
                    <Send className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Öffnungsrate</p>
                      <p className="text-2xl font-bold text-white">55%</p>
                    </div>
                    <Eye className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Klickrate</p>
                      <p className="text-2xl font-bold text-white">9.8%</p>
                    </div>
                    <MousePointerClick className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Abmeldungen</p>
                      <p className="text-2xl font-bold text-white">0.5%</p>
                    </div>
                    <UserMinus className="w-8 h-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Campaigns */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Letzte Kampagnen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailCampaigns.filter(c => c.status === 'sent').slice(0, 3).map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <div key={campaign.id} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{campaign.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {campaign.recipients.toLocaleString()} Empfänger | 
                            Öffnungsrate: {campaign.openRate}% | 
                            Klickrate: {campaign.clickRate}%
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-gray-300 border-gray-500">
                            {getStatusText(campaign.status)}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
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
                  <span>E-Mail Kampagnen</span>
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
                  {emailCampaigns.map((campaign) => {
                    const TypeIcon = getTypeIcon(campaign.type);
                    return (
                      <div key={campaign.id} className="p-6 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <TypeIcon className="w-6 h-6 text-gray-400" />
                            <div>
                              <h3 className="text-white font-semibold text-lg">{campaign.name}</h3>
                              <p className="text-gray-400 text-sm">{campaign.subject}</p>
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
                            <p className="text-gray-400 text-sm">Empfänger</p>
                            <p className="text-white font-medium">{campaign.recipients.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Gesendet</p>
                            <p className="text-white font-medium">{campaign.sent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Geöffnet</p>
                            <p className="text-white font-medium">{campaign.opened.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Geklickt</p>
                            <p className="text-white font-medium">{campaign.clicked.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-gray-400 text-sm">Öffnungsrate</p>
                            <p className="text-white font-medium">{campaign.openRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Klickrate</p>
                            <p className="text-white font-medium">{campaign.clickRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Abmelderate</p>
                            <p className="text-white font-medium">{campaign.unsubscribeRate}%</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-400">
                            {campaign.sentDate ? `Gesendet: ${campaign.sentDate}` : 'Noch nicht gesendet'}
                          </div>
                          <div className="flex items-center gap-2">
                            {campaign.status === 'draft' && (
                              <Button variant="outline" size="sm">
                                <Send className="w-4 h-4 mr-2" />
                                Senden
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Analytics
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Export
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

          {/* Templates Tab */}
          <TabsContent value="templates" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>E-Mail Templates</span>
                  <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                    <Plus className="w-4 h-4 mr-2" />
                    Neues Template
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="p-4 bg-gray-700 rounded-lg">
                      <div className="aspect-video bg-gray-600 rounded mb-4 flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-white font-medium">{template.name}</h4>
                        <p className="text-gray-400 text-sm">{template.category}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Verwendet: {template.usage}x</span>
                          <span className="text-gray-400">{template.lastUsed}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Vorschau
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Bearbeiten
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                      <span className="text-gray-300">Durchschnittliche Öffnungsrate</span>
                      <span className="text-white font-semibold">55.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittliche Klickrate</span>
                      <span className="text-white font-semibold">9.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittliche Abmelderate</span>
                      <span className="text-white font-semibold">0.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Gesamt E-Mails gesendet</span>
                      <span className="text-white font-semibold">70,000</span>
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
                    {emailCampaigns.filter(c => c.status === 'sent').sort((a, b) => b.openRate - a.openRate).map((campaign, index) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">#{index + 1}</span>
                          <span className="text-white text-sm">{campaign.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm font-medium">{campaign.openRate}% Öffnungsrate</span>
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

