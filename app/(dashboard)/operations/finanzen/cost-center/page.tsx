'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  DollarSign,
  Building,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CostCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  // Mock data for cost centers
  const costCenterData = {
    costCenters: [
      {
        id: 'CC-001',
        name: 'Marketing & Werbung',
        manager: 'Dr. Sarah Weber',
        budget: 2500000,
        spent: 1800000,
        remaining: 700000,
        employees: 25,
        status: 'active',
        departments: ['TV-Werbung', 'Digital Marketing', 'Events', 'PR']
      },
      {
        id: 'CC-002',
        name: 'IT & Technik',
        manager: 'Tom Müller',
        budget: 1800000,
        spent: 1200000,
        remaining: 600000,
        employees: 18,
        status: 'active',
        departments: ['Infrastruktur', 'Software', 'Support', 'Entwicklung']
      },
      {
        id: 'CC-003',
        name: 'Produktion',
        manager: 'Anna Schmidt',
        budget: 3200000,
        spent: 2800000,
        remaining: 400000,
        employees: 45,
        status: 'over-budget',
        departments: ['TV-Produktion', 'Post-Production', 'Audio', 'Grafik']
      },
      {
        id: 'CC-004',
        name: 'HR & Personal',
        manager: 'Mike Johnson',
        budget: 1200000,
        spent: 950000,
        remaining: 250000,
        employees: 12,
        status: 'active',
        departments: ['Recruiting', 'Personalverwaltung', 'Schulungen', 'Entwicklung']
      },
      {
        id: 'CC-005',
        name: 'Verwaltung',
        manager: 'Lisa Brown',
        budget: 800000,
        spent: 650000,
        remaining: 150000,
        employees: 8,
        status: 'active',
        departments: ['Buchhaltung', 'Recht', 'Facility Management', 'Sekretariat']
      }
    ],
    totalBudget: 9500000,
    totalSpent: 7400000,
    totalRemaining: 2100000
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'over-budget': return 'bg-red-100 text-red-800';
      case 'under-budget': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'over-budget': return 'Über Budget';
      case 'under-budget': return 'Unter Budget';
      default: return 'Unbekannt';
    }
  };

  const getBudgetUtilization = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

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
                <h1 className="text-3xl font-bold text-white">Cost Center</h1>
                <p className="text-gray-300 mt-1">Kostenstellen-Management und Budgetkontrolle</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neues Cost Center
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt Budget</p>
                  <p className="text-2xl font-bold text-white">
                    {(costCenterData.totalBudget / 1000000).toFixed(1)}M €
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ausgegeben</p>
                  <p className="text-2xl font-bold text-red-500">
                    {(costCenterData.totalSpent / 1000000).toFixed(1)}M €
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
                    {(costCenterData.totalRemaining / 1000000).toFixed(1)}M €
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
                    {((costCenterData.totalSpent / costCenterData.totalBudget) * 100).toFixed(1)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-yellow-500" />
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
                  placeholder="Cost Centers suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Zeitraum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cost Centers List */}
        <div className="space-y-6">
          {costCenterData.costCenters.map((costCenter) => (
            <Card key={costCenter.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">{costCenter.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {costCenter.id} • Manager: {costCenter.manager} • {costCenter.employees} Mitarbeiter
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(costCenter.status)}>
                    {getStatusText(costCenter.status)}
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
                        {(costCenter.budget / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Ausgegeben</span>
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-red-400 text-xl font-bold">
                        {(costCenter.spent / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Verfügbar</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-green-400 text-xl font-bold">
                        {(costCenter.remaining / 1000000).toFixed(1)}M €
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Budget-Auslastung</span>
                      <span className="text-white">
                        {getBudgetUtilization(costCenter.spent, costCenter.budget).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          getBudgetUtilization(costCenter.spent, costCenter.budget) > 90 
                            ? 'bg-red-500' 
                            : getBudgetUtilization(costCenter.spent, costCenter.budget) > 75 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(getBudgetUtilization(costCenter.spent, costCenter.budget), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Departments */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Abteilungen</h4>
                    <div className="flex flex-wrap gap-2">
                      {costCenter.departments.map((department, index) => (
                        <Badge key={index} variant="outline" className="border-gray-500 text-gray-300">
                          {department}
                        </Badge>
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
