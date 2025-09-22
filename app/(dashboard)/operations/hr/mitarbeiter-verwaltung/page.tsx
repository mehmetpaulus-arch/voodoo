'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Users,
  UserPlus,
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
  Calendar,
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
  Activity
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

export default function MitarbeiterVerwaltung() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for employees
  const employees = [
    {
      id: 1,
      name: 'Dr. Sarah Weber',
      position: 'Kampagnenleiterin',
      department: 'Kampagnenmanagement',
      email: 'sarah.weber@zdf.de',
      phone: '+49 6131 70-1234',
      location: 'Mainz',
      startDate: '2024-01-15',
      status: 'active',
      avatar: '/avatars/sarah.jpg',
      salary: 75000,
      performance: 95,
      skills: ['Strategie', 'Führung', 'Projektmanagement'],
      lastLogin: 'vor 2 Stunden'
    },
    {
      id: 2,
      name: 'Tom Müller',
      position: 'Kreativdirektor',
      department: 'Kreativabteilung',
      email: 'tom.mueller@zdf.de',
      phone: '+49 6131 70-1235',
      location: 'Mainz',
      startDate: '2023-09-01',
      status: 'active',
      avatar: '/avatars/tom.jpg',
      salary: 68000,
      performance: 88,
      skills: ['Design', 'Branding', 'Kreativstrategie'],
      lastLogin: 'vor 1 Stunde'
    },
    {
      id: 3,
      name: 'Anna Schmidt',
      position: 'Social Media Manager',
      department: 'Digitale Medien',
      email: 'anna.schmidt@zdf.de',
      phone: '+49 6131 70-1236',
      location: 'Mainz',
      startDate: '2024-03-10',
      status: 'active',
      avatar: '/avatars/anna.jpg',
      salary: 52000,
      performance: 92,
      skills: ['Social Media', 'Content Creation', 'Community Management'],
      lastLogin: 'vor 30 Minuten'
    },
    {
      id: 4,
      name: 'Mike Johnson',
      position: 'TV-Produzent',
      department: 'TV-Produktion',
      email: 'mike.johnson@zdf.de',
      phone: '+49 6131 70-1237',
      location: 'Mainz',
      startDate: '2022-11-20',
      status: 'on-leave',
      avatar: '/avatars/mike.jpg',
      salary: 72000,
      performance: 85,
      skills: ['TV-Produktion', 'Regie', 'Post-Production'],
      lastLogin: 'vor 3 Tagen'
    },
    {
      id: 5,
      name: 'Lisa Brown',
      position: 'PR-Managerin',
      department: 'Kommunikation',
      email: 'lisa.brown@zdf.de',
      phone: '+49 6131 70-1238',
      location: 'Mainz',
      startDate: '2023-05-15',
      status: 'active',
      avatar: '/avatars/lisa.jpg',
      salary: 58000,
      performance: 90,
      skills: ['PR', 'Medienarbeit', 'Krisenkommunikation'],
      lastLogin: 'vor 1 Stunde'
    }
  ];

  const departments = [
    'Kampagnenmanagement',
    'Kreativabteilung',
    'Digitale Medien',
    'TV-Produktion',
    'Kommunikation',
    'IT',
    'Events',
    'Datenanalyse'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'on-leave': return 'Beurlaubt';
      case 'inactive': return 'Inaktiv';
      default: return 'Unbekannt';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/operations/hr">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Mitarbeiter-Verwaltung</h1>
                <p className="text-gray-300 mt-1">Personal-Stammdaten verwalten</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <UserPlus className="w-4 h-4 mr-2" />
                Neuer Mitarbeiter
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
                  <p className="text-sm font-medium text-gray-600">Gesamt Mitarbeiter</p>
                  <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Aktive Mitarbeiter</p>
                  <p className="text-2xl font-bold text-green-600">
                    {employees.filter(e => e.status === 'active').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Beurlaubt</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {employees.filter(e => e.status === 'on-leave').length}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ø Performance</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(employees.reduce((acc, e) => acc + e.performance, 0) / employees.length)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
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
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Abteilung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Abteilungen</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="on-leave">Beurlaubt</SelectItem>
                  <SelectItem value="inactive">Inaktiv</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Mitarbeiter ({filteredEmployees.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                      <Badge className={getStatusColor(employee.status)}>
                        {getStatusText(employee.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{employee.position} • {employee.department}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {employee.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {employee.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {employee.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Seit {new Date(employee.startDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{employee.performance}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Letzter Login: {employee.lastLogin}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
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
      </div>
    </div>
  );
}
