'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Key,
  User,
  Globe,
  FileText,
  Settings,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SecurityPage() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for security
  const securityData = {
    threats: [
      {
        id: 'THR-001',
        type: 'Malware',
        severity: 'high',
        source: '192.168.1.100',
        target: 'Web-Server-01',
        status: 'blocked',
        detected: '2024-06-15 14:30',
        description: 'Verdächtige Datei erkannt'
      },
      {
        id: 'THR-002',
        type: 'Brute Force',
        severity: 'medium',
        source: '203.0.113.45',
        target: 'SSH-Service',
        status: 'monitoring',
        detected: '2024-06-15 13:15',
        description: 'Mehrere fehlgeschlagene Login-Versuche'
      },
      {
        id: 'THR-003',
        type: 'Phishing',
        severity: 'low',
        source: 'E-Mail',
        target: 'User-Accounts',
        status: 'resolved',
        detected: '2024-06-15 10:45',
        description: 'Verdächtige E-Mail erkannt'
      }
    ],
    users: [
      {
        id: 'USR-001',
        name: 'Dr. Sarah Weber',
        role: 'Admin',
        lastLogin: '2024-06-15 09:30',
        status: 'active',
        permissions: ['read', 'write', 'admin']
      },
      {
        id: 'USR-002',
        name: 'Tom Müller',
        role: 'User',
        lastLogin: '2024-06-15 08:15',
        status: 'active',
        permissions: ['read', 'write']
      },
      {
        id: 'USR-003',
        name: 'Anna Schmidt',
        role: 'User',
        lastLogin: '2024-06-14 16:20',
        status: 'inactive',
        permissions: ['read']
      }
    ],
    policies: [
      {
        id: 'POL-001',
        name: 'Passwort-Richtlinie',
        status: 'active',
        lastUpdated: '2024-06-01',
        description: 'Mindestlänge 8 Zeichen, Sonderzeichen erforderlich'
      },
      {
        id: 'POL-002',
        name: 'Zwei-Faktor-Authentifizierung',
        status: 'active',
        lastUpdated: '2024-05-15',
        description: 'TOTP für alle Admin-Accounts'
      },
      {
        id: 'POL-003',
        name: 'VPN-Zugang',
        status: 'active',
        lastUpdated: '2024-04-20',
        description: 'VPN nur für autorisierte Benutzer'
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'Hoch';
      case 'medium': return 'Mittel';
      case 'low': return 'Niedrig';
      default: return 'Unbekannt';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'inactive': return 'Inaktiv';
      case 'blocked': return 'Blockiert';
      case 'monitoring': return 'Überwacht';
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
                <h1 className="text-3xl font-bold text-white">IT-Security</h1>
                <p className="text-gray-300 mt-1">Sicherheit und Datenschutz</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Richtlinie
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Aktive Bedrohungen</p>
                  <p className="text-2xl font-bold text-red-500">
                    {securityData.threats.filter(t => t.status === 'monitoring').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Blockierte Angriffe</p>
                  <p className="text-2xl font-bold text-green-500">
                    {securityData.threats.filter(t => t.status === 'blocked').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Aktive Benutzer</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {securityData.users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <User className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Sicherheitsrichtlinien</p>
                  <p className="text-2xl font-bold text-white">
                    {securityData.policies.length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-[#E37222]">Bedrohungen</TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#E37222]">Benutzer</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Threats */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Letzte Bedrohungen</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktuelle Sicherheitsereignisse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData.threats.slice(0, 3).map((threat) => (
                      <div key={threat.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{threat.type}</h4>
                            <p className="text-gray-400 text-sm">{threat.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {getSeverityText(threat.severity)}
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(threat.detected).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Policies */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Sicherheitsrichtlinien</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktive Sicherheitsrichtlinien
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityData.policies.map((policy) => (
                      <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">{policy.name}</h4>
                          <p className="text-gray-400 text-sm">{policy.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(policy.status)}>
                            {getStatusText(policy.status)}
                          </Badge>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(policy.lastUpdated).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Threats Tab */}
          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Sicherheitsbedrohungen</CardTitle>
                <CardDescription className="text-gray-400">
                  Übersicht aller erkannten Bedrohungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityData.threats.map((threat) => (
                    <div key={threat.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{threat.id}</h4>
                          <p className="text-gray-400 text-sm">{threat.type}</p>
                          <p className="text-gray-400 text-sm">{threat.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {getSeverityText(threat.severity)}
                          </Badge>
                          <Badge className={getStatusColor(threat.status)}>
                            {getStatusText(threat.status)}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Quelle: {threat.source}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Ziel: {threat.target}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Benutzer-Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Übersicht aller Benutzer und Berechtigungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityData.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{user.name}</h4>
                          <p className="text-gray-400 text-sm">{user.role}</p>
                          <p className="text-gray-400 text-sm">
                            Letzter Login: {new Date(user.lastLogin).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {user.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="border-gray-500 text-gray-300 text-xs">
                              {permission}
                            </Badge>
                          ))}
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
