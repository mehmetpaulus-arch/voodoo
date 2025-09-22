import { NextRequest, NextResponse } from 'next/server';

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

// Mock data for search - in a real app this would come from a database
const searchableContent: SearchResult[] = [
  // Tools
  {
    id: 'transcription',
    title: 'KI-Transkription mit Whisper AI',
    description: 'Audio- und Videomaterial automatisch verschriftlichen',
    url: '/transcription',
    type: 'tool',
    category: 'Content Creation',
    tags: ['transcription', 'audio', 'video', 'whisper', 'ai', 'automatisch'],
    relevance: 0
  },
  {
    id: 'factchecking',
    title: 'Wissenschaftliches Factchecking',
    description: 'KI-gestützte Faktenprüfung mit wissenschaftlichen Quellen',
    url: '/factchecking',
    type: 'tool',
    category: 'Content Verification',
    tags: ['factcheck', 'faktenprüfung', 'wissenschaftlich', 'quellen', 'verifikation'],
    relevance: 0
  },
  {
    id: 'rechtschreibung',
    title: 'Rechtschreibung & Grammatik',
    description: 'Professionelle Textprüfung mit LanguageTool',
    url: '/rechtschreibung',
    type: 'tool',
    category: 'Content Creation',
    tags: ['rechtschreibung', 'grammatik', 'textprüfung', 'languagetool', 'korrektur'],
    relevance: 0
  },
  
  // Content Pages
  {
    id: 'content',
    title: 'Content Management',
    description: 'Verwalten Sie Ihre Inhalte und Medien',
    url: '/content',
    type: 'page',
    category: 'Content Management',
    tags: ['content', 'medien', 'verwaltung', 'management'],
    relevance: 0
  },
  {
    id: 'studio',
    title: 'Studio & Produktion',
    description: 'Produktionswerkzeuge und Studio-Management',
    url: '/studio',
    type: 'page',
    category: 'Production',
    tags: ['studio', 'produktion', 'werkzeuge', 'management'],
    relevance: 0
  },
  {
    id: 'library',
    title: 'Mediathek',
    description: 'Zugriff auf die ZDF-Mediathek und Archive',
    url: '/library',
    type: 'page',
    category: 'Content Management',
    tags: ['mediathek', 'archive', 'zugriff', 'medien'],
    relevance: 0
  },
  
  // Help & Support
  {
    id: 'hilfe-center',
    title: 'Hilfe-Center',
    description: 'Hilfe und Support für alle Funktionen',
    url: '/support/hilfe-center',
    type: 'help',
    category: 'Support',
    tags: ['hilfe', 'support', 'anleitung', 'tutorial'],
    relevance: 0
  },
  {
    id: 'leitfaeden',
    title: 'Leitfäden & Workflows',
    description: 'Redaktions-Workflows und Styleguides',
    url: '/leitfaeden',
    type: 'help',
    category: 'Guidelines',
    tags: ['leitfäden', 'workflows', 'styleguide', 'redaktion'],
    relevance: 0
  },
  
  // Forum & Community
  {
    id: 'forum',
    title: 'Community Forum',
    description: 'Austausch mit Kollegen und Diskussionen',
    url: '/forum',
    type: 'page',
    category: 'Community',
    tags: ['forum', 'community', 'austausch', 'diskussion'],
    relevance: 0
  },
  
  // Compliance & Legal
  {
    id: 'compliance',
    title: 'Compliance & Rechtliches',
    description: 'Bildrechte, Datenschutz und rechtliche Aspekte',
    url: '/compliance',
    type: 'page',
    category: 'Compliance',
    tags: ['compliance', 'rechtlich', 'bildrechte', 'datenschutz', 'dsgvo'],
    relevance: 0
  },
  
  // Additional Tools and Features
  {
    id: 'headlines',
    title: 'Headlines & Teaser',
    description: 'Erstelle ansprechende Überschriften und Teaser',
    url: '/headlines',
    type: 'tool',
    category: 'Content Creation',
    tags: ['headlines', 'teaser', 'überschriften', 'titel', 'text'],
    relevance: 0
  },
  {
    id: 'slideshows',
    title: 'Slideshows & Präsentationen',
    description: 'Erstelle interaktive Slideshows und Präsentationen',
    url: '/slideshows',
    type: 'tool',
    category: 'Content Creation',
    tags: ['slideshow', 'präsentation', 'folien', 'interaktiv'],
    relevance: 0
  },
  {
    id: 'reels',
    title: 'Reels & Shorts',
    description: 'Erstelle kurze Video-Inhalte für Social Media',
    url: '/reels',
    type: 'tool',
    category: 'Content Creation',
    tags: ['reels', 'shorts', 'video', 'social media', 'kurz'],
    relevance: 0
  },
  {
    id: 'growth',
    title: 'Growth & Analytics',
    description: 'Analysiere Performance und Wachstum deiner Inhalte',
    url: '/growth',
    type: 'page',
    category: 'Analytics',
    tags: ['growth', 'analytics', 'performance', 'wachstum', 'statistiken'],
    relevance: 0
  },
  {
    id: 'performance',
    title: 'Performance Monitoring',
    description: 'Überwache die Performance deiner Inhalte',
    url: '/performance',
    type: 'page',
    category: 'Analytics',
    tags: ['performance', 'monitoring', 'überwachung', 'metriken'],
    relevance: 0
  },
  {
    id: 'operations',
    title: 'Operations & Workflow',
    description: 'Verwalte deine Arbeitsabläufe und Operationen',
    url: '/operations',
    type: 'page',
    category: 'Management',
    tags: ['operations', 'workflow', 'abläufe', 'management'],
    relevance: 0
  },
  {
    id: 'distribution',
    title: 'Distribution & Publishing',
    description: 'Verteile deine Inhalte auf verschiedenen Kanälen',
    url: '/distribution',
    type: 'page',
    category: 'Publishing',
    tags: ['distribution', 'publishing', 'verteilung', 'kanäle'],
    relevance: 0
  },
  {
    id: 'innovation',
    title: 'Innovation Lab',
    description: 'Experimentiere mit neuen Technologien und Formaten',
    url: '/innovation',
    type: 'page',
    category: 'Research',
    tags: ['innovation', 'experiment', 'technologie', 'forschung'],
    relevance: 0
  },
  {
    id: 'profile',
    title: 'Profil & Einstellungen',
    description: 'Verwalte dein Profil und deine Einstellungen',
    url: '/profile',
    type: 'page',
    category: 'Account',
    tags: ['profil', 'einstellungen', 'account', 'benutzer'],
    relevance: 0
  },
  
  // Brainstorming & Creative Tools
  {
    id: 'brainstorming',
    title: 'Brainstorming & Ideenfindung',
    description: 'Generiere kreative Ideen und Konzepte für deine Projekte',
    url: '/brainstorming',
    type: 'tool',
    category: 'Creative',
    tags: ['brainstorming', 'ideen', 'kreativität', 'konzept', 'planung', 'innovation'],
    relevance: 0
  }
];

