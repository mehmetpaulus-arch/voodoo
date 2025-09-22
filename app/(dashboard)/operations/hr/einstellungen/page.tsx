'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Building,
  Clock,
  DollarSign,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  User,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Star,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Users,
  BookOpen,
  MessageSquare,
  Send,
  Archive,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Timer,
  Play,
  Pause,
  Square,
  RotateCcw,
  TrendingDown,
  Minus,
  Zap,
  Award,
  Video,
  Headphones,
  Monitor,
  Globe,
  Lock,
  Unlock,
  LineChart,
  AreaChart,
  Save,
  RefreshCw,
  Database,
  Key,
  Bell,
  UserPlus,
  UserMinus,
  Mail as MailIcon,
  Smartphone,
  Laptop,
  Server,
  Cloud,
  Wifi,
  Bluetooth,
  Battery,
  HardDrive,
  Cpu,
  MemoryStick,
  Mouse,
  Keyboard,
  Printer,
  Router,
  Database as DatabaseIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function HREinstellungen() {
  const [activeTab, setActiveTab] = useState('general');

  // Mock data for system settings
  const systemSettings = {
    companyName: 'ZDF',
    timezone: 'Europe/Berlin',
    language: 'de-DE',
    dateFormat: 'DD.MM.YYYY',
    currency: 'EUR',
    workingHours: {
      start: '08:00',
      end: '17:00',
      breakTime: 60
    },
    vacationDays: 30,
    sickLeaveDays: 6,
    notificationSettings: {
      email: true,
      push: true,
      sms: false
    }
  };

  // Mock data for user roles
  const userRoles = [
    {
      id: 1,
      name: 'HR Manager',
      description: 'Vollzugriff auf alle HR-Funktionen',
      permissions: ['read', 'write', 'delete', 'admin'],
      userCount: 3
    },
    {
      id: 2,
      name: 'HR Mitarbeiter',
      description: 'Zugriff auf Mitarbeiterverwaltung und Recruiting',
      permissions: ['read', 'write'],
      userCount: 8
    },
    {
      id: 3,
      name: 'Manager',
      description: 'Zugriff auf Team-Daten und Performance Reviews',
      permissions: ['read', 'write'],
      userCount: 15
    },
    {
      id: 4,
      name: 'Mitarbeiter',
      description: 'Eigene Daten einsehen und bearbeiten',
      permissions: ['read'],
      userCount: 130
    }
  ];

  // Mock data for integrations
  const integrations = [
    {
      id: 1,
      name: 'Active Directory',
      type: 'Authentication',
      status: 'connected',
      description: 'Benutzerauthentifizierung über AD',
      lastSync: '2024-01-22 14:30'
    },
    {
      id: 2,
      name: 'SAP HR',
      type: 'HR System',
      status: 'connected',
      description: 'Gehaltsabrechnung und Personalstammdaten',
      lastSync: '2024-01-22 13:45'
    },
    {
      id: 3,
      name: 'Slack',
      type: 'Communication',
      status: 'disconnected',
      description: 'Team-Kommunikation und Benachrichtigungen',
      lastSync: null
    },
    {
      id: 4,
      name: 'Microsoft Teams',
      type: 'Communication',
      status: 'connected',
      description: 'Video-Konferenzen und Chat',
      lastSync: '2024-01-22 12:15'
    }
  ];

  // Mock data for system logs
  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-01-22 15:30:25',
      user: 'Dr. Sarah Weber',
      action: 'Mitarbeiter hinzugefügt',
      details: 'Neuer Mitarbeiter: Max Mustermann',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-22 14:45:12',
      user: 'System',
      action: 'Backup erstellt',
      details: 'Tägliches Backup erfolgreich abgeschlossen',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-22 13:20:08',
      user: 'Tom Müller',
      action: 'Performance Review erstellt',
      details: 'Review für Anna Schmidt erstellt',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-01-22 12:15:33',
      user: 'System',
      action: 'Integration Fehler',
      details: 'Slack Integration fehlgeschlagen',
      status: 'error'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Verbunden';
      case 'disconnected': return 'Getrennt';
      case 'success': return 'Erfolgreich';
      case 'error': return 'Fehler';
      case 'warning': return 'Warnung';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/operations/hr">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">HR Einstellungen</h1>
                <p className="text-gray-600 mt-1">System-Konfiguration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <RefreshCw className="w-4 h-4 mr-2" />
                Aktualisieren
              </Button>
              <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Allgemein</TabsTrigger>
            <TabsTrigger value="roles">Benutzerrollen</TabsTrigger>
            <TabsTrigger value="integrations">Integrationen</TabsTrigger>
            <TabsTrigger value="notifications">Benachrichtigungen</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Unternehmenseinstellungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Unternehmensname</Label>
                    <Input id="companyName" defaultValue={systemSettings.companyName} />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Zeitzone</Label>
                    <Select defaultValue={systemSettings.timezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="America/New_York">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Sprache</Label>
                    <Select defaultValue={systemSettings.language}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="de-DE">Deutsch</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                        <SelectItem value="fr-FR">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="currency">Währung</Label>
                    <Select defaultValue={systemSettings.currency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Arbeitszeiten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workStart">Arbeitsbeginn</Label>
                      <Input id="workStart" type="time" defaultValue={systemSettings.workingHours.start} />
                    </div>
                    <div>
                      <Label htmlFor="workEnd">Arbeitsende</Label>
                      <Input id="workEnd" type="time" defaultValue={systemSettings.workingHours.end} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="breakTime">Pausenzeit (Minuten)</Label>
                    <Input id="breakTime" type="number" defaultValue={systemSettings.workingHours.breakTime} />
                  </div>
                  <div>
                    <Label htmlFor="vacationDays">Urlaubstage pro Jahr</Label>
                    <Input id="vacationDays" type="number" defaultValue={systemSettings.vacationDays} />
                  </div>
                  <div>
                    <Label htmlFor="sickLeaveDays">Krankheitstage (Lohnfortzahlung)</Label>
                    <Input id="sickLeaveDays" type="number" defaultValue={systemSettings.sickLeaveDays} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Benutzerrollen</CardTitle>
                    <CardDescription>Verwalten Sie Berechtigungen und Rollen</CardDescription>
                  </div>
                  <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Neue Rolle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">{role.userCount} Benutzer</div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System-Integrationen</CardTitle>
                <CardDescription>Verwalten Sie externe Systemverbindungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <Badge className={getStatusColor(integration.status)}>
                            {getStatusText(integration.status)}
                          </Badge>
                          <Badge variant="outline">{integration.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        {integration.lastSync && (
                          <p className="text-xs text-gray-500 mt-1">
                            Letzte Synchronisation: {integration.lastSync}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Benachrichtigungseinstellungen</CardTitle>
                <CardDescription>Konfigurieren Sie Benachrichtigungskanäle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium">E-Mail Benachrichtigungen</h3>
                        <p className="text-sm text-gray-600">Benachrichtigungen per E-Mail senden</p>
                      </div>
                    </div>
                    <Button variant={systemSettings.notificationSettings.email ? "default" : "outline"}>
                      {systemSettings.notificationSettings.email ? "Aktiviert" : "Deaktiviert"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium">Push Benachrichtigungen</h3>
                        <p className="text-sm text-gray-600">Push-Benachrichtigungen in der App</p>
                      </div>
                    </div>
                    <Button variant={systemSettings.notificationSettings.push ? "default" : "outline"}>
                      {systemSettings.notificationSettings.push ? "Aktiviert" : "Deaktiviert"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div>
                        <h3 className="font-medium">SMS Benachrichtigungen</h3>
                        <p className="text-sm text-gray-600">Wichtige Benachrichtigungen per SMS</p>
                      </div>
                    </div>
                    <Button variant={systemSettings.notificationSettings.sms ? "default" : "outline"}>
                      {systemSettings.notificationSettings.sms ? "Aktiviert" : "Deaktiviert"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>System Logs</CardTitle>
                    <CardDescription>Übersicht der Systemaktivitäten</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 
                        log.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-gray-900">{log.action}</h3>
                          <Badge className={getStatusColor(log.status)}>
                            {getStatusText(log.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{log.details}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Benutzer: {log.user}</span>
                          <span>Zeit: {log.timestamp}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
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
