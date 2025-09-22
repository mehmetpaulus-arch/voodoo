import { Claim } from './types';

export class ClaimExtractor {
  private language: string;

  constructor(language: string = 'de') {
    this.language = language;
  }

  async extractClaims(input: {
    text?: string;
    videoUrl?: string;
    audioUrl?: string;
  }): Promise<Claim[]> {
    const claims: Claim[] = [];

    // Extract from text
    if (input.text) {
      const textClaims = await this.extractFromText(input.text);
      claims.push(...textClaims);
    }

    // Extract from video (would need transcription)
    if (input.videoUrl) {
      const videoClaims = await this.extractFromVideo(input.videoUrl);
      claims.push(...videoClaims);
    }

    // Extract from audio (would need transcription)
    if (input.audioUrl) {
      const audioClaims = await this.extractFromAudio(input.audioUrl);
      claims.push(...audioClaims);
    }

    return this.deduplicateClaims(claims);
  }

  private async extractFromText(text: string): Promise<Claim[]> {
    const claims: Claim[] = [];
    
    // Split text into sentences
    const sentences = this.splitIntoSentences(text);
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      if (this.isClaimCandidate(sentence)) {
        const claim = await this.analyzeClaim(sentence, text, i);
        if (claim) {
          claims.push(claim);
        }
      }
    }

