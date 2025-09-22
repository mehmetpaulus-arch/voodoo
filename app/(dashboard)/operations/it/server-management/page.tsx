'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Server,
  Plus,
  Search,
  Filter,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Eye,
  Edit,
  Power,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ServerManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for servers
  const servers = [
    {
      id: 'SRV-001',
      name: 'Web-Server-01',
      type: 'Web Server',
      status: 'online',
      ip: '192.168.1.10',
      location: 'RZ-Mainz',
      cpu: 45,
      memory: 67,
      disk: 23,
      uptime: '15 Tage',
      lastBackup: '2024-06-15 02:00',
      os: 'Ubuntu 22.04 LTS',
      services: ['Apache', 'MySQL', 'PHP']
    },
    {
      id: 'SRV-002',
      name: 'DB-Server-01',
      type: 'Database Server',
      status: 'online',
      ip: '192.168.1.11',
      location: 'RZ-Mainz',
      cpu: 78,
      memory: 89,
      disk: 45,
      uptime: '23 Tage',
      lastBackup: '2024-06-15 03:00',
      os: 'CentOS 8',
      services: ['PostgreSQL', 'Redis', 'Backup']
    },
    {
      id: 'SRV-003',
      name: 'App-Server-01',
      type: 'Application Server',
      status: 'warning',
      ip: '192.168.1.12',
      location: 'RZ-Mainz',
      cpu: 92,
      memory: 95,
      disk: 67,
      uptime: '8 Tage',
      lastBackup: '2024-06-14 01:00',
      os: 'Windows Server 2022',
      services: ['IIS', 'Node.js', 'Docker']
    },
    {
      id: 'SRV-004',
      name: 'File-Server-01',
      type: 'File Server',
      status: 'offline',
      ip: '192.168.1.13',
      location: 'RZ-Mainz',
      cpu: 0,
      memory: 0,
      disk: 0,
      uptime: '0 Tage',
      lastBackup: '2024-06-13 02:00',
      os: 'Windows Server 2019',
      services: ['SMB', 'FTP', 'Backup']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'warning': return 'Warnung';
      case 'offline': return 'Offline';
      default: return 'Unbekannt';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'offline': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-500';
    if (usage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         server.ip.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || server.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Header */}
      <div className="border-b border-gray-600" style={{ backgroundColor: '#2c363d' }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/operations/it">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Server-Management</h1>
                <p className="text-gray-300 mt-1">Server-Infrastruktur verwalten</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-[#E37222] hover:bg-[#D16212]">
                <Plus className="w-4 h-4 mr-2" />
                Neuer Server
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
                  <p className="text-sm font-medium text-gray-400">Gesamt Server</p>
                  <p className="text-2xl font-bold text-white">{servers.length}</p>
                </div>
                <Server className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Online</p>
                  <p className="text-2xl font-bold text-green-500">
                    {servers.filter(s => s.status === 'online').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Warnung</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {servers.filter(s => s.status === 'warning').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Offline</p>
                  <p className="text-2xl font-bold text-red-500">
                    {servers.filter(s => s.status === 'offline').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
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
                  placeholder="Server suchen..."
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
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="warning">Warnung</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Servers List */}
        <div className="space-y-6">
          {filteredServers.map((server) => (
            <Card key={server.id} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">{server.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {server.type} • {server.ip} • {server.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(server.status)}
                    <Badge className={getStatusColor(server.status)}>
                      {getStatusText(server.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* System Resources */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">CPU</span>
                        <Cpu className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className={`text-xl font-bold ${getUsageColor(server.cpu)}`}>
                        {server.cpu}%
                      </p>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            server.cpu >= 90 ? 'bg-red-500' : 
                            server.cpu >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">RAM</span>
                        <MemoryStick className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className={`text-xl font-bold ${getUsageColor(server.memory)}`}>
                        {server.memory}%
                      </p>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            server.memory >= 90 ? 'bg-red-500' : 
                            server.memory >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400 text-sm">Festplatte</span>
                        <HardDrive className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className={`text-xl font-bold ${getUsageColor(server.disk)}`}>
                        {server.disk}%
                      </p>
                      <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            server.disk >= 90 ? 'bg-red-500' : 
                            server.disk >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${server.disk}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Server Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">System-Informationen</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p>Betriebssystem: {server.os}</p>
                        <p>Uptime: {server.uptime}</p>
                        <p>Letztes Backup: {server.lastBackup}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {server.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-gray-500 text-gray-300">
                            {service}
                          </Badge>
                        ))}
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
                      <Settings className="w-4 h-4 mr-2" />
                      Konfigurieren
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-500 text-gray-300">
                      <Power className="w-4 h-4 mr-2" />
                      Neustart
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
