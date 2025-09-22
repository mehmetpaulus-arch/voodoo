// Fact-Checking System Types
export interface FactCheckRequest {
  id: string;
  input: {
    text?: string;
    videoUrl?: string;
    audioUrl?: string;
    language?: string;
  };
  settings: {
    confidenceThreshold: number;
    maxSources: number;
    enableDebate: boolean;
    enableSelfConsistency: boolean;
    enableChainOfVerification: boolean;
  };
  timestamp: Date;
}

export interface Claim {
  id: string;
  text: string;
  type: 'factual' | 'statistical' | 'temporal' | 'causal' | 'definitional';
  confidence: number;
  extractedFrom: string;
  position: {
    start: number;
    end: number;
  };
}

export interface Source {
  id: string;
  url: string;
  title: string;
  domain: string;
  publishDate?: Date;
  author?: string;
  type: 'primary' | 'secondary' | 'tertiary';
  reliability: number; // 0-1 scale
  content: string;
  snippet: string;
  metadata: {
    language?: string;
    country?: string;
    category?: string;
    [key: string]: any;
  };
}

export interface Evidence {
  id: string;
  claimId: string;
  source: Source;
  quote: string;
  relevance: number; // 0-1 scale
  supports: boolean; // true = supports, false = contradicts
  confidence: number;
  extractedBy: 'researcher' | 'skeptiker' | 'analyst';
  timestamp: Date;
}

export interface NumericalAnalysis {
  claimId: string;
  originalValue: string;
  parsedValue?: number;
  unit?: string;
  wolframResult?: {
    result: string;
    confidence: number;
    alternativeInterpretations: string[];
  };
  verification: 'verified' | 'disputed' | 'unverifiable' | 'error';
}

export interface AgentResponse {
  agentId: 'researcher' | 'skeptiker' | 'analyst' | 'richter';
  claimId: string;
  response: string;
  evidence: Evidence[];
  confidence: number;
  reasoning: string;
  timestamp: Date;
  model: string;
  tokens: number;
}

export interface DebateRound {
  round: number;
  researcher: AgentResponse;
  skeptiker: AgentResponse;
  analyst?: AgentResponse;
  timestamp: Date;
}

export interface FactCheckResult {
  id: string;
  requestId: string;
  claims: Claim[];
  verdict: {
    overall: 'wahr' | 'teilwahr' | 'unbelegt' | 'falsch';
    confidence: number;
    reasoning: string;
    keySources: Source[];
    uncertainties: string[];
    conflicts: string[];
  };
  evidence: Evidence[];
  numericalAnalyses: NumericalAnalysis[];
  debateRounds: DebateRound[];
  auditTrail: AuditEntry[];
  processingTime: number;
  timestamp: Date;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  agent: string;
  action: string;
  input: any;
  output: any;
  model: string;
  tokens: number;
  duration: number;
}

export interface QualityMetrics {
  citationCompleteness: number; // 0-1
  sourceDiversity: number; // 0-1
  temporalRelevance: number; // 0-1
  conflictResolution: number; // 0-1
  numericalAccuracy: number; // 0-1
  overallScore: number; // 0-1
}

