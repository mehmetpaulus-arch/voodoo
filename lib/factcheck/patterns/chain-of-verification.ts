import { Claim, AgentResponse, Evidence, Source } from '../types';
import { ResearcherAgent } from '../agents/researcher';
import { SkeptikerAgent } from '../agents/skeptiker';
import { AnalystAgent } from '../agents/analyst';

export class ChainOfVerificationPattern {
  private researcher: ResearcherAgent;
  private skeptiker: SkeptikerAgent;
  private analyst: AnalystAgent;

  constructor(
    researcher: ResearcherAgent,
    skeptiker: SkeptikerAgent,
    analyst: AnalystAgent
  ) {
    this.researcher = researcher;
    this.skeptiker = skeptiker;
    this.analyst = analyst;
  }

  async execute(
    claim: Claim,
    sources: Source[],
    initialEvidence: Evidence[] = []
  ): Promise<{
    verificationChain: VerificationStep[];
    overallVerification: 'verified' | 'partially_verified' | 'unverified' | 'contradicted';
    confidence: number;
    criticalGaps: string[];
  }> {
    const verificationChain: VerificationStep[] = [];
    const criticalGaps: string[] = [];

    // Step 1: Decompose the claim into sub-claims
    const subClaims = await this.decomposeClaim(claim);
    console.log(`Decomposed claim into ${subClaims.length} sub-claims`);

    // Step 2: Verify each sub-claim individually
    for (const subClaim of subClaims) {
      console.log(`Verifying sub-claim: ${subClaim.text}`);
      
      const step = await this.verifySubClaim(subClaim, sources, initialEvidence);
      verificationChain.push(step);

      // Identify critical gaps
      if (step.verification === 'unverified' && (step as any).importance === 'critical') {
        criticalGaps.push(`Critical sub-claim unverified: ${subClaim.text}`);
      }
    }

    // Step 3: Synthesize overall verification
    const overallVerification = this.synthesizeVerification(verificationChain);
    const confidence = this.calculateOverallConfidence(verificationChain);

    return {
      verificationChain,
      overallVerification,
      confidence,
      criticalGaps
    };
  }

  private async decomposeClaim(claim: Claim): Promise<SubClaim[]> {
    const prompt = `
Decompose the following claim into its constituent sub-claims that need to be verified:

CLAIM: "${claim.text}"

For each sub-claim, determine:
1. The specific factual assertion
2. Its importance level (critical/important/minor)
3. The type of verification needed (factual/statistical/temporal/causal)

Return in this format:
SUBCLAIM 1: [text] | IMPORTANCE: [critical/important/minor] | TYPE: [factual/statistical/temporal/causal]
SUBCLAIM 2: [text] | IMPORTANCE: [critical/important/minor] | TYPE: [factual/statistical/temporal/causal]
...

Focus on breaking down complex claims into verifiable components.
    `;

    // Mock decomposition - in real implementation, use LLM
    const mockSubClaims: SubClaim[] = [
      {
        id: `${claim.id}-sub-1`,
        text: `Core assertion: ${claim.text}`,
        importance: 'critical',
        type: claim.type,
        parentClaimId: claim.id
      }
    ];

    // Add additional sub-claims based on claim type
    if (claim.type === 'statistical') {
      mockSubClaims.push({
        id: `${claim.id}-sub-2`,
        text: `Statistical methodology and data quality`,
        importance: 'critical',
        type: 'statistical',
        parentClaimId: claim.id
      });
    }

    if (claim.type === 'temporal') {
      mockSubClaims.push({
        id: `${claim.id}-sub-3`,
        text: `Timeline and sequence of events`,
        importance: 'important',
        type: 'temporal',
        parentClaimId: claim.id
      });
    }

    return mockSubClaims;
  }

  private async verifySubClaim(
    subClaim: SubClaim,
    sources: Source[],
    initialEvidence: Evidence[]
  ): Promise<VerificationStep> {
    const startTime = Date.now();

    // Get evidence from researcher
    const researcherResponse = await this.researcher.processClaim(subClaim as any, {
      sources,
      evidence: initialEvidence
    });

    // Get counter-evidence from skeptiker
    const skeptikerResponse = await this.skeptiker.processClaim(subClaim as any, {
      sources,
      evidence: initialEvidence
    });

    // Get numerical analysis if applicable
    let analystResponse: AgentResponse | undefined;
    if (subClaim.type === 'statistical' || this.containsNumbers(subClaim.text)) {
      analystResponse = await this.analyst.processClaim(subClaim as any, {
        sources,
        evidence: initialEvidence
      });
    }

    // Determine verification status
    const verification = this.determineVerificationStatus(
      researcherResponse,
      skeptikerResponse,
      analystResponse
    );

    const duration = Date.now() - startTime;

    return {
      subClaim,
      researcherResponse,
      skeptikerResponse,
      analystResponse,
      verification,
      confidence: this.calculateStepConfidence(researcherResponse, skeptikerResponse, analystResponse),
      evidence: [...researcherResponse.evidence, ...skeptikerResponse.evidence],
      duration,
      timestamp: new Date()
    };
  }

