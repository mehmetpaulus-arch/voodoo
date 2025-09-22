import { Claim, AgentResponse, Evidence, Source, DebateRound } from '../types';
import { ResearcherAgent } from '../agents/researcher';
import { SkeptikerAgent } from '../agents/skeptiker';
import { AnalystAgent } from '../agents/analyst';

export class DebatePattern {
  private researcher: ResearcherAgent;
  private skeptiker: SkeptikerAgent;
  private analyst: AnalystAgent;
  private maxRounds: number;

  constructor(
    researcher: ResearcherAgent,
    skeptiker: SkeptikerAgent,
    analyst: AnalystAgent,
    maxRounds: number = 3
  ) {
    this.researcher = researcher;
    this.skeptiker = skeptiker;
    this.analyst = analyst;
    this.maxRounds = maxRounds;
  }

  async execute(
    claim: Claim,
    sources: Source[],
    initialEvidence: Evidence[] = []
  ): Promise<{
    debateRounds: DebateRound[];
    finalEvidence: Evidence[];
    convergenceScore: number;
  }> {
    const debateRounds: DebateRound[] = [];
    let currentEvidence = [...initialEvidence];
    let convergenceScore = 0;

    for (let round = 1; round <= this.maxRounds; round++) {
      console.log(`Debate Round ${round} starting...`);

      // Researcher presents evidence
      const researcherResponse = await this.researcher.processClaim(claim, {
        sources,
        evidence: currentEvidence,
        debateHistory: debateRounds.map(r => r.researcher)
      });

      // Skeptiker challenges evidence
      const skeptikerResponse = await this.skeptiker.processClaim(claim, {
        sources,
        evidence: currentEvidence,
        debateHistory: debateRounds.map(r => r.skeptiker)
      });

      // Analyst verifies numerical claims (only in first round or if new numbers found)
      let analystResponse: AgentResponse | undefined;
      if (round === 1 || this.hasNewNumbers(researcherResponse, skeptikerResponse)) {
        analystResponse = await this.analyst.processClaim(claim, {
          sources,
          evidence: currentEvidence,
          debateHistory: debateRounds.map(r => r.analyst).filter(Boolean) as AgentResponse[]
        });
      }

      // Create debate round
      const debateRound: DebateRound = {
        round,
        researcher: researcherResponse,
        skeptiker: skeptikerResponse,
        analyst: analystResponse,
        timestamp: new Date()
      };

      debateRounds.push(debateRound);

      // Update evidence with new findings
      currentEvidence = this.mergeEvidence(currentEvidence, [
        ...researcherResponse.evidence,
        ...skeptikerResponse.evidence
      ]);

      // Check for convergence
      convergenceScore = this.calculateConvergence(researcherResponse, skeptikerResponse);
      
      console.log(`Round ${round} convergence score: ${convergenceScore.toFixed(3)}`);

      // Early termination if high convergence
      if (convergenceScore > 0.8) {
        console.log(`High convergence reached, ending debate early`);
        break;
      }

      // Add delay between rounds to simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return {
      debateRounds,
      finalEvidence: currentEvidence,
      convergenceScore
    };
  }

  private hasNewNumbers(researcher: AgentResponse, skeptiker: AgentResponse): boolean {
    const researcherNumbers = this.extractNumbers(researcher.response);
    const skeptikerNumbers = this.extractNumbers(skeptiker.response);
    
    return researcherNumbers.length > 0 || skeptikerNumbers.length > 0;
  }

  private extractNumbers(text: string): string[] {
    const numberRegex = /\d+(?:\.\d+)?/g;
    return text.match(numberRegex) || [];
  }

  private mergeEvidence(existing: Evidence[], newEvidence: Evidence[]): Evidence[] {
    const merged = [...existing];
    const seen = new Set<string>();

    // Add existing evidence to seen set
    existing.forEach(e => seen.add(`${e.quote}-${e.source.url}`));

    // Add new evidence if not already seen
    newEvidence.forEach(e => {
      const key = `${e.quote}-${e.source.url}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(e);
      }
    });

    // Sort by relevance and source reliability
    return merged.sort((a, b) => {
      const scoreA = a.relevance * a.source.reliability;
      const scoreB = b.relevance * b.source.reliability;
      return scoreB - scoreA;
    });
  }

  private calculateConvergence(researcher: AgentResponse, skeptiker: AgentResponse): number {
    // Calculate convergence based on confidence levels and evidence overlap
    const confidenceDiff = Math.abs(researcher.confidence - skeptiker.confidence);
    const confidenceConvergence = 1 - confidenceDiff;

    // Calculate evidence overlap
    const researcherSources = new Set(researcher.evidence.map(e => e.source.url));
    const skeptikerSources = new Set(skeptiker.evidence.map(e => e.source.url));
    
    const intersection = new Set(Array.from(researcherSources).filter(x => skeptikerSources.has(x)));
    const union = new Set([...Array.from(researcherSources), ...Array.from(skeptikerSources)]);
    
    const evidenceOverlap = union.size > 0 ? intersection.size / union.size : 0;

    // Weighted combination
    return (confidenceConvergence * 0.6) + (evidenceOverlap * 0.4);
  }

  public analyzeDebateQuality(debateRounds: DebateRound[]): {
    quality: 'high' | 'medium' | 'low';
    score: number;
    factors: string[];
  } {
    const factors: string[] = [];
    let score = 0;

    // Check for multiple rounds
    if (debateRounds.length >= 2) {
      score += 0.3;
      factors.push('Multiple debate rounds conducted');
    } else {
      factors.push('Limited to single round');
    }

    // Check for evidence diversity
    const allSources = new Set<string>();
    debateRounds.forEach(round => {
      round.researcher.evidence.forEach(e => allSources.add(e.source.domain));
      round.skeptiker.evidence.forEach(e => allSources.add(e.source.domain));
    });

    if (allSources.size >= 3) {
      score += 0.3;
      factors.push('Diverse source coverage');
    } else {
      factors.push('Limited source diversity');
    }

    // Check for numerical analysis
    const hasNumericalAnalysis = debateRounds.some(round => round.analyst);
    if (hasNumericalAnalysis) {
      score += 0.2;
      factors.push('Numerical verification included');
    } else {
      factors.push('No numerical analysis');
    }

    // Check for convergence
    const finalRound = debateRounds[debateRounds.length - 1];
    const finalConvergence = this.calculateConvergence(
      finalRound.researcher,
      finalRound.skeptiker
    );

    if (finalConvergence > 0.7) {
      score += 0.2;
      factors.push('High convergence achieved');
    } else if (finalConvergence > 0.4) {
      score += 0.1;
      factors.push('Moderate convergence');
    } else {
      factors.push('Low convergence - conflicting views');
    }

    let quality: 'high' | 'medium' | 'low';
    if (score >= 0.8) quality = 'high';
    else if (score >= 0.5) quality = 'medium';
    else quality = 'low';

    return { quality, score, factors };
  }
}

