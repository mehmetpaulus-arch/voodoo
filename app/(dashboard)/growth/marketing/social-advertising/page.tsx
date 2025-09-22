'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Share2,
  Plus,
  Search,
  Filter,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  TrendingUp,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  DollarSign,
  Users,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SocialAdvertisingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for social media campaigns
  const campaigns = [
    {
      id: 'SOC-001',
      name: 'Wahl 2025 Facebook',
      platform: 'Facebook',
      status: 'active',
      budget: 500000,
      spent: 280000,
      reach: 8500000,
      impressions: 25000000,
      clicks: 750000,
      likes: 125000,
      shares: 45000,
      comments: 32000,
      ctr: 3.0,
      cpc: 0.37,
      cpm: 11.20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Facebook-Kampagne für Wahl 2025'
    },
    {
      id: 'SOC-002',
      name: 'Instagram Stories',
      platform: 'Instagram',
      status: 'active',
      budget: 300000,
      spent: 180000,
      reach: 4500000,
      impressions: 18000000,
      clicks: 540000,
      likes: 95000,
      shares: 28000,
      comments: 18000,
      ctr: 3.0,
      cpc: 0.33,
      cpm: 10.00,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      description: 'Instagram Stories Kampagne'
    },
    {
      id: 'SOC-003',
      name: 'Twitter Ads',
      platform: 'Twitter',
      status: 'paused',
      budget: 200000,
      spent: 120000,
      reach: 3200000,
      impressions: 12000000,
      clicks: 360000,
      likes: 45000,
      shares: 15000,
      comments: 12000,
      ctr: 3.0,
      cpc: 0.33,
      cpm: 10.00,
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      description: 'Twitter Werbekampagne'
    },
    {
      id: 'SOC-004',
      name: 'YouTube Pre-Roll',
      platform: 'YouTube',
      status: 'completed',
      budget: 800000,
      spent: 780000,
      reach: 12000000,
      impressions: 45000000,
      clicks: 1350000,
      likes: 180000,
      shares: 65000,
      comments: 45000,
      ctr: 3.0,
      cpc: 0.58,
      cpm: 17.33,
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      description: 'YouTube Pre-Roll Werbung'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      case 'Instagram': return <Instagram className="w-5 h-5 text-pink-600" />;
      case 'Twitter': return <Twitter className="w-5 h-5 text-blue-400" />;
      case 'YouTube': return <Youtube className="w-5 h-5 text-red-600" />;
      default: return <Share2 className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'paused': return 'Pausiert';
      case 'completed': return 'Abgeschlossen';
      case 'draft': return 'Entwurf';
      default: return 'Unbekannt';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4 text-green-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'completed': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'draft': return <Edit className="w-4 h-4 text-gray-500" />;
      default: return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || campaign.platform === selectedPlatform;
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);
  const totalEngagement = campaigns.reduce((sum, campaign) => sum + campaign.likes + campaign.shares + campaign.comments, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/growth/marketing">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Social Advertising</h1>
                <p className="text-gray-300 mt-1">Werbung in sozialen Medien</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Kampagne
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt Budget</p>
                  <p className="text-2xl font-bold text-white">
                    {(totalBudget / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ausgegeben</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(totalSpent / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtreichweite</p>
                  <p className="text-2xl font-bold text-green-500">
                    {(totalReach / 1000000).toFixed(1)}M
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Engagement</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {(totalEngagement / 1000).toFixed(0)}K
                  </p>
                </div>
                <Target className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Kampagnen suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Plattform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Plattformen</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="paused">Pausiert</SelectItem>
                  <SelectItem value="completed">Abgeschlossen</SelectItem>
                  <SelectItem value="draft">Entwurf</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(campaign.platform)}
                    <div>
                      <CardTitle className="text-white text-xl">{campaign.name}</CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        {campaign.id} • {campaign.platform} • {campaign.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(campaign.status)}
                    <Badge className={getStatusColor(campaign.status)}>
                      {getStatusText(campaign.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Campaign Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Budget</span>
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(campaign.budget / 1000000).toFixed(1)}M €
                      </p>
                      <p className="text-gray-400 text-sm">
                        Ausgegeben: {(campaign.spent / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Reichweite</span>
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(campaign.reach / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-gray-400 text-sm">
                        Impressions: {(campaign.impressions / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Klicks</span>
                        <Target className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(campaign.clicks / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-gray-400 text-sm">
                        CTR: {campaign.ctr}%
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Engagement</span>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {((campaign.likes + campaign.shares + campaign.comments) / 1000).toFixed(0)}K
                      </p>
                      <p className="text-gray-400 text-sm">
                        Likes: {(campaign.likes / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  {/* Engagement Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Likes</span>
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {(campaign.likes / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Shares</span>
                        <Share2 className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {(campaign.shares / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Comments</span>
                        <Eye className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {(campaign.comments / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">CPC</span>
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {campaign.cpc} €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">CPM</span>
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {campaign.cpm} €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">CTR</span>
                        <Target className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {campaign.ctr}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget-Auslastung</span>
                      <span className="text-white">
                        {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-[#E37222] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Bericht
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}