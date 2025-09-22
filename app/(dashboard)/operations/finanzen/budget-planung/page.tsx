'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calculator,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  PieChart,
  BarChart3,
  FileText,
  Settings,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Building,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BudgetPlanungPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data for budgets
  const budgets = [
    {
      id: 1,
      name: 'Wahl 2025 Kampagne',
      department: 'Marketing',
      year: 2024,
      totalBudget: 2500000,
      spent: 1200000,
      remaining: 1300000,
      status: 'on-track',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Komplette Budget-Planung für die Wahl 2025 Kampagne',
      categories: [
        { name: 'TV-Werbung', budget: 1000000, spent: 500000 },
        { name: 'Digital Marketing', budget: 800000, spent: 400000 },
        { name: 'Events', budget: 400000, spent: 200000 },
        { name: 'Personalkosten', budget: 300000, spent: 100000 }
      ]
    },
    {
      id: 2,
      name: 'IT-Infrastruktur Upgrade',
      department: 'IT',
      year: 2024,
      totalBudget: 1800000,
      spent: 900000,
      remaining: 900000,
      status: 'on-track',
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      description: 'Modernisierung der IT-Infrastruktur',
      categories: [
        { name: 'Hardware', budget: 1000000, spent: 500000 },
        { name: 'Software', budget: 500000, spent: 250000 },
        { name: 'Schulungen', budget: 300000, spent: 150000 }
      ]
    },
    {
      id: 3,
      name: 'Content Production',
      department: 'Produktion',
      year: 2024,
      totalBudget: 3200000,
      spent: 2100000,
      remaining: 1100000,
      status: 'over-budget',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      description: 'Jahresbudget für Content-Produktion',
      categories: [
        { name: 'TV-Produktion', budget: 2000000, spent: 1400000 },
        { name: 'Digital Content', budget: 800000, spent: 500000 },
        { name: 'Post-Production', budget: 400000, spent: 200000 }
      ]
    }
  ];

  const departments = ['Marketing', 'IT', 'Produktion', 'HR', 'Kommunikation', 'Events'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'Im Plan';
      case 'over-budget': return 'Über Budget';
      case 'under-budget': return 'Unter Budget';
      default: return 'Unbekannt';
    }
  };

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = budget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = budget.year.toString() === selectedYear;
    const matchesDepartment = selectedDepartment === 'all' || budget.department === selectedDepartment;
    
    return matchesSearch && matchesYear && matchesDepartment;
  });

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.totalBudget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = budgets.reduce((sum, budget) => sum + budget.remaining, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/operations/finanzen">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Budget-Planung</h1>
                <p className="text-gray-300 mt-1">Jahres- und Projektbudgets verwalten</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neues Budget
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt Budget</p>
                  <p className="text-2xl font-bold text-white">
                    {(totalBudget / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <Calculator className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ausgegeben</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(totalSpent / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Verfügbar</p>
                  <p className="text-2xl font-bold text-green-500">
                    {(totalRemaining / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Auslastung</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {((totalSpent / totalBudget) * 100).toFixed(1)}%
                  </p>
                </div>
                <PieChart className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Budgets suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Jahr" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Abteilung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Abteilungen</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Budget List */}
        <div className="space-y-6">
          {filteredBudgets.map((budget) => (
            <Card key={budget.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">{budget.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {budget.department} • {budget.year} • {budget.description}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(budget.status)}>
                    {getStatusText(budget.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Budget Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Gesamt Budget</span>
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {(budget.totalBudget / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Ausgegeben</span>
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-red-400 text-xl font-bold">
                        {(budget.spent / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Verfügbar</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-green-400 text-xl font-bold">
                        {(budget.remaining / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget-Auslastung</span>
                      <span className="text-white">
                        {((budget.spent / budget.totalBudget) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-[#E37222] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(budget.spent / budget.totalBudget) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Budget-Kategorien</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {budget.categories.map((category, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{category.name}</span>
                            <span className="text-gray-400 text-sm">
                              {(category.spent / category.budget * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-1.5 mb-1">
                            <div 
                              className="bg-[#E37222] h-1.5 rounded-full"
                              style={{ width: `${(category.spent / category.budget) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{(category.spent / 1000).toFixed(0)}K €</span>
                            <span>{(category.budget / 1000).toFixed(0)}K €</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Edit className="w-4 h-4 mr-2" />
                      Bearbeiten
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Bericht
                    </Button>
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
