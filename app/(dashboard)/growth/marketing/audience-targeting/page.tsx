'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Users,
  Plus,
  Search,
  Filter,
  Target,
  TrendingUp,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AudienceTargetingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for audience segments
  const audiences = [
    {
      id: 'AUD-001',
      name: 'Wahlberechtigte 18-35',
      description: 'Junge Wähler zwischen 18 und 35 Jahren',
      size: 8500000,
      demographics: {
        age: '18-35',
        gender: 'Mixed',
        location: 'Deutschland',
        income: 'Mittel',
        education: 'Hochschule/Universität'
      },
      interests: ['Politik', 'Nachrichten', 'Social Media', 'Technologie'],
      behavior: ['Online-Shopping', 'Streaming', 'Social Media'],
      status: 'active',
      lastUpdated: '2024-06-15',
      performance: {
        reach: 7800000,
        engagement: 12.5,
        conversion: 3.2,
        cost: 0.45
      }
    },
    {
      id: 'AUD-002',
      name: 'Familien mit Kindern',
      description: 'Familien mit Kindern unter 18 Jahren',
      size: 12000000,
      demographics: {
        age: '25-50',
        gender: 'Mixed',
        location: 'Deutschland',
        income: 'Mittel-Hoch',
        education: 'Berufsausbildung/Studium'
      },
      interests: ['Familie', 'Bildung', 'Gesundheit', 'Finanzen'],
      behavior: ['TV-Konsum', 'Online-Shopping', 'Newsletter'],
      status: 'active',
      lastUpdated: '2024-06-14',
      performance: {
        reach: 11000000,
        engagement: 8.7,
        conversion: 2.8,
        cost: 0.38
      }
    },
    {
      id: 'AUD-003',
      name: 'Senioren 65+',
      description: 'Ältere Zielgruppe ab 65 Jahren',
      size: 18000000,
      demographics: {
        age: '65+',
        gender: 'Mixed',
        location: 'Deutschland',
        income: 'Mittel',
        education: 'Verschieden'
      },
      interests: ['Nachrichten', 'Gesundheit', 'Politik', 'Kultur'],
      behavior: ['TV-Konsum', 'Zeitung', 'Radio'],
      status: 'active',
      lastUpdated: '2024-06-13',
      performance: {
        reach: 16500000,
        engagement: 15.2,
        conversion: 4.1,
        cost: 0.52
      }
    },
    {
      id: 'AUD-004',
      name: 'Digital Natives',
      description: 'Tech-affine Zielgruppe',
      size: 6500000,
      demographics: {
        age: '20-40',
        gender: 'Mixed',
        location: 'Großstädte',
        income: 'Hoch',
        education: 'Universität'
      },
      interests: ['Technologie', 'Innovation', 'Nachhaltigkeit', 'Lifestyle'],
      behavior: ['Social Media', 'Streaming', 'Online-Shopping', 'Apps'],
      status: 'draft',
      lastUpdated: '2024-06-12',
      performance: {
        reach: 0,
        engagement: 0,
        conversion: 0,
        cost: 0
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'draft': return 'Entwurf';
      case 'paused': return 'Pausiert';
      default: return 'Unbekannt';
    }
  };

  const filteredAudiences = audiences.filter(audience => {
    const matchesSearch = audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audience.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || audience.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalAudienceSize = audiences.reduce((sum, audience) => sum + audience.size, 0);
  const activeAudiences = audiences.filter(a => a.status === 'active').length;
  const totalReach = audiences.reduce((sum, audience) => sum + audience.performance.reach, 0);
  const avgEngagement = audiences.reduce((sum, audience) => sum + audience.performance.engagement, 0) / audiences.length;

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
                <h1 className="text-3xl font-bold text-white">Audience Targeting</h1>
                <p className="text-gray-300 mt-1">Zielgruppen definieren und verwalten</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Zielgruppe
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
                  <p className="text-sm font-medium text-gray-400">Gesamt Zielgruppen</p>
                  <p className="text-2xl font-bold text-white">{audiences.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Aktive Zielgruppen</p>
                  <p className="text-2xl font-bold text-green-500">{activeAudiences}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtgröße</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {(totalAudienceSize / 1000000).toFixed(1)}M
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ø Engagement</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {avgEngagement.toFixed(1)}%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
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
                  placeholder="Zielgruppen suchen..."
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
                  <SelectItem value="draft">Entwurf</SelectItem>
                  <SelectItem value="paused">Pausiert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audiences List */}
        <div className="space-y-6">
          {filteredAudiences.map((audience) => (
            <Card key={audience.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">{audience.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {audience.id} • {audience.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(audience.status)}>
                      {getStatusText(audience.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Audience Size and Performance */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Zielgruppengröße</span>
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(audience.size / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Reichweite</span>
                        <Target className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(audience.performance.reach / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Engagement</span>
                        <Activity className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {audience.performance.engagement}%
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Konversion</span>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {audience.performance.conversion}%
                      </p>
                    </div>
                  </div>

                  {/* Demographics and Interests */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Demografische Daten</h4>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Alter:</span>
                            <p className="text-white font-medium">{audience.demographics.age}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Geschlecht:</span>
                            <p className="text-white font-medium">{audience.demographics.gender}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Standort:</span>
                            <p className="text-white font-medium">{audience.demographics.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Einkommen:</span>
                            <p className="text-white font-medium">{audience.demographics.income}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-400">Bildung:</span>
                            <p className="text-white font-medium">{audience.demographics.education}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Interessen & Verhalten</h4>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-400 text-sm">Interessen:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {audience.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Verhalten:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {audience.behavior.map((behavior, index) => (
                                <Badge key={index} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                                  {behavior}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
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
                      Analyse
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