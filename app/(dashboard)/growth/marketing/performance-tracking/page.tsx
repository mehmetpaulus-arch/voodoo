'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
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
  Megaphone,
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
  Activity
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

export default function PerformanceTrackingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Performance metrics data
  const performanceMetrics = [
    {
      id: 1,
      name: 'Website Traffic',
      value: 125000,
      change: 12.5,
      trend: 'up',
      period: '30 Tage',
      icon: Globe,
      color: 'text-blue-400'
    },
    {
      id: 2,
      name: 'Conversion Rate',
      value: 3.8,
      change: -2.1,
      trend: 'down',
      period: '30 Tage',
      icon: Target,
      color: 'text-green-400'
    },
    {
      id: 3,
      name: 'ROAS',
      value: 4.2,
      change: 8.3,
      trend: 'up',
      period: '30 Tage',
      icon: DollarSign,
      color: 'text-yellow-400'
    },
    {
      id: 4,
      name: 'Customer Acquisition Cost',
      value: 45.50,
      change: -5.2,
      trend: 'up',
      period: '30 Tage',
      icon: UserPlus,
      color: 'text-purple-400'
    }
  ];

  const campaignPerformance = [
    {
      id: 1,
      name: 'Sommer-Kampagne 2024',
      type: 'Social Media',
      impressions: 2500000,
      clicks: 125000,
      conversions: 3200,
      spend: 32000,
      revenue: 134400,
      roas: 4.2,
      ctr: 5.0,
      cpc: 0.25,
      status: 'active'
    },
    {
      id: 2,
      name: 'Black Friday Sale',
      type: 'E-Mail',
      impressions: 45000,
      clicks: 5400,
      conversions: 450,
      spend: 5000,
      revenue: 22500,
      roas: 4.5,
      ctr: 12.0,
      cpc: 0.93,
      status: 'completed'
    },
    {
      id: 3,
      name: 'Weihnachts-Kampagne',
      type: 'TV',
      impressions: 3200000,
      clicks: 160000,
      conversions: 2800,
      spend: 45000,
      revenue: 98000,
      roas: 2.2,
      ctr: 5.0,
      cpc: 0.28,
      status: 'paused'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') {
      return change > 0 ? 'text-green-400' : 'text-red-400';
    } else {
      return change > 0 ? 'text-green-400' : 'text-red-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
            <h1 className="text-2xl font-bold text-white">Performance Tracking</h1>
            <p className="text-gray-400">Kampagnen-Erfolg messen</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
              <Plus className="w-4 h-4 mr-2" />
              Neuer Report
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
              <Target className="w-4 h-4 mr-2" />
              Kampagnen
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#FA7D19]">
              <FileText className="w-4 h-4 mr-2" />
              Reports
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
              {performanceMetrics.map((metric) => {
                const Icon = metric.icon;
                const TrendIcon = getTrendIcon(metric.trend);
                const trendColor = getTrendColor(metric.trend, metric.change);
                
                return (
                  <Card key={metric.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 ${metric.color}`} />
                        <div className={`flex items-center gap-1 ${trendColor}`}>
                          <TrendIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{metric.name}</p>
                        <p className="text-2xl font-bold text-white">
                          {typeof metric.value === 'number' && metric.value > 1000 
                            ? metric.value.toLocaleString() 
                            : metric.value}
                          {metric.name === 'Conversion Rate' && '%'}
                          {metric.name === 'ROAS' && 'x'}
                          {metric.name === 'Customer Acquisition Cost' && '€'}
                        </p>
                        <p className="text-gray-400 text-xs">{metric.period}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Performance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-700 rounded">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Chart wird geladen...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Channel Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-white text-sm">Social Media</span>
                      </div>
                      <span className="text-white font-medium">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-white text-sm">E-Mail</span>
                      </div>
                      <span className="text-white font-medium">30%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-white text-sm">TV</span>
                      </div>
                      <span className="text-white font-medium">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Kampagnen Performance</span>
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
                  {campaignPerformance.map((campaign) => (
                    <div key={campaign.id} className="p-6 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
                          <h3 className="text-white font-semibold text-lg">{campaign.name}</h3>
                          <Badge variant="outline" className="text-gray-300 border-gray-500">
                            {campaign.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Impressions</p>
                          <p className="text-white font-medium">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Clicks</p>
                          <p className="text-white font-medium">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Conversions</p>
                          <p className="text-white font-medium">{campaign.conversions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Spend</p>
                          <p className="text-white font-medium">€{campaign.spend.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Revenue</p>
                          <p className="text-white font-medium">€{campaign.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">ROAS</p>
                          <p className="text-white font-medium">{campaign.roas}x</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">CTR</p>
                          <p className="text-white font-medium">{campaign.ctr}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                          CPC: €{campaign.cpc}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Teilen
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-6 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Performance Reports</span>
                  <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                    <Plus className="w-4 h-4 mr-2" />
                    Neuer Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Monatlicher Performance Report', date: '2024-01-15', type: 'Monthly' },
                    { name: 'Kampagnen-Übersicht Q4', date: '2023-12-31', type: 'Quarterly' },
                    { name: 'Social Media Performance', date: '2024-01-10', type: 'Weekly' },
                    { name: 'E-Mail Marketing Report', date: '2024-01-08', type: 'Weekly' },
                    { name: 'ROI Analyse 2023', date: '2023-12-31', type: 'Yearly' },
                    { name: 'Conversion Funnel Report', date: '2024-01-05', type: 'Monthly' }
                  ].map((report, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-medium">{report.name}</h4>
                          <p className="text-gray-400 text-sm">{report.date}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-gray-300 border-gray-500">
                            {report.type}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
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
                      <span className="text-gray-300">Durchschnittlicher ROAS</span>
                      <span className="text-white font-semibold">3.6x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittlicher CTR</span>
                      <span className="text-white font-semibold">7.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Durchschnittlicher CPC</span>
                      <span className="text-white font-semibold">€0.49</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Gesamt Conversions</span>
                      <span className="text-white font-semibold">6,450</span>
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
                    {campaignPerformance.sort((a, b) => b.roas - a.roas).map((campaign, index) => (
                      <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">#{index + 1}</span>
                          <span className="text-white text-sm">{campaign.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm font-medium">{campaign.roas}x ROAS</span>
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

