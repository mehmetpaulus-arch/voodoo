'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  BarChart3,
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
  AreaChart
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

export default function HRAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock data for HR analytics
  const hrMetrics = {
    totalEmployees: 156,
    newHires: 12,
    departures: 8,
    retentionRate: 94.2,
    averageTenure: 4.2,
    satisfactionScore: 4.3,
    trainingHours: 1240,
    performanceAverage: 4.1
  };

  const departmentStats = [
    { name: 'Kampagnenmanagement', employees: 24, turnover: 2.1, satisfaction: 4.5 },
    { name: 'Kreativabteilung', employees: 18, turnover: 1.8, satisfaction: 4.2 },
    { name: 'Digitale Medien', employees: 32, turnover: 3.2, satisfaction: 4.4 },
    { name: 'TV-Produktion', employees: 28, turnover: 2.5, satisfaction: 4.1 },
    { name: 'Kommunikation', employees: 15, turnover: 1.2, satisfaction: 4.6 },
    { name: 'IT', employees: 22, turnover: 4.1, satisfaction: 3.9 },
    { name: 'Events', employees: 12, turnover: 2.8, satisfaction: 4.3 },
    { name: 'Datenanalyse', employees: 5, turnover: 0.0, satisfaction: 4.7 }
  ];

  const performanceTrends = [
    { month: 'Jan', score: 4.0 },
    { month: 'Feb', score: 4.1 },
    { month: 'Mär', score: 4.2 },
    { month: 'Apr', score: 4.0 },
    { month: 'Mai', score: 4.3 },
    { month: 'Jun', score: 4.1 },
    { month: 'Jul', score: 4.4 },
    { month: 'Aug', score: 4.2 },
    { month: 'Sep', score: 4.5 },
    { month: 'Okt', score: 4.3 },
    { month: 'Nov', score: 4.4 },
    { month: 'Dez', score: 4.1 }
  ];

  const topPerformers = [
    { name: 'Dr. Sarah Weber', department: 'Kampagnenmanagement', score: 4.8, improvement: '+0.3' },
    { name: 'Anna Schmidt', department: 'Digitale Medien', score: 4.7, improvement: '+0.2' },
    { name: 'David Chen', department: 'Datenanalyse', score: 4.6, improvement: '+0.4' },
    { name: 'Lisa Brown', department: 'Kommunikation', score: 4.5, improvement: '+0.1' },
    { name: 'Tom Müller', department: 'Kreativabteilung', score: 4.4, improvement: '+0.2' }
  ];

  const trainingAnalytics = [
    { category: 'Design', completed: 45, inProgress: 12, planned: 8 },
    { category: 'Marketing', completed: 38, inProgress: 15, planned: 5 },
    { category: 'Management', completed: 32, inProgress: 8, planned: 12 },
    { category: 'IT', completed: 28, inProgress: 18, planned: 6 },
    { category: 'Kommunikation', completed: 22, inProgress: 5, planned: 3 }
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">HR Analytics</h1>
                <p className="text-gray-600 mt-1">Personal-Kennzahlen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Zeitraum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Gesamt Mitarbeiter</p>
                  <p className="text-2xl font-bold text-blue-600">{hrMetrics.totalEmployees}</p>
                  <p className="text-xs text-green-600 mt-1">+{hrMetrics.newHires} neue</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Retention Rate</p>
                  <p className="text-2xl font-bold text-green-600">{hrMetrics.retentionRate}%</p>
                  <p className="text-xs text-gray-500 mt-1">Ø {hrMetrics.averageTenure} Jahre</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Zufriedenheit</p>
                  <p className="text-2xl font-bold text-purple-600">{hrMetrics.satisfactionScore}/5</p>
                  <p className="text-xs text-green-600 mt-1">+0.2 vs. Vorjahr</p>
                </div>
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Performance</p>
                  <p className="text-2xl font-bold text-orange-600">{hrMetrics.performanceAverage}/5</p>
                  <p className="text-xs text-green-600 mt-1">+0.1 vs. Vorjahr</p>
                </div>
                <Star className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Übersicht</TabsTrigger>
            <TabsTrigger value="departments">Abteilungen</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="training">Schulungen</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mitarbeiterentwicklung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Neueinstellungen</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-600">+{hrMetrics.newHires}</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Austritte</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-red-600">-{hrMetrics.departures}</span>
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Netto-Wachstum</span>
                      <span className="font-semibold text-blue-600">+{hrMetrics.newHires - hrMetrics.departures}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Schulungsstunden</span>
                      <span className="font-semibold text-purple-600">{hrMetrics.trainingHours}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performanceTrends.slice(-6).map((trend, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{trend.month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{ width: `${(trend.score / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{trend.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Abteilungsstatistiken</CardTitle>
                <CardDescription>Übersicht nach Abteilungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{dept.employees} Mitarbeiter</span>
                          <span>Fluktuation: {dept.turnover}%</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{dept.satisfaction}/5</span>
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-yellow-500 rounded-full" 
                            style={{ width: `${(dept.satisfaction / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performer</CardTitle>
                <CardDescription>Beste Mitarbeiter nach Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">#{index + 1}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{performer.name}</h3>
                        <p className="text-sm text-gray-600">{performer.department}</p>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{performer.score}/5</span>
                        </div>
                        <span className="text-sm text-green-600">{performer.improvement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schulungsanalytics</CardTitle>
                <CardDescription>Übersicht der Schulungsaktivitäten</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingAnalytics.map((training, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{training.category}</h3>
                        <Badge variant="outline">
                          {training.completed + training.inProgress + training.planned} Gesamt
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{training.completed}</div>
                          <div className="text-gray-600">Abgeschlossen</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{training.inProgress}</div>
                          <div className="text-gray-600">In Bearbeitung</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-600">{training.planned}</div>
                          <div className="text-gray-600">Geplant</div>
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
