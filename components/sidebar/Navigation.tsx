'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Clapperboard, 
  RadioTower, 
  FlaskRound, 
  Search, 
  FolderOpen, 
  BarChart3, 
  Rocket, 
  Settings,
  CheckCircle,
  Lock
} from 'lucide-react';
import NavGroup from './NavGroup';

interface NavigationProps {
  isCollapsed: boolean;
  currentPath: string;
}

const navigationItems = [
  {
    id: 'cockpit',
    label: 'Cockpit',
    icon: LayoutDashboard,
    subItems: [],
    href: '/'
  },
  {
    id: 'studio',
    label: 'ZDF Studio',
    icon: Clapperboard,
    subItems: [
      { label: 'Storyboards | Konzepte', href: '/studio/scripts' },
      { label: 'Design | Assets', href: '/studio/visuals' },
      { label: 'Videos | Reels', href: '/studio/cinematics' },
      { label: 'Audio | Sounds', href: '/studio/sounddesign' }
    ]
  },
  {
    id: 'distribution',
    label: 'Distribution',
    icon: RadioTower,
    locked: true,
    subItems: [
      { label: 'TV', href: '/distribution/tv' },
      { label: 'Online', href: '/distribution/online' },
      { label: 'Social Media', href: '/distribution/social' },
      { label: 'Streamingportal', href: '/distribution/mediathek' }
    ]
  },
  {
    id: 'innovation',
    label: 'Ideenwerkstatt',
    icon: FlaskRound,
    subItems: [],
    href: '/innovation'
  },
  {
    id: 'library',
    label: 'Medienarchiv',
    icon: FolderOpen,
    subItems: [
      { label: 'Assets', href: '/library/assets' },
      { label: 'Archiv', href: '/library/archiv' },
      { label: 'Rechte', href: '/library/rechte' }
    ]
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: BarChart3,
    locked: true,
    subItems: [
      { label: 'KPIs', href: '/performance/kpis' },
      { label: 'Dashboards', href: '/performance/dashboards' },
      { label: 'Reports', href: '/performance/reports' }
    ]
  },
  {
    id: 'growth',
    label: 'Strategie',
    icon: Rocket,
    subItems: [
      { label: 'Prozessmanagement', href: '/growth/prozessmanagement' },
      { label: 'Business Development', href: '/growth/business-development' },
      { label: 'Marketing', href: '/growth/marketing' },
      { label: 'KI-Management', href: '/growth/ki-management' }
    ]
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Settings,
    subItems: [
      { label: 'HR', href: '/operations/hr' },
      { label: 'Finanzen', href: '/operations/finanzen' },
      { label: 'IT & Support', href: '/operations/it' }
    ]
  }
];

export default function Navigation({ isCollapsed, currentPath }: NavigationProps) {
  return (
    <nav className="flex-1 p-4 font-sans" role="menu">
      {!isCollapsed && (
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2 font-sans">
          <span className="text-base">Navigation</span>
        </div>
      )}
      
      <ul className="space-y-1" role="none">
        {navigationItems.map((item) => (
          <li key={item.id} role="none">
            <NavGroup
              item={item}
              isCollapsed={isCollapsed}
              currentPath={currentPath}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}