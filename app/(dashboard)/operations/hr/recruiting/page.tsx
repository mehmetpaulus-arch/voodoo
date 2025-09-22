'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
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
  Activity,
  Users,
  BookOpen,
  MessageSquare,
  Send,
  Archive,
  Flag,
  ThumbsUp,
  ThumbsDown
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

export default function Recruiting() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');

  // Mock data for job postings
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Video Producer',
      department: 'TV-Produktion',
      location: 'Mainz',
      type: 'Vollzeit',
      salary: '65.000 - 80.000 €',
      status: 'active',
      applications: 24,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      description: 'Wir suchen einen erfahrenen Video Producer für unsere TV-Produktionen...',
      requirements: ['5+ Jahre Erfahrung', 'Adobe Creative Suite', 'Teamführung']
    },
    {
      id: 2,
      title: 'Social Media Manager',
      department: 'Digitale Medien',
      location: 'Mainz',
      type: 'Vollzeit',
      salary: '45.000 - 55.000 €',
      status: 'active',
      applications: 18,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      description: 'Verstärke unser Team im Bereich Social Media Marketing...',
      requirements: ['3+ Jahre Erfahrung', 'Social Media Tools', 'Content Creation']
    },
    {
      id: 3,
      title: 'Data Analyst',
      department: 'Datenanalyse',
      location: 'Mainz',
      type: 'Vollzeit',
      salary: '50.000 - 65.000 €',
      status: 'closed',
      applications: 32,
      postedDate: '2023-12-01',
      deadline: '2024-01-15',
      description: 'Analysiere Daten für unsere Kampagnen und Programme...',
      requirements: ['Python/R', 'SQL', 'Statistik']
    }
  ];

  // Mock data for applications
  const applications = [
    {
      id: 1,
      name: 'Max Mustermann',
      email: 'max.mustermann@email.com',
      phone: '+49 123 456789',
      position: 'Senior Video Producer',
      status: 'review',
      appliedDate: '2024-01-20',
      experience: '7 Jahre',
      skills: ['Adobe Premiere', 'After Effects', 'Teamführung'],
      rating: 4.5,
      notes: 'Sehr gute Referenzen, passt gut zum Team'
    },
    {
      id: 2,
      name: 'Anna Schmidt',
      email: 'anna.schmidt@email.com',
      phone: '+49 987 654321',
      position: 'Social Media Manager',
      status: 'interview',
      appliedDate: '2024-01-18',
      experience: '4 Jahre',
      skills: ['Instagram', 'TikTok', 'Content Creation'],
      rating: 4.2,
      notes: 'Interview geplant für nächste Woche'
    },
    {
      id: 3,
      name: 'Tom Weber',
      email: 'tom.weber@email.com',
      phone: '+49 555 123456',
      position: 'Data Analyst',
      status: 'hired',
      appliedDate: '2024-01-05',
      experience: '5 Jahre',
      skills: ['Python', 'SQL', 'Machine Learning'],
      rating: 4.8,
      notes: 'Perfekter Kandidat, bereits eingestellt'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'closed': return 'Geschlossen';
      case 'draft': return 'Entwurf';
      case 'review': return 'In Prüfung';
      case 'interview': return 'Interview';
      case 'hired': return 'Eingestellt';
      case 'rejected': return 'Abgelehnt';
      default: return 'Unbekannt';
    }
  };

  const filteredJobPostings = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesPosition = selectedPosition === 'all' || job.title === selectedPosition;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
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
                <h1 className="text-3xl font-bold text-white">Recruiting</h1>
                <p className="text-gray-300 mt-1">Stellenausschreibungen und Bewerbungen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Stelle
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
                  <p className="text-sm font-medium text-gray-600">Aktive Stellen</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {jobPostings.filter(j => j.status === 'active').length}
                  </p>
                </div>
                <Briefcase className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bewerbungen</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.length}
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
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {applications.filter(a => a.status === 'interview').length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Eingestellt</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {applications.filter(a => a.status === 'hired').length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Stellenausschreibungen</TabsTrigger>
            <TabsTrigger value="applications">Bewerbungen</TabsTrigger>
          </TabsList>

          {/* Job Postings Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Stellen suchen..."
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
                      <SelectItem value="active">Aktiv</SelectItem>
                      <SelectItem value="closed">Geschlossen</SelectItem>
                      <SelectItem value="draft">Entwurf</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Job Postings List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobPostings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.department} • {job.location} • {job.type}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {getStatusText(job.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Gehalt: {job.salary}</span>
                        <span className="text-gray-500">{job.applications} Bewerbungen</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Gepostet: {new Date(job.postedDate).toLocaleDateString('de-DE')}</span>
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString('de-DE')}</span>
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

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Bewerbungen suchen..."
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
                      <SelectItem value="review">In Prüfung</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="hired">Eingestellt</SelectItem>
                      <SelectItem value="rejected">Abgelehnt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Applications List */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900">{application.name}</h3>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusText(application.status)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{application.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{application.position}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {application.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {application.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {application.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(application.appliedDate).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {application.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
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
