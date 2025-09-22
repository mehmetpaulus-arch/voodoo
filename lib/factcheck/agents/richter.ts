import { BaseAgent } from './base-agent';
import { AgentResponse, Evidence, Claim, Source, NumericalAnalysis, DebateRound } from '../types';

export class RichterAgent extends BaseAgent {
  constructor() {
    super(
      'richter',
      'gpt-4o',
      `Du bist ein neutraler Richter und Experte für evidenzbasierte Entscheidungsfindung. Deine Aufgabe ist es, alle verfügbaren Belege zu bewerten und ein finales Urteil zu fällen.

WICHTIGE PRINZIPIEN:
1. NEUTRALITÄT: Bewerte alle Belege objektiv und unvoreingenommen
2. EVIDENZ-GEWICHTUNG: Gewichte Belege nach Qualität und Zuverlässigkeit
3. KONFLIKT-AUFLÖSUNG: Löse Widersprüche zwischen Quellen auf
4. KONFIDENZ-BEWERTUNG: Gib realistische Konfidenz-Einschätzungen
5. TRANSPARENZ: Erkläre deine Entscheidung nachvollziehbar

BEWERTUNGSKRITERIEN:
- Quellenqualität (Primär > Sekundär > Tertiär)
- Aktualität der Informationen
- Konsistenz zwischen Quellen
- Numerische Verifikation
- Logische Kohärenz
- Bias-Freiheit

URTEILS-KATEGORIEN:
- WAHR: Behauptung ist durch starke Belege gestützt
- TEILWAHR: Behauptung ist teilweise korrekt, aber unvollständig
- UNBELGT: Unzureichende Belege für eine Bewertung
- FALSCH: Behauptung wird durch Belege widerlegt

ARBEITSWEISE:
- Sammle alle verfügbaren Belege (pro und contra)
- Bewerte die Qualität jeder Quelle
- Analysiere numerische Verifikationen
- Löse Konflikte zwischen Quellen auf
- Fälle ein begründetes Urteil

AUSGABE-FORMAT:
1. ZUSAMMENFASSUNG: Überblick über alle Belege
2. BELEG-BEWERTUNG: Qualitätsbewertung der Quellen
3. KONFLIKT-ANALYSE: Widersprüche und deren Auflösung
4. NUMERISCHE VERIFIKATION: Status der Zahlen-Überprüfung
5. URTEIL: Finale Bewertung mit Begründung und Konfidenz`
    );
  }

  async processClaim(
    claim: Claim,
    context: {
      sources: Source[];
      evidence: Evidence[];
      debateHistory?: AgentResponse[];
      numericalAnalyses?: NumericalAnalysis[];
    }
  ): Promise<AgentResponse> {
    const prompt = this.buildJudgmentPrompt(claim, context);
    
    const llmResponse = await this.callLLM(prompt, context, 0.1); // Low temperature for consistency
    
    const evidence = this.consolidateEvidence(context.evidence);
    const confidence = this.calculateJudgmentConfidence(evidence, context.numericalAnalyses || []);

    return {
      agentId: 'richter',
      claimId: claim.id,
      response: llmResponse.response,
      evidence,
      confidence,
      reasoning: llmResponse.reasoning,
      timestamp: new Date(),
      model: this.model,
      tokens: llmResponse.tokens
    };
  }

  private buildJudgmentPrompt(
    claim: Claim,
    context: {
      sources: Source[];
      evidence: Evidence[];
      debateHistory?: AgentResponse[];
      numericalAnalyses?: NumericalAnalysis[];
    }
  ): string {
    const supportingEvidence = context.evidence.filter(e => e.supports);
    const contradictingEvidence = context.evidence.filter(e => !e.supports);

    const supportingText = supportingEvidence
      .map(e => `- ${e.quote} (${e.source.title}, Zuverlässigkeit: ${(e.source.reliability * 100).toFixed(0)}%)`)
      .join('\n');

    const contradictingText = contradictingEvidence
      .map(e => `- ${e.quote} (${e.source.title}, Zuverlässigkeit: ${(e.source.reliability * 100).toFixed(0)}%)`)
      .join('\n');

    const numericalText = context.numericalAnalyses
      ?.map(analysis => `- ${analysis.originalValue} ${analysis.unit || ''} - Status: ${analysis.verification}`)
      .join('\n') || 'Keine numerischen Analysen';

    const debateText = context.debateHistory
      ?.map(round => `
        Runde ${(round as any).round}:
        - Researcher: ${(round as any).researcher.confidence.toFixed(2)} Konfidenz
        - Skeptiker: ${(round as any).skeptiker.confidence.toFixed(2)} Konfidenz
      `).join('\n') || 'Keine Debatte';

    return `
${this.systemPrompt}

BEHAUPTUNG ZU BEWERTEN:
"${claim.text}"

BEHAUPTUNGSTYP: ${claim.type}

STÜTZENDE BELEGE:
${supportingText || 'Keine stützenden Belege'}

WIDERSPRÜCHLICHE BELEGE:
${contradictingText || 'Keine widersprüchlichen Belege'}

NUMERISCHE VERIFIKATION:
${numericalText}

DEBATTEN-VERLAUF:
${debateText}

VERFÜGBARE QUELLEN:
${context.sources.map(s => `- ${s.title} (${s.domain}, Zuverlässigkeit: ${(s.reliability * 100).toFixed(0)}%)`).join('\n')}

AUFGABE:
1. Bewerte alle verfügbaren Belege objektiv
2. Gewichte Quellen nach Qualität und Zuverlässigkeit
3. Löse Konflikte zwischen Quellen auf
4. Berücksichtige numerische Verifikationen
5. Fälle ein begründetes Urteil

ANTWORT-STRUKTUR:
ZUSAMMENFASSUNG: [Überblick über alle Belege]

BELEG-BEWERTUNG: [Qualitätsbewertung der Quellen]

KONFLIKT-ANALYSE: [Widersprüche und deren Auflösung]

NUMERISCHE VERIFIKATION: [Status der Zahlen-Überprüfung]

URTEIL: [WAHR/TEILWAHR/UNBELGT/FALSCH] - Konfidenz: [0-100%] - Begründung: [Detaillierte Erklärung]
    `.trim();
  }

