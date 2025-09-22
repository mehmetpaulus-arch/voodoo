'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Gift,
  Plus,
  Search,
  Filter,
  Star,
  Crown,
  Trophy,
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  Award,
  Target,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoyaltyProgramPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for loyalty program
  const loyaltyData = {
    tiers: [
      {
        id: 'TIER-001',
        name: 'Bronze',
        icon: Star,
        color: 'bg-amber-100 text-amber-800',
        requirements: '0-999 Punkte',
        benefits: ['5% Rabatt', 'Geburtstags-Geschenk'],
        members: 12500,
        avgSpend: 45.50
      },
      {
        id: 'TIER-002',
        name: 'Silber',
        icon: Award,
        color: 'bg-gray-100 text-gray-800',
        requirements: '1000-4999 Punkte',
        benefits: ['10% Rabatt', 'Kostenloser Versand', 'Früher Zugang'],
        members: 8500,
        avgSpend: 89.75
      },
      {
        id: 'TIER-003',
        name: 'Gold',
        icon: Crown,
        color: 'bg-yellow-100 text-yellow-800',
        requirements: '5000-9999 Punkte',
        benefits: ['15% Rabatt', 'VIP Support', 'Exklusive Events'],
        members: 3200,
        avgSpend: 156.25
      },
      {
        id: 'TIER-004',
        name: 'Platin',
        icon: Trophy,
        color: 'bg-purple-100 text-purple-800',
        requirements: '10000+ Punkte',
        benefits: ['20% Rabatt', 'Persönlicher Manager', 'Luxus-Geschenke'],
        members: 450,
        avgSpend: 289.90
      }
    ],
    rewards: [
      {
        id: 'REW-001',
        name: '10€ Gutschein',
        type: 'Gutschein',
        points: 1000,
        description: '10€ Rabatt auf den nächsten Einkauf',
        redeemed: 1250,
        available: 5000,
        status: 'active'
      },
      {
        id: 'REW-002',
        name: 'Kostenloser Versand',
        type: 'Service',
        points: 500,
        description: 'Kostenloser Versand für 30 Tage',
        redeemed: 890,
        available: 10000,
        status: 'active'
      },
      {
        id: 'REW-003',
        name: 'Exklusives Event',
        type: 'Event',
        points: 2500,
        description: 'Einladung zu exklusivem Kunden-Event',
        redeemed: 45,
        available: 100,
        status: 'active'
      },
      {
        id: 'REW-004',
        name: 'Premium Support',
        type: 'Service',
        points: 2000,
        description: '30 Tage Premium Kundensupport',
        redeemed: 120,
        available: 500,
        status: 'active'
      }
    ],
    topMembers: [
      {
        id: 'MEMBER-001',
        name: 'Dr. Sarah Weber',
        tier: 'Platin',
        points: 15680,
        totalSpent: 2890.50,
        joinDate: '2022-03-15',
        lastActivity: '2024-06-15',
        rewards: 12
      },
      {
        id: 'MEMBER-002',
        name: 'Tom Müller',
        tier: 'Gold',
        points: 8750,
        totalSpent: 1650.25,
        joinDate: '2022-07-20',
        lastActivity: '2024-06-14',
        rewards: 8
      },
      {
        id: 'MEMBER-003',
        name: 'Anna Schmidt',
        tier: 'Gold',
        points: 7200,
        totalSpent: 1420.80,
        joinDate: '2023-01-10',
        lastActivity: '2024-06-13',
        rewards: 6
      }
    ]
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-100 text-amber-800';
      case 'Silber': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'Gutschein': return 'bg-green-100 text-green-800';
      case 'Service': return 'bg-blue-100 text-blue-800';
      case 'Event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalMembers = loyaltyData.tiers.reduce((sum, tier) => sum + tier.members, 0);
  const totalRewards = loyaltyData.rewards.reduce((sum, reward) => sum + reward.redeemed, 0);
  const avgSpend = loyaltyData.tiers.reduce((sum, tier) => sum + (tier.avgSpend * tier.members), 0) / totalMembers;

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
                <h1 className="text-3xl font-bold text-white">Loyalty Program</h1>
                <p className="text-gray-300 mt-1">Treueprogramm und Belohnungen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neue Belohnung
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
                  <p className="text-sm font-medium text-gray-400">Gesamt Mitglieder</p>
                  <p className="text-2xl font-bold text-white">
                    {(totalMembers / 1000).toFixed(1)}K
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Belohnungen eingelöst</p>
                  <p className="text-2xl font-bold text-green-500">{totalRewards}</p>
                </div>
                <Gift className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Ø Ausgaben</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {avgSpend.toFixed(0)} €
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
                  <p className="text-sm font-medium text-gray-400">Aktive Belohnungen</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {loyaltyData.rewards.length}
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#E37222]">Übersicht</TabsTrigger>
            <TabsTrigger value="tiers" className="data-[state=active]:bg-[#E37222]">Tier-System</TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-[#E37222]">Belohnungen</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Members */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Mitglieder</CardTitle>
                  <CardDescription className="text-gray-400">
                    Aktivste Mitglieder des Treueprogramms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loyaltyData.topMembers.map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#E37222] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{member.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {member.points} Punkte • {member.rewards} Belohnungen
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getTierColor(member.tier)}>
                            {member.tier}
                          </Badge>
                          <p className="text-gray-400 text-sm mt-1">
                            {member.totalSpent.toFixed(0)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Letzte Aktivitäten</CardTitle>
                  <CardDescription className="text-gray-400">
                    Neueste Belohnungen und Aktivitäten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Dr. Sarah Weber hat 10€ Gutschein eingelöst</p>
                        <p className="text-gray-400 text-xs">vor 2 Stunden</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Tom Müller ist zu Gold aufgestiegen</p>
                        <p className="text-gray-400 text-xs">vor 5 Stunden</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">Anna Schmidt hat Premium Support aktiviert</p>
                        <p className="text-gray-400 text-xs">vor 1 Tag</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tiers Tab */}
          <TabsContent value="tiers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loyaltyData.tiers.map((tier) => (
                <Card key={tier.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#E37222] rounded-full flex items-center justify-center">
                          <tier.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-xl">{tier.name}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {tier.requirements}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={tier.color}>
                        {tier.members} Mitglieder
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2">Vorteile</h4>
                        <ul className="space-y-1">
                          {tier.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#E37222] rounded-full"></div>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Mitglieder</p>
                          <p className="text-white text-lg font-bold">{tier.members}</p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Ø Ausgaben</p>
                          <p className="text-white text-lg font-bold">{tier.avgSpend} €</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <div className="space-y-6">
              {loyaltyData.rewards.map((reward) => (
                <Card key={reward.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">{reward.name}</CardTitle>
                        <CardDescription className="text-gray-400 mt-1">
                          {reward.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getRewardTypeColor(reward.type)}>
                          {reward.type}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500 text-gray-300">
                          {reward.points} Punkte
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Eingelöst</span>
                            <Gift className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-xl font-bold">{reward.redeemed}</p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Verfügbar</span>
                            <Target className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-xl font-bold">{reward.available}</p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm">Redemption Rate</span>
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                          </div>
                          <p className="text-white text-xl font-bold">
                            {((reward.redeemed / reward.available) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Redemption Progress</span>
                          <span className="text-white">
                            {((reward.redeemed / reward.available) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#E37222] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(reward.redeemed / reward.available) * 100}%` }}
                          ></div>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