function calculateRelevance(query: string, result: SearchResult): number {
  const queryLower = query.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
  let score = 0;
  
  // Exact title match gets highest score
  if (result.title.toLowerCase().includes(queryLower)) {
    score += 100;
  }
  
  // Word-by-word title matching
  queryWords.forEach(word => {
    if (result.title.toLowerCase().includes(word)) {
      score += 80;
    }
  });
  
  // Exact description match
  if (result.description.toLowerCase().includes(queryLower)) {
    score += 50;
  }
  
  // Word-by-word description matching
  queryWords.forEach(word => {
    if (result.description.toLowerCase().includes(word)) {
      score += 30;
    }
  });
  
  // Tag matches with higher weight for exact matches
  result.tags.forEach(tag => {
    const tagLower = tag.toLowerCase();
    if (tagLower === queryLower) {
      score += 60; // Exact tag match
    } else if (tagLower.includes(queryLower)) {
      score += 40; // Partial tag match
    } else {
      // Word-by-word tag matching
      queryWords.forEach(word => {
        if (tagLower.includes(word)) {
          score += 25;
        }
      });
    }
  });
  
  // Category match
  if (result.category.toLowerCase().includes(queryLower)) {
    score += 20;
  }
  
  // Type match
  if (result.type.toLowerCase().includes(queryLower)) {
    score += 10;
  }
  
  // Bonus for exact ID match
  if (result.id.toLowerCase() === queryLower) {
    score += 150;
  }
  
  // Bonus for partial ID match
  if (result.id.toLowerCase().includes(queryLower)) {
    score += 120;
  }
  
  return score;
}

