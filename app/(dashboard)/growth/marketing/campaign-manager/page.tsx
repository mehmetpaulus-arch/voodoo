'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Target,
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  DollarSign,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CampaignManagerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock data for campaigns
  const campaigns = [
    {
      id: 'CAMP-001',
      name: 'Wahl 2025 Kampagne',
      type: 'TV-Werbung',
      status: 'active',
      budget: 2500000,
      spent: 1200000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      reach: 15000000,
      impressions: 45000000,
      clicks: 1250000,
      conversions: 85000,
      ctr: 2.78,
      cpc: 0.96,
      roas: 3.2,
      description: 'Komplette Marketing-Kampagne für die Wahl 2025'
    },
    {
      id: 'CAMP-002',
      name: 'Sommer-Programm 2024',
      type: 'Digital Marketing',
      status: 'active',
      budget: 800000,
      spent: 450000,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      reach: 8500000,
      impressions: 25000000,
      clicks: 750000,
      conversions: 45000,
      ctr: 3.0,
      cpc: 0.60,
      roas: 4.1,
      description: 'Sommer-Programm Marketing-Kampagne'
    },
    {
      id: 'CAMP-003',
      name: 'Weihnachts-Special',
      type: 'Social Media',
      status: 'completed',
      budget: 500000,
      spent: 480000,
      startDate: '2023-11-15',
      endDate: '2023-12-31',
      reach: 12000000,
      impressions: 35000000,
      clicks: 980000,
      conversions: 65000,
      ctr: 2.8,
      cpc: 0.49,
      roas: 3.8,
      description: 'Weihnachts-Special Marketing-Kampagne'
    },
    {
      id: 'CAMP-004',
      name: 'Frühjahrs-Offensive',
      type: 'E-Mail Marketing',
      status: 'paused',
      budget: 300000,
      spent: 180000,
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      reach: 5000000,
      impressions: 15000000,
      clicks: 450000,
      conversions: 28000,
      ctr: 3.0,
      cpc: 0.40,
      roas: 2.9,
      description: 'Frühjahrs-Offensive E-Mail Kampagne'
    }
  ];

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
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    const matchesType = selectedType === 'all' || campaign.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalReach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

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
                <h1 className="text-3xl font-bold text-white">Campaign Manager</h1>
                <p className="text-gray-300 mt-1">Marketing-Kampagnen verwalten</p>
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
                <TrendingDown className="w-8 h-8 text-red-500" />
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
                  <p className="text-sm font-medium text-gray-400">Konversionen</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {(totalConversions / 1000).toFixed(0)}K
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
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Typen</SelectItem>
                  <SelectItem value="TV-Werbung">TV-Werbung</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="E-Mail Marketing">E-Mail Marketing</SelectItem>
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
                  <div>
                    <CardTitle className="text-white text-xl">{campaign.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {campaign.id} • {campaign.type} • {campaign.description}
                    </CardDescription>
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
                        <span className="text-gray-400 text-sm">Konversionen</span>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(campaign.conversions / 1000).toFixed(0)}K
                      </p>
                      <p className="text-gray-400 text-sm">
                        ROAS: {campaign.roas}x
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

                  {/* Campaign Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Kampagnen-Details</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p>Start: {new Date(campaign.startDate).toLocaleDateString('de-DE')}</p>
                        <p>Ende: {new Date(campaign.endDate).toLocaleDateString('de-DE')}</p>
                        <p>CPC: {campaign.cpc} €</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Performance</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p>Klickrate: {campaign.ctr}%</p>
                        <p>ROAS: {campaign.roas}x</p>
                        <p>Konversionsrate: {((campaign.conversions / campaign.clicks) * 100).toFixed(2)}%</p>
                      </div>
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