'use client';

import React from 'react';
import { 
  DollarSign,
  PieChart,
  TrendingUp,
  Calculator,
  FileText,
  CreditCard,
  BarChart3,
  Target,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PanelGrid from '@/components/PanelGrid';

const finanzPanels = [
  {
    id: 'budget-planung',
    title: 'Budget-Planung',
    subtitle: 'Jahres- und Projektbudgets',
    icon: Calculator,
    color: 'bg-[#F2F2F2]',
    href: '/operations/finanzen/budget-planung'
  },
  {
    id: 'kostenanalyse',
    title: 'Kostenanalyse',
    subtitle: 'Ausgaben-Tracking und Optimierung',
    icon: PieChart,
    color: 'bg-[#E37222]',
    href: '/operations/finanzen/kostenanalyse'
  },
  {
    id: 'revenue-tracking',
    title: 'Revenue Tracking',
    subtitle: 'Einnahmen-Verfolgung',
    icon: TrendingUp,
    color: 'bg-[#F2F2F2]',
    href: '/operations/finanzen/revenue-tracking'
  },
  {
    id: 'rechnungswesen',
    title: 'Rechnungswesen',
    subtitle: 'Buchhaltung und Abrechnung',
    icon: FileText,
    color: 'bg-[#E37222]',
    href: '/operations/finanzen/rechnungswesen'
  },
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    subtitle: 'Zahlungsabwicklung',
    icon: CreditCard,
    color: 'bg-[#F2F2F2]',
    href: '/operations/finanzen/payment-processing'
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    subtitle: 'Finanzberichte und Analysen',
    icon: BarChart3,
    color: 'bg-[#E37222]',
    href: '/operations/finanzen/financial-reporting'
  },
  {
    id: 'roi-analysis',
    title: 'ROI Analysis',
    subtitle: 'Return on Investment messen',
    icon: Target,
    color: 'bg-[#F2F2F2]',
    href: '/operations/finanzen/roi-analysis'
  },
  {
    id: 'cost-center',
    title: 'Cost Center',
    subtitle: 'Kostenstellen-Management',
    icon: DollarSign,
    color: 'bg-[#E37222]',
    href: '/operations/finanzen/cost-center'
  }
];

export default function FinanzenPage() {
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
          panels={finanzPanels}
          title="Finanzen"
          subtitle="Budget-Management und Finanzanalyse"
        />
      </div>
    </div>
  );
}