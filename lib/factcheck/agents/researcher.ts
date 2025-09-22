import { BaseAgent } from './base-agent';
import { AgentResponse, Evidence, Claim, Source } from '../types';

export class ResearcherAgent extends BaseAgent {
  constructor() {
    super(
      'researcher',
      'gpt-4o',
      `Du bist ein professioneller Fact-Checker und Rechercheur. Deine Aufgabe ist es, umfassende Belege für Behauptungen zu sammeln und zu analysieren.

WICHTIGE PRINZIPIEN:
1. ZITATIONSZWANG: Jede Kernaussage MUSS mit einer direkten Quelle belegt werden
2. ZEIT-SENSITIVITÄT: Immer Veröffentlichungs- und Ereignisdatum erfassen
3. PRIMÄRQUELLEN: Bevorzuge Primärquellen über Sekundär- und Tertiärquellen
4. ZITAT-EXTRAKTION: Extrahiere präzise Zitate (10-25 Wörter) mit Quellenangabe
5. ZAHLEN-VERIFIKATION: Alle numerischen Angaben zur weiteren Analyse markieren

ARBEITSWEISE:
- Sammle alle verfügbaren Belege für die Behauptung
- Markiere direkte Zitate mit [ZITAT: "Text" - Quelle: URL]
- Extrahiere Zahlen und Statistiken mit [ZAHL: Wert Einheit - Quelle: URL]
- Bewerte die Qualität und Relevanz jeder Quelle
- Identifiziere Lücken in der Beweislage

AUSGABE-FORMAT:
1. ZUSAMMENFASSUNG: Kurze Übersicht der gefundenen Belege
2. BELEGE: Strukturierte Liste mit Zitaten und Quellen
3. ZAHLEN: Alle numerischen Angaben zur Verifikation
4. BEWERTUNG: Einschätzung der Beweislage (stark/schwach/unzureichend)
5. LÜCKEN: Fehlende Informationen oder unklare Aspekte`
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
    const prompt = this.buildResearchPrompt(claim, context);
    
    const llmResponse = await this.callLLM(prompt, context, 0.3);
    
    const evidence = this.extractEvidence(llmResponse.response, context.sources);
    const confidence = this.calculateConfidence(evidence, llmResponse.response);

    return {
      agentId: 'researcher',
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

  private buildResearchPrompt(
    claim: Claim,
    context: { sources: Source[]; evidence: Evidence[]; debateHistory?: AgentResponse[] }
  ): string {
    const sourcesText = context.sources
      .map(source => `
        - ${source.title} (${source.domain})
          URL: ${source.url}
          Datum: ${source.publishDate?.toLocaleDateString('de-DE') || 'Unbekannt'}
          Autor: ${source.author || 'Unbekannt'}
          Zuverlässigkeit: ${(source.reliability * 100).toFixed(0)}%
          Inhalt: ${source.snippet}
      `)
      .join('\n');

    const existingEvidence = context.evidence
      .map(e => `- ${e.quote} (${e.source.title})`)
      .join('\n');

    return `
${this.systemPrompt}

BEHAUPTUNG ZU PRÜFEN:
"${claim.text}"

VERFÜGBARE QUELLEN:
${sourcesText}

BEREITS GEFUNDENE BELEGE:
${existingEvidence || 'Keine'}

AUFGABE:
1. Analysiere die Behauptung systematisch
2. Sammle alle relevanten Belege aus den verfügbaren Quellen
3. Extrahiere präzise Zitate mit Quellenangaben
4. Identifiziere numerische Angaben zur Verifikation
5. Bewerte die Qualität der Beweislage

ANTWORT-STRUKTUR:
ZUSAMMENFASSUNG: [Kurze Übersicht der Beweislage]

BELEGE:
[ZITAT: "Präzises Zitat" - Quelle: URL]
[ZITAT: "Weiteres Zitat" - Quelle: URL]

ZAHLEN ZUR VERIFIKATION:
[ZAHL: 123 Einheit - Quelle: URL]

BEWERTUNG: [stark/schwach/unzureichend]
LÜCKEN: [Fehlende Informationen]
    `.trim();
  }

  protected extractEvidence(response: string, sources: Source[]): Evidence[] {
    const evidence: Evidence[] = [];
    
    // Extract citations from response
    const citationRegex = /\[ZITAT:\s*"([^"]+)"\s*-\s*Quelle:\s*([^\]]+)\]/g;
    let match;
    
    while ((match = citationRegex.exec(response)) !== null) {
      const quote = match[1];
      const sourceUrl = match[2];
      
      // Find matching source
      const source = sources.find(s => s.url === sourceUrl);
      if (source) {
        evidence.push({
          id: `evidence-${Date.now()}-${evidence.length}`,
          claimId: 'current-claim', // Will be set by caller
          source,
          quote,
          relevance: this.calculateQuoteRelevance(quote, source),
          supports: this.determineSupport(quote),
          confidence: source.reliability * 0.9, // Slightly reduce for extraction uncertainty
          extractedBy: 'researcher',
          timestamp: new Date()
        });
      }
    }

    return evidence;
  }

  private calculateQuoteRelevance(quote: string, source: Source): number {
    // Simple relevance calculation based on quote length and source quality
    const quoteLength = quote.length;
    const baseRelevance = Math.min(1, quoteLength / 50); // Longer quotes are more relevant
    return Math.min(0.95, baseRelevance * source.reliability);
  }

  private determineSupport(quote: string): boolean {
    // Simple heuristic to determine if quote supports or contradicts
    const supportingWords = ['bestätigt', 'zeigt', 'beweist', 'demonstriert', 'belegt'];
    const contradictingWords = ['widerlegt', 'falsch', 'inkorrekt', 'irrtümlich', 'unzutreffend'];
    
    const lowerQuote = quote.toLowerCase();
    const supportCount = supportingWords.filter(word => lowerQuote.includes(word)).length;
    const contradictCount = contradictingWords.filter(word => lowerQuote.includes(word)).length;
    
    return supportCount >= contradictCount;
  }
}

