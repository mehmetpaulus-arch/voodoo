import { Claim, AgentResponse, Evidence, Source } from '../types';
import { ResearcherAgent } from '../agents/researcher';
import { SkeptikerAgent } from '../agents/skeptiker';
import { AnalystAgent } from '../agents/analyst';

export class SelfConsistencyPattern {
  private researcher: ResearcherAgent;
  private skeptiker: SkeptikerAgent;
  private analyst: AnalystAgent;
  private numVariations: number;

  constructor(
    researcher: ResearcherAgent,
    skeptiker: SkeptikerAgent,
    analyst: AnalystAgent,
    numVariations: number = 3
  ) {
    this.researcher = researcher;
    this.skeptiker = skeptiker;
    this.analyst = analyst;
    this.numVariations = numVariations;
  }

  async execute(
    claim: Claim,
    sources: Source[],
    initialEvidence: Evidence[] = []
  ): Promise<{
    variations: AgentResponse[][];
    consistencyScore: number;
    consensusEvidence: Evidence[];
    disagreements: string[];
  }> {
    const variations: AgentResponse[][] = [];
    const allEvidence: Evidence[] = [...initialEvidence];
    const disagreements: string[] = [];

    // Generate multiple variations of the same question
    const questionVariations = this.generateQuestionVariations(claim);

    for (let i = 0; i < this.numVariations; i++) {
      const variation = questionVariations[i];
      console.log(`Self-consistency variation ${i + 1}: ${variation.text}`);

      // Get responses from all agents for this variation
      const researcherResponse = await this.researcher.processClaim(variation, {
        sources,
        evidence: allEvidence
      });

      const skeptikerResponse = await this.skeptiker.processClaim(variation, {
        sources,
        evidence: allEvidence
      });

      const analystResponse = await this.analyst.processClaim(variation, {
        sources,
        evidence: allEvidence
      });

      variations.push([researcherResponse, skeptikerResponse, analystResponse]);

      // Collect evidence
      allEvidence.push(...researcherResponse.evidence);
      allEvidence.push(...skeptikerResponse.evidence);

      // Add delay between variations
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Analyze consistency
    const consistencyScore = this.calculateConsistencyScore(variations);
    const consensusEvidence = this.findConsensusEvidence(variations);
    const detectedDisagreements = this.detectDisagreements(variations);

    disagreements.push(...detectedDisagreements);

    return {
      variations,
      consistencyScore,
      consensusEvidence,
      disagreements
    };
  }

  private generateQuestionVariations(claim: Claim): Claim[] {
    const variations: Claim[] = [];

    // Original claim
    variations.push(claim);

    // Rephrased variations
    const rephrasedTexts = [
      `Ist es korrekt, dass ${claim.text.toLowerCase()}`,
      `Kann bestätigt werden, dass ${claim.text.toLowerCase()}`,
      `Gibt es Belege dafür, dass ${claim.text.toLowerCase()}`,
      `Lässt sich verifizieren, dass ${claim.text.toLowerCase()}`
    ];

    for (let i = 1; i < this.numVariations && i <= rephrasedTexts.length; i++) {
      variations.push({
        ...claim,
        id: `${claim.id}-variation-${i}`,
        text: rephrasedTexts[i - 1],
        extractedFrom: `${claim.extractedFrom} (Variation ${i})`
      });
    }

    return variations;
  }

  private calculateConsistencyScore(variations: AgentResponse[][]): number {
    if (variations.length < 2) return 1.0;

    const scores: number[] = [];

    // Compare researcher responses
    const researcherResponses = variations.map(v => v[0]);
    scores.push(this.calculateAgentConsistency(researcherResponses));

    // Compare skeptiker responses
    const skeptikerResponses = variations.map(v => v[1]);
    scores.push(this.calculateAgentConsistency(skeptikerResponses));

    // Compare analyst responses
    const analystResponses = variations.map(v => v[2]);
    scores.push(this.calculateAgentConsistency(analystResponses));

    // Return average consistency
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  private calculateAgentConsistency(responses: AgentResponse[]): number {
    if (responses.length < 2) return 1.0;

    // Compare confidence levels
    const confidences = responses.map(r => r.confidence);
    const avgConfidence = confidences.reduce((sum, c) => sum + c, 0) / confidences.length;
    const confidenceVariance = confidences.reduce((sum, c) => sum + Math.pow(c - avgConfidence, 2), 0) / confidences.length;
    const confidenceConsistency = Math.max(0, 1 - Math.sqrt(confidenceVariance));

    // Compare evidence overlap
    const evidenceOverlaps: number[] = [];
    for (let i = 0; i < responses.length - 1; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        const overlap = this.calculateEvidenceOverlap(responses[i].evidence, responses[j].evidence);
        evidenceOverlaps.push(overlap);
      }
    }
    const avgEvidenceOverlap = evidenceOverlaps.length > 0 
      ? evidenceOverlaps.reduce((sum, o) => sum + o, 0) / evidenceOverlaps.length 
      : 1.0;

    // Weighted combination
    return (confidenceConsistency * 0.4) + (avgEvidenceOverlap * 0.6);
  }

  private calculateEvidenceOverlap(evidence1: Evidence[], evidence2: Evidence[]): number {
    if (evidence1.length === 0 && evidence2.length === 0) return 1.0;
    if (evidence1.length === 0 || evidence2.length === 0) return 0.0;

    const sources1 = new Set(evidence1.map(e => e.source.url));
    const sources2 = new Set(evidence2.map(e => e.source.url));
    
    const intersection = new Set(Array.from(sources1).filter(x => sources2.has(x)));
    const union = new Set([...Array.from(sources1), ...Array.from(sources2)]);
    
    return union.size > 0 ? intersection.size / union.size : 0.0;
  }

  private findConsensusEvidence(variations: AgentResponse[][]): Evidence[] {
    const evidenceCounts = new Map<string, { evidence: Evidence; count: number }>();

    // Count evidence across all variations
    variations.forEach(variation => {
      variation.forEach(response => {
        response.evidence.forEach(evidence => {
          const key = `${evidence.quote}-${evidence.source.url}`;
          const existing = evidenceCounts.get(key);
          if (existing) {
            existing.count++;
          } else {
            evidenceCounts.set(key, { evidence, count: 1 });
          }
        });
      });
    });

    // Find evidence that appears in multiple variations (consensus)
    const consensusEvidence: Evidence[] = [];
    const threshold = Math.ceil(variations.length * 0.5); // At least 50% of variations

    evidenceCounts.forEach(({ evidence, count }) => {
      if (count >= threshold) {
        consensusEvidence.push(evidence);
      }
    });

    // Sort by frequency and relevance
    return consensusEvidence.sort((a, b) => {
      const countA = evidenceCounts.get(`${a.quote}-${a.source.url}`)?.count || 0;
      const countB = evidenceCounts.get(`${b.quote}-${b.source.url}`)?.count || 0;
      const scoreA = countA * a.relevance * a.source.reliability;
      const scoreB = countB * b.relevance * b.source.reliability;
      return scoreB - scoreA;
    });
  }

  private detectDisagreements(variations: AgentResponse[][]): string[] {
    const disagreements: string[] = [];

    // Check for confidence disagreements
    const researcherConfidences = variations.map(v => v[0].confidence);
    const skeptikerConfidences = variations.map(v => v[1].confidence);

    const researcherVariance = this.calculateVariance(researcherConfidences);
    const skeptikerVariance = this.calculateVariance(skeptikerConfidences);

    if (researcherVariance > 0.1) {
      disagreements.push(`Researcher confidence varies significantly (variance: ${researcherVariance.toFixed(3)})`);
    }

    if (skeptikerVariance > 0.1) {
      disagreements.push(`Skeptiker confidence varies significantly (variance: ${skeptikerVariance.toFixed(3)})`);
    }

    // Check for evidence disagreements
    const allEvidence = variations.flatMap(v => [...v[0].evidence, ...v[1].evidence]);
    const supportingEvidence = allEvidence.filter(e => e.supports);
    const contradictingEvidence = allEvidence.filter(e => !e.supports);

    if (supportingEvidence.length > 0 && contradictingEvidence.length > 0) {
      disagreements.push(`Mixed evidence: ${supportingEvidence.length} supporting, ${contradictingEvidence.length} contradicting`);
    }

    return disagreements;
  }

  private calculateVariance(values: number[]): number {
    if (values.length < 2) return 0;
    
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    
    return variance;
  }

  public analyzeConsistencyQuality(consistencyScore: number, disagreements: string[]): {
    quality: 'high' | 'medium' | 'low';
    reliability: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let reliability = consistencyScore;

    if (consistencyScore >= 0.8) {
      recommendations.push('High consistency - results are reliable');
    } else if (consistencyScore >= 0.6) {
      recommendations.push('Moderate consistency - results are somewhat reliable');
      reliability *= 0.8;
    } else {
      recommendations.push('Low consistency - results may be unreliable');
      reliability *= 0.5;
    }

    if (disagreements.length > 0) {
      recommendations.push(`Found ${disagreements.length} areas of disagreement`);
      reliability *= 0.9;
    }

    let quality: 'high' | 'medium' | 'low';
    if (reliability >= 0.8) quality = 'high';
    else if (reliability >= 0.6) quality = 'medium';
    else quality = 'low';

    return { quality, reliability, recommendations };
  }
}

