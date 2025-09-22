'use client';

import React from 'react';
import { 
  Server,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Zap,
  Database,
  Globe,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const systemServices = [
  {
    name: 'ZDF Assistant API',
    status: 'operational',
    uptime: '99.9%',
    responseTime: '120ms',
    lastIncident: 'Keine Vorfälle in den letzten 30 Tagen'
  },
  {
    name: 'Transkriptions-Service',
    status: 'operational',
    uptime: '99.7%',
    responseTime: '2.3s',
    lastIncident: 'Keine Vorfälle in den letzten 30 Tagen'
  },
  {
    name: 'Factchecking API',
    status: 'degraded',
    uptime: '98.2%',
    responseTime: '5.1s',
    lastIncident: 'Langsamere Antwortzeiten - 15. Jan 2025'
  },
  {
    name: 'Content Database',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '45ms',
    lastIncident: 'Keine Vorfälle in den letzten 30 Tagen'
  },
  {
    name: 'Media Storage',
    status: 'operational',
    uptime: '99.8%',
    responseTime: '200ms',
    lastIncident: 'Keine Vorfälle in den letzten 30 Tagen'
  },
  {
    name: 'Authentication Service',
    status: 'maintenance',
    uptime: '99.5%',
    responseTime: 'N/A',
    lastIncident: 'Geplante Wartung - 27. Jan 2025, 02:00-04:00'
  }
];

const recentIncidents = [
  {
    id: 1,
    title: 'Factchecking API Performance Issues',
    status: 'investigating',
    severity: 'minor',
    startTime: '27. Jan 2025, 14:30',
    description: 'Wir untersuchen langsamere Antwortzeiten beim Factchecking Service.',
    updates: [
      {
        time: '15:45',
        message: 'Problem identifiziert: Hohe Last auf externen APIs. Implementierung von Caching läuft.'
      },
      {
        time: '14:30',
        message: 'Erste Berichte über langsamere Antwortzeiten erhalten. Untersuchung läuft.'
      }
    ]
  },
  {
    id: 2,
    title: 'Geplante Wartung - Authentication Service',
    status: 'scheduled',
    severity: 'maintenance',
    startTime: '28. Jan 2025, 02:00',
    description: 'Routinemäßige Wartung des Authentication Service. Kurze Unterbrechungen möglich.',
    updates: [
      {
        time: '26. Jan',
        message: 'Wartungsfenster bestätigt: 28. Jan 2025, 02:00-04:00 Uhr'
      }
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'degraded':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'outage':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'maintenance':
      return <Clock className="w-5 h-5 text-blue-500" />;
    default:
      return <Server className="w-5 h-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'bg-green-100 text-green-800';
    case 'degraded':
      return 'bg-yellow-100 text-yellow-800';
    case 'outage':
      return 'bg-red-100 text-red-800';
    case 'maintenance':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'major':
      return 'bg-orange-100 text-orange-800';
    case 'minor':
      return 'bg-yellow-100 text-yellow-800';
    case 'maintenance':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function SystemstatusPage() {
  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/changelog">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Changelog
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
          <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
            <Server className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Systemstatus
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Aktuelle Verfügbarkeit und Performance aller ZDF Assistant Services.
        </p>
        
        {/* Overall Status */}
        <div className="mt-8 inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-6 py-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <span className="text-green-800 font-semibold text-lg">Alle Systeme betriebsbereit</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Services Status */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                Service Status
              </CardTitle>
              <CardDescription className="text-gray-600">
                Aktuelle Verfügbarkeit aller ZDF Assistant Services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.lastIncident}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Uptime</div>
                        <div className="font-semibold text-gray-900">{service.uptime}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Response Time</div>
                        <div className="font-semibold text-gray-900">{service.responseTime}</div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status === 'operational' ? 'Betriebsbereit' :
                         service.status === 'degraded' ? 'Eingeschränkt' :
                         service.status === 'outage' ? 'Ausfall' :
                         service.status === 'maintenance' ? 'Wartung' : service.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Aktuelle Vorfälle
              </CardTitle>
              <CardDescription className="text-gray-600">
                Laufende und kürzlich behobene Probleme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{incident.title}</h4>
                        <p className="text-gray-600 mt-1">{incident.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Beginn: {incident.startTime}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity === 'critical' ? 'Kritisch' :
                           incident.severity === 'major' ? 'Schwerwiegend' :
                           incident.severity === 'minor' ? 'Geringfügig' :
                           incident.severity === 'maintenance' ? 'Wartung' : incident.severity}
                        </Badge>
                        <Badge variant="outline">
                          {incident.status === 'investigating' ? 'Wird untersucht' :
                           incident.status === 'identified' ? 'Identifiziert' :
                           incident.status === 'monitoring' ? 'Wird überwacht' :
                           incident.status === 'resolved' ? 'Behoben' :
                           incident.status === 'scheduled' ? 'Geplant' : incident.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Updates */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900">Updates:</h5>
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex gap-3 text-sm">
                          <span className="text-gray-500 font-mono">{update.time}</span>
                          <span className="text-gray-700">{update.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Durchschnittliche Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">247ms</div>
                <p className="text-sm text-gray-600 mt-1">Letzte 24 Stunden</p>
                <div className="mt-3 text-sm text-green-600">↓ 12% besser als gestern</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                  <Database className="w-5 h-5 text-blue-600" />
                  Durchschnittliche Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">99.7%</div>
                <p className="text-sm text-gray-600 mt-1">Letzte 30 Tage</p>
                <div className="mt-3 text-sm text-green-600">↑ 0.2% besser als letzter Monat</div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                  <Globe className="w-5 h-5 text-green-600" />
                  API Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">2.4M</div>
                <p className="text-sm text-gray-600 mt-1">Letzte 24 Stunden</p>
                <div className="mt-3 text-sm text-blue-600">↑ 8% mehr als gestern</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}