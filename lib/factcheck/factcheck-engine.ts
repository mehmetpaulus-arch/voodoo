import { 
  FactCheckRequest, 
  FactCheckResult, 
  Claim, 
  Source, 
  Evidence,
  NumericalAnalysis,
  QualityMetrics
} from './types';

import { ClaimExtractor } from './claim-extractor';
import { RetrievalSystem } from './retrieval-system';
import { ResearcherAgent } from './agents/researcher';
import { SkeptikerAgent } from './agents/skeptiker';
import { AnalystAgent } from './agents/analyst';
import { RichterAgent } from './agents/richter';
import { DebatePattern } from './patterns/debate-pattern';
import { SelfConsistencyPattern } from './patterns/self-consistency-pattern';
import { ChainOfVerificationPattern } from './patterns/chain-of-verification';
import { QualityController } from './quality-control';
import { AuditLogger } from './audit-logger';

export interface FactCheckConfig {
  // Agent configuration
  researcherModel: string;
  skeptikerModel: string;
  analystModel: string;
  richterModel: string;
  
  // Pattern configuration
  enableDebate: boolean;
  enableSelfConsistency: boolean;
  enableChainOfVerification: boolean;
  maxDebateRounds: number;
  selfConsistencyVariations: number;
  
  // Retrieval configuration
  maxSources: number;
  searchEngines: string[];
  knowledgeBaseEnabled: boolean;
  
  // Quality configuration
  minSources: number;
  maxQuoteLength: number;
  requireDates: boolean;
  requireAuthors: boolean;
  
  // API keys
  apiKeys: {
    openai?: string;
    anthropic?: string;
    wolfram?: string;
    bing?: string;
    serpapi?: string;
    tavily?: string;
  };
}

export class FactCheckEngine {
  private config: FactCheckConfig;
  private claimExtractor: ClaimExtractor;
  private retrievalSystem: RetrievalSystem;
  private researcher: ResearcherAgent;
  private skeptiker: SkeptikerAgent;
  private analyst: AnalystAgent;
  private richter: RichterAgent;
  private debatePattern: DebatePattern;
  private selfConsistencyPattern: SelfConsistencyPattern;
  private chainOfVerificationPattern: ChainOfVerificationPattern;
  private qualityController: QualityController;
  private auditLogger: AuditLogger;

  constructor(config: FactCheckConfig) {
    this.config = config;
    
    // Initialize components
    this.claimExtractor = new ClaimExtractor(config.searchEngines[0] || 'de');
    this.retrievalSystem = new RetrievalSystem(
      {
        maxResults: config.maxSources,
        language: 'de'
      },
      {
        elasticsearchUrl: config.knowledgeBaseEnabled ? 'http://localhost:9200' : undefined,
        postgresUrl: config.knowledgeBaseEnabled ? 'postgresql://localhost:5432/factcheck' : undefined
      },
      {
        webSearch: config.apiKeys.bing,
        serpApi: config.apiKeys.serpapi,
        tavily: config.apiKeys.tavily
      }
    );

    // Initialize agents
    this.researcher = new ResearcherAgent();
    this.skeptiker = new SkeptikerAgent();
    this.analyst = new AnalystAgent(config.apiKeys.wolfram || '');
    this.richter = new RichterAgent();

    // Initialize patterns
    this.debatePattern = new DebatePattern(
      this.researcher,
      this.skeptiker,
      this.analyst,
      config.maxDebateRounds
    );

    this.selfConsistencyPattern = new SelfConsistencyPattern(
      this.researcher,
      this.skeptiker,
      this.analyst,
      config.selfConsistencyVariations
    );

    this.chainOfVerificationPattern = new ChainOfVerificationPattern(
      this.researcher,
      this.skeptiker,
      this.analyst
    );

    // Initialize quality control and audit
    this.qualityController = new QualityController({
      minSources: config.minSources,
      maxQuoteLength: config.maxQuoteLength,
      requireDates: config.requireDates,
      requireAuthors: config.requireAuthors
    });

    this.auditLogger = new AuditLogger();
  }

