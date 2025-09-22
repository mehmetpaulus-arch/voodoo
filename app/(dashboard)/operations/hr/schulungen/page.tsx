'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  GraduationCap,
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
  Unlock
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

export default function Schulungen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for training courses
  const courses = [
    {
      id: 1,
      title: 'Adobe Creative Suite Grundlagen',
      category: 'Design',
      type: 'Online',
      duration: '8 Stunden',
      instructor: 'Tom Müller',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      maxParticipants: 12,
      currentParticipants: 8,
      status: 'active',
      description: 'Grundlagen der Adobe Creative Suite für Einsteiger',
      skills: ['Photoshop', 'Illustrator', 'InDesign'],
      price: 299,
      level: 'Anfänger'
    },
    {
      id: 2,
      title: 'Social Media Marketing',
      category: 'Marketing',
      type: 'Präsenz',
      duration: '16 Stunden',
      instructor: 'Anna Schmidt',
      startDate: '2024-03-01',
      endDate: '2024-03-02',
      maxParticipants: 15,
      currentParticipants: 15,
      status: 'full',
      description: 'Moderne Social Media Strategien und Tools',
      skills: ['Instagram', 'TikTok', 'Content Creation'],
      price: 499,
      level: 'Fortgeschritten'
    },
    {
      id: 3,
      title: 'Projektmanagement mit Agile',
      category: 'Management',
      type: 'Hybrid',
      duration: '24 Stunden',
      instructor: 'Dr. Sarah Weber',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      maxParticipants: 10,
      currentParticipants: 6,
      status: 'active',
      description: 'Agile Methoden und Tools für Projektmanagement',
      skills: ['Scrum', 'Kanban', 'Jira'],
      price: 799,
      level: 'Experte'
    }
  ];

  // Mock data for employee training progress
  const employeeProgress = [
    {
      id: 1,
      employee: 'Dr. Sarah Weber',
      department: 'Kampagnenmanagement',
      completedCourses: 3,
      inProgressCourses: 1,
      totalHours: 24,
      certificates: 2,
      nextCourse: 'Data Analytics Grundlagen',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      employee: 'Tom Müller',
      department: 'Kreativabteilung',
      completedCourses: 2,
      inProgressCourses: 0,
      totalHours: 16,
      certificates: 2,
      nextCourse: 'Advanced Photoshop',
      avatar: '/avatars/tom.jpg'
    },
    {
      id: 3,
      employee: 'Anna Schmidt',
      department: 'Digitale Medien',
      completedCourses: 4,
      inProgressCourses: 2,
      totalHours: 32,
      certificates: 3,
      nextCourse: 'Video Production',
      avatar: '/avatars/anna.jpg'
    }
  ];

  const categories = ['Design', 'Marketing', 'Management', 'IT', 'Kommunikation', 'Recht'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'full': return 'Ausgebucht';
      case 'completed': return 'Abgeschlossen';
      case 'cancelled': return 'Abgesagt';
      default: return 'Unbekannt';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Online': return <Monitor className="w-4 h-4" />;
      case 'Präsenz': return <Users className="w-4 h-4" />;
      case 'Hybrid': return <Globe className="w-4 h-4" />;
      default: return <GraduationCap className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Anfänger': return 'bg-green-100 text-green-800';
      case 'Fortgeschritten': return 'bg-yellow-100 text-yellow-800';
      case 'Experte': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
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
                <h1 className="text-3xl font-bold text-gray-900">Schulungen</h1>
                <p className="text-gray-600 mt-1">Weiterbildung und Training</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                <Plus className="w-4 h-4 mr-2" />
                Neuer Kurs
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
                  <p className="text-sm font-medium text-gray-600">Aktive Kurse</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {courses.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Teilnehmer</p>
                  <p className="text-2xl font-bold text-green-600">
                    {courses.reduce((sum, c) => sum + c.currentParticipants, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Zertifikate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {employeeProgress.reduce((sum, e) => sum + e.certificates, 0)}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ausgebucht</p>
                  <p className="text-2xl font-bold text-red-600">
                    {courses.filter(c => c.status === 'full').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Kurse</TabsTrigger>
            <TabsTrigger value="progress">Fortschritt</TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Kurse suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Kategorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Kategorien</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
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
                      <SelectItem value="full">Ausgebucht</SelectItem>
                      <SelectItem value="completed">Abgeschlossen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {course.instructor} • {course.duration}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusText(course.status)}
                        </Badge>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(course.type)}
                          <span>{course.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(course.startDate).toLocaleDateString('de-DE')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{course.price}€</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Teilnehmer</span>
                          <span className="font-medium">{course.currentParticipants}/{course.maxParticipants}</span>
                        </div>
                        <Progress 
                          value={(course.currentParticipants / course.maxParticipants) * 100} 
                          className="h-2"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Ansehen
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Bearbeiten
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

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mitarbeiter Fortschritt</CardTitle>
                <CardDescription>Übersicht der Schulungsaktivitäten</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employeeProgress.map((employee) => (
                    <div key={employee.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {employee.employee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{employee.employee}</h3>
                          <Badge variant="outline">
                            {employee.department}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Abgeschlossen:</span>
                            <span className="font-medium ml-1">{employee.completedCourses}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">In Bearbeitung:</span>
                            <span className="font-medium ml-1">{employee.inProgressCourses}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Stunden:</span>
                            <span className="font-medium ml-1">{employee.totalHours}h</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Zertifikate:</span>
                            <span className="font-medium ml-1">{employee.certificates}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">Nächster Kurs: </span>
                          <span className="text-sm font-medium">{employee.nextCourse}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
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
        </Tabs>
      </div>
    </div>
  );
}
