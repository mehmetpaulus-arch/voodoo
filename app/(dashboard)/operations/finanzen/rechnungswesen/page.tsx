'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  FileText,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RechnungswesenPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for accounting
  const accountingData = {
    invoices: [
      {
        id: 'INV-2024-001',
        client: 'BMW Group',
        amount: 125000,
        date: '2024-06-15',
        dueDate: '2024-07-15',
        status: 'paid',
        description: 'TV-Werbung Q2 2024'
      },
      {
        id: 'INV-2024-002',
        client: 'Siemens AG',
        amount: 85000,
        date: '2024-06-10',
        dueDate: '2024-07-10',
        status: 'pending',
        description: 'Digital Marketing Kampagne'
      },
      {
        id: 'INV-2024-003',
        client: 'Deutsche Bank',
        amount: 95000,
        date: '2024-06-08',
        dueDate: '2024-07-08',
        status: 'overdue',
        description: 'Sponsoring Event'
      }
    ],
    expenses: [
      {
        id: 'EXP-2024-001',
        vendor: 'Adobe Systems',
        amount: 25000,
        date: '2024-06-12',
        category: 'Software',
        status: 'approved',
        description: 'Creative Cloud Jahreslizenz'
      },
      {
        id: 'EXP-2024-002',
        vendor: 'Microsoft',
        amount: 18000,
        date: '2024-06-10',
        category: 'Software',
        status: 'pending',
        description: 'Office 365 Lizenzen'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Bezahlt';
      case 'pending': return 'Ausstehend';
      case 'overdue': return 'Überfällig';
      case 'approved': return 'Genehmigt';
      default: return 'Unbekannt';
    }
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
                <h1 className="text-3xl font-bold text-white">Rechnungswesen</h1>
                <p className="text-gray-300 mt-1">Buchhaltung und Abrechnung</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Rechnung
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[#E37222]">Rechnungen</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-[#E37222]">Ausgaben</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            {/* Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Rechnungen suchen..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Status</SelectItem>
                      <SelectItem value="paid">Bezahlt</SelectItem>
                      <SelectItem value="pending">Ausstehend</SelectItem>
                      <SelectItem value="overdue">Überfällig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Invoices List */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Rechnungen</CardTitle>
                <CardDescription className="text-gray-400">
                  Übersicht aller Rechnungen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountingData.invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{invoice.id}</h4>
                          <p className="text-gray-400 text-sm">{invoice.client}</p>
                          <p className="text-gray-400 text-sm">{invoice.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {(invoice.amount / 1000).toFixed(0)}K €
                        </p>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusText(invoice.status)}
                        </Badge>
                        <p className="text-gray-400 text-sm mt-1">
                          Fällig: {new Date(invoice.dueDate).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Ausgaben</CardTitle>
                <CardDescription className="text-gray-400">
                  Übersicht aller Ausgaben
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accountingData.expenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{expense.id}</h4>
                          <p className="text-gray-400 text-sm">{expense.vendor}</p>
                          <p className="text-gray-400 text-sm">{expense.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {(expense.amount / 1000).toFixed(0)}K €
                        </p>
                        <Badge className={getStatusColor(expense.status)}>
                          {getStatusText(expense.status)}
                        </Badge>
                        <p className="text-gray-400 text-sm mt-1">
                          {expense.category}
                        </p>
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
