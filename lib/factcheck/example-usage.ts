import { FactCheckEngine } from './factcheck-engine';
import { FactCheckRequest } from './types';

// Example configuration
const config = {
  // Agent models
  researcherModel: 'gpt-4o',
  skeptikerModel: 'claude-3-haiku-20240307',
  analystModel: 'gpt-4o',
  richterModel: 'gpt-4o',
  
  // Pattern settings
  enableDebate: true,
  enableSelfConsistency: true,
  enableChainOfVerification: true,
  maxDebateRounds: 3,
  selfConsistencyVariations: 3,
  
  // Retrieval settings
  maxSources: 20,
  searchEngines: ['bing', 'serpapi', 'tavily'],
  knowledgeBaseEnabled: true,
  
  // Quality settings
  minSources: 3,
  maxQuoteLength: 25,
  requireDates: true,
  requireAuthors: false,
  
  // API keys (would be loaded from environment in real implementation)
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    wolfram: process.env.WOLFRAM_API_KEY,
    bing: process.env.BING_SEARCH_API_KEY,
    serpapi: process.env.SERPAPI_KEY,
    tavily: process.env.TAVILY_API_KEY
  }
};

// Example usage
export async function exampleFactCheck() {
  // Initialize the fact-checking engine
  const engine = new FactCheckEngine(config);

  // Create a fact-check request
  const request: FactCheckRequest = {
    id: 'example-request-1',
    input: {
      text: 'Die globale Erwärmung hat sich in den letzten 20 Jahren um 0.5°C erhöht. Dies wurde durch eine Studie der NASA bestätigt, die zeigt, dass 2023 das wärmste Jahr seit Beginn der Aufzeichnungen war.',
      language: 'de'
    },
    settings: {
      confidenceThreshold: 0.3,
      maxSources: 10,
      enableDebate: true,
      enableSelfConsistency: true,
      enableChainOfVerification: true
    },
    timestamp: new Date()
  };

  try {
    console.log('Starting fact-check...');
    
    // Perform fact-check
    const result = await engine.factCheck(request);
    
    console.log('Fact-check completed!');
    console.log('Verdict:', result.verdict.overall);
    console.log('Confidence:', result.verdict.confidence);
    console.log('Claims found:', result.claims.length);
    console.log('Evidence collected:', result.evidence.length);
    console.log('Processing time:', result.processingTime, 'ms');
    
    // Generate quality report
    const qualityReport = engine.generateQualityReport(result);
    console.log('Quality Grade:', qualityReport.grade);
    console.log('Quality Score:', (qualityReport.metrics.overallScore * 100).toFixed(1) + '%');
    
    // Get audit report
    const auditReport = engine.getAuditReport(request.id);
    console.log('Total audit entries:', auditReport.summary.totalEntries);
    console.log('Total tokens used:', auditReport.summary.totalTokens);
    console.log('Total processing time:', auditReport.summary.totalDuration, 'ms');
    
    return result;
    
  } catch (error) {
    console.error('Fact-check failed:', error);
    throw error;
  }
}

// Example with video input
export async function exampleVideoFactCheck() {
  const engine = new FactCheckEngine(config);

  const request: FactCheckRequest = {
    id: 'video-request-1',
    input: {
      videoUrl: 'https://example.com/video.mp4',
      language: 'de'
    },
    settings: {
      confidenceThreshold: 0.4,
      maxSources: 15,
      enableDebate: true,
      enableSelfConsistency: false, // Skip for video to save time
      enableChainOfVerification: true
    },
    timestamp: new Date()
  };

  try {
    const result = await engine.factCheck(request);
    return result;
  } catch (error) {
    console.error('Video fact-check failed:', error);
    throw error;
  }
}

