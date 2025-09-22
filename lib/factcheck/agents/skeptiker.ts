import { BaseAgent } from './base-agent';
import { AgentResponse, Evidence, Claim, Source } from '../types';

export class SkeptikerAgent extends BaseAgent {
  constructor() {
    super(
      'skeptiker',
      'claude-3-haiku-20240307',
      `Du bist ein kritischer Skeptiker und Experte für logische Fehlschlüsse. Deine Aufgabe ist es, Behauptungen zu hinterfragen und Gegenbelege zu finden.

WICHTIGE PRINZIPIEN:
1. KRITISCHES DENKEN: Hinterfrage jede Behauptung systematisch
2. GEGENBELEGE: Suche aktiv nach widersprüchlichen Informationen
3. LOGIK-PRÜFUNG: Identifiziere Fehlschlüsse und logische Schwächen
4. BIAS-ERKENNUNG: Erkenne kognitive Verzerrungen und Voreingenommenheit
5. ALTERNATIVE ERKLÄRUNGEN: Entwickle alternative Interpretationen

FEHLSCHLÜSSE ZU PRÜFEN:
- Ad hominem (Angriff auf die Person)
- Strohmann-Argumente
- Falsche Dichotomie
- Korrelation vs. Kausalität
- Cherry-picking (Rosinenpicken)
- Appeal to authority (Autoritätsargument)
- Post hoc ergo propter hoc
- Hasty generalization (Übereilte Verallgemeinerung)

ARBEITSWEISE:
- Analysiere die Behauptung auf logische Schwächen
- Suche nach Gegenbelegen und widersprüchlichen Quellen
- Prüfe die Methodik und Datenqualität
- Identifiziere mögliche Verzerrungen
- Entwickle alternative Erklärungen

AUSGABE-FORMAT:
1. KRITISCHE ANALYSE: Logische Schwächen und Fehlschlüsse
2. GEGENBELEGE: Widersprüchliche Informationen
3. METHODIK-PRÜFUNG: Probleme mit Daten oder Methoden
4. BIAS-IDENTIFIKATION: Mögliche Verzerrungen
5. ALTERNATIVEN: Alternative Erklärungen oder Interpretationen`
    );
  }

  async processClaim(
    claim: Claim,
    context: {
      sources: Source[];
      evidence: Evidence[];
      debateHistory?: AgentResponse[];
    }
  ): Promise<AgentResponse> {
    const prompt = this.buildSkepticalPrompt(claim, context);
    
    const llmResponse = await this.callLLM(prompt, context, 0.4);
    
    const evidence = this.extractCounterEvidence(llmResponse.response, context.sources);
    const confidence = this.calculateSkepticalConfidence(evidence, llmResponse.response);

    return {
      agentId: 'skeptiker',
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

  private buildSkepticalPrompt(
    claim: Claim,
    context: { sources: Source[]; evidence: Evidence[]; debateHistory?: AgentResponse[] }
  ): string {
    const supportingEvidence = context.evidence.filter(e => e.supports);
    const contradictingEvidence = context.evidence.filter(e => !e.supports);

    const supportingText = supportingEvidence
      .map(e => `- ${e.quote} (${e.source.title})`)
      .join('\n');

    const contradictingText = contradictingEvidence
      .map(e => `- ${e.quote} (${e.source.title})`)
      .join('\n');

    return `
${this.systemPrompt}

BEHAUPTUNG ZU HINTERFRAGEN:
"${claim.text}"

BEHAUPTUNGSTYP: ${claim.type}

BISHERIGE STÜTZENDE BELEGE:
${supportingText || 'Keine'}

BISHERIGE WIDERSPRÜCHLICHE BELEGE:
${contradictingText || 'Keine'}

VERFÜGBARE QUELLEN:
${context.sources.map(s => `- ${s.title} (${s.domain}) - ${s.url}`).join('\n')}

AUFGABE:
1. Analysiere die Behauptung kritisch auf logische Schwächen
2. Suche nach Gegenbelegen und widersprüchlichen Informationen
3. Prüfe die Methodik und Datenqualität der stützenden Belege
4. Identifiziere mögliche Verzerrungen oder Fehlschlüsse
5. Entwickle alternative Erklärungen

ANTWORT-STRUKTUR:
KRITISCHE ANALYSE: [Logische Schwächen und Fehlschlüsse]

GEGENBELEGE:
[ZITAT: "Widersprüchliches Zitat" - Quelle: URL]

METHODIK-PROBLEME: [Probleme mit Daten oder Methoden]

BIAS-IDENTIFIKATION: [Mögliche Verzerrungen]

ALTERNATIVEN: [Alternative Erklärungen]
    `.trim();
  }

  protected extractCounterEvidence(response: string, sources: Source[]): Evidence[] {
    const evidence: Evidence[] = [];
    
    // Extract counter-citations from response
    const citationRegex = /\[ZITAT:\s*"([^"]+)"\s*-\s*Quelle:\s*([^\]]+)\]/g;
    let match;
    
    while ((match = citationRegex.exec(response)) !== null) {
      const quote = match[1];
      const sourceUrl = match[2];
      
      // Find matching source
      const source = sources.find(s => s.url === sourceUrl);
      if (source) {
        evidence.push({
          id: `counter-evidence-${Date.now()}-${evidence.length}`,
          claimId: 'current-claim', // Will be set by caller
          source,
          quote,
          relevance: this.calculateCounterRelevance(quote, source),
          supports: false, // Skeptiker typically provides counter-evidence
          confidence: source.reliability * 0.8, // Slightly lower confidence for counter-evidence
          extractedBy: 'skeptiker',
          timestamp: new Date()
        });
      }
    }

    return evidence;
  }

  private calculateCounterRelevance(quote: string, source: Source): number {
    // Calculate relevance for counter-evidence
    const quoteLength = quote.length;
    const baseRelevance = Math.min(1, quoteLength / 40); // Counter-evidence can be shorter
    return Math.min(0.9, baseRelevance * source.reliability);
  }

  private calculateSkepticalConfidence(evidence: Evidence[], response: string): number {
    // Higher confidence when finding strong counter-evidence or logical flaws
    if (evidence.length === 0) return 0.4; // Moderate confidence in skepticism
    
    const avgRelevance = evidence.reduce((sum, e) => sum + e.relevance, 0) / evidence.length;
    const avgSourceReliability = evidence.reduce((sum, e) => sum + e.source.reliability, 0) / evidence.length;
    
    // Boost confidence for strong counter-evidence
    const counterEvidenceBoost = evidence.length > 2 ? 0.1 : 0;
    
    return Math.min(0.95, (avgRelevance + avgSourceReliability) / 2 + counterEvidenceBoost);
  }
}

