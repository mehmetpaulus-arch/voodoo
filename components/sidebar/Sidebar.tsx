'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, ChevronLeft, Search, X, ArrowRight, FileText, Wrench, BookOpen, Users } from 'lucide-react';
import dynamic from 'next/dynamic';
import { TooltipProvider } from '@/components/ui/tooltip';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfileCard from './ProfileCard';

const MotionAside = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.aside),
  { ssr: false }
);

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'tool' | 'content' | 'help';
  category: string;
  tags: string[];
  relevance: number;
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Search functionality
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=6&enhanced=true`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInput = (value: string) => {
    setSearchValue(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tool': return <Wrench className="w-3 h-3" />;
      case 'page': return <FileText className="w-3 h-3" />;
      case 'help': return <BookOpen className="w-3 h-3" />;
      case 'content': return <Users className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tool': return 'text-blue-400 bg-blue-100/20';
      case 'page': return 'text-green-400 bg-green-100/20';
      case 'help': return 'text-purple-400 bg-purple-100/20';
      case 'content': return 'text-orange-400 bg-orange-100/20';
      default: return 'text-gray-400 bg-gray-100/20';
    }
  };

  const handleResultClick = (url: string) => {
    setSearchValue('');
    setSearchResults([]);
    setShowSearchResults(false);
    router.push(url);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <TooltipProvider>
      <MotionAside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="border-r border-gray-800 flex flex-col h-screen sticky top-0 font-sans"
        style={{ backgroundColor: '#0D1218' }}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Logo isCollapsed={isCollapsed} />
        </div>

        {/* Search Section */}
        {!isCollapsed && (
          <div className="px-4 pb-4">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Suchen ..."
                value={searchValue}
                onChange={(e) => handleSearchInput(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-10 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FA7D19]/50 focus:border-[#FA7D19] transition-colors text-sm"
              />
              {searchValue && (
                <button
                  onClick={() => {
                    setSearchValue('');
                    setSearchResults([]);
                    setShowSearchResults(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search Results Dropdown */}
              {showSearchResults && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-3 text-center text-gray-400">
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <p className="text-xs mt-1">Suche läuft...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="p-1">
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result.url)}
                          className="w-full p-2 rounded-md hover:bg-gray-700/50 transition-colors group text-left"
                        >
                          <div className="flex items-start gap-2">
                            <div className={`p-1.5 rounded ${getTypeColor(result.type)}`}>
                              {getTypeIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-0.5">
                                <h4 className="text-sm font-medium text-white group-hover:text-[#FA7D19] transition-colors truncate">
                                  {result.title}
                                </h4>
                                <span className="text-xs text-gray-500 bg-gray-700 px-1.5 py-0.5 rounded">
                                  {result.type}
                                </span>
                              </div>
                              <p className="text-xs text-gray-300 line-clamp-1">
                                {result.description}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-gray-500">{result.category}</span>
                                <ArrowRight className="w-2.5 h-2.5 text-gray-500 group-hover:text-[#FA7D19] transition-colors" />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-400">
                      <Search className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      <p className="text-xs">Keine Ergebnisse gefunden</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto">
          <Navigation isCollapsed={isCollapsed} currentPath={pathname} />
          
          {/* Recent Activity Section */}
          {isCollapsed ? (
            /* Collapsed state - just show colored dots */
            <div className="px-3 mt-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          ) : (
            /* Expanded state - full recent activity */
            <div className="px-4 pb-4 mt-8">
              <div className="text-base font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                Zuletzt geöffnet
              </div>
              <div className="space-y-2">
                <Link href="/projects/reel-nachrichten-teaser" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-white truncate">
                      Reel – Nachrichten Teaser (heute 19:00)
                    </div>
                    <div className="text-sm text-gray-400">
                      vor 2 Std. • Clip
                    </div>
                  </div>
                </Link>
                
                <Link href="/projects/wahl-2025-kampagne" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-white truncate">
                      Projekt – Wahl 2025 Kampagne
                    </div>
                    <div className="text-sm text-gray-400">
                      gestern • Projekt
                    </div>
                  </div>
                </Link>
                
                <Link href="/projects/storyboard-millats-barbershop" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-white truncate">
                      Storyboard – Millats Barbershop-Besuch
                    </div>
                    <div className="text-sm text-gray-400">
                      vor 3 Tagen • Dokument
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="flex-shrink-0">
          <ProfileCard isCollapsed={isCollapsed} />
        </div>

        {/* Expand Button (when collapsed) */}
        {isCollapsed && (
          <div className="p-3 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Sidebar erweitern"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Collapse Button (when expanded) */}
        {!isCollapsed && (
          <div className="p-3 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              aria-label="Sidebar einklappen"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </MotionAside>
    </TooltipProvider>
  );
}