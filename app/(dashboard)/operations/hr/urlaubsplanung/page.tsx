'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
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
  Clock,
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
  Plane,
  Home,
  Coffee,
  Umbrella,
  Sun,
  Snowflake,
  Zap,
  AlertTriangle,
  Info
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

export default function Urlaubsplanung() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Mock data for vacation requests
  const vacationRequests = [
    {
      id: 1,
      employee: 'Dr. Sarah Weber',
      department: 'Kampagnenmanagement',
      startDate: '2024-02-15',
      endDate: '2024-02-23',
      days: 7,
      type: 'Urlaub',
      status: 'approved',
      reason: 'Familienurlaub',
      submittedDate: '2024-01-10',
      approvedBy: 'HR Manager',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      employee: 'Tom Müller',
      department: 'Kreativabteilung',
      startDate: '2024-03-01',
      endDate: '2024-03-08',
      days: 6,
      type: 'Urlaub',
      status: 'pending',
      reason: 'Skiurlaub',
      submittedDate: '2024-01-15',
      approvedBy: null,
      avatar: '/avatars/tom.jpg'
    },
    {
      id: 3,
      employee: 'Anna Schmidt',
      department: 'Digitale Medien',
      startDate: '2024-01-25',
      endDate: '2024-01-26',
      days: 2,
      type: 'Krankheit',
      status: 'approved',
      reason: 'Grippe',
      submittedDate: '2024-01-24',
      approvedBy: 'HR Manager',
      avatar: '/avatars/anna.jpg'
    },
    {
      id: 4,
      employee: 'Mike Johnson',
      department: 'TV-Produktion',
      startDate: '2024-04-10',
      endDate: '2024-04-20',
      days: 9,
      type: 'Urlaub',
      status: 'rejected',
      reason: 'Sommerurlaub',
      submittedDate: '2024-01-20',
      approvedBy: 'HR Manager',
      avatar: '/avatars/mike.jpg'
    }
  ];

  // Mock data for vacation calendar
  const vacationCalendar = [
    {
      date: '2024-02-15',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-16',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-17',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-18',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-19',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-20',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-21',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-22',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-02-23',
      employees: ['Dr. Sarah Weber'],
      type: 'vacation'
    },
    {
      date: '2024-03-01',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-02',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-03',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-04',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-05',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-06',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-07',
      employees: ['Tom Müller'],
      type: 'pending'
    },
    {
      date: '2024-03-08',
      employees: ['Tom Müller'],
      type: 'pending'
    }
  ];

  // Mock data for vacation statistics
  const vacationStats = {
    totalRequests: vacationRequests.length,
    approvedRequests: vacationRequests.filter(r => r.status === 'approved').length,
    pendingRequests: vacationRequests.filter(r => r.status === 'pending').length,
    rejectedRequests: vacationRequests.filter(r => r.status === 'rejected').length,
    totalVacationDays: vacationRequests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.days, 0),
    averageDaysPerRequest: Math.round(vacationRequests.reduce((sum, r) => sum + r.days, 0) / vacationRequests.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Genehmigt';
      case 'pending': return 'Ausstehend';
      case 'rejected': return 'Abgelehnt';
      default: return 'Unbekannt';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Urlaub': return <Plane className="w-4 h-4" />;
      case 'Krankheit': return <Heart className="w-4 h-4" />;
      case 'Home Office': return <Home className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredRequests = vacationRequests.filter(request => {
    const matchesSearch = request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

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
                <h1 className="text-3xl font-bold text-gray-900">Urlaubsplanung</h1>
                <p className="text-gray-600 mt-1">Abwesenheiten koordinieren</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                <Plus className="w-4 h-4 mr-2" />
                Neuer Antrag
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
                  <p className="text-sm font-medium text-gray-600">Gesamt Anträge</p>
                  <p className="text-2xl font-bold text-blue-600">{vacationStats.totalRequests}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Genehmigt</p>
                  <p className="text-2xl font-bold text-green-600">{vacationStats.approvedRequests}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ausstehend</p>
                  <p className="text-2xl font-bold text-yellow-600">{vacationStats.pendingRequests}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Urlaubstage</p>
                  <p className="text-2xl font-bold text-purple-600">{vacationStats.totalVacationDays}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Anträge</TabsTrigger>
            <TabsTrigger value="calendar">Kalender</TabsTrigger>
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Anträge suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="approved">Genehmigt</SelectItem>
                      <SelectItem value="pending">Ausstehend</SelectItem>
                      <SelectItem value="rejected">Abgelehnt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Requests List */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {request.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            {getTypeIcon(request.type)}
                            <span className="text-sm">{request.type}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{request.department}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(request.startDate).toLocaleDateString('de-DE')} - {new Date(request.endDate).toLocaleDateString('de-DE')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.days} Tage
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {request.reason}
                          </span>
                        </div>
                        {request.approvedBy && (
                          <p className="text-xs text-gray-500 mt-1">
                            Genehmigt von: {request.approvedBy}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Urlaubskalender</CardTitle>
                <CardDescription>Übersicht aller geplanten Abwesenheiten</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                    <div key={day} className="text-center font-medium text-gray-500 p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date(2024, 1, i - 6); // February 2024
                    const dateStr = date.toISOString().split('T')[0];
                    const vacationDay = vacationCalendar.find(v => v.date === dateStr);
                    
                    return (
                      <div
                        key={i}
                        className={`aspect-square p-2 border border-gray-200 rounded-lg text-sm ${
                          vacationDay 
                            ? vacationDay.type === 'vacation' 
                              ? 'bg-green-100 border-green-300' 
                              : 'bg-yellow-100 border-yellow-300'
                            : 'bg-white'
                        }`}
                      >
                        <div className="font-medium">{date.getDate()}</div>
                        {vacationDay && (
                          <div className="text-xs text-gray-600 mt-1">
                            {vacationDay.employees[0]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span>Genehmigt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                    <span>Ausstehend</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Urlaubsstatistiken</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Durchschnittliche Urlaubstage pro Antrag</span>
                      <span className="font-semibold">{vacationStats.averageDaysPerRequest} Tage</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Genehmigungsrate</span>
                      <span className="font-semibold">
                        {Math.round((vacationStats.approvedRequests / vacationStats.totalRequests) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ausstehende Anträge</span>
                      <span className="font-semibold text-yellow-600">{vacationStats.pendingRequests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Beliebte Urlaubszeiten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Februar</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">8 Tage</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">März</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">6 Tage</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">April</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">4 Tage</span>
                      </div>
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
