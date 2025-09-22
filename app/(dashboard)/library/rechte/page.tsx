'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield,
  Scale,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Database,
  Bell,
  ChevronLeft
} from 'lucide-react';
import PanelGrid from '@/components/PanelGrid';

const rechtePanels = [
  {
    id: 'lizenz-verwaltung',
    title: 'Lizenz-Verwaltung',
    subtitle: 'Alle Lizenzen zentral verwalten',
    icon: Shield,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    id: 'rechtepruefung',
    title: 'Rechteprüfung',
    subtitle: 'Automatische Rechte-Validierung',
    icon: Scale,
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    id: 'vertraege',
    title: 'Verträge',
    subtitle: 'Lizenzverträge und Vereinbarungen',
    icon: FileText,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    id: 'ablaufzeiten',
    title: 'Ablaufzeiten',
    subtitle: 'Lizenz-Monitoring und Alerts',
    icon: Clock,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    id: 'konflikt-management',
    title: 'Konflikt-Management',
    subtitle: 'Rechtliche Probleme lösen',
    icon: AlertTriangle,
    color: 'bg-gradient-to-br from-red-500 to-red-600'
  },
  {
    id: 'freigaben',
    title: 'Freigaben',
    subtitle: 'Genehmigungsprozesse',
    icon: CheckCircle,
    color: 'bg-gradient-to-br from-green-400 to-green-500'
  },
  {
    id: 'rechteinhaber',
    title: 'Rechteinhaber',
    subtitle: 'Kontakte und Vereinbarungen',
    icon: Users,
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
  },
  {
    id: 'rechte-datenbank',
    title: 'Rechte-Datenbank',
    subtitle: 'Zentrale Rechteverwaltung',
    icon: Database,
    color: 'bg-gradient-to-br from-gray-500 to-gray-600'
  }
];

export default function RechtePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Zurück</span>
        </Link>
      </nav>
      
      <div className="px-8">
        <PanelGrid
          panels={rechtePanels}
          title="Rechte-Management"
          subtitle="Lizenz- und Rechteverwaltung für alle Medien"
        />
      </div>
    </div>
  );
}