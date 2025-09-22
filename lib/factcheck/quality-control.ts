import { Evidence, Source, FactCheckResult, QualityMetrics } from './types';

export class QualityController {
  private citationRequirements: {
    minSources: number;
    maxQuoteLength: number;
    requireDates: boolean;
    requireAuthors: boolean;
  };

  constructor(citationRequirements: {
    minSources: number;
    maxQuoteLength: number;
    requireDates: boolean;
    requireAuthors: boolean;
  } = {
    minSources: 3,
    maxQuoteLength: 25,
    requireDates: true,
    requireAuthors: false
  }) {
    this.citationRequirements = citationRequirements;
  }

  public evaluateQuality(result: FactCheckResult): QualityMetrics {
    const citationCompleteness = this.evaluateCitationCompleteness(result);
    const sourceDiversity = this.evaluateSourceDiversity(result);
    const temporalRelevance = this.evaluateTemporalRelevance(result);
    const conflictResolution = this.evaluateConflictResolution(result);
    const numericalAccuracy = this.evaluateNumericalAccuracy(result);

    const overallScore = (
      citationCompleteness * 0.25 +
      sourceDiversity * 0.20 +
      temporalRelevance * 0.15 +
      conflictResolution * 0.20 +
      numericalAccuracy * 0.20
    );

    return {
      citationCompleteness,
      sourceDiversity,
      temporalRelevance,
      conflictResolution,
      numericalAccuracy,
      overallScore
    };
  }

  private evaluateCitationCompleteness(result: FactCheckResult): number {
    const evidence = result.evidence;
    if (evidence.length === 0) return 0;

    let score = 0;
    let totalChecks = 0;

    // Check minimum number of sources
    const uniqueSources = new Set(evidence.map(e => e.source.url));
    if (uniqueSources.size >= this.citationRequirements.minSources) {
      score += 0.3;
    }
    totalChecks += 0.3;

    // Check quote length compliance
    const validQuotes = evidence.filter(e => 
      e.quote.length <= this.citationRequirements.maxQuoteLength
    );
    score += (validQuotes.length / evidence.length) * 0.2;
    totalChecks += 0.2;

    // Check date availability
    if (this.citationRequirements.requireDates) {
      const sourcesWithDates = evidence.filter(e => e.source.publishDate);
      score += (sourcesWithDates.length / evidence.length) * 0.3;
      totalChecks += 0.3;
    }

    // Check author availability
    if (this.citationRequirements.requireAuthors) {
      const sourcesWithAuthors = evidence.filter(e => e.source.author);
      score += (sourcesWithAuthors.length / evidence.length) * 0.2;
      totalChecks += 0.2;
    }

    return totalChecks > 0 ? score / totalChecks : 0;
  }

  private evaluateSourceDiversity(result: FactCheckResult): number {
    const sources = result.verdict.keySources;
    if (sources.length === 0) return 0;

    // Domain diversity
    const domains = new Set(sources.map(s => s.domain));
    const domainDiversity = domains.size / sources.length;

    // Source type diversity
    const types = new Set(sources.map(s => s.type));
    const typeDiversity = types.size / 3; // primary, secondary, tertiary

    // Geographic diversity (if available)
    const countries = new Set(sources.map(s => s.metadata.country).filter(Boolean));
    const geoDiversity = countries.size > 0 ? Math.min(1, countries.size / 3) : 0.5;

    // Language diversity
    const languages = new Set(sources.map(s => s.metadata.language).filter(Boolean));
    const langDiversity = languages.size > 0 ? Math.min(1, languages.size / 2) : 0.5;

    return (domainDiversity * 0.4 + typeDiversity * 0.3 + geoDiversity * 0.15 + langDiversity * 0.15);
  }

  private evaluateTemporalRelevance(result: FactCheckResult): number {
    const sources = result.verdict.keySources;
    if (sources.length === 0) return 0;

    const now = Date.now();
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    const threeYears = 3 * oneYear;

    let score = 0;
    sources.forEach(source => {
      if (source.publishDate) {
        const age = now - source.publishDate.getTime();
        if (age <= oneYear) {
          score += 1.0; // Very recent
        } else if (age <= threeYears) {
          score += 0.7; // Recent
        } else {
          score += 0.3; // Older
        }
      } else {
        score += 0.1; // No date available
      }
    });

    return score / sources.length;
  }

  private evaluateConflictResolution(result: FactCheckResult): number {
    const evidence = result.evidence;
    if (evidence.length === 0) return 0;

    const supportingEvidence = evidence.filter(e => e.supports);
    const contradictingEvidence = evidence.filter(e => !e.supports);

    // If no conflicts, perfect score
    if (contradictingEvidence.length === 0) {
      return 1.0;
    }

    // If conflicts exist, check if they're properly addressed
    const conflicts = result.verdict.conflicts;
    const uncertainties = result.verdict.uncertainties;

    let score = 0.5; // Base score for having conflicts

    // Bonus for acknowledging conflicts
    if (conflicts.length > 0) {
      score += 0.2;
    }

    // Bonus for acknowledging uncertainties
    if (uncertainties.length > 0) {
      score += 0.2;
    }

    // Bonus for providing reasoning
    if (result.verdict.reasoning.length > 50) {
      score += 0.1;
    }

    return Math.min(1.0, score);
  }

