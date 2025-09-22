'use client';

import React from 'react';
import { 
  Users,
  Heart,
  Mail,
  Phone,
  BarChart3,
  Target,
  Gift,
  Calendar,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const crmPanels = [
  {
    id: 'subscriber-management',
    title: 'Abonnenten-Verwaltung',
    subtitle: 'Abo-Status und Verlängerungen',
    icon: Users,
    color: 'bg-[#F2F2F2]',
    href: '/growth/crm/subscriber-management'
  },
  {
    id: 'customer-journey',
    title: 'Customer Journey',
    subtitle: 'Nutzer-Pfade analysieren',
    icon: Target,
    color: 'bg-[#E37222]',
    href: '/growth/crm/customer-journey'
  },
  {
    id: 'loyalty-program',
    title: 'Loyalty Program',
    subtitle: 'Treueprogramm und Belohnungen',
    icon: Gift,
    color: 'bg-[#F2F2F2]',
    href: '/growth/crm/loyalty-program'
  },
  {
    id: 'retention-analysis',
    title: 'Retention Analysis',
    subtitle: 'Kundenbindung messen',
    icon: Heart,
    color: 'bg-[#E37222]',
    href: '/growth/crm/retention-analysis'
  },
  {
    id: 'email-automation',
    title: 'E-Mail Automation',
    subtitle: 'Automatisierte Kommunikation',
    icon: Mail,
    color: 'bg-[#F2F2F2]',
    href: '/growth/crm/email-automation'
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    subtitle: 'Kundensupport-Integration',
    icon: Phone,
    color: 'bg-[#E37222]',
    href: '/growth/crm/customer-support'
  },
  {
    id: 'crm-analytics',
    title: 'CRM Analytics',
    subtitle: 'Kundenverhalten analysieren',
    icon: BarChart3,
    color: 'bg-[#F2F2F2]',
    href: '/growth/crm/crm-analytics'
  },
  {
    id: 'lifecycle-management',
    title: 'Lifecycle Management',
    subtitle: 'Kunden-Lebenszyklus optimieren',
    icon: Calendar,
    color: 'bg-[#E37222]',
    href: '/growth/crm/lifecycle-management'
  }
];

export default function CrmPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: '#2c363d'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/growth">
          <Button className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Zurück zu Growth
          </Button>
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
          panels={crmPanels}
          title="CRM & Abonnements"
          subtitle="Kundenbindung und Abonnement-Management"
        />
      </div>
    </div>
  );
}