// Example with custom quality requirements
export async function exampleStrictFactCheck() {
  const strictConfig = {
    ...config,
    minSources: 5,
    maxQuoteLength: 20,
    requireDates: true,
    requireAuthors: true,
    maxDebateRounds: 5,
    selfConsistencyVariations: 5
  };

  const engine = new FactCheckEngine(strictConfig);

  const request: FactCheckRequest = {
    id: 'strict-request-1',
    input: {
      text: 'Die COVID-19-Impfstoffe haben eine Wirksamkeit von 95% und sind sicher. Dies wurde in klinischen Studien mit über 40.000 Teilnehmern nachgewiesen.',
      language: 'de'
    },
    settings: {
      confidenceThreshold: 0.5,
      maxSources: 20,
      enableDebate: true,
      enableSelfConsistency: true,
      enableChainOfVerification: true
    },
    timestamp: new Date()
  };

  try {
    const result = await engine.factCheck(request);
    
    // Check if result meets strict quality requirements
    const qualityReport = engine.generateQualityReport(result);
    
    if (qualityReport.grade === 'A' || qualityReport.grade === 'B') {
      console.log('Fact-check meets strict quality requirements');
      return result;
    } else {
      console.log('Fact-check does not meet strict quality requirements');
      console.log('Issues:', qualityReport.issues);
      console.log('Recommendations:', qualityReport.recommendations);
      return result;
    }
    
  } catch (error) {
    console.error('Strict fact-check failed:', error);
    throw error;
  }
}

// Example batch processing
export async function exampleBatchFactCheck() {
  const engine = new FactCheckEngine(config);

  const requests: FactCheckRequest[] = [
    {
      id: 'batch-1',
      input: { text: 'Die Erde ist rund.', language: 'de' },
      settings: { confidenceThreshold: 0.3, maxSources: 5, enableDebate: false, enableSelfConsistency: false, enableChainOfVerification: false },
      timestamp: new Date()
    },
    {
      id: 'batch-2',
      input: { text: 'Der Klimawandel ist menschengemacht.', language: 'de' },
      settings: { confidenceThreshold: 0.4, maxSources: 10, enableDebate: true, enableSelfConsistency: false, enableChainOfVerification: true },
      timestamp: new Date()
    },
    {
      id: 'batch-3',
      input: { text: 'Die Impfstoffe sind sicher und wirksam.', language: 'de' },
      settings: { confidenceThreshold: 0.5, maxSources: 15, enableDebate: true, enableSelfConsistency: true, enableChainOfVerification: true },
      timestamp: new Date()
    }
  ];

  const results = [];
  
  for (const request of requests) {
    try {
      console.log(`Processing batch request: ${request.id}`);
      const result = await engine.factCheck(request);
      results.push(result);
      
      // Add delay between requests to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`Batch request ${request.id} failed:`, error);
    }
  }

  console.log(`Batch processing completed: ${results.length}/${requests.length} successful`);
  return results;
}

// Example with custom retrieval configuration
export async function exampleCustomRetrieval() {
  const customConfig = {
    ...config,
    maxSources: 50,
    searchEngines: ['bing', 'serpapi'], // Only use specific search engines
    knowledgeBaseEnabled: false // Disable knowledge base
  };

  const engine = new FactCheckEngine(customConfig);

  const request: FactCheckRequest = {
    id: 'custom-retrieval-1',
    input: {
      text: 'Die künstliche Intelligenz wird in den nächsten 10 Jahren 50% aller Arbeitsplätze ersetzen.',
      language: 'de'
    },
    settings: {
      confidenceThreshold: 0.3,
      maxSources: 30,
      enableDebate: true,
      enableSelfConsistency: true,
      enableChainOfVerification: true
    },
    timestamp: new Date()
  };

  try {
    const result = await engine.factCheck(request);
    
    // Analyze retrieval quality
    console.log('Sources found:', result.verdict.keySources.length);
    console.log('Evidence collected:', result.evidence.length);
    
    return result;
    
  } catch (error) {
    console.error('Custom retrieval fact-check failed:', error);
    throw error;
  }
}

// Export all examples
export const examples = {
  basic: exampleFactCheck,
  video: exampleVideoFactCheck,
  strict: exampleStrictFactCheck,
  batch: exampleBatchFactCheck,
  customRetrieval: exampleCustomRetrieval
};