  private evaluateNumericalAccuracy(result: FactCheckResult): number {
    const analyses = result.numericalAnalyses;
    if (analyses.length === 0) return 1.0; // No numbers to verify

    const verifiedCount = analyses.filter(a => a.verification === 'verified').length;
    const disputedCount = analyses.filter(a => a.verification === 'disputed').length;
    const errorCount = analyses.filter(a => a.verification === 'error').length;

    const accuracy = verifiedCount / analyses.length;
    const disputePenalty = disputedCount * 0.1;
    const errorPenalty = errorCount * 0.2;

    return Math.max(0, accuracy - disputePenalty - errorPenalty);
  }

  public validateEvidence(evidence: Evidence[]): {
    isValid: boolean;
    violations: string[];
    recommendations: string[];
  } {
    const violations: string[] = [];
    const recommendations: string[] = [];

    // Check citation requirements
    if (evidence.length < this.citationRequirements.minSources) {
      violations.push(`Insufficient sources: ${evidence.length}/${this.citationRequirements.minSources}`);
      recommendations.push(`Add at least ${this.citationRequirements.minSources - evidence.length} more sources`);
    }

    // Check quote length
    const longQuotes = evidence.filter(e => e.quote.length > this.citationRequirements.maxQuoteLength);
    if (longQuotes.length > 0) {
      violations.push(`${longQuotes.length} quotes exceed maximum length of ${this.citationRequirements.maxQuoteLength} characters`);
      recommendations.push('Shorten quotes to essential information only');
    }

    // Check date availability
    if (this.citationRequirements.requireDates) {
      const sourcesWithoutDates = evidence.filter(e => !e.source.publishDate);
      if (sourcesWithoutDates.length > 0) {
        violations.push(`${sourcesWithoutDates.length} sources missing publication dates`);
        recommendations.push('Ensure all sources have publication dates');
      }
    }

    // Check author availability
    if (this.citationRequirements.requireAuthors) {
      const sourcesWithoutAuthors = evidence.filter(e => !e.source.author);
      if (sourcesWithoutAuthors.length > 0) {
        violations.push(`${sourcesWithoutAuthors.length} sources missing author information`);
        recommendations.push('Include author information for all sources');
      }
    }

    // Check source reliability
    const lowReliabilitySources = evidence.filter(e => e.source.reliability < 0.5);
    if (lowReliabilitySources.length > 0) {
      violations.push(`${lowReliabilitySources.length} sources have low reliability scores`);
      recommendations.push('Consider replacing low-reliability sources with more authoritative ones');
    }

    // Check for duplicate sources
    const sourceUrls = evidence.map(e => e.source.url);
    const duplicateUrls = sourceUrls.filter((url, index) => sourceUrls.indexOf(url) !== index);
    if (duplicateUrls.length > 0) {
      violations.push(`${duplicateUrls.length} duplicate sources found`);
      recommendations.push('Remove duplicate sources to improve diversity');
    }

    return {
      isValid: violations.length === 0,
      violations,
      recommendations
    };
  }

  public generateQualityReport(result: FactCheckResult): {
    summary: string;
    metrics: QualityMetrics;
    issues: string[];
    recommendations: string[];
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
  } {
    const metrics = this.evaluateQuality(result);
    const evidenceValidation = this.validateEvidence(result.evidence);

    const issues: string[] = [...evidenceValidation.violations];
    const recommendations: string[] = [...evidenceValidation.recommendations];

    // Add quality-specific issues
    if (metrics.citationCompleteness < 0.7) {
      issues.push('Insufficient citation completeness');
      recommendations.push('Improve citation quality and completeness');
    }

    if (metrics.sourceDiversity < 0.6) {
      issues.push('Low source diversity');
      recommendations.push('Include sources from different domains and types');
    }

    if (metrics.temporalRelevance < 0.5) {
      issues.push('Outdated sources');
      recommendations.push('Include more recent sources');
    }

    if (metrics.conflictResolution < 0.6) {
      issues.push('Poor conflict resolution');
      recommendations.push('Better address conflicting evidence');
    }

    if (metrics.numericalAccuracy < 0.8) {
      issues.push('Numerical verification issues');
      recommendations.push('Improve numerical verification');
    }

    // Determine grade
    let grade: 'A' | 'B' | 'C' | 'D' | 'F';
    if (metrics.overallScore >= 0.9) grade = 'A';
    else if (metrics.overallScore >= 0.8) grade = 'B';
    else if (metrics.overallScore >= 0.7) grade = 'C';
    else if (metrics.overallScore >= 0.6) grade = 'D';
    else grade = 'F';

    // Generate summary
    const summary = `Fact-check quality: ${grade} (${(metrics.overallScore * 100).toFixed(1)}%). ` +
      `${issues.length} issues found, ${recommendations.length} recommendations provided.`;

    return {
      summary,
      metrics,
      issues,
      recommendations,
      grade
    };
  }
}