    return claims;
  }

  private async extractFromVideo(videoUrl: string): Promise<Claim[]> {
    // Mock implementation - in real system, would:
    // 1. Extract audio from video
    // 2. Transcribe audio to text
    // 3. Extract claims from transcription
    
    console.log(`Extracting claims from video: ${videoUrl}`);
    
    // Mock transcription
    const mockTranscription = "Dies ist ein Mock-Transkript eines Videos mit verschiedenen Behauptungen.";
    
    return this.extractFromText(mockTranscription);
  }

  private async extractFromAudio(audioUrl: string): Promise<Claim[]> {
    // Mock implementation - in real system, would:
    // 1. Transcribe audio to text
    // 2. Extract claims from transcription
    
    console.log(`Extracting claims from audio: ${audioUrl}`);
    
    // Mock transcription
    const mockTranscription = "Dies ist ein Mock-Transkript eines Audios mit verschiedenen Behauptungen.";
    
    return this.extractFromText(mockTranscription);
  }

  private splitIntoSentences(text: string): string[] {
    // Simple sentence splitting - in real implementation, use more sophisticated NLP
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 10); // Filter out very short fragments
    
    return sentences;
  }

  private isClaimCandidate(sentence: string): boolean {
    // Check if sentence contains claim indicators
    const claimIndicators = [
      // German indicators
      'ist', 'sind', 'war', 'waren', 'wird', 'werden',
      'hat', 'haben', 'hatte', 'hatten',
      'kann', 'können', 'konnte', 'konnten',
      'muss', 'müssen', 'musste', 'mussten',
      'soll', 'sollen', 'sollte', 'sollten',
      'zeigt', 'beweist', 'demonstriert', 'belegt',
      'laut', 'nach', 'gemäß', 'zufolge',
      'statistisch', 'studie', 'forschung', 'untersuchung',
      'prozent', '%', 'milliarden', 'millionen',
      'jahren', 'jahre', 'monaten', 'wochen', 'tagen'
    ];

    const lowerSentence = sentence.toLowerCase();
    return claimIndicators.some(indicator => lowerSentence.includes(indicator));
  }

  private async analyzeClaim(
    sentence: string,
    originalText: string,
    position: number
  ): Promise<Claim | null> {
    const claimType = this.determineClaimType(sentence);
    const confidence = this.calculateExtractionConfidence(sentence);
    
    // Only include claims with sufficient confidence
    if (confidence < 0.3) {
      return null;
    }

    const positionInText = originalText.indexOf(sentence);
    
    return {
      id: `claim-${Date.now()}-${position}`,
      text: sentence,
      type: claimType,
      confidence,
      extractedFrom: originalText.substring(0, 50) + '...',
      position: {
        start: positionInText,
        end: positionInText + sentence.length
      }
    };
  }

  private determineClaimType(sentence: string): 'factual' | 'statistical' | 'temporal' | 'causal' | 'definitional' {
    const lowerSentence = sentence.toLowerCase();

    // Statistical claims
    if (/\d+%|\d+\s*prozent|\d+\s*millionen|\d+\s*milliarden|\d+\s*studie|\d+\s*forschung/.test(lowerSentence)) {
      return 'statistical';
    }

    // Temporal claims
    if (/\d+\s*jahre|\d+\s*monate|\d+\s*wochen|\d+\s*tage|seit|vor|nach|während|zeitraum/.test(lowerSentence)) {
      return 'temporal';
    }

    // Causal claims
    if (/verursacht|führt zu|bewirkt|aufgrund|wegen|durch|folge|resultat/.test(lowerSentence)) {
      return 'causal';
    }

    // Definitional claims
    if (/bedeutet|ist definiert als|heisst|bezeichnet|versteht man unter/.test(lowerSentence)) {
      return 'definitional';
    }

    // Default to factual
    return 'factual';
  }

  private calculateExtractionConfidence(sentence: string): number {
    let confidence = 0.5; // Base confidence

    // Increase confidence for longer sentences (more context)
    if (sentence.length > 50) confidence += 0.1;
    if (sentence.length > 100) confidence += 0.1;

    // Increase confidence for specific claim indicators
    const strongIndicators = ['beweist', 'demonstriert', 'belegt', 'zeigt', 'laut studie', 'nach forschung'];
    const hasStrongIndicator = strongIndicators.some(indicator => 
      sentence.toLowerCase().includes(indicator)
    );
    if (hasStrongIndicator) confidence += 0.2;

    // Increase confidence for numerical data
    if (/\d+/.test(sentence)) confidence += 0.1;

    // Increase confidence for source references
    const sourceIndicators = ['laut', 'nach', 'gemäß', 'zufolge', 'studie', 'forschung', 'untersuchung'];
    const hasSourceIndicator = sourceIndicators.some(indicator => 
      sentence.toLowerCase().includes(indicator)
    );
    if (hasSourceIndicator) confidence += 0.1;

    // Decrease confidence for questions or uncertain language
    const uncertainIndicators = ['vielleicht', 'möglicherweise', 'könnte', 'würde', '?'];
    const hasUncertainIndicator = uncertainIndicators.some(indicator => 
      sentence.toLowerCase().includes(indicator)
    );
    if (hasUncertainIndicator) confidence -= 0.2;

    return Math.max(0, Math.min(1, confidence));
  }

  private deduplicateClaims(claims: Claim[]): Claim[] {
    const uniqueClaims: Claim[] = [];
    const seen = new Set<string>();

    claims.forEach(claim => {
      // Create a normalized version for comparison
      const normalized = claim.text.toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      if (!seen.has(normalized)) {
        seen.add(normalized);
        uniqueClaims.push(claim);
      }
    });

    // Sort by confidence (highest first)
    return uniqueClaims.sort((a, b) => b.confidence - a.confidence);
  }

  public analyzeExtractionQuality(claims: Claim[]): {
    quality: 'high' | 'medium' | 'low';
    completeness: number;
    precision: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    
    if (claims.length === 0) {
      return {
        quality: 'low',
        completeness: 0,
        precision: 0,
        recommendations: ['No claims extracted - input may not contain verifiable statements']
      };
    }

    const avgConfidence = claims.reduce((sum, claim) => sum + claim.confidence, 0) / claims.length;
    const highConfidenceClaims = claims.filter(claim => claim.confidence > 0.7).length;
    const lowConfidenceClaims = claims.filter(claim => claim.confidence < 0.4).length;

    let quality: 'high' | 'medium' | 'low';
    if (avgConfidence > 0.7 && highConfidenceClaims > lowConfidenceClaims) {
      quality = 'high';
      recommendations.push('High-quality claim extraction');
    } else if (avgConfidence > 0.5) {
      quality = 'medium';
      recommendations.push('Moderate-quality claim extraction');
    } else {
      quality = 'low';
      recommendations.push('Low-quality claim extraction');
    }

    if (lowConfidenceClaims > 0) {
      recommendations.push(`${lowConfidenceClaims} low-confidence claims extracted`);
    }

    // Check claim type diversity
    const types = new Set(claims.map(claim => claim.type));
    if (types.size >= 3) {
      recommendations.push('Good diversity of claim types');
    } else {
      recommendations.push('Limited claim type diversity');
    }

    return {
      quality,
      completeness: Math.min(1, claims.length / 5), // Assume 5 claims is "complete"
      precision: avgConfidence,
      recommendations
    };
  }
}

