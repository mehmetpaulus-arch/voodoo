'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Award,
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
  Zap
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

export default function PerformanceReviews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  // Mock data for performance reviews
  const reviews = [
    {
      id: 1,
      employee: 'Dr. Sarah Weber',
      department: 'Kampagnenmanagement',
      position: 'Kampagnenleiterin',
      period: 'Q4 2023',
      status: 'completed',
      overallScore: 4.8,
      goals: [
        { name: 'Kampagnen-Erfolg', score: 5, target: 4 },
        { name: 'Team-Führung', score: 4.5, target: 4 },
        { name: 'Budget-Management', score: 5, target: 4 }
      ],
      strengths: ['Strategisches Denken', 'Teamführung', 'Projektmanagement'],
      improvements: ['Delegation', 'Work-Life-Balance'],
      nextGoals: ['Digitalisierung vorantreiben', 'Team erweitern'],
      reviewer: 'HR Manager',
      reviewDate: '2024-01-15',
      avatar: '/avatars/sarah.jpg'
    },
    {
      id: 2,
      employee: 'Tom Müller',
      department: 'Kreativabteilung',
      position: 'Kreativdirektor',
      period: 'Q4 2023',
      status: 'in-progress',
      overallScore: 4.2,
      goals: [
        { name: 'Kreative Qualität', score: 4.5, target: 4 },
        { name: 'Innovation', score: 4, target: 4 },
        { name: 'Kundenfeedback', score: 4, target: 4 }
      ],
      strengths: ['Kreativität', 'Design-Skills', 'Trends'],
      improvements: ['Zeitmanagement', 'Kommunikation'],
      nextGoals: ['Neue Tools einführen', 'Team schulen'],
      reviewer: 'HR Manager',
      reviewDate: null,
      avatar: '/avatars/tom.jpg'
    },
    {
      id: 3,
      employee: 'Anna Schmidt',
      department: 'Digitale Medien',
      position: 'Social Media Manager',
      period: 'Q4 2023',
      status: 'pending',
      overallScore: null,
      goals: [
        { name: 'Social Media Reach', score: null, target: 4 },
        { name: 'Engagement Rate', score: null, target: 4 },
        { name: 'Content Quality', score: null, target: 4 }
      ],
      strengths: [],
      improvements: [],
      nextGoals: [],
      reviewer: 'HR Manager',
      reviewDate: null,
      avatar: '/avatars/anna.jpg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Abgeschlossen';
      case 'in-progress': return 'In Bearbeitung';
      case 'pending': return 'Ausstehend';
      default: return 'Unbekannt';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4) return 'text-blue-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    
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
                <h1 className="text-3xl font-bold text-gray-900">Performance Reviews</h1>
                <p className="text-gray-600 mt-1">Mitarbeiter-Bewertungen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#FA7D19] hover:bg-[#E86D0A]">
                <Plus className="w-4 h-4 mr-2" />
                Neues Review
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
                  <p className="text-sm font-medium text-gray-600">Gesamt Reviews</p>
                  <p className="text-2xl font-bold text-blue-600">{reviews.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Abgeschlossen</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reviews.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Bearbeitung</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {reviews.filter(r => r.status === 'in-progress').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ø Bewertung</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {reviews.filter(r => r.overallScore).length > 0 
                      ? (reviews.filter(r => r.overallScore).reduce((sum, r) => sum + (r.overallScore || 0), 0) / reviews.filter(r => r.overallScore).length).toFixed(1)
                      : 'N/A'
                    }
                  </p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Reviews suchen..."
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
                  <SelectItem value="completed">Abgeschlossen</SelectItem>
                  <SelectItem value="in-progress">In Bearbeitung</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Zeitraum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {review.employee.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{review.employee}</CardTitle>
                      <CardDescription className="mt-1">
                        {review.position} • {review.department}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(review.status)}>
                          {getStatusText(review.status)}
                        </Badge>
                        <Badge variant="outline">
                          {review.period}
                        </Badge>
                        {review.overallScore && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className={`font-semibold ${getScoreColor(review.overallScore)}`}>
                              {review.overallScore}/5
                            </span>
                          </div>
                        )}
                      </div>
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
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Goals */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Ziele & Bewertungen</h4>
                    <div className="space-y-3">
                      {review.goals.map((goal, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{goal.name}</span>
                            {goal.score && (
                              <span className={`text-sm font-semibold ${getScoreColor(goal.score)}`}>
                                {goal.score}/5
                              </span>
                            )}
                          </div>
                          <Progress 
                            value={goal.score ? (goal.score / 5) * 100 : 0} 
                            className="h-2"
                          />
                          <div className="text-xs text-gray-500">
                            Ziel: {goal.target}/5
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Stärken & Verbesserungen</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-green-700">Stärken</Label>
                        <div className="mt-1 space-y-1">
                          {review.strengths.length > 0 ? (
                            review.strengths.map((strength, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{strength}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 italic">Noch nicht bewertet</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-orange-700">Verbesserungen</Label>
                        <div className="mt-1 space-y-1">
                          {review.improvements.length > 0 ? (
                            review.improvements.map((improvement, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">{improvement}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 italic">Noch nicht bewertet</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Goals & Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Nächste Ziele & Info</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Nächste Ziele</Label>
                        <div className="mt-1 space-y-1">
                          {review.nextGoals.length > 0 ? (
                            review.nextGoals.map((goal, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Flag className="w-4 h-4 text-blue-500" />
                                <span className="text-sm">{goal}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500 italic">Noch nicht definiert</span>
                          )}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>Reviewer: {review.reviewer}</div>
                          {review.reviewDate && (
                            <div>Datum: {new Date(review.reviewDate).toLocaleDateString('de-DE')}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
