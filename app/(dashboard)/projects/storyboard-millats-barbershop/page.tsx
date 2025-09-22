'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  Video,
  Image,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  ChevronLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Filter,
  Search,
  MoreHorizontal,
  Star,
  UserPlus,
  Settings,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Shield,
  Globe,
  Camera,
  Mic,
  PenTool,
  Code,
  Palette,
  Monitor,
  Smartphone,
  Radio,
  Newspaper,
  Megaphone,
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StoryboardMillatsBarbershopPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [teamFilter, setTeamFilter] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', description: '' });
  const [budgetAdjustment, setBudgetAdjustment] = useState({ category: '', newBudget: '' });

  // Funktionen für Budget-Management
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description) {
      // Hier würde normalerweise die API aufgerufen werden
      console.log('Neue Ausgabe hinzugefügt:', newExpense);
      setNewExpense({ category: '', amount: '', description: '' });
      // Erfolgsmeldung anzeigen
      alert('Ausgabe erfolgreich hinzugefügt!');
    } else {
      alert('Bitte füllen Sie alle Felder aus.');
    }
  };

  const handleBudgetAdjustment = () => {
    if (budgetAdjustment.category && budgetAdjustment.newBudget) {
      // Hier würde normalerweise die API aufgerufen werden
      console.log('Budget angepasst:', budgetAdjustment);
      setBudgetAdjustment({ category: '', newBudget: '' });
      // Erfolgsmeldung anzeigen
      alert('Budget erfolgreich angepasst!');
    } else {
      alert('Bitte wählen Sie eine Kategorie und geben Sie ein neues Budget ein.');
    }
  };

  const projectStats = {
    totalTasks: 24,
    completedTasks: 18,
    progress: 75,
    teamMembers: 12,
    budget: 125000,
    spent: 87500,
    remaining: 37500,
    roi: 340,
    engagement: 89.2,
    reach: 2.4,
    conversion: 12.8
  };

  // Temporarily disabled due to syntax error
  const budgetCategories: any[] = [];
  const teamMembers: any[] = [];
  const recentActivities: any[] = [];
  const tasks: any[] = [];
  const scenes: any[] = [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      <div className="p-8">
        <h1 className="text-white text-2xl">Storyboard - Millats Barbershop</h1>
        <p className="text-gray-300">Temporär deaktiviert - Build-Fehler wird behoben</p>
        <Link href="/">
          <Button variant="ghost" className="text-gray-300 hover:text-white mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </Link>
      </div>
    </div>
  );
}