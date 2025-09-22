import { BaseAgent } from './base-agent';
import { AgentResponse, Evidence, Claim, Source, NumericalAnalysis } from '../types';

export class AnalystAgent extends BaseAgent {
  private wolframApiKey: string;

  constructor(wolframApiKey: string) {
    super(
      'analyst',
      'gpt-4o',
      `Du bist ein numerischer Analyst und Experte für Datenverifikation. Deine Aufgabe ist es, alle numerischen Angaben in Behauptungen zu überprüfen und zu verifizieren.

WICHTIGE PRINZIPIEN:
1. ZAHLEN-VERIFIKATION: Alle numerischen Angaben müssen überprüft werden
2. EINHEITEN-KONVERTIERUNG: Prüfe Einheiten und Umrechnungen
3. STATISTISCHE ANALYSE: Bewerte statistische Aussagen
4. ZEITREIHEN: Analysiere zeitliche Entwicklungen
5. WOLFRAM-INTEGRATION: Nutze Wolfram Alpha für komplexe Berechnungen

VERIFIKATIONS-BEREICHE:
- Mathematische Berechnungen
- Einheiten-Umrechnungen
- Statistische Aussagen
- Prozentuale Angaben
- Zeitreihen und Trends
- Geografische Daten
- Wirtschaftliche Kennzahlen
- Wissenschaftliche Messungen

ARBEITSWEISE:
- Extrahiere alle numerischen Angaben aus der Behauptung
- Identifiziere Einheiten und Kontext
- Führe Berechnungen durch (manuell oder mit Wolfram)
- Vergleiche mit verfügbaren Daten
- Bewerte Plausibilität und Genauigkeit

AUSGABE-FORMAT:
1. EXTRAHIERTE ZAHLEN: Alle numerischen Angaben
2. VERIFIKATION: Berechnungen und Überprüfungen
3. EINHEITEN: Umrechnungen und Einheiten-Checks
4. STATISTIK: Bewertung statistischer Aussagen
5. ERGEBNIS: Verifikationsstatus für jede Zahl`
    );
    
    this.wolframApiKey = wolframApiKey;
  }

  async processClaim(
    claim: Claim,
    context: {
      sources: Source[];
      evidence: Evidence[];
      debateHistory?: AgentResponse[];
    }
  ): Promise<AgentResponse> {
    const prompt = this.buildAnalysisPrompt(claim, context);
    
    const llmResponse = await this.callLLM(prompt, context, 0.2);
    
    const numericalAnalyses = await this.extractAndVerifyNumbers(claim, context.sources);
    const confidence = this.calculateAnalyticalConfidence(numericalAnalyses, llmResponse.response);

    return {
      agentId: 'analyst',
      claimId: claim.id,
      response: llmResponse.response,
      evidence: [], // Analyst doesn't provide traditional evidence
      confidence,
      reasoning: llmResponse.reasoning,
      timestamp: new Date(),
      model: this.model,
      tokens: llmResponse.tokens
    };
  }

  private buildAnalysisPrompt(
    claim: Claim,
    context: { sources: Source[]; evidence: Evidence[]; debateHistory?: AgentResponse[] }
  ): string {
    const numericalEvidence = context.evidence.filter(e => 
      this.containsNumbers(e.quote)
    );

    const numbersText = numericalEvidence
      .map(e => `- ${e.quote} (${e.source.title})`)
      .join('\n');

    return `
${this.systemPrompt}

BEHAUPTUNG ZU ANALYSIEREN:
"${claim.text}"

BEHAUPTUNGSTYP: ${claim.type}

NUMERISCHE BELEGE AUS QUELLEN:
${numbersText || 'Keine numerischen Belege gefunden'}

VERFÜGBARE QUELLEN:
${context.sources.map(s => `- ${s.title} (${s.domain}) - ${s.url}`).join('\n')}

AUFGABE:
1. Extrahiere alle numerischen Angaben aus der Behauptung
2. Identifiziere Einheiten und Kontext
3. Führe Berechnungen und Verifikationen durch
4. Nutze Wolfram Alpha für komplexe Berechnungen
5. Bewerte Plausibilität und Genauigkeit

ANTWORT-STRUKTUR:
EXTRAHIERTE ZAHLEN: [Alle numerischen Angaben mit Einheiten]

VERIFIKATION:
[ZAHL: 123 Einheit - Status: verifiziert/widersprüchlich/unverifizierbar - Berechnung: ...]

EINHEITEN-CHECK: [Umrechnungen und Einheiten-Verifikation]

STATISTISCHE BEWERTUNG: [Bewertung statistischer Aussagen]

ERGEBNIS: [Gesamtbewertung der numerischen Verifikation]
    `.trim();
  }

