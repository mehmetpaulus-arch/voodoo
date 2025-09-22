import { Source } from './types';

export interface SearchConfig {
  maxResults: number;
  language: string;
  timeRange?: {
    start: Date;
    end: Date;
  };
  domains?: string[];
  excludeDomains?: string[];
}

export interface KnowledgeBaseConfig {
  elasticsearchUrl?: string;
  postgresUrl?: string;
  vectorModel?: string;
}

export class RetrievalSystem {
  private searchConfig: SearchConfig;
  private kbConfig: KnowledgeBaseConfig;
  private webSearchApiKey?: string;
  private serpApiKey?: string;
  private tavilyApiKey?: string;

  constructor(
    searchConfig: SearchConfig,
    kbConfig: KnowledgeBaseConfig = {},
    apiKeys: {
      webSearch?: string;
      serpApi?: string;
      tavily?: string;
    } = {}
  ) {
    this.searchConfig = searchConfig;
    this.kbConfig = kbConfig;
    this.webSearchApiKey = apiKeys.webSearch;
    this.serpApiKey = apiKeys.serpApi;
    this.tavilyApiKey = apiKeys.tavily;
  }

  async retrieveSources(claims: string[]): Promise<Source[]> {
    const allSources: Source[] = [];

    // Retrieve from web search
    const webSources = await this.searchWeb(claims);
    allSources.push(...webSources);

    // Retrieve from knowledge base
    const kbSources = await this.searchKnowledgeBase(claims);
    allSources.push(...kbSources);

    // Deduplicate and rank sources
    return this.deduplicateAndRank(allSources);
  }

  private async searchWeb(claims: string[]): Promise<Source[]> {
    const sources: Source[] = [];

    for (const claim of claims) {
      try {
        // Try multiple search engines for better coverage
        const bingResults = await this.searchBing(claim);
        sources.push(...bingResults);

        const serpResults = await this.searchSerpAPI(claim);
        sources.push(...serpResults);

        const tavilyResults = await this.searchTavily(claim);
        sources.push(...tavilyResults);

        // Add delay between searches to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Web search failed for claim: ${claim}`, error);
      }
    }

    return sources;
  }

  private async searchBing(query: string): Promise<Source[]> {
    if (!this.webSearchApiKey) {
      console.log('Bing API key not provided, skipping Bing search');
      return [];
    }

    try {
      // Mock Bing search - in real implementation, use actual Bing Search API
      const mockResults: Source[] = [
        {
          id: `bing-${Date.now()}-1`,
          url: `https://example.com/bing-result-1`,
          title: `Bing Search Result for: ${query}`,
          domain: 'example.com',
          publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          author: 'Mock Author',
          type: 'secondary',
          reliability: 0.7,
          content: `Mock content from Bing search for query: ${query}`,
          snippet: `Mock snippet: ${query.substring(0, 100)}...`,
          metadata: {
            language: this.searchConfig.language,
            searchEngine: 'bing'
          }
        }
      ];

      return mockResults;
    } catch (error) {
      console.error('Bing search error:', error);
      return [];
    }
  }

  private async searchSerpAPI(query: string): Promise<Source[]> {
    if (!this.serpApiKey) {
      console.log('SerpAPI key not provided, skipping SerpAPI search');
      return [];
    }

    try {
      // Mock SerpAPI search - in real implementation, use actual SerpAPI
      const mockResults: Source[] = [
        {
          id: `serp-${Date.now()}-1`,
          url: `https://example.com/serp-result-1`,
          title: `SerpAPI Search Result for: ${query}`,
          domain: 'example.com',
          publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          author: 'Mock Author',
          type: 'secondary',
          reliability: 0.8,
          content: `Mock content from SerpAPI search for query: ${query}`,
          snippet: `Mock snippet: ${query.substring(0, 100)}...`,
          metadata: {
            language: this.searchConfig.language,
            searchEngine: 'serpapi'
          }
        }
      ];

      return mockResults;
    } catch (error) {
      console.error('SerpAPI search error:', error);
      return [];
    }
  }

  private async searchTavily(query: string): Promise<Source[]> {
    if (!this.tavilyApiKey) {
      console.log('Tavily API key not provided, skipping Tavily search');
      return [];
    }

    try {
      // Mock Tavily search - in real implementation, use actual Tavily API
      const mockResults: Source[] = [
        {
          id: `tavily-${Date.now()}-1`,
          url: `https://example.com/tavily-result-1`,
          title: `Tavily Search Result for: ${query}`,
          domain: 'example.com',
          publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          author: 'Mock Author',
          type: 'secondary',
          reliability: 0.75,
          content: `Mock content from Tavily search for query: ${query}`,
          snippet: `Mock snippet: ${query.substring(0, 100)}...`,
          metadata: {
            language: this.searchConfig.language,
            searchEngine: 'tavily'
          }
        }
      ];

      return mockResults;
    } catch (error) {
      console.error('Tavily search error:', error);
      return [];
    }
  }

  private async searchKnowledgeBase(claims: string[]): Promise<Source[]> {
    const sources: Source[] = [];

    // Search Elasticsearch if configured
    if (this.kbConfig.elasticsearchUrl) {
      const esSources = await this.searchElasticsearch(claims);
      sources.push(...esSources);
    }

    // Search PostgreSQL with pgvector if configured
    if (this.kbConfig.postgresUrl) {
      const pgSources = await this.searchPostgreSQL(claims);
      sources.push(...pgSources);
    }

    return sources;
  }

