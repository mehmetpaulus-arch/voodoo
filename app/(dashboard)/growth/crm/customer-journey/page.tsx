'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Target,
  Plus,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  BarChart3,
  Activity,
  Zap,
  Heart,
  ShoppingCart,
  Mail,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CustomerJourneyPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock data for customer journey
  const journeyData = {
    touchpoints: [
      {
        id: 'TP-001',
        name: 'Website Besuch',
        type: 'Website',
        icon: Globe,
        visitors: 125000,
        conversion: 8.5,
        avgTime: '2:45',
        bounceRate: 35.2,
        description: 'Erster Kontakt über Website'
      },
      {
        id: 'TP-002',
        name: 'Social Media',
        type: 'Social',
        icon: Users,
        visitors: 85000,
        conversion: 12.3,
        avgTime: '1:30',
        bounceRate: 28.7,
        description: 'Social Media Interaktion'
      },
      {
        id: 'TP-003',
        name: 'E-Mail Marketing',
        type: 'Email',
        icon: Mail,
        visitors: 45000,
        conversion: 15.8,
        avgTime: '3:20',
        bounceRate: 22.1,
        description: 'E-Mail Kampagnen'
      },
      {
        id: 'TP-004',
        name: 'Mobile App',
        type: 'Mobile',
        icon: Smartphone,
        visitors: 32000,
        conversion: 18.5,
        avgTime: '4:15',
        bounceRate: 18.9,
        description: 'Mobile App Nutzung'
      }
    ],
    funnels: [
      {
        stage: 'Awareness',
        visitors: 100000,
        conversion: 100,
        dropoff: 0,
        description: 'Nutzer werden auf das Angebot aufmerksam'
      },
      {
        stage: 'Interest',
        visitors: 25000,
        conversion: 25,
        dropoff: 75,
        description: 'Nutzer zeigen Interesse'
      },
      {
        stage: 'Consideration',
        visitors: 8000,
        conversion: 8,
        dropoff: 17,
        description: 'Nutzer erwägen den Kauf'
      },
      {
        stage: 'Purchase',
        visitors: 2000,
        conversion: 2,
        dropoff: 6,
        description: 'Nutzer kaufen das Produkt'
      },
      {
        stage: 'Retention',
        visitors: 1800,
        conversion: 1.8,
        dropoff: 0.2,
        description: 'Nutzer bleiben Kunden'
      }
    ],
    paths: [
      {
        id: 'PATH-001',
        name: 'Website → E-Mail → Kauf',
        steps: ['Website', 'E-Mail', 'Kauf'],
        users: 1250,
        conversion: 12.5,
        avgTime: '7 Tage',
        revenue: 37500
      },
      {
        id: 'PATH-002',
        name: 'Social Media → App → Kauf',
        steps: ['Social Media', 'App', 'Kauf'],
        users: 890,
        conversion: 8.9,
        avgTime: '3 Tage',
        revenue: 26700
      },
      {
        id: 'PATH-003',
        name: 'Direkt → Kauf',
        steps: ['Direkt', 'Kauf'],
        users: 2100,
        conversion: 21.0,
        avgTime: '1 Tag',
        revenue: 63000
      }
    ]
  };

  const getTouchpointColor = (type: string) => {
    switch (type) {
      case 'Website': return 'bg-blue-100 text-blue-800';
      case 'Social': return 'bg-pink-100 text-pink-800';
      case 'Email': return 'bg-green-100 text-green-800';
      case 'Mobile': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConversionColor = (conversion: number) => {
    if (conversion >= 15) return 'text-green-500';
    if (conversion >= 10) return 'text-yellow-500';
    return 'text-red-500';
  };

  const totalVisitors = journeyData.touchpoints.reduce((sum, tp) => sum + tp.visitors, 0);
  const avgConversion = journeyData.touchpoints.reduce((sum, tp) => sum + tp.conversion, 0) / journeyData.touchpoints.length;
  const totalRevenue = journeyData.paths.reduce((sum, path) => sum + path.revenue, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/growth/crm">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Customer Journey</h1>
                <p className="text-gray-300 mt-1">Nutzer-Pfade analysieren</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Tage</SelectItem>
                  <SelectItem value="30d">30 Tage</SelectItem>
                  <SelectItem value="90d">90 Tage</SelectItem>
                  <SelectItem value="1y">1 Jahr</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neuer Touchpoint
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
                  <p className="text-sm font-medium text-gray-400">Gesamt Besucher</p>
                  <p className="text-2xl font-bold text-white">
                    {(totalVisitors / 1000).toFixed(0)}K
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ø Konversion</p>
                  <p className="text-2xl font-bold text-green-500">
                    {avgConversion.toFixed(1)}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Touchpoints</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {journeyData.touchpoints.length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtumsatz</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {(totalRevenue / 1000).toFixed(0)}K €
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="funnel" className="data-[state=active]:bg-[#E37222]">Funnel</TabsTrigger>
            <TabsTrigger value="paths" className="data-[state=active]:bg-[#E37222]">Pfade</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Touchpoints */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Touchpoints</CardTitle>
                  <CardDescription className="text-gray-400">
                    Übersicht aller Berührungspunkte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyData.touchpoints.map((touchpoint) => (
                      <div key={touchpoint.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                            <touchpoint.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{touchpoint.name}</h4>
                            <p className="text-gray-400 text-sm">{touchpoint.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getTouchpointColor(touchpoint.type)}>
                            {touchpoint.type}
                          </Badge>
                          <p className="text-white text-sm mt-1">
                            {(touchpoint.visitors / 1000).toFixed(0)}K Besucher
                          </p>
                          <p className={`text-sm ${getConversionColor(touchpoint.conversion)}`}>
                            {touchpoint.conversion}% Konversion
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Converting Paths */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Konvertierende Pfade</CardTitle>
                  <CardDescription className="text-gray-400">
                    Erfolgreichste Nutzer-Pfade
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyData.paths.slice(0, 3).map((path) => (
                      <div key={path.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{path.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {path.users} Nutzer • {path.avgTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm font-medium">
                            {path.conversion}% Konversion
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(path.revenue / 1000).toFixed(0)}K €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Funnel Tab */}
          <TabsContent value="funnel" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Conversion Funnel</CardTitle>
                <CardDescription className="text-gray-400">
                  Schritt-für-Schritt Analyse des Nutzerverhaltens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {journeyData.funnels.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between p-6 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#E37222] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium text-lg">{stage.stage}</h4>
                            <p className="text-gray-400 text-sm">{stage.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-2xl font-bold">
                            {(stage.visitors / 1000).toFixed(0)}K
                          </p>
                          <p className="text-gray-400 text-sm">
                            {stage.conversion}% Konversion
                          </p>
                          {stage.dropoff > 0 && (
                            <p className="text-red-400 text-sm">
                              -{stage.dropoff}% Drop-off
                            </p>
                          )}
                        </div>
                      </div>
                      {index < journeyData.funnels.length - 1 && (
                        <div className="flex justify-center mt-2">
                          <div className="w-0.5 h-8 bg-gray-600"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Nutzer-Pfade</CardTitle>
                <CardDescription className="text-gray-400">
                  Detaillierte Analyse der Nutzer-Journeys
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {journeyData.paths.map((path) => (
                    <div key={path.id} className="p-6 bg-gray-700 rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-white font-medium text-lg">{path.name}</h4>
                          <p className="text-gray-400 text-sm">
                            {path.users} Nutzer • Durchschnittlich {path.avgTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-xl font-bold">
                            {path.conversion}% Konversion
                          </p>
                          <p className="text-gray-400 text-sm">
                            {(path.revenue / 1000).toFixed(0)}K € Umsatz
                          </p>
                        </div>
                      </div>
                      
                      {/* Path Steps */}
                      <div className="flex items-center gap-4 mb-4">
                        {path.steps.map((step, index) => (
                          <React.Fragment key={index}>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#E37222] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              </div>
                              <span className="text-white text-sm">{step}</span>
                            </div>
                            {index < path.steps.length - 1 && (
                              <div className="flex items-center">
                                <div className="w-8 h-0.5 bg-gray-500"></div>
                                <ArrowRight className="w-4 h-4 text-gray-500 mx-1" />
                                <div className="w-8 h-0.5 bg-gray-500"></div>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Path Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-600 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Nutzer</span>
                            <Users className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-lg font-bold">{path.users}</p>
                        </div>
                        <div className="bg-gray-600 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Konversion</span>
                            <Target className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-lg font-bold">{path.conversion}%</p>
                        </div>
                        <div className="bg-gray-600 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Umsatz</span>
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-lg font-bold">
                            {(path.revenue / 1000).toFixed(0)}K €
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
