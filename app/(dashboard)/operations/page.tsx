'use client';

import React from 'react';
import { 
  Settings,
  Users,
  DollarSign,
  HelpCircle,
  FileText,
  BarChart3,
  Shield,
  Cog,
  Bell
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const operationsPanels = [
  {
    id: 'hr',
    title: 'HR',
    subtitle: 'Personal und Mitarbeiterverwaltung',
    icon: Users,
    color: 'bg-[#F2F2F2]',
    href: '/operations/hr'
  },
  {
    id: 'finanzen',
    title: 'Finanzen',
    subtitle: 'Budget und Kostenmanagement',
    icon: DollarSign,
    color: 'bg-[#E37222]',
    href: '/operations/finanzen'
  },
  {
    id: 'it-support',
    title: 'IT & Support',
    subtitle: 'Technischer Support und IT-Services',
    icon: HelpCircle,
    color: 'bg-[#F2F2F2]',
    href: '/operations/it'
  },
  {
    id: 'compliance-ops',
    title: 'Compliance Operations',
    subtitle: 'Operative Compliance-Überwachung',
    icon: Shield,
    color: 'bg-[#E37222]'
  },
  {
    id: 'process-management',
    title: 'Process Management',
    subtitle: 'Geschäftsprozesse optimieren',
    icon: Cog,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'reporting',
    title: 'Operations Reporting',
    subtitle: 'Betriebsberichte und KPIs',
    icon: BarChart3,
    color: 'bg-[#E37222]'
  },
  {
    id: 'documentation',
    title: 'Dokumentation',
    subtitle: 'Prozess-Dokumentation',
    icon: FileText,
    color: 'bg-[#F2F2F2]'
  },
  {
    id: 'system-admin',
    title: 'System Administration',
    subtitle: 'System-Verwaltung und Wartung',
    icon: Settings,
    color: 'bg-[#E37222]'
  }
];

export default function OperationsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-end px-8 py-6">
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
          panels={operationsPanels}
          title="Operations"
          subtitle="Betriebsführung und administrative Prozesse"
        />
      </div>
    </div>
  );
}