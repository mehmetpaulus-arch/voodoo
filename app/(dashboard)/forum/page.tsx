'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavigationDropdown from '@/components/NavigationDropdown';
import { 
  Search,
  Plus,
  ChevronDown,
  MessageCircle,
  Eye,
  Pin,
  Users,
  Video,
  Palette,
  Headphones,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import NotificationDropdown from '@/components/NotificationDropdown';

const categories = [
  { id: 'all', name: 'Alle Kategorien', icon: Users, description: 'Alle Themen' },
  { id: 'general', name: 'Allgemein', icon: Users, description: 'Allgemeine Diskussionen' },
  { id: 'video', name: 'Video', icon: Video, description: 'Videoproduktion & Schnitt' },
  { id: 'graphics', name: 'Grafik', icon: Palette, description: 'Design & Grafiken' },
  { id: 'audio', name: 'Audio', icon: Headphones, description: 'Audioproduktion & Podcasts' },
  { id: 'text', name: 'Text', icon: FileText, description: 'Texterstellung & Redaktion' }
];

const popularTags = [
  '#Leitfaden', '#Transkription', '#Reels', '#Vorlagen', '#CI', 
  '#Lautheit', '#Podcast', '#Untertitel', '#KI', '#Hardware'
];

const forumRules = [
  'Klare Titel formulieren',
  'Ein Thema pro Thread',
  'Bitte CI und Netiquette beachten'
];

const initialThreads = [
  {
    id: 1,
    title: 'Leitfaden: Upload & Transkription – Best Practices',
    excerpt: 'Sammlung bewährter Methoden für effiziente Upload-Workflows und automatische Transkription...',
    author: 'Anna Müller',
    date: '2 Std.',
    category: 'Allgemein',
    tags: ['Leitfaden', 'Transkription'],
    replies: 14,
    views: 532,
    isPinned: true
  },
  {
    id: 2,
    title: 'Automatische UT: Qualität verbessern?',
    excerpt: 'Hat jemand Erfahrungen mit der Verbesserung der automatischen Untertitel-Qualität?',
    author: 'Maja Hoffmann',
    date: '4 Std.',
    category: 'Video',
    tags: ['UT', 'KI'],
    replies: 3,
    views: 90,
    isPinned: false
  },
  {
    id: 3,
    title: 'CI-konforme Grafikvorlagen für Reels?',
    excerpt: 'Suche nach standardisierten Vorlagen für Social Media Reels, die unseren CI-Richtlinien entsprechen...',
    author: 'Jonas Weber',
    date: '1 Tag',
    category: 'Grafik',
    tags: ['Reels', 'Vorlagen', 'CI'],
    replies: 7,
    views: 238,
    isPinned: false
  },
  {
    id: 4,
    title: 'Schnittrechner – GPU-Empfehlungen 2025',
    excerpt: 'Welche Grafikkarten empfehlt ihr für 4K-Videoschnitt? Budget vs. Performance Diskussion...',
    author: 'Joshua Kranz',
    date: '2 Tage',
    category: 'Video',
    tags: ['Hardware'],
    replies: 11,
    views: 420,
    isPinned: false
  },
  {
    id: 5,
    title: 'Podcast-Lautheitsnorm – Wie messen wir richtig?',
    excerpt: 'Diskussion über korrekte Lautheitsmessung bei Podcast-Produktionen nach aktuellen Standards...',
    author: 'Paul Richter',
    date: '3 Tage',
    category: 'Audio',
    tags: ['Lautheit', 'Podcast'],
    replies: 21,
    views: 1012,
    isPinned: false
  },
  // Allgemein Kategorie
  {
    id: 6,
    title: 'Neue Redaktions-Workflows 2025 – Eure Meinung?',
    excerpt: 'Wir planen eine Überarbeitung unserer internen Workflows. Welche Pain Points habt ihr aktuell?',
    author: 'Sarah Klein',
    date: '5 Std.',
    category: 'Allgemein',
    tags: ['Workflow', 'Redaktion'],
    replies: 8,
    views: 156,
    isPinned: false
  },
  {
    id: 7,
    title: 'Homeoffice vs. Büro – Produktivität im Vergleich',
    excerpt: 'Wie organisiert ihr euch zwischen Remote Work und Präsenz? Tipps für hybride Teams gesucht...',
    author: 'Michael Berg',
    date: '1 Tag',
    category: 'Allgemein',
    tags: ['Homeoffice', 'Team'],
    replies: 15,
    views: 289,
    isPinned: false
  },
  
  // Video Kategorie
  {
    id: 8,
    title: '4K vs. 8K Produktion – Lohnt sich der Aufwand?',
    excerpt: 'Diskussion über Kosten-Nutzen von 8K-Produktionen für ZDF-Formate. Eure Erfahrungen?',
    author: 'Lisa Wagner',
    date: '6 Std.',
    category: 'Video',
    tags: ['4K', '8K', 'Produktion'],
    replies: 12,
    views: 345,
    isPinned: false
  },
  {
    id: 9,
    title: 'DaVinci Resolve vs. Avid – Welches Tool für was?',
    excerpt: 'Vergleich der Schnittprogramme für verschiedene Projekttypen. Vor- und Nachteile im Überblick...',
    author: 'Tom Fischer',
    date: '2 Tage',
    category: 'Video',
    tags: ['DaVinci', 'Avid', 'Schnitt'],
    replies: 19,
    views: 567,
    isPinned: false
  },
  {
    id: 10,
    title: 'Live-Streaming Setup für Events optimieren',
    excerpt: 'Tipps für stabile Live-Übertragungen bei Großevents. Hardware-Empfehlungen und Backup-Strategien...',
    author: 'Nina Schulz',
    date: '4 Tage',
    category: 'Video',
    tags: ['Live', 'Streaming', 'Events'],
    replies: 6,
    views: 198,
    isPinned: false
  },
  
  // Grafik Kategorie
  {
    id: 11,
    title: 'Adobe Creative Suite Alternativen – Was nutzt ihr?',
    excerpt: 'Suche nach kostengünstigen Alternativen zu Adobe CC. Affinity, Canva Pro oder andere Tools?',
    author: 'Julia Hoffmann',
    date: '3 Std.',
    category: 'Grafik',
    tags: ['Adobe', 'Alternativen', 'Tools'],
    replies: 9,
    views: 234,
    isPinned: false
  },
  {
    id: 12,
    title: 'Barrierefreie Grafiken – Kontrast und Lesbarkeit',
    excerpt: 'Wie stellt ihr sicher, dass eure Designs WCAG-konform sind? Tools und Checklisten...',
    author: 'David Müller',
    date: '1 Tag',
    category: 'Grafik',
    tags: ['Barrierefreiheit', 'WCAG', 'Kontrast'],
    replies: 5,
    views: 167,
    isPinned: false
  },
  {
    id: 13,
    title: 'KI-generierte Bilder im ZDF – Rechtliche Aspekte',
    excerpt: 'Diskussion über Nutzung von DALL-E, Midjourney etc. Was ist erlaubt, was problematisch?',
    author: 'Elena Richter',
    date: '2 Tage',
    category: 'Grafik',
    tags: ['KI', 'Recht', 'DALL-E'],
    replies: 13,
    views: 456,
    isPinned: false
  },
  
  // Audio Kategorie
  {
    id: 14,
    title: 'Mikrofon-Setup für Homeoffice Interviews',
    excerpt: 'Welche Mikros empfehlt ihr für Remote-Interviews? Budget bis 300€, gute Sprachqualität...',
    author: 'Marco Weber',
    date: '7 Std.',
    category: 'Audio',
    tags: ['Mikrofon', 'Interview', 'Homeoffice'],
    replies: 11,
    views: 278,
    isPinned: false
  },
  {
    id: 15,
    title: 'Podcast-Intro Musik – GEMA-freie Alternativen',
    excerpt: 'Sammlung von lizenzfreien Musikquellen für Podcast-Intros und Übergänge...',
    author: 'Sabine Koch',
    date: '1 Tag',
    category: 'Audio',
    tags: ['Podcast', 'Musik', 'GEMA'],
    replies: 8,
    views: 189,
    isPinned: false
  },
  {
    id: 16,
    title: 'Audio-Restauration alter Aufnahmen – Tipps?',
    excerpt: 'Wie bearbeitet ihr historische Tonaufnahmen? Rauschentfernung und Qualitätsverbesserung...',
    author: 'Frank Zimmermann',
    date: '3 Tage',
    category: 'Audio',
    tags: ['Restauration', 'Rauschen', 'Archiv'],
    replies: 7,
    views: 145,
    isPinned: false
  },
  
  // Text Kategorie
  {
    id: 17,
    title: 'SEO-optimierte Headlines – Eure Strategien?',
    excerpt: 'Wie balanciert ihr zwischen SEO-Optimierung und journalistischer Qualität bei Überschriften?',
    author: 'Petra Lange',
    date: '4 Std.',
    category: 'Text',
    tags: ['SEO', 'Headlines', 'Online'],
    replies: 6,
    views: 123,
    isPinned: false
  },
  {
    id: 18,
    title: 'Gendern in ZDF-Texten – Aktuelle Richtlinien',
    excerpt: 'Diskussion über einheitliche Gendersprache in verschiedenen ZDF-Formaten und Zielgruppen...',
    author: 'Andrea Schmidt',
    date: '1 Tag',
    category: 'Text',
    tags: ['Gendern', 'Richtlinien', 'Sprache'],
    replies: 18,
    views: 512,
    isPinned: false
  },
  {
    id: 19,
    title: 'KI-Texttools – ChatGPT & Co. im Redaktionsalltag',
    excerpt: 'Wie nutzt ihr KI-Tools für Recherche und Texterstellung? Grenzen und Möglichkeiten...',
    author: 'Robert Klein',
    date: '2 Tage',
    category: 'Text',
    tags: ['KI', 'ChatGPT', 'Redaktion'],
    replies: 14,
    views: 389,
    isPinned: false
  },
  {
    id: 20,
    title: 'Untertitel-Standards für Social Media',
    excerpt: 'Welche Formatierung nutzt ihr für Instagram, TikTok etc.? Lesbarkeit vs. Platz optimieren...',
    author: 'Melanie Bauer',
    date: '5 Tage',
    category: 'Text',
    tags: ['Untertitel', 'Social', 'Format'],
    replies: 9,
    views: 267,
    isPinned: false
  }
];

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedThread, setSelectedThread] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 6;
  const [threadList, setThreadList] = useState(initialThreads);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newTags, setNewTags] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<{[key: number]: Array<{id: number, author: string, text: string, timestamp: string}>}>({});

  // Initialize from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const q = params.get('q');
    if (cat) setSelectedCategory(cat);
    if (q) setSearchQuery(q);
  }, []);

  // Sync to URL when filters change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory); else params.delete('category');
    if (searchQuery) params.set('q', searchQuery); else params.delete('q');
    const query = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
  }, [selectedCategory, searchQuery]);

  // Filter threads based on selected category
  const filteredThreads = threadList.filter(thread => {
    // First filter by search query
    const matchesSearch = searchQuery === '' || 
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Then filter by category
    if (selectedCategory === 'all') return matchesSearch;
    const categoryMap: { [key: string]: string } = {
      'general': 'Allgemein',
      'video': 'Video',
      'graphics': 'Grafik',
      'audio': 'Audio',
      'text': 'Text'
    };
    
    return matchesSearch && thread.category === categoryMap[selectedCategory];
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);
  const startIndex = (currentPage - 1) * threadsPerPage;
  const endIndex = startIndex + threadsPerPage;
  const currentThreads = filteredThreads.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);
  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : Users;
  };

  const handleThreadClick = (threadId: number) => {
    setSelectedThread(threadId);
  };

  const handleBackToForum = () => {
    setSelectedThread(null);
  };

  // If a thread is selected, show thread detail view
  if (selectedThread) {
    const thread = threadList.find(t => t.id === selectedThread);
    if (!thread) return null;

    const CategoryIcon = getCategoryIcon(thread.category);

    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <NotificationDropdown count={3} />
            
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
                Leitfäden
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Redaktions-Workflows</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Styleguide (CI/CD)</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Barrierefreiheit (WCAG)</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">API-Dokumentation</a>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <a href="/forum" className="text-gray-800 hover:text-gray-900 transition-colors font-medium text-xl">
                Forum
              </a>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
                Compliance
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</a>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
                Changelog
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</a>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
                Support
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</Link>
                  <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</Link>
                  <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Thread Detail Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
              onClick={handleBackToForum}
              className="flex items-center gap-2 text-gray-800 hover:text-gray-900 mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Zurück zum Forum
            </button>

            {/* Thread Header */}
            <div className="bg-gray-600 rounded-xl p-8 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {thread.isPinned && (
                    <span className="bg-[#E37222] text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                      <Pin className="w-4 h-4" />
                      Angepinnt
                    </span>
                  )}
                  <CategoryIcon className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-400">{thread.category}</span>
                </div>
                <span className="text-gray-400">{thread.date}</span>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">{thread.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-300">von {thread.author}</span>
                  <div className="flex gap-2">
                    {thread.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-lg text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5" />
                    <span>{thread.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-5 h-5" />
                    <span>{thread.views}</span>
                  </div>
                </div>
              </div>

              {/* Thread Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 text-lg leading-relaxed">
                  {thread.id === 1 ? (
                    <div className="space-y-6">
                      <p>Hier ist eine umfassende Sammlung bewährter Methoden für effiziente Upload-Workflows und automatische Transkription im ZDF-Umfeld.</p>
                      
                      <h3 className="text-xl font-semibold text-white">📤 Upload Best Practices</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li><strong>Dateiformat:</strong> MP4 (H.264) für beste Kompatibilität</li>
                        <li><strong>Auflösung:</strong> Mindestens 1080p für Broadcast-Qualität</li>
                        <li><strong>Bitrate:</strong> 8-12 Mbps für optimale Qualität/Größe Balance</li>
                        <li><strong>Audio:</strong> 48kHz, 16-bit, Stereo oder 5.1</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-white">🎯 Transkriptions-Workflow</h3>
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Upload über das zentrale Media Portal</li>
                        <li>Automatische Spracherkennung startet nach Upload</li>
                        <li>Erste Transkription nach ca. 10-15 Minuten verfügbar</li>
                        <li>Manuelle Nachbearbeitung für 95%+ Genauigkeit</li>
                        <li>Export in verschiedene Untertitel-Formate</li>
                      </ol>

                      <h3 className="text-xl font-semibold text-white">⚡ Tipps für bessere Ergebnisse</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>Klare Aussprache und wenig Hintergrundgeräusche</li>
                        <li>Hochdeutsch wird besser erkannt als Dialekte</li>
                        <li>Fachbegriffe vorab im System hinterlegen</li>
                        <li>Bei Interviews: Separate Mikrofone für bessere Trennung</li>
                      </ul>

                      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-6">
                        <p className="text-blue-200"><strong>💡 Pro-Tipp:</strong> Nutzt die Batch-Upload Funktion für mehrere Dateien gleichzeitig. Das spart Zeit und die Transkription läuft parallel ab.</p>
                      </div>
                    </div>
                  ) : (
                    <p>{thread.excerpt}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Replies Section */}
            <div className="bg-gray-600 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Antworten ({thread.replies + (replies[thread.id]?.length || 0)})</h2>

              {/* Render example replies only for vorhandene Threads mit Replies */}
              {thread.replies > 0 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-semibold">
                        MH
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-white">Max Hoffmann</span>
                          <span className="text-gray-400 text-sm">vor 1 Std.</span>
                        </div>
                        <p className="text-gray-300">
                          Sehr hilfreicher Leitfaden! Eine Frage zur Batch-Upload Funktion: Gibt es eine Begrenzung für die Anzahl der Dateien?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-700 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-semibold">
                        AM
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-white">Anna Müller</span>
                          <span className="text-gray-400 text-sm">vor 45 Min.</span>
                          <span className="bg-[#E37222] text-white px-2 py-1 rounded text-xs">Autor</span>
                        </div>
                        <p className="text-gray-300">
                          @Max Hoffmann Aktuell sind bis zu 50 Dateien gleichzeitig möglich. Bei größeren Mengen empfehle ich, sie in Batches aufzuteilen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Render user replies */}
              {replies[thread.id] && replies[thread.id].length > 0 && (
                <div className="space-y-6 mt-6">
                  {replies[thread.id].map((reply) => (
                    <div key={reply.id} className="border-b border-gray-700 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#E37222]/20 text-[#E37222] flex items-center justify-center text-sm font-semibold">
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-white">{reply.author}</span>
                            <span className="text-gray-400 text-sm">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-300">{reply.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Antworten</h3>
                <div className="space-y-4">
                  <textarea
                    placeholder="Ihre Antwort..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#E37222] focus:border-transparent"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => {
                        if (replyText.trim()) {
                          const newReply = {
                            id: Date.now(),
                            author: 'Du',
                            text: replyText.trim(),
                            timestamp: 'jetzt'
                          };
                          setReplies(prev => ({
                            ...prev,
                            [thread.id]: [...(prev[thread.id] || []), newReply]
                          }));
                          setReplyText('');
                        }
                      }}
                      className="bg-[#E37222] hover:bg-[#D86A1F] text-white px-6 py-2"
                    >
                      Antwort senden
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Zurück</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-700 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-200">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          <NavigationDropdown
            label="Leitfäden"
            items={[
              { href: '/leitfaeden/redaktions-workflows', label: 'Redaktions-Workflows' },
              { href: '/leitfaeden/styleguide', label: 'Styleguide (CI/CD)' },
              { href: '/leitfaeden/barrierefreiheit', label: 'Barrierefreiheit (WCAG)' },
              { href: '/leitfaeden/api-dokumentation', label: 'API-Dokumentation' }
            ]}
          />
          
          <div className="relative group">
            <a href="/forum" className="text-gray-800 hover:text-gray-900 transition-colors font-medium text-xl">
              Forum
            </a>
          </div>
          
          <NavigationDropdown
            label="Compliance"
            items={[
              { href: '/compliance/bild-musikrechte', label: 'Bild- & Musikrechte' },
              { href: '/compliance/datenschutz', label: 'Datenschutz & DSGVO' },
              { href: '/compliance/archiv-lizenzen', label: 'Archiv & Lizenzen' }
            ]}
          />
          
          <NavigationDropdown
            label="Changelog"
            items={[
              { href: '/changelog/systemstatus', label: 'Systemstatus' },
              { href: '/changelog/release-notes', label: 'Release Notes' },
              { href: '/changelog/roadmap', label: 'Roadmap' }
            ]}
          />
          
          <NavigationDropdown
            label="Support"
            items={[
              { href: '/support/hilfe-center', label: 'Hilfe-Center' },
              { href: '/support/ticket', label: 'Ticket erstellen' },
              { href: '/support/onboarding', label: 'Onboarding & Schulungen' }
            ]}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Forum</h1>
            <p className="text-xl text-gray-700">
              Fragen stellen, Antworten finden, Wissen teilen – CI-konform und übersichtlich
            </p>
          </div>
          <Button onClick={() => setIsCreateOpen(true)} className="bg-[#E37222] hover:bg-[#D86A1F] text-white px-6 py-3 rounded-xl font-medium text-lg">
            <Plus className="w-5 h-5 mr-2" />
            Neues Thema
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Suchen (Titel, Inhalt, Tags)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl text-lg"
            />
          </div>

          {/* Filter Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Kategorien:</span>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#E37222] text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 appearance-none pr-10"
              >
                <option value="newest">Neueste</option>
                <option value="replies">Antworten</option>
                <option value="views">Aufrufe</option>
                <option value="alphabetical">A–Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column - Threads */}
          <div className="lg:col-span-2 space-y-4">
            {currentThreads.map((thread, index) => {
              const CategoryIcon = getCategoryIcon(thread.category);
              const isEven = index % 2 === 0;
              return (
                <div
                  key={thread.id}
                  className={`${isEven ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-500 hover:bg-gray-400'} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer`}
                  onClick={() => handleThreadClick(thread.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {thread.isPinned && (
                        <span className="bg-[#E37222] text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                          <Pin className="w-3 h-3" />
                          Angepinnt
                        </span>
                      )}
                      <CategoryIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400 text-sm">{thread.category}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{thread.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 hover:text-[#E37222] transition-colors">
                    {thread.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {thread.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm">von {thread.author}</span>
                      <div className="flex gap-2">
                        {thread.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => { e.stopPropagation(); setSearchQuery(tag); setCurrentPage(1); }}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-600"
                            title={`Nach #${tag} filtern`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{thread.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{thread.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              <div className="text-gray-400">
                Seite {currentPage} von {totalPages} ({filteredThreads.length} Threads)
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="text-gray-400 border-gray-600 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Zurück
                </Button>
                
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page 
                      ? "bg-[#E37222] text-white" 
                      : "text-gray-400 border-gray-600 hover:bg-gray-700"
                    }
                  >
                    {page}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="text-gray-400 border-gray-600 disabled:opacity-50"
                >
                  Vor
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories Box */}
            <div className="bg-gray-600 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kategorien</h3>
              <div className="space-y-3">
                {categories.slice(1).map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => { setSelectedCategory(category.id); setCurrentPage(1); }}
                      className={`w-full text-left flex items-center gap-3 p-2 rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-[#E37222]/20 border border-[#E37222]/40' : 'hover:bg-gray-700'}`}
                    >
                      <Icon className="w-5 h-5 text-[#E37222]" />
                      <div>
                        <div className="text-white font-medium">{category.name}</div>
                        <div className="text-gray-400 text-sm">{category.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Tags Box */}
            <div className="bg-gray-600 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Beliebte Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSearchQuery(tag.replace('#', '')); setCurrentPage(1); }}
                    className="bg-gray-700 hover:bg-[#E37222] text-gray-300 hover:text-white px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors"
                    title={`Nach ${tag} filtern`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Forum Rules Box */}
            <div className="bg-gray-600 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Hinweise</h3>
              <ul className="space-y-2">
                {forumRules.map((rule, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-[#E37222] mt-1">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Create Thread Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Neues Thema erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Titel" className="bg-white border-gray-300 text-gray-900 placeholder-gray-500" />
            <Textarea value={newExcerpt} onChange={(e) => setNewExcerpt(e.target.value)} placeholder="Kurzbeschreibung" className="bg-white border-gray-300 text-gray-900 placeholder-gray-500" />
            <div className="grid grid-cols-2 gap-3">
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border rounded p-2 border-gray-300 text-gray-900 bg-white">
                <option value="general">Allgemein</option>
                <option value="video">Video</option>
                <option value="graphics">Grafik</option>
                <option value="audio">Audio</option>
                <option value="text">Text</option>
              </select>
              <Input value={newTags} onChange={(e) => setNewTags(e.target.value)} placeholder="Tags, Komma-getrennt" className="bg-white border-gray-300 text-gray-900 placeholder-gray-500" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Abbrechen</Button>
              <Button
                onClick={() => {
                  if (!newTitle.trim()) return;
                  const categoryMap: { [key: string]: string } = {
                    general: 'Allgemein',
                    video: 'Video',
                    graphics: 'Grafik',
                    audio: 'Audio',
                    text: 'Text'
                  };
                  const next = {
                    id: Math.max(...threadList.map(t => t.id)) + 1,
                    title: newTitle.trim(),
                    excerpt: newExcerpt.trim() || '—',
                    author: 'Du',
                    date: 'jetzt',
                    category: categoryMap[newCategory],
                    tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
                    replies: 0,
                    views: 0,
                    isPinned: false
                  };
                  setThreadList([next, ...threadList]);
                  setIsCreateOpen(false);
                  setNewTitle('');
                  setNewExcerpt('');
                  setNewCategory('general');
                  setNewTags('');
                }}
                className="bg-[#E37222] text-white"
              >
                Erstellen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}