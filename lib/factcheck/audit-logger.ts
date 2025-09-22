import { AuditEntry, FactCheckRequest, FactCheckResult } from './types';

export class AuditLogger {
  private logs: AuditEntry[] = [];
  private maxLogSize: number;

  constructor(maxLogSize: number = 10000) {
    this.maxLogSize = maxLogSize;
  }

  public log(
    agent: string,
    action: string,
    input: any,
    output: any,
    model: string,
    tokens: number,
    duration: number
  ): void {
    const entry: AuditEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      agent,
      action,
      input: this.sanitizeInput(input),
      output: this.sanitizeOutput(output),
      model,
      tokens,
      duration
    };

    this.logs.push(entry);

    // Maintain log size limit
    if (this.logs.length > this.maxLogSize) {
      this.logs = this.logs.slice(-this.maxLogSize);
    }

    console.log(`[AUDIT] ${agent}: ${action} (${duration}ms, ${tokens} tokens)`);
  }

  public logRequest(request: FactCheckRequest): void {
    this.log(
      'system',
      'fact_check_request',
      request,
      null,
      'system',
      0,
      0
    );
  }

  public logResult(result: FactCheckResult): void {
    this.log(
      'system',
      'fact_check_result',
      { requestId: result.requestId },
      {
        verdict: result.verdict.overall,
        confidence: result.verdict.confidence,
        claimsCount: result.claims.length,
        evidenceCount: result.evidence.length,
        processingTime: result.processingTime
      },
      'system',
      0,
      result.processingTime
    );
  }

  public logAgentInteraction(
    agent: string,
    claimId: string,
    input: any,
    response: any,
    model: string,
    tokens: number,
    duration: number
  ): void {
    this.log(
      agent,
      'process_claim',
      { claimId, input },
      response,
      model,
      tokens,
      duration
    );
  }

  public logSearchQuery(
    query: string,
    sources: any[],
    duration: number
  ): void {
    this.log(
      'retrieval_system',
      'search_query',
      { query },
      { sourcesFound: sources.length },
      'search_api',
      0,
      duration
    );
  }

  public logDebateRound(
    round: number,
    researcherResponse: any,
    skeptikerResponse: any,
    analystResponse: any,
    duration: number
  ): void {
    this.log(
      'debate_pattern',
      'debate_round',
      { round },
      {
        researcherConfidence: researcherResponse.confidence,
        skeptikerConfidence: skeptikerResponse.confidence,
        analystConfidence: analystResponse?.confidence,
        researcherTokens: researcherResponse.tokens,
        skeptikerTokens: skeptikerResponse.tokens,
        analystTokens: analystResponse?.tokens || 0
      },
      'multi_agent',
      (researcherResponse.tokens + skeptikerResponse.tokens + (analystResponse?.tokens || 0)),
      duration
    );
  }

  public logError(
    agent: string,
    action: string,
    error: Error,
    context: any
  ): void {
    this.log(
      agent,
      'error',
      { action, context, errorMessage: error.message },
      { errorStack: error.stack },
      'error_handler',
      0,
      0
    );
  }

  public getLogs(
    filter?: {
      agent?: string;
      action?: string;
      startTime?: Date;
      endTime?: Date;
    }
  ): AuditEntry[] {
    let filteredLogs = [...this.logs];

    if (filter) {
      if (filter.agent) {
        filteredLogs = filteredLogs.filter(log => log.agent === filter.agent);
      }

      if (filter.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filter.action);
      }

      if (filter.startTime) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filter.startTime!);
      }

      if (filter.endTime) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filter.endTime!);
      }
    }

    return filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public getAuditTrail(requestId: string): AuditEntry[] {
    return this.logs.filter(log => 
      (log.input && log.input.requestId === requestId) ||
      (log.output && log.output.requestId === requestId)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  public generateAuditReport(
    requestId: string,
    startTime?: Date,
    endTime?: Date
  ): {
    summary: {
      totalEntries: number;
      totalTokens: number;
      totalDuration: number;
      agents: string[];
      actions: string[];
    };
    timeline: AuditEntry[];
    tokenUsage: { [agent: string]: number };
    performanceMetrics: {
      avgResponseTime: number;
      slowestAction: string;
      fastestAction: string;
    };
    errors: AuditEntry[];
  } {
    const relevantLogs = this.getLogs({
      startTime,
      endTime
    }).filter(log => 
      (log.input && log.input.requestId === requestId) ||
      (log.output && log.output.requestId === requestId)
    );

    const agents = Array.from(new Set(relevantLogs.map(log => log.agent)));
    const actions = Array.from(new Set(relevantLogs.map(log => log.action)));
    const totalTokens = relevantLogs.reduce((sum, log) => sum + log.tokens, 0);
    const totalDuration = relevantLogs.reduce((sum, log) => sum + log.duration, 0);

    // Token usage by agent
    const tokenUsage: { [agent: string]: number } = {};
    agents.forEach(agent => {
      tokenUsage[agent] = relevantLogs
        .filter(log => log.agent === agent)
        .reduce((sum, log) => sum + log.tokens, 0);
    });

    // Performance metrics
    const responseTimes = relevantLogs
      .filter(log => log.duration > 0)
      .map(log => ({ action: log.action, duration: log.duration }));

    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, rt) => sum + rt.duration, 0) / responseTimes.length 
      : 0;

    const slowestAction = responseTimes.length > 0 
      ? responseTimes.reduce((slowest, rt) => rt.duration > slowest.duration ? rt : slowest).action
      : 'none';

    const fastestAction = responseTimes.length > 0 
      ? responseTimes.reduce((fastest, rt) => rt.duration < fastest.duration ? rt : fastest).action
      : 'none';

    const errors = relevantLogs.filter(log => log.action === 'error');

    return {
      summary: {
        totalEntries: relevantLogs.length,
        totalTokens,
        totalDuration,
        agents,
        actions
      },
      timeline: relevantLogs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
      tokenUsage,
      performanceMetrics: {
        avgResponseTime,
        slowestAction,
        fastestAction
      },
      errors
    };
  }

  public exportLogs(format: 'json' | 'csv' | 'txt' = 'json'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(this.logs, null, 2);
      
      case 'csv':
        const headers = ['id', 'timestamp', 'agent', 'action', 'model', 'tokens', 'duration'];
        const csvRows = [headers.join(',')];
        
        this.logs.forEach(log => {
          const row = [
            log.id,
            log.timestamp.toISOString(),
            log.agent,
            log.action,
            log.model,
            log.tokens,
            log.duration
          ];
          csvRows.push(row.join(','));
        });
        
        return csvRows.join('\n');
      
      case 'txt':
        return this.logs.map(log => 
          `[${log.timestamp.toISOString()}] ${log.agent}: ${log.action} (${log.duration}ms, ${log.tokens} tokens)`
        ).join('\n');
      
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  public clearLogs(): void {
    this.logs = [];
  }

  private sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      // Truncate very long strings
      return input.length > 1000 ? input.substring(0, 1000) + '...' : input;
    }
    
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    
    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        // Skip sensitive fields
        if (['password', 'token', 'key', 'secret'].some(sensitive => 
          key.toLowerCase().includes(sensitive)
        )) {
          sanitized[key] = '[REDACTED]';
        } else {
          sanitized[key] = this.sanitizeInput(value);
        }
      }
      return sanitized;
    }
    
    return input;
  }

  private sanitizeOutput(output: any): any {
    // Similar sanitization for output, but may be less restrictive
    return this.sanitizeInput(output);
  }
}