  public async factCheck(request: FactCheckRequest): Promise<FactCheckResult> {
    const startTime = Date.now();
    
    try {
      // Log request
      this.auditLogger.logRequest(request);

      // Step 1: Extract claims
      console.log('Step 1: Extracting claims...');
      const claims = await this.extractClaims(request);
      this.auditLogger.log('claim_extractor', 'extract_claims', request.input, claims, 'claim_extractor', 0, Date.now() - startTime);

      if (claims.length === 0) {
        return this.createEmptyResult(request, 'No verifiable claims found');
      }

      // Step 2: Retrieve sources
      console.log('Step 2: Retrieving sources...');
      const sources = await this.retrieveSources(claims);
      this.auditLogger.log('retrieval_system', 'retrieve_sources', claims.map(c => c.text), sources, 'retrieval_system', 0, Date.now() - startTime);

      if (sources.length === 0) {
        return this.createEmptyResult(request, 'No sources found');
      }

      // Step 3: Process claims with agents
      console.log('Step 3: Processing claims with agents...');
      const { evidence, numericalAnalyses, debateRounds } = await this.processClaims(claims, sources);

      // Step 4: Generate final verdict
      console.log('Step 4: Generating final verdict...');
      const verdict = await this.generateVerdict(claims, evidence, numericalAnalyses);

      // Step 5: Create result
      const result: FactCheckResult = {
        id: `factcheck-${Date.now()}`,
        requestId: request.id,
        claims,
        verdict,
        evidence,
        numericalAnalyses,
        debateRounds,
        auditTrail: this.auditLogger.getAuditTrail(request.id),
        processingTime: Date.now() - startTime,
        timestamp: new Date()
      };

      // Log result
      this.auditLogger.logResult(result);

      return result;

    } catch (error) {
      this.auditLogger.logError('factcheck_engine', 'fact_check', error as Error, { requestId: request.id });
      throw error;
    }
  }

  private async extractClaims(request: FactCheckRequest): Promise<Claim[]> {
    const claims = await this.claimExtractor.extractClaims(request.input);
    
    // Filter claims by confidence threshold
    return claims.filter(claim => claim.confidence >= request.settings.confidenceThreshold);
  }

  private async retrieveSources(claims: Claim[]): Promise<Source[]> {
    const claimTexts = claims.map(claim => claim.text);
    return this.retrievalSystem.retrieveSources(claimTexts);
  }

  private async processClaims(
    claims: Claim[],
    sources: Source[]
  ): Promise<{
    evidence: Evidence[];
    numericalAnalyses: NumericalAnalysis[];
    debateRounds: any[];
  }> {
    const allEvidence: Evidence[] = [];
    const allNumericalAnalyses: NumericalAnalysis[] = [];
    const allDebateRounds: any[] = [];

    for (const claim of claims) {
      console.log(`Processing claim: ${claim.text}`);

      // Apply interaction patterns based on configuration
      if (this.config.enableDebate) {
        const debateResult = await this.debatePattern.execute(claim, sources);
        allEvidence.push(...debateResult.finalEvidence);
        allDebateRounds.push(...debateResult.debateRounds);
      }

      if (this.config.enableSelfConsistency) {
        const consistencyResult = await this.selfConsistencyPattern.execute(claim, sources);
        allEvidence.push(...consistencyResult.consensusEvidence);
      }

      if (this.config.enableChainOfVerification) {
        const verificationResult = await this.chainOfVerificationPattern.execute(claim, sources);
        // Chain of verification doesn't produce traditional evidence, but we can extract insights
      }

      // Get numerical analysis
      const analystResponse = await this.analyst.processClaim(claim, { sources, evidence: allEvidence });
      // Extract numerical analyses from analyst response (would need to be implemented)
    }

    return {
      evidence: this.deduplicateEvidence(allEvidence),
      numericalAnalyses: allNumericalAnalyses,
      debateRounds: allDebateRounds
    };
  }

