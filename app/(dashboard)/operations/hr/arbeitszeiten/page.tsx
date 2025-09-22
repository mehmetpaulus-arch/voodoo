'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Clock,
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
  Award,
  DollarSign,
  FileText,
  Settings,
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
  RotateCcw
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

export default function Arbeitszeiten() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data for time tracking
  const timeEntries = [
    {
      id: 1,
      employee: 'Dr. Sarah Weber',
      department: 'Kampagnenmanagement',
      date: '2024-01-22',
      clockIn: '08:30',
      clockOut: '17:15',
      breakTime: 45,
      totalHours: 8.0,
      overtime: 0,
      status: 'completed',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      employee: 'Tom Müller',
      department: 'Kreativabteilung',
      date: '2024-01-22',
      clockIn: '09:00',
      clockOut: '18:30',
      breakTime: 60,
      totalHours: 8.5,
      overtime: 0.5,
      status: 'completed',
      avatar: '/avatars/tom.jpg'
    },
    {
      id: 3,
      employee: 'Anna Schmidt',
      department: 'Digitale Medien',
      date: '2024-01-22',
      clockIn: '08:45',
      clockOut: null,
      breakTime: 0,
      totalHours: 0,
      overtime: 0,
      status: 'active',
      avatar: '/avatars/anna.jpg'
    }
  ];

  // Mock data for shift planning
  const shifts = [
    {
      id: 1,
      name: 'Frühschicht',
      startTime: '06:00',
      endTime: '14:00',
      employees: ['Dr. Sarah Weber', 'Tom Müller'],
      capacity: 5,
      filled: 2
    },
    {
      id: 2,
      name: 'Spätschicht',
      startTime: '14:00',
      endTime: '22:00',
      employees: ['Anna Schmidt', 'Mike Johnson'],
      capacity: 4,
      filled: 2
    },
    {
      id: 3,
      name: 'Nachtschicht',
      startTime: '22:00',
      endTime: '06:00',
      employees: [],
      capacity: 2,
      filled: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Abgeschlossen';
      case 'active': return 'Aktiv';
      case 'pending': return 'Ausstehend';
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
                <h1 className="text-3xl font-bold text-gray-900">Arbeitszeiten</h1>
                <p className="text-gray-600 mt-1">Zeiterfassung und Schichtplanung</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Schicht
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aktive Mitarbeiter</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {timeEntries.filter(t => t.status === 'active').length}
                  </p>
                </div>
                <Play className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Durchschnittliche Arbeitszeit</p>
                  <p className="text-2xl font-bold text-green-600">8.2h</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Überstunden</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {timeEntries.reduce((sum, t) => sum + t.overtime, 0)}h
                  </p>
                </div>
                <Timer className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Schichten geplant</p>
                  <p className="text-2xl font-bold text-purple-600">{shifts.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="time-tracking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="time-tracking">Zeiterfassung</TabsTrigger>
            <TabsTrigger value="shift-planning">Schichtplanung</TabsTrigger>
          </TabsList>

          {/* Time Tracking Tab */}
          <TabsContent value="time-tracking" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Mitarbeiter suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Zeitraum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Heute</SelectItem>
                      <SelectItem value="week">Diese Woche</SelectItem>
                      <SelectItem value="month">Dieser Monat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Time Entries List */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {timeEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {entry.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{entry.employee}</h3>
                          <Badge className={getStatusColor(entry.status)}>
                            {getStatusText(entry.status)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{entry.department}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(entry.date).toLocaleDateString('de-DE')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {entry.clockIn} - {entry.clockOut || 'Aktiv'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {entry.totalHours}h
                          </span>
                          {entry.overtime > 0 && (
                            <span className="flex items-center gap-1 text-orange-600">
                              <AlertCircle className="w-3 h-3" />
                              +{entry.overtime}h
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {entry.status === 'active' && (
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                            <Square className="w-4 h-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
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

          {/* Shift Planning Tab */}
          <TabsContent value="shift-planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {shifts.map((shift) => (
                <Card key={shift.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{shift.name}</CardTitle>
                        <CardDescription>
                          {shift.startTime} - {shift.endTime}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        {shift.filled}/{shift.capacity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Zugewiesene Mitarbeiter</Label>
                        <div className="mt-2 space-y-2">
                          {shift.employees.length > 0 ? (
                            shift.employees.map((employee, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{employee}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500 italic">Keine Mitarbeiter zugewiesen</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Plus className="w-4 h-4 mr-2" />
                          Mitarbeiter hinzufügen
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
