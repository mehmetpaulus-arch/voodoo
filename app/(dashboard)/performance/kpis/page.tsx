'use client';

import React from 'react';
import { 
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  PlayCircle,
  Eye,
  Clock,
  Share2,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const kpiData = [
  {
    title: 'Tägliche Nutzer',
    value: '2.4M',
    change: '+12.5%',
    trend: 'up',
    description: 'Eindeutige Besucher pro Tag'
  },
  {
    title: 'Durchschnittliche Verweildauer',
    value: '8:42',
    change: '+2.1%',
    trend: 'up',
    description: 'Zeit pro Session'
  },
  {
    title: 'Video-Completion Rate',
    value: '78.3%',
    change: '-1.2%',
    trend: 'down',
    description: 'Videos bis zum Ende angesehen'
  },
  {
    title: 'Social Shares',
    value: '45.2K',
    change: '+18.7%',
    trend: 'up',
    description: 'Geteilte Inhalte pro Tag'
  },
  {
    title: 'Mediathek Downloads',
    value: '156K',
    change: '+5.4%',
    trend: 'up',
    description: 'Heruntergeladene Videos'
  },
  {
    title: 'Live-Stream Zuschauer',
    value: '892K',
    change: '+8.9%',
    trend: 'up',
    description: 'Gleichzeitige Live-Zuschauer'
  }
];

export default function KpisPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/performance">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Performance
          </Button>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-12 py-16 px-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100">
            <Target className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Key Performance Indicators
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Wichtige Kennzahlen und Leistungsindikatoren für ZDF-Content im Überblick.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="bg-white shadow-lg border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      {kpi.title.includes('Nutzer') && <Users className="w-6 h-6 text-blue-600" />}
                      {kpi.title.includes('Verweildauer') && <Clock className="w-6 h-6 text-blue-600" />}
                      {kpi.title.includes('Video') && <PlayCircle className="w-6 h-6 text-blue-600" />}
                      {kpi.title.includes('Shares') && <Share2 className="w-6 h-6 text-blue-600" />}
                      {kpi.title.includes('Downloads') && <Eye className="w-6 h-6 text-blue-600" />}
                      {kpi.title.includes('Stream') && <PlayCircle className="w-6 h-6 text-blue-600" />}
                    </div>
                    <div className={`flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{kpi.change}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                    <h4 className="font-semibold text-gray-700">{kpi.title}</h4>
                    <p className="text-sm text-gray-600">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional KPI Details */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">KPI-Details</CardTitle>
              <CardDescription className="text-gray-600">
                Detaillierte Aufschlüsselung der wichtigsten Kennzahlen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Audience Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desktop</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mobile</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tablet</span>
                      <span className="font-medium">7%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Content Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nachrichten</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dokumentationen</span>
                      <span className="font-medium">31%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sport</span>
                      <span className="font-medium">27%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}