  private async searchElasticsearch(claims: string[]): Promise<Source[]> {
    try {
      // Mock Elasticsearch search - in real implementation, use actual ES client
      const mockResults: Source[] = claims.map((claim, index) => ({
        id: `es-${Date.now()}-${index}`,
        url: `https://internal-kb.example.com/document-${index}`,
        title: `Internal Knowledge Base: ${claim.substring(0, 50)}...`,
        domain: 'internal-kb.example.com',
        publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        author: 'Internal System',
        type: 'primary',
        reliability: 0.9,
        content: `Internal knowledge base content for: ${claim}`,
        snippet: `Internal snippet: ${claim.substring(0, 100)}...`,
        metadata: {
          language: this.searchConfig.language,
          source: 'elasticsearch',
          category: 'internal'
        }
      }));

      return mockResults;
    } catch (error) {
      console.error('Elasticsearch search error:', error);
      return [];
    }
  }

  private async searchPostgreSQL(claims: string[]): Promise<Source[]> {
    try {
      // Mock PostgreSQL with pgvector search - in real implementation, use actual DB client
      const mockResults: Source[] = claims.map((claim, index) => ({
        id: `pg-${Date.now()}-${index}`,
        url: `https://vector-db.example.com/embedding-${index}`,
        title: `Vector Database Result: ${claim.substring(0, 50)}...`,
        domain: 'vector-db.example.com',
        publishDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        author: 'Vector System',
        type: 'primary',
        reliability: 0.85,
        content: `Vector database content for: ${claim}`,
        snippet: `Vector snippet: ${claim.substring(0, 100)}...`,
        metadata: {
          language: this.searchConfig.language,
          source: 'postgresql',
          embedding_model: this.kbConfig.vectorModel || 'default',
          similarity_score: 0.8 + Math.random() * 0.2
        }
      }));

      return mockResults;
    } catch (error) {
      console.error('PostgreSQL search error:', error);
      return [];
    }
  }

  private deduplicateAndRank(sources: Source[]): Source[] {
    // Remove duplicates based on URL
    const uniqueSources = new Map<string, Source>();
    sources.forEach(source => {
      if (!uniqueSources.has(source.url)) {
        uniqueSources.set(source.url, source);
      }
    });

    const deduplicatedSources = Array.from(uniqueSources.values());

    // Rank sources by reliability and relevance
    return deduplicatedSources.sort((a, b) => {
      // Primary sources get higher priority
      const typeScore = this.getTypeScore(a.type) - this.getTypeScore(b.type);
      if (typeScore !== 0) return typeScore;

      // Then by reliability
      const reliabilityScore = b.reliability - a.reliability;
      if (reliabilityScore !== 0) return reliabilityScore;

      // Then by recency
      const recencyScore = (b.publishDate?.getTime() || 0) - (a.publishDate?.getTime() || 0);
      return recencyScore;
    }).slice(0, this.searchConfig.maxResults);
  }

  private getTypeScore(type: 'primary' | 'secondary' | 'tertiary'): number {
    switch (type) {
      case 'primary': return 3;
      case 'secondary': return 2;
      case 'tertiary': return 1;
      default: return 0;
    }
  }

  public analyzeRetrievalQuality(sources: Source[]): {
    quality: 'high' | 'medium' | 'low';
    diversity: number;
    recency: number;
    reliability: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];

    if (sources.length === 0) {
      return {
        quality: 'low',
        diversity: 0,
        recency: 0,
        reliability: 0,
        recommendations: ['No sources retrieved - check search configuration and API keys']
      };
    }

    // Calculate diversity (unique domains)
    const domains = new Set(sources.map(s => s.domain));
    const diversity = domains.size / sources.length;

    // Calculate average recency
    const now = Date.now();
    const avgAge = sources.reduce((sum, s) => {
      const age = s.publishDate ? (now - s.publishDate.getTime()) : (365 * 24 * 60 * 60 * 1000);
      return sum + age;
    }, 0) / sources.length;
    const recency = Math.max(0, 1 - (avgAge / (365 * 24 * 60 * 60 * 1000))); // 1 year = 0 recency

    // Calculate average reliability
    const reliability = sources.reduce((sum, s) => sum + s.reliability, 0) / sources.length;

    // Determine quality
    let quality: 'high' | 'medium' | 'low';
    if (diversity > 0.7 && recency > 0.5 && reliability > 0.7) {
      quality = 'high';
      recommendations.push('High-quality source retrieval');
    } else if (diversity > 0.4 && recency > 0.3 && reliability > 0.5) {
      quality = 'medium';
      recommendations.push('Moderate-quality source retrieval');
    } else {
      quality = 'low';
      recommendations.push('Low-quality source retrieval');
    }

    // Add specific recommendations
    if (diversity < 0.5) {
      recommendations.push('Low source diversity - consider expanding search terms');
    }

    if (recency < 0.3) {
      recommendations.push('Sources are outdated - consider time-filtered search');
    }

    if (reliability < 0.6) {
      recommendations.push('Low source reliability - consider filtering by domain authority');
    }

    const primarySources = sources.filter(s => s.type === 'primary').length;
    if (primarySources < sources.length * 0.3) {
      recommendations.push('Limited primary sources - consider knowledge base integration');
    }

    return { quality, diversity, recency, reliability, recommendations };
  }
}