  private consolidateEvidence(evidence: Evidence[]): Evidence[] {
    // Remove duplicates and consolidate similar evidence
    const consolidated: Evidence[] = [];
    const seen = new Set<string>();

    evidence.forEach(e => {
      const key = `${e.quote}-${e.source.url}`;
      if (!seen.has(key)) {
        seen.add(key);
        consolidated.push(e);
      }
    });

    // Sort by relevance and source reliability
    return consolidated.sort((a, b) => {
      const scoreA = a.relevance * a.source.reliability;
      const scoreB = b.relevance * b.source.reliability;
      return scoreB - scoreA;
    });
  }

  private calculateJudgmentConfidence(
    evidence: Evidence[],
    numericalAnalyses: NumericalAnalysis[]
  ): number {
    if (evidence.length === 0) return 0.3; // Low confidence without evidence

    // Calculate evidence-based confidence
    const supportingEvidence = evidence.filter(e => e.supports);
    const contradictingEvidence = evidence.filter(e => !e.supports);

    const supportingScore = supportingEvidence.reduce((sum, e) => 
      sum + (e.relevance * e.source.reliability * e.confidence), 0
    );

    const contradictingScore = contradictingEvidence.reduce((sum, e) => 
      sum + (e.relevance * e.source.reliability * e.confidence), 0
    );

    const evidenceBalance = supportingScore - contradictingScore;
    const totalEvidence = supportingScore + contradictingScore;

    // Calculate numerical verification confidence
    const numericalConfidence = this.calculateNumericalConfidence(numericalAnalyses);

    // Combine evidence and numerical confidence
    const evidenceConfidence = totalEvidence > 0 ? Math.abs(evidenceBalance) / totalEvidence : 0.5;
    const combinedConfidence = (evidenceConfidence + numericalConfidence) / 2;

    return Math.max(0.1, Math.min(0.95, combinedConfidence));
  }

  private calculateNumericalConfidence(analyses: NumericalAnalysis[]): number {
    if (analyses.length === 0) return 0.5; // Neutral if no numbers

    const verifiedCount = analyses.filter(a => a.verification === 'verified').length;
    const disputedCount = analyses.filter(a => a.verification === 'disputed').length;
    const errorCount = analyses.filter(a => a.verification === 'error').length;

    const verificationRate = verifiedCount / analyses.length;
    const disputeRate = disputedCount / analyses.length;
    const errorRate = errorCount / analyses.length;

    return Math.max(0.1, Math.min(0.95, verificationRate - disputeRate * 0.3 - errorRate * 0.5));
  }

  public extractVerdict(response: string): {
    verdict: 'wahr' | 'teilwahr' | 'unbelegt' | 'falsch';
    confidence: number;
    reasoning: string;
  } {
    // Extract verdict from response
    const verdictMatch = response.match(/URTEIL:\s*\[([^\]]+)\]/);
    const confidenceMatch = response.match(/Konfidenz:\s*\[(\d+(?:\.\d+)?)%?\]/);
    const reasoningMatch = response.match(/Begründung:\s*\[([^\]]+)\]/);

    const verdict = verdictMatch ? verdictMatch[1].toLowerCase() as any : 'unbelegt';
    const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) / 100 : 0.5;
    const reasoning = reasoningMatch ? reasoningMatch[1] : 'Keine Begründung verfügbar';

    return { verdict, confidence, reasoning };
  }
}

