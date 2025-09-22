'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Users,
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Mail,
  Phone,
  DollarSign,
  User,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SubscriberManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');

  // Mock data for subscribers
  const subscribers = [
    {
      id: 'SUB-001',
      name: 'Dr. Sarah Weber',
      email: 'sarah.weber@email.com',
      phone: '+49 30 12345678',
      plan: 'Premium',
      status: 'active',
      startDate: '2023-01-15',
      nextBilling: '2024-07-15',
      amount: 29.99,
      paymentMethod: 'Credit Card',
      lastLogin: '2024-06-15 14:30',
      totalSpent: 599.80,
      usage: {
        storage: 85,
        bandwidth: 67,
        features: 92
      }
    },
    {
      id: 'SUB-002',
      name: 'Tom Müller',
      email: 'tom.mueller@email.com',
      phone: '+49 30 87654321',
      plan: 'Basic',
      status: 'active',
      startDate: '2023-03-20',
      nextBilling: '2024-07-20',
      amount: 9.99,
      paymentMethod: 'PayPal',
      lastLogin: '2024-06-14 09:15',
      totalSpent: 179.82,
      usage: {
        storage: 45,
        bandwidth: 23,
        features: 67
      }
    },
    {
      id: 'SUB-003',
      name: 'Anna Schmidt',
      email: 'anna.schmidt@email.com',
      phone: '+49 30 11223344',
      plan: 'Premium',
      status: 'expired',
      startDate: '2022-11-10',
      nextBilling: '2024-06-10',
      amount: 29.99,
      paymentMethod: 'Bank Transfer',
      lastLogin: '2024-06-10 16:45',
      totalSpent: 599.80,
      usage: {
        storage: 0,
        bandwidth: 0,
        features: 0
      }
    },
    {
      id: 'SUB-004',
      name: 'Max Mustermann',
      email: 'max.mustermann@email.com',
      phone: '+49 30 55667788',
      plan: 'Enterprise',
      status: 'active',
      startDate: '2023-06-01',
      nextBilling: '2024-07-01',
      amount: 99.99,
      paymentMethod: 'Credit Card',
      lastLogin: '2024-06-15 11:20',
      totalSpent: 1199.88,
      usage: {
        storage: 95,
        bandwidth: 89,
        features: 100
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktiv';
      case 'expired': return 'Abgelaufen';
      case 'cancelled': return 'Gekündigt';
      case 'trial': return 'Testversion';
      default: return 'Unbekannt';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'cancelled': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'trial': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Basic': return 'bg-gray-100 text-gray-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || subscriber.status === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || subscriber.plan === selectedPlan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalSubscribers = subscribers.length;
  const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
  const totalRevenue = subscribers.reduce((sum, subscriber) => sum + subscriber.totalSpent, 0);
  const monthlyRevenue = subscribers.filter(s => s.status === 'active').reduce((sum, subscriber) => sum + subscriber.amount, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/growth/crm">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Abonnenten-Verwaltung</h1>
                <p className="text-gray-300 mt-1">Abo-Status und Verlängerungen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neuer Abonnent
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamt Abonnenten</p>
                  <p className="text-2xl font-bold text-white">{totalSubscribers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Aktive Abonnenten</p>
                  <p className="text-2xl font-bold text-green-500">{activeSubscribers}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Monatlicher Umsatz</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {monthlyRevenue.toFixed(0)} €
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Gesamtumsatz</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {totalRevenue.toFixed(0)} €
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
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
                  placeholder="Abonnenten suchen..."
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
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="expired">Abgelaufen</SelectItem>
                  <SelectItem value="cancelled">Gekündigt</SelectItem>
                  <SelectItem value="trial">Testversion</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-full md:w-48 bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Pläne</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscribers List */}
        <div className="space-y-6">
          {filteredSubscribers.map((subscriber) => (
            <Card key={subscriber.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E37222] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{subscriber.name}</CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        {subscriber.id} • {subscriber.email}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(subscriber.status)}
                    <Badge className={getStatusColor(subscriber.status)}>
                      {getStatusText(subscriber.status)}
                    </Badge>
                    <Badge className={getPlanColor(subscriber.plan)}>
                      {subscriber.plan}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Subscription Details */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Monatlicher Betrag</span>
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {subscriber.amount} €
                      </p>
                      <p className="text-gray-400 text-sm">
                        {subscriber.paymentMethod}
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Nächste Abrechnung</span>
                        <Calendar className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {new Date(subscriber.nextBilling).toLocaleDateString('de-DE')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Seit: {new Date(subscriber.startDate).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Gesamtausgaben</span>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {subscriber.totalSpent.toFixed(0)} €
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Letzter Login</span>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-white text-xl font-bold">
                        {new Date(subscriber.lastLogin).toLocaleDateString('de-DE')}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(subscriber.lastLogin).toLocaleTimeString('de-DE')}
                      </p>
                    </div>
                  </div>

                  {/* Usage Statistics */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Nutzungsstatistiken</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Speicher</span>
                          <span className="text-white">{subscriber.usage.storage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${subscriber.usage.storage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Bandbreite</span>
                          <span className="text-white">{subscriber.usage.bandwidth}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${subscriber.usage.bandwidth}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Features</span>
                          <span className="text-white">{subscriber.usage.features}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${subscriber.usage.features}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Kontaktinformationen</h4>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">E-Mail:</span>
                            <span className="text-white">{subscriber.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Telefon:</span>
                            <span className="text-white">{subscriber.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Abonnement-Details</h4>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Plan:</span>
                            <span className="text-white">{subscriber.plan}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Zahlungsmethode:</span>
                            <span className="text-white">{subscriber.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
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
                      <Mail className="w-4 h-4 mr-2" />
                      E-Mail senden
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      Anrufen
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
