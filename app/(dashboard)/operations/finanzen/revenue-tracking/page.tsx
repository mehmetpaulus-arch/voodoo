'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RevenueTrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedSource, setSelectedSource] = useState('all');

  // Mock data for revenue tracking
  const revenueData = {
    totalRevenue: 12500000,
    monthlyGrowth: 8.3,
    targetRevenue: 15000000,
    sources: [
      { name: 'TV-Werbung', amount: 6500000, percentage: 52.0, growth: 12.5, color: '#E37222' },
      { name: 'Digital Marketing', amount: 3200000, percentage: 25.6, growth: 18.2, color: '#3B82F6' },
      { name: 'Sponsoring', amount: 1800000, percentage: 14.4, growth: 5.8, color: '#10B981' },
      { name: 'Lizenzierung', amount: 1000000, percentage: 8.0, growth: -2.1, color: '#8B5CF6' }
    ],
    monthlyRevenue: [
      { month: 'Jan', revenue: 950000, target: 1000000, growth: 5.2 },
      { month: 'Feb', revenue: 1020000, target: 1000000, growth: 7.4 },
      { month: 'Mär', revenue: 1100000, target: 1000000, growth: 7.8 },
      { month: 'Apr', revenue: 980000, target: 1000000, growth: -10.9 },
      { month: 'Mai', revenue: 1150000, target: 1000000, growth: 17.3 },
      { month: 'Jun', revenue: 1200000, target: 1000000, growth: 4.3 }
    ],
    topClients: [
      { name: 'BMW Group', revenue: 850000, contracts: 3, growth: 15.2, status: 'active' },
      { name: 'Siemens AG', revenue: 720000, contracts: 2, growth: 8.7, status: 'active' },
      { name: 'Deutsche Bank', revenue: 650000, contracts: 4, growth: -3.2, status: 'active' },
      { name: 'Mercedes-Benz', revenue: 580000, contracts: 2, growth: 22.1, status: 'active' },
      { name: 'SAP SE', revenue: 520000, contracts: 1, growth: 12.8, status: 'active' }
    ]
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <h1 className="text-3xl font-bold text-white">Revenue Tracking</h1>
                <p className="text-gray-300 mt-1">Einnahmen-Verfolgung und Analyse</p>
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
                  <p className="text-sm font-medium text-gray-400">Gesamteinnahmen</p>
                  <p className="text-2xl font-bold text-white">
                    {(revenueData.totalRevenue / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monatliches Wachstum</p>
                  <p className={`text-2xl font-bold ${getGrowthColor(revenueData.monthlyGrowth)}`}>
                    +{revenueData.monthlyGrowth}%
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
                  <p className="text-sm font-medium text-gray-400">Ziel-Einnahmen</p>
                  <p className="text-2xl font-bold text-white">
                    {(revenueData.targetRevenue / 1000000).toFixed(1)}M €
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
                  <p className="text-sm font-medium text-gray-400">Ziel-Erreichung</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {((revenueData.totalRevenue / revenueData.targetRevenue) * 100).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-[#E37222]">Einnahmequellen</TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-[#E37222]">Top Kunden</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Sources */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Einnahmequellen</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aufschlüsselung nach Quellen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: source.color }}
                          ></div>
                          <span className="text-white font-medium">{source.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {(source.amount / 1000000).toFixed(1)}M €
                          </p>
                          <div className="flex items-center gap-1">
                            {getGrowthIcon(source.growth)}
                            <p className={`text-sm ${getGrowthColor(source.growth)}`}>
                              {source.growth > 0 ? '+' : ''}{source.growth}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Performance */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Monatliche Performance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Einnahmen vs. Ziel 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.monthlyRevenue.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">{month.month}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-white">
                              {(month.revenue / 1000).toFixed(0)}K €
                            </span>
                            <div className="flex items-center gap-1">
                              {getGrowthIcon(month.growth)}
                              <span className={`text-xs ${getGrowthColor(month.growth)}`}>
                                {month.growth > 0 ? '+' : ''}{month.growth}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${month.revenue >= month.target ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${Math.min((month.revenue / month.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Ziel: {(month.target / 1000).toFixed(0)}K €
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {revenueData.sources.map((source, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{source.name}</CardTitle>
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: source.color }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white">
                          {(source.amount / 1000000).toFixed(1)}M €
                        </p>
                        <p className="text-gray-400">{source.percentage}% vom Gesamtumsatz</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Wachstum</span>
                        <div className="flex items-center gap-1">
                          {getGrowthIcon(source.growth)}
                          <span className={`text-sm font-medium ${getGrowthColor(source.growth)}`}>
                            {source.growth > 0 ? '+' : ''}{source.growth}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            backgroundColor: source.color,
                            width: `${source.percentage}%`
                          }}
                        ></div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Analyse
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Kunden</CardTitle>
                <CardDescription className="text-gray-400">
                  Größte Einnahmequellen nach Kunden
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.topClients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{client.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Badge className={getStatusColor(client.status)}>
                              {client.status}
                            </Badge>
                            <span>{client.contracts} Verträge</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {(client.revenue / 1000).toFixed(0)}K €
                        </p>
                        <div className="flex items-center gap-1">
                          {getGrowthIcon(client.growth)}
                          <span className={`text-sm ${getGrowthColor(client.growth)}`}>
                            {client.growth > 0 ? '+' : ''}{client.growth}%
                          </span>
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
