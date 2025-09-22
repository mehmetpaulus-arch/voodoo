'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BarChart3,
  Download,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Target,
  Eye,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FinancialReportingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedReport, setSelectedReport] = useState('monthly');

  // Mock data for financial reports
  const reportData = {
    monthly: {
      title: 'Monatlicher Finanzbericht',
      period: 'Juni 2024',
      revenue: 1200000,
      expenses: 850000,
      profit: 350000,
      growth: 8.3
    },
    quarterly: {
      title: 'Quartalsbericht',
      period: 'Q2 2024',
      revenue: 3600000,
      expenses: 2500000,
      profit: 1100000,
      growth: 12.5
    },
    yearly: {
      title: 'Jahresbericht',
      period: '2024',
      revenue: 12500000,
      expenses: 8500000,
      profit: 4000000,
      growth: 15.2
    }
  };

  const reports = [
    {
      id: 'monthly-report',
      name: 'Monatlicher Bericht',
      type: 'monthly',
      lastGenerated: '2024-06-30',
      status: 'ready'
    },
    {
      id: 'quarterly-report',
      name: 'Quartalsbericht',
      type: 'quarterly',
      lastGenerated: '2024-06-30',
      status: 'ready'
    },
    {
      id: 'yearly-report',
      name: 'Jahresbericht',
      type: 'yearly',
      lastGenerated: '2024-06-30',
      status: 'ready'
    },
    {
      id: 'budget-report',
      name: 'Budget-Analyse',
      type: 'budget',
      lastGenerated: '2024-06-25',
      status: 'ready'
    },
    {
      id: 'cashflow-report',
      name: 'Cashflow-Bericht',
      type: 'cashflow',
      lastGenerated: '2024-06-28',
      status: 'ready'
    },
    {
      id: 'kpi-report',
      name: 'KPI-Dashboard',
      type: 'kpi',
      lastGenerated: '2024-06-29',
      status: 'ready'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'Bereit';
      case 'generating': return 'Wird erstellt';
      case 'error': return 'Fehler';
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
                <h1 className="text-3xl font-bold text-white">Financial Reporting</h1>
                <p className="text-gray-300 mt-1">Finanzberichte und Analysen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Alle Exportieren
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <FileText className="w-4 h-4 mr-2" />
                Neuer Bericht
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#E37222]">Berichte</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#E37222]">Analysen</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Umsatz</p>
                      <p className="text-2xl font-bold text-white">
                        {(reportData.monthly.revenue / 1000000).toFixed(1)}M €
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
                      <p className="text-sm font-medium text-gray-400">Ausgaben</p>
                      <p className="text-2xl font-bold text-white">
                        {(reportData.monthly.expenses / 1000000).toFixed(1)}M €
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
                      <p className="text-sm font-medium text-gray-400">Gewinn</p>
                      <p className="text-2xl font-bold text-white">
                        {(reportData.monthly.profit / 1000000).toFixed(1)}M €
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
                      <p className="text-sm font-medium text-gray-400">Wachstum</p>
                      <p className="text-2xl font-bold text-white">
                        +{reportData.monthly.growth}%
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Reports */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Schnellberichte</CardTitle>
                <CardDescription className="text-gray-400">
                  Häufig verwendete Berichte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Monatlicher Bericht</h4>
                      <BarChart3 className="w-5 h-5 text-[#E37222]" />
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Juni 2024</p>
                    <Button size="sm" className="w-full bg-[#E37222] hover:bg-[#D16212]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Quartalsbericht</h4>
                      <PieChart className="w-5 h-5 text-[#E37222]" />
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Q2 2024</p>
                    <Button size="sm" className="w-full bg-[#E37222] hover:bg-[#D16212]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">Jahresbericht</h4>
                      <FileText className="w-5 h-5 text-[#E37222]" />
                    </div>
                    <p className="text-gray-400 text-sm mb-3">2024</p>
                    <Button size="sm" className="w-full bg-[#E37222] hover:bg-[#D16212]">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Verfügbare Berichte</CardTitle>
                <CardDescription className="text-gray-400">
                  Alle generierten und verfügbaren Finanzberichte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{report.name}</h4>
                          <p className="text-gray-400 text-sm">
                            Letzte Generierung: {new Date(report.lastGenerated).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusText(report.status)}
                        </Badge>
                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                          <Eye className="w-4 h-4 mr-2" />
                          Ansehen
                        </Button>
                        <Button size="sm" className="bg-[#E37222] hover:bg-[#D16212]">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Trend-Analyse</CardTitle>
                  <CardDescription className="text-gray-400">
                    Entwicklung der Finanzkennzahlen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Umsatz-Wachstum</span>
                      <span className="text-green-500 font-bold">+8.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Kosten-Reduktion</span>
                      <span className="text-green-500 font-bold">-2.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Gewinn-Marge</span>
                      <span className="text-blue-500 font-bold">29.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Benchmarking</CardTitle>
                  <CardDescription className="text-gray-400">
                    Vergleich mit Branchenstandards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">ROI</span>
                      <span className="text-green-500 font-bold">15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Liquidität</span>
                      <span className="text-yellow-500 font-bold">2.1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Verschuldung</span>
                      <span className="text-green-500 font-bold">0.3</span>
                    </div>
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
