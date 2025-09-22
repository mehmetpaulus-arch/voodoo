'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ROIAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for ROI analysis
  const roiData = {
    overallROI: 15.2,
    totalInvestment: 8500000,
    totalReturn: 12920000,
    netProfit: 4420000,
    campaigns: [
      {
        id: 1,
        name: 'Wahl 2025 Kampagne',
        investment: 2500000,
        return: 3200000,
        roi: 28.0,
        status: 'active',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        category: 'Marketing'
      },
      {
        id: 2,
        name: 'Digital Transformation',
        investment: 1800000,
        return: 2100000,
        roi: 16.7,
        status: 'completed',
        startDate: '2023-06-01',
        endDate: '2024-05-31',
        category: 'IT'
      },
      {
        id: 3,
        name: 'Content Production Upgrade',
        investment: 1200000,
        return: 1350000,
        roi: 12.5,
        status: 'active',
        startDate: '2024-03-01',
        endDate: '2024-11-30',
        category: 'Produktion'
      },
      {
        id: 4,
        name: 'HR Digitalisierung',
        investment: 800000,
        return: 950000,
        roi: 18.8,
        status: 'completed',
        startDate: '2023-09-01',
        endDate: '2024-08-31',
        category: 'HR'
      }
    ],
    categories: [
      { name: 'Marketing', roi: 28.0, investment: 2500000, return: 3200000 },
      { name: 'IT', roi: 16.7, investment: 1800000, return: 2100000 },
      { name: 'Produktion', roi: 12.5, investment: 1200000, return: 1350000 },
      { name: 'HR', roi: 18.8, investment: 800000, return: 950000 }
    ]
  };

  const getROIColor = (roi: number) => {
    if (roi >= 20) return 'text-green-500';
    if (roi >= 10) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getROIIcon = (roi: number) => {
    if (roi >= 15) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'completed': return 'Abgeschlossen';
      case 'paused': return 'Pausiert';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/operations/finanzen">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">ROI Analysis</h1>
                <p className="text-gray-300 mt-1">Return on Investment messen und analysieren</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt ROI</p>
                  <p className={`text-2xl font-bold ${getROIColor(roiData.overallROI)}`}>
                    {roiData.overallROI}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtinvestition</p>
                  <p className="text-2xl font-bold text-white">
                    {(roiData.totalInvestment / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtrückgabe</p>
                  <p className="text-2xl font-bold text-white">
                    {(roiData.totalReturn / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Netto-Gewinn</p>
                  <p className="text-2xl font-bold text-green-500">
                    {(roiData.netProfit / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#E37222]">Kampagnen</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-[#E37222]">Kategorien</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#E37222]">Trends</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="space-y-6">
              {roiData.campaigns.map((campaign) => (
                <Card key={campaign.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">{campaign.name}</CardTitle>
                        <CardDescription className="text-gray-400 mt-1">
                          {campaign.category} • {new Date(campaign.startDate).toLocaleDateString('de-DE')} - {new Date(campaign.endDate).toLocaleDateString('de-DE')}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(campaign.status)}>
                          {getStatusText(campaign.status)}
                        </Badge>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getROIColor(campaign.roi)}`}>
                            {campaign.roi}%
                          </p>
                          <div className="flex items-center gap-1">
                            {getROIIcon(campaign.roi)}
                            <span className="text-sm text-gray-400">ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Investition</span>
                          <DollarSign className="w-4 h-4 text-red-400" />
                        </div>
                        <p className="text-white text-xl font-bold">
                          {(campaign.investment / 1000000).toFixed(1)}M €
                        </p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Rückgabe</span>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <p className="text-white text-xl font-bold">
                          {(campaign.return / 1000000).toFixed(1)}M €
                        </p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400 text-sm">Gewinn</span>
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-white text-xl font-bold">
                          {((campaign.return - campaign.investment) / 1000000).toFixed(1)}M €
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analyse
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roiData.categories.map((category, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getROIColor(category.roi)}`}>
                          {category.roi}%
                        </p>
                        <div className="flex items-center gap-1">
                          {getROIIcon(category.roi)}
                          <span className="text-sm text-gray-400">ROI</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Investition</p>
                          <p className="text-white font-bold">
                            {(category.investment / 1000000).toFixed(1)}M €
                          </p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Rückgabe</p>
                          <p className="text-white font-bold">
                            {(category.return / 1000000).toFixed(1)}M €
                          </p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#E37222] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(category.roi * 2, 100)}%` }}
                        ></div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300">
                          <PieChart className="w-4 h-4 mr-2" />
                          Analyse
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">ROI-Trends</CardTitle>
                <CardDescription className="text-gray-400">
                  Entwicklung der ROI-Kennzahlen über Zeit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Beste Performance</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-white text-lg font-bold">Wahl 2025 Kampagne</p>
                      <p className="text-green-500 font-bold">28.0% ROI</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Höchste Investition</span>
                        <DollarSign className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-white text-lg font-bold">Wahl 2025 Kampagne</p>
                      <p className="text-blue-500 font-bold">2.5M €</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Schnellste Amortisation</span>
                        <CheckCircle className="w-4 h-4 text-yellow-500" />
                      </div>
                      <p className="text-white text-lg font-bold">HR Digitalisierung</p>
                      <p className="text-yellow-500 font-bold">8 Monate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