function searchContent(query: string, limit: number = 10): SearchResult[] {
  if (!query.trim()) {
    // Return popular/recent items when no query
    return searchableContent
      .filter(item => ['transcription', 'factchecking', 'rechtschreibung', 'content', 'studio'].includes(item.id))
      .slice(0, limit);
  }
  
  const results = searchableContent
    .map(result => ({
      ...result,
      relevance: calculateRelevance(query, result)
    }))
    .filter(result => result.relevance > 0)
    .sort((a, b) => {
      // First sort by relevance
      if (b.relevance !== a.relevance) {
        return b.relevance - a.relevance;
      }
      // Then by type priority (tools first, then pages, etc.)
      const typePriority = { tool: 4, page: 3, help: 2, content: 1 };
      return (typePriority[b.type] || 0) - (typePriority[a.type] || 0);
    })
    .slice(0, limit);
  
  return results;
}

// Enhanced search with synonyms and fuzzy matching
function enhancedSearch(query: string, limit: number = 10): SearchResult[] {
  if (!query.trim()) {
    return searchContent(query, limit);
  }
  
  const queryLower = query.toLowerCase().trim();
  
  // Define synonyms and related terms
  const synonyms: { [key: string]: string[] } = {
    'transcription': ['transkription', 'verschriftlichung', 'audio', 'video', 'whisper'],
    'factcheck': ['faktenprüfung', 'factchecking', 'verifikation', 'prüfung', 'wahrheit'],
    'rechtschreibung': ['grammatik', 'textprüfung', 'korrektur', 'sprache', 'languagetool'],
    'content': ['inhalt', 'medien', 'material', 'assets'],
    'studio': ['produktion', 'aufnahme', 'bearbeitung', 'post'],
    'library': ['mediathek', 'archiv', 'sammlung', 'datenbank'],
    'forum': ['community', 'diskussion', 'austausch', 'chat'],
    'compliance': ['rechtlich', 'dsgvo', 'datenschutz', 'bildrechte'],
    'help': ['hilfe', 'support', 'anleitung', 'tutorial'],
    'brainstorming': ['ideen', 'konzept', 'planung', 'kreativität', 'content', 'studio', 'innovation'],
    'video': ['film', 'clip', 'aufnahme', 'produktion'],
    'audio': ['ton', 'sound', 'musik', 'podcast'],
    'text': ['schrift', 'dokument', 'artikel', 'content'],
    'analytics': ['statistiken', 'daten', 'metriken', 'auswertung'],
    'performance': ['leistung', 'geschwindigkeit', 'optimierung'],
    'workflow': ['ablauf', 'prozess', 'routine', 'automatisierung']
  };
  
  // Expand query with synonyms
  const expandedTerms = [queryLower];
  Object.keys(synonyms).forEach(key => {
    if (queryLower.includes(key) || synonyms[key].some(syn => queryLower.includes(syn))) {
      expandedTerms.push(...synonyms[key]);
    }
  });
  
  // Search with expanded terms
  let allResults: SearchResult[] = [];
  
  expandedTerms.forEach(term => {
    const termResults = searchContent(term, limit * 2);
    allResults = [...allResults, ...termResults];
  });
  
  // Remove duplicates and recalculate relevance
  const uniqueResults = allResults.reduce((acc, result) => {
    const existing = acc.find(r => r.id === result.id);
    if (existing) {
      existing.relevance = Math.max(existing.relevance, result.relevance);
    } else {
      acc.push({ ...result, relevance: calculateRelevance(queryLower, result) });
    }
    return acc;
  }, [] as SearchResult[]);
  
  // Sort and limit results
  return uniqueResults
    .sort((a, b) => {
      if (b.relevance !== a.relevance) {
        return b.relevance - a.relevance;
      }
      const typePriority = { tool: 4, page: 3, help: 2, content: 1 };
      return (typePriority[b.type] || 0) - (typePriority[a.type] || 0);
    })
    .slice(0, limit);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    const enhanced = searchParams.get('enhanced') === 'true';
    
    const results = enhanced ? enhancedSearch(query, limit) : searchContent(query, limit);
    
    return NextResponse.json({
      query,
      results,
      total: results.length,
      enhanced,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10, filters = {}, enhanced = true } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }
    
    let results = enhanced ? enhancedSearch(query, limit) : searchContent(query, limit);
    
    // Apply filters
    if (filters.type) {
      results = results.filter(result => result.type === filters.type);
    }
    
    if (filters.category) {
      results = results.filter(result => result.category === filters.category);
    }
    
    return NextResponse.json({
      query,
      results,
      total: results.length,
      filters,
      enhanced,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