  private async extractAndVerifyNumbers(
    claim: Claim,
    sources: Source[]
  ): Promise<NumericalAnalysis[]> {
    const analyses: NumericalAnalysis[] = [];
    
    // Extract numbers from claim text
    const numbers = this.extractNumbersFromText(claim.text);
    
    for (const number of numbers) {
      const analysis = await this.verifyNumber(number, sources);
      analyses.push(analysis);
    }

    return analyses;
  }

  private extractNumbersFromText(text: string): Array<{
    value: string;
    unit?: string;
    context: string;
  }> {
    const numbers: Array<{ value: string; unit?: string; context: string }> = [];
    
    // Regex patterns for different number formats
    const patterns = [
      // Percentage
      /(\d+(?:\.\d+)?)\s*%/g,
      // Numbers with units
      /(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/g,
      // Plain numbers
      /(\d+(?:\.\d+)?)/g
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        numbers.push({
          value: match[1],
          unit: match[2],
          context: text.substring(Math.max(0, match.index - 20), match.index + match[0].length + 20)
        });
      }
    });

    return numbers;
  }

  private async verifyNumber(
    number: { value: string; unit?: string; context: string },
    sources: Source[]
  ): Promise<NumericalAnalysis> {
    try {
      const parsedValue = parseFloat(number.value);
      
      // Try to verify with Wolfram Alpha
      const wolframResult = await this.queryWolframAlpha(number.value, number.unit);
      
      // Check against sources
      const sourceVerification = this.verifyAgainstSources(number, sources);
      
      let verification: 'verified' | 'disputed' | 'unverifiable' | 'error' = 'unverifiable';
      
      if (wolframResult && sourceVerification) {
        verification = 'verified';
      } else if (wolframResult && !sourceVerification) {
        verification = 'disputed';
      } else if (!wolframResult && sourceVerification) {
        verification = 'verified';
      }

      return {
        claimId: 'current-claim', // Will be set by caller
        originalValue: number.value,
        parsedValue,
        unit: number.unit,
        wolframResult,
        verification
      };
    } catch (error) {
      return {
        claimId: 'current-claim',
        originalValue: number.value,
        verification: 'error'
      };
    }
  }

  private async queryWolframAlpha(value: string, unit?: string): Promise<{
    result: string;
    confidence: number;
    alternativeInterpretations: string[];
  } | undefined> {
    try {
      // Mock Wolfram Alpha query - in real implementation, use actual API
      const query = unit ? `${value} ${unit}` : value;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        result: `Wolfram result for ${query}`,
        confidence: 0.8,
        alternativeInterpretations: [`Alternative interpretation 1 for ${query}`, `Alternative interpretation 2 for ${query}`]
      };
    } catch (error) {
      console.error('Wolfram Alpha query failed:', error);
      return undefined;
    }
  }

  private verifyAgainstSources(
    number: { value: string; unit?: string; context: string },
    sources: Source[]
  ): boolean {
    // Check if the number appears in any of the sources
    const searchTerm = number.value;
    return sources.some(source => 
      source.content.includes(searchTerm) || 
      source.snippet.includes(searchTerm)
    );
  }

  private containsNumbers(text: string): boolean {
    return /\d/.test(text);
  }

  private calculateAnalyticalConfidence(
    analyses: NumericalAnalysis[],
    response: string
  ): number {
    if (analyses.length === 0) return 0.5; // Neutral confidence if no numbers
    
    const verifiedCount = analyses.filter(a => a.verification === 'verified').length;
    const disputedCount = analyses.filter(a => a.verification === 'disputed').length;
    const errorCount = analyses.filter(a => a.verification === 'error').length;
    
    const verificationRate = verifiedCount / analyses.length;
    const disputeRate = disputedCount / analyses.length;
    const errorRate = errorCount / analyses.length;
    
    // High confidence if most numbers are verified, low if many errors
    return Math.max(0.1, Math.min(0.95, verificationRate - disputeRate * 0.5 - errorRate * 0.8));
  }
}