  private async generateVerdict(
    claims: Claim[],
    evidence: Evidence[],
    numericalAnalyses: NumericalAnalysis[]
  ): Promise<FactCheckResult['verdict']> {
    // For now, process the first claim (in a real system, you'd process all claims)
    const primaryClaim = claims[0];
    
    const richterResponse = await this.richter.processClaim(primaryClaim, {
      sources: evidence.map(e => e.source),
      evidence,
      numericalAnalyses
    });

    const verdict = this.richter.extractVerdict(richterResponse.response);

    // Get key sources
    const keySources = this.selectKeySources(evidence);

    // Identify uncertainties and conflicts
    const uncertainties = this.identifyUncertainties(evidence, numericalAnalyses);
    const conflicts = this.identifyConflicts(evidence);

    return {
      overall: verdict.verdict,
      confidence: verdict.confidence,
      reasoning: verdict.reasoning,
      keySources,
      uncertainties,
      conflicts
    };
  }

  private deduplicateEvidence(evidence: Evidence[]): Evidence[] {
    const unique = new Map<string, Evidence>();
    
    evidence.forEach(e => {
      const key = `${e.quote}-${e.source.url}`;
      if (!unique.has(key)) {
        unique.set(key, e);
      }
    });

    return Array.from(unique.values()).sort((a, b) => {
      const scoreA = a.relevance * a.source.reliability;
      const scoreB = b.relevance * b.source.reliability;
      return scoreB - scoreA;
    });
  }

  private selectKeySources(evidence: Evidence[]): Source[] {
    const sourceMap = new Map<string, Source>();
    
    evidence.forEach(e => {
      if (!sourceMap.has(e.source.url)) {
        sourceMap.set(e.source.url, e.source);
      }
    });

    return Array.from(sourceMap.values())
      .sort((a, b) => b.reliability - a.reliability)
      .slice(0, 7); // Top 7 sources
  }

  private identifyUncertainties(evidence: Evidence[], numericalAnalyses: NumericalAnalysis[]): string[] {
    const uncertainties: string[] = [];

    // Check for low confidence evidence
    const lowConfidenceEvidence = evidence.filter(e => e.confidence < 0.5);
    if (lowConfidenceEvidence.length > 0) {
      uncertainties.push(`${lowConfidenceEvidence.length} pieces of evidence have low confidence`);
    }

    // Check for unverified numerical claims
    const unverifiedNumbers = numericalAnalyses.filter(a => a.verification === 'unverifiable');
    if (unverifiedNumbers.length > 0) {
      uncertainties.push(`${unverifiedNumbers.length} numerical claims could not be verified`);
    }

    // Check for missing primary sources
    const primarySources = evidence.filter(e => e.source.type === 'primary');
    if (primarySources.length < 2) {
      uncertainties.push('Limited primary source coverage');
    }

    return uncertainties;
  }

  private identifyConflicts(evidence: Evidence[]): string[] {
    const conflicts: string[] = [];

    const supportingEvidence = evidence.filter(e => e.supports);
    const contradictingEvidence = evidence.filter(e => !e.supports);

    if (supportingEvidence.length > 0 && contradictingEvidence.length > 0) {
      conflicts.push(`Conflicting evidence: ${supportingEvidence.length} supporting vs ${contradictingEvidence.length} contradicting`);
    }

    return conflicts;
  }

  private createEmptyResult(request: FactCheckRequest, reason: string): FactCheckResult {
    return {
      id: `factcheck-${Date.now()}`,
      requestId: request.id,
      claims: [],
      verdict: {
        overall: 'unbelegt',
        confidence: 0,
        reasoning: reason,
        keySources: [],
        uncertainties: [reason],
        conflicts: []
      },
      evidence: [],
      numericalAnalyses: [],
      debateRounds: [],
      auditTrail: this.auditLogger.getAuditTrail(request.id),
      processingTime: 0,
      timestamp: new Date()
    };
  }

  public generateQualityReport(result: FactCheckResult): {
    summary: string;
    metrics: QualityMetrics;
    issues: string[];
    recommendations: string[];
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
  } {
    return this.qualityController.generateQualityReport(result);
  }

  public getAuditReport(requestId: string): any {
    return this.auditLogger.generateAuditReport(requestId);
  }

  public exportAuditLogs(format: 'json' | 'csv' | 'txt' = 'json'): string {
    return this.auditLogger.exportLogs(format);
  }
}

