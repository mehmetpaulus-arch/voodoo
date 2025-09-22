'use client';

import React from 'react';
import { 
  HelpCircle,
  Server,
  Shield,
  Monitor,
  Database,
  Wifi,
  Settings,
  AlertTriangle,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const itPanels = [
  {
    id: 'helpdesk',
    title: 'IT-Helpdesk',
    subtitle: 'Technischer Support für Mitarbeiter',
    icon: HelpCircle,
    color: 'bg-[#F2F2F2]',
    href: '/operations/it/helpdesk'
  },
  {
    id: 'server-management',
    title: 'Server-Management',
    subtitle: 'Server-Infrastruktur verwalten',
    icon: Server,
    color: 'bg-[#E37222]',
    href: '/operations/it/server-management'
  },
  {
    id: 'security',
    title: 'IT-Security',
    subtitle: 'Sicherheit und Datenschutz',
    icon: Shield,
    color: 'bg-[#F2F2F2]',
    href: '/operations/it/security'
  },
  {
    id: 'monitoring',
    title: 'System Monitoring',
    subtitle: 'Überwachung und Alerts',
    icon: Monitor,
    color: 'bg-[#E37222]',
    href: '/operations/it/monitoring'
  },
  {
    id: 'database-admin',
    title: 'Database Administration',
    subtitle: 'Datenbank-Verwaltung',
    icon: Database,
    color: 'bg-[#F2F2F2]',
    href: '/operations/it/database-admin'
  },
  {
    id: 'network',
    title: 'Netzwerk-Management',
    subtitle: 'Netzwerk-Infrastruktur',
    icon: Wifi,
    color: 'bg-[#E37222]',
    href: '/operations/it/network'
  },
  {
    id: 'system-config',
    title: 'System-Konfiguration',
    subtitle: 'IT-Systeme konfigurieren',
    icon: Settings,
    color: 'bg-[#F2F2F2]',
    href: '/operations/it/system-config'
  },
  {
    id: 'incident-management',
    title: 'Incident Management',
    subtitle: 'Störungen und Notfälle',
    icon: AlertTriangle,
    color: 'bg-[#E37222]',
    href: '/operations/it/incident-management'
  }
];

export default function ItPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Zurück</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <PanelGrid
          panels={itPanels}
          title="IT & Support"
          subtitle="Technische Services und IT-Infrastruktur"
        />
      </div>
    </div>
  );
}