  private determineVerificationStatus(
    researcher: AgentResponse,
    skeptiker: AgentResponse,
    analyst?: AgentResponse
  ): 'verified' | 'partially_verified' | 'unverified' | 'contradicted' {
    const researcherConfidence = researcher.confidence;
    const skeptikerConfidence = skeptiker.confidence;
    const analystConfidence = analyst?.confidence || 0.5;

    // Strong evidence for, weak evidence against
    if (researcherConfidence > 0.7 && skeptikerConfidence < 0.4) {
      return 'verified';
    }

    // Strong evidence against, weak evidence for
    if (skeptikerConfidence > 0.7 && researcherConfidence < 0.4) {
      return 'contradicted';
    }

    // Mixed evidence
    if (Math.abs(researcherConfidence - skeptikerConfidence) < 0.3) {
      if (researcherConfidence > 0.5 && skeptikerConfidence > 0.5) {
        return 'contradicted';
      } else {
        return 'partially_verified';
      }
    }

    // Weak evidence overall
    if (researcherConfidence < 0.4 && skeptikerConfidence < 0.4) {
      return 'unverified';
    }

    // Default to partially verified
    return 'partially_verified';
  }

  private calculateStepConfidence(
    researcher: AgentResponse,
    skeptiker: AgentResponse,
    analyst?: AgentResponse
  ): number {
    const researcherConfidence = researcher.confidence;
    const skeptikerConfidence = skeptiker.confidence;
    const analystConfidence = analyst?.confidence || 0.5;

    // Weight the confidences
    const weights = analyst ? [0.4, 0.3, 0.3] : [0.6, 0.4];
    const confidences = analyst ? [researcherConfidence, skeptikerConfidence, analystConfidence] : [researcherConfidence, skeptikerConfidence];

    return confidences.reduce((sum, conf, index) => sum + (conf * weights[index]), 0);
  }

  private synthesizeVerification(verificationChain: VerificationStep[]): 'verified' | 'partially_verified' | 'unverified' | 'contradicted' {
    const criticalSteps = verificationChain.filter(step => step.subClaim.importance === 'critical');
    const importantSteps = verificationChain.filter(step => step.subClaim.importance === 'important');
    const minorSteps = verificationChain.filter(step => step.subClaim.importance === 'minor');

    // Check critical steps first
    const criticalVerified = criticalSteps.filter(step => step.verification === 'verified').length;
    const criticalContradicted = criticalSteps.filter(step => step.verification === 'contradicted').length;
    const criticalUnverified = criticalSteps.filter(step => step.verification === 'unverified').length;

    // If any critical step is contradicted, overall is contradicted
    if (criticalContradicted > 0) {
      return 'contradicted';
    }

    // If any critical step is unverified, overall is unverified
    if (criticalUnverified > 0) {
      return 'unverified';
    }

    // If all critical steps are verified, check important steps
    if (criticalVerified === criticalSteps.length) {
      const importantVerified = importantSteps.filter(step => step.verification === 'verified').length;
      const importantContradicted = importantSteps.filter(step => step.verification === 'contradicted').length;

      if (importantContradicted > 0) {
        return 'partially_verified';
      }

      if (importantVerified === importantSteps.length) {
        return 'verified';
      }
    }

    return 'partially_verified';
  }

  private calculateOverallConfidence(verificationChain: VerificationStep[]): number {
    if (verificationChain.length === 0) return 0;

    const weightedConfidences = verificationChain.map(step => {
      let weight = 1;
      if (step.subClaim.importance === 'critical') weight = 3;
      else if (step.subClaim.importance === 'important') weight = 2;

      return step.confidence * weight;
    });

    const totalWeight = verificationChain.reduce((sum, step) => {
      if (step.subClaim.importance === 'critical') return sum + 3;
      else if (step.subClaim.importance === 'important') return sum + 2;
      else return sum + 1;
    }, 0);

    return weightedConfidences.reduce((sum, conf) => sum + conf, 0) / totalWeight;
  }

  private containsNumbers(text: string): boolean {
    return /\d/.test(text);
  }

  public analyzeVerificationQuality(verificationChain: VerificationStep[]): {
    quality: 'high' | 'medium' | 'low';
    completeness: number;
    reliability: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    
    const totalSteps = verificationChain.length;
    const verifiedSteps = verificationChain.filter(step => step.verification === 'verified').length;
    const contradictedSteps = verificationChain.filter(step => step.verification === 'contradicted').length;
    const unverifiedSteps = verificationChain.filter(step => step.verification === 'unverified').length;

    const completeness = totalSteps > 0 ? verifiedSteps / totalSteps : 0;
    const reliability = verificationChain.reduce((sum, step) => sum + step.confidence, 0) / totalSteps;

    if (completeness >= 0.8) {
      recommendations.push('High verification completeness');
    } else if (completeness >= 0.6) {
      recommendations.push('Moderate verification completeness');
    } else {
      recommendations.push('Low verification completeness');
    }

    if (contradictedSteps > 0) {
      recommendations.push(`${contradictedSteps} sub-claims contradicted`);
    }

    if (unverifiedSteps > 0) {
      recommendations.push(`${unverifiedSteps} sub-claims unverified`);
    }

    let quality: 'high' | 'medium' | 'low';
    if (completeness >= 0.8 && reliability >= 0.7) quality = 'high';
    else if (completeness >= 0.6 && reliability >= 0.5) quality = 'medium';
    else quality = 'low';

    return { quality, completeness, reliability, recommendations };
  }
}

interface SubClaim {
  id: string;
  text: string;
  importance: 'critical' | 'important' | 'minor';
  type: 'factual' | 'statistical' | 'temporal' | 'causal' | 'definitional';
  parentClaimId: string;
}

interface VerificationStep {
  subClaim: SubClaim;
  researcherResponse: AgentResponse;
  skeptikerResponse: AgentResponse;
  analystResponse?: AgentResponse;
  verification: 'verified' | 'partially_verified' | 'unverified' | 'contradicted';
  confidence: number;
  evidence: Evidence[];
  duration: number;
  timestamp: Date;
}

