'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Monitor,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MonitoringPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for monitoring
  const monitoringData = {
    alerts: [
      {
        id: 'ALT-001',
        type: 'CPU High',
        severity: 'warning',
        message: 'CPU-Auslastung über 90%',
        source: 'Web-Server-01',
        timestamp: '2024-06-15 14:30',
        status: 'active'
      },
      {
        id: 'ALT-002',
        type: 'Disk Space',
        severity: 'critical',
        message: 'Festplatte zu 95% voll',
        source: 'DB-Server-01',
        timestamp: '2024-06-15 13:15',
        status: 'active'
      },
      {
        id: 'ALT-003',
        type: 'Network',
        severity: 'info',
        message: 'Netzwerk-Verbindung wiederhergestellt',
        source: 'App-Server-01',
        timestamp: '2024-06-15 12:45',
        status: 'resolved'
      }
    ],
    metrics: {
      cpu: 78,
      memory: 65,
      disk: 45,
      network: 23
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Kritisch';
      case 'warning': return 'Warnung';
      case 'info': return 'Info';
      default: return 'Unbekannt';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'resolved': return 'Gelöst';
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
              <Link href="/operations/it">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">System Monitoring</h1>
                <p className="text-gray-300 mt-1">Überwachung und Alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Settings className="w-4 h-4 mr-2" />
                Einstellungen
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Eye className="w-4 h-4 mr-2" />
                Live View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">CPU-Auslastung</p>
                  <p className="text-2xl font-bold text-white">{monitoringData.metrics.cpu}%</p>
                </div>
                <Cpu className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">RAM-Auslastung</p>
                  <p className="text-2xl font-bold text-white">{monitoringData.metrics.memory}%</p>
                </div>
                <MemoryStick className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Festplatte</p>
                  <p className="text-2xl font-bold text-white">{monitoringData.metrics.disk}%</p>
                </div>
                <HardDrive className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Netzwerk</p>
                  <p className="text-2xl font-bold text-white">{monitoringData.metrics.network}%</p>
                </div>
                <Wifi className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-[#E37222]">Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Status */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">System-Status</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktuelle System-Metriken
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">CPU</span>
                        <span className="text-white">{monitoringData.metrics.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${monitoringData.metrics.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">RAM</span>
                        <span className="text-white">{monitoringData.metrics.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${monitoringData.metrics.memory}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Festplatte</span>
                        <span className="text-white">{monitoringData.metrics.disk}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${monitoringData.metrics.disk}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Netzwerk</span>
                        <span className="text-white">{monitoringData.metrics.network}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${monitoringData.metrics.network}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Letzte Alerts</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktuelle System-Warnungen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monitoringData.alerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{alert.type}</h4>
                            <p className="text-gray-400 text-sm">{alert.message}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {getSeverityText(alert.severity)}
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(alert.timestamp).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">System-Alerts</CardTitle>
                <CardDescription className="text-gray-400">
                  Übersicht aller System-Warnungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringData.alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{alert.id}</h4>
                          <p className="text-gray-400 text-sm">{alert.type}</p>
                          <p className="text-gray-400 text-sm">{alert.message}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {getSeverityText(alert.severity)}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {getStatusText(alert.status)}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Quelle: {alert.source}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {new Date(alert.timestamp).toLocaleDateString('de-DE')}
                        </p>
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
