'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function KostenanalysePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for cost analysis
  const costData = {
    totalCosts: 8500000,
    monthlyTrend: 5.2,
    categories: [
      { name: 'Personalkosten', amount: 4500000, percentage: 52.9, trend: 3.1, color: '#E37222' },
      { name: 'Produktion', amount: 1800000, percentage: 21.2, trend: -2.3, color: '#3B82F6' },
      { name: 'Marketing', amount: 1200000, percentage: 14.1, trend: 8.7, color: '#10B981' },
      { name: 'IT & Technik', amount: 600000, percentage: 7.1, trend: 12.4, color: '#8B5CF6' },
      { name: 'Verwaltung', amount: 400000, percentage: 4.7, trend: -1.2, color: '#F59E0B' }
    ],
    monthlyCosts: [
      { month: 'Jan', amount: 680000, budget: 700000 },
      { month: 'Feb', amount: 720000, budget: 700000 },
      { month: 'Mär', amount: 750000, budget: 700000 },
      { month: 'Apr', amount: 690000, budget: 700000 },
      { month: 'Mai', amount: 780000, budget: 700000 },
      { month: 'Jun', amount: 820000, budget: 700000 }
    ],
    topExpenses: [
      { description: 'Gehälter Q2 2024', amount: 1200000, category: 'Personalkosten', date: '2024-06-15' },
      { description: 'TV-Produktion Wahl 2025', amount: 450000, category: 'Produktion', date: '2024-06-10' },
      { description: 'Server-Upgrade', amount: 180000, category: 'IT & Technik', date: '2024-06-08' },
      { description: 'Social Media Kampagne', amount: 120000, category: 'Marketing', date: '2024-06-05' },
      { description: 'Büroausstattung', amount: 85000, category: 'Verwaltung', date: '2024-06-03' }
    ]
  };

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? <TrendingUp className="w-4 h-4 text-red-500" /> : <TrendingDown className="w-4 h-4 text-green-500" />;
  };

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-red-500' : 'text-green-500';
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
                <h1 className="text-3xl font-bold text-white">Kostenanalyse</h1>
                <p className="text-gray-300 mt-1">Ausgaben-Tracking und Optimierung</p>
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
                  <p className="text-sm font-medium text-gray-400">Gesamtkosten</p>
                  <p className="text-2xl font-bold text-white">
                    {(costData.totalCosts / 1000000).toFixed(1)}M €
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
                  <p className="text-sm font-medium text-gray-400">Monatlicher Trend</p>
                  <p className={`text-2xl font-bold ${getTrendColor(costData.monthlyTrend)}`}>
                    {costData.monthlyTrend > 0 ? '+' : ''}{costData.monthlyTrend}%
                  </p>
                </div>
                {getTrendIcon(costData.monthlyTrend)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Über Budget</p>
                  <p className="text-2xl font-bold text-red-500">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Einsparungen</p>
                  <p className="text-2xl font-bold text-green-500">2.3M €</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-[#E37222]">Kategorien</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-[#E37222]">Ausgaben</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Distribution */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Kostenverteilung</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aufschlüsselung nach Kategorien
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costData.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-white font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {(category.amount / 1000000).toFixed(1)}M €
                          </p>
                          <p className="text-gray-400 text-sm">{category.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Monatlicher Trend</CardTitle>
                  <CardDescription className="text-gray-400">
                    Kosten vs. Budget 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costData.monthlyCosts.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">{month.month}</span>
                          <span className="text-white">
                            {(month.amount / 1000).toFixed(0)}K € / {(month.budget / 1000).toFixed(0)}K €
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${month.amount > month.budget ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((month.amount / month.budget) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costData.categories.map((category, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-white">
                          {(category.amount / 1000000).toFixed(1)}M €
                        </p>
                        <p className="text-gray-400">{category.percentage}% vom Gesamtbudget</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Trend</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(category.trend)}
                          <span className={`text-sm font-medium ${getTrendColor(category.trend)}`}>
                            {category.trend > 0 ? '+' : ''}{category.trend}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            backgroundColor: category.color,
                            width: `${category.percentage}%`
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

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Ausgaben</CardTitle>
                <CardDescription className="text-gray-400">
                  Größte Ausgaben der letzten 30 Tage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costData.topExpenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{expense.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Badge variant="outline" className="border-gray-500 text-gray-300">
                              {expense.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(expense.date).toLocaleDateString('de-DE')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {(expense.amount / 1000).toFixed(0)}K €
                        </p>
                        <Button size="sm" variant="ghost" className="text-gray-400">
                          <Eye className="w-4 h-4" />
                        </Button>
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
