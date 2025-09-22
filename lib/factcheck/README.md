# Multi-Agent Fact-Checking System

Ein fortschrittliches, mehrstufiges Fact-Checking-System mit Multi-Agent-Architektur, das verschiedene Interaktionsmuster und Qualitätskontrollen verwendet.

## 🏗️ Architektur

### Kernkomponenten

1. **Claim Extractor**: Extrahiert verifizierbare Behauptungen aus Text, Video oder Audio
2. **Retrieval System**: Sucht nach Quellen über Web-Suchmaschinen und Wissensdatenbanken
3. **Multi-Agent System**: Vier spezialisierte Agenten arbeiten zusammen
4. **Interaktionsmuster**: Debate, Self-Consistency, Chain-of-Verification
5. **Qualitätskontrolle**: Strikte Zitationsanforderungen und Quellenbewertung
6. **Audit-Logging**: Vollständige Nachverfolgbarkeit aller Operationen

### Agent-Rollen

#### 🔍 Researcher (GPT-4o)
- Sammelt und analysiert Belege
- Extrahiert präzise Zitate mit Quellenangaben
- Markiert numerische Angaben zur Verifikation
- Bewertet Quellenqualität und Relevanz

#### 🤔 Skeptiker (Claude-3.5-Sonnet)
- Hinterfragt Behauptungen kritisch
- Sucht nach Gegenbelegen und Widersprüchen
- Identifiziert logische Fehlschlüsse
- Entwickelt alternative Erklärungen

#### 📊 Analyst (GPT-4o + Wolfram Alpha)
- Verifiziert alle numerischen Angaben
- Führt Berechnungen und Einheiten-Umrechnungen durch
- Bewertet statistische Aussagen
- Analysiert Zeitreihen und Trends

#### ⚖️ Richter (GPT-4o)
- Bewertet alle Belege objektiv
- Gewichtet Quellen nach Qualität und Zuverlässigkeit
- Löst Konflikte zwischen Quellen auf
- Fällt finales Urteil mit Begründung

## 🔄 Interaktionsmuster

### 1. Debate Pattern
- **Ziel**: Adversarische Diskussion zwischen Researcher und Skeptiker
- **Ablauf**: Mehrere Runden mit gegenseitiger Herausforderung
- **Konvergenz**: Frühe Beendigung bei hoher Übereinstimmung
- **Qualität**: Bewertung der Debattenqualität und Konvergenz

### 2. Self-Consistency Pattern
- **Ziel**: Konsistenzprüfung durch Variation der Fragestellung
- **Ablauf**: Mehrere Variationen derselben Behauptung
- **Analyse**: Konsistenz der Agenten-Antworten
- **Zuverlässigkeit**: Bewertung der Ergebnisstabilität

### 3. Chain-of-Verification Pattern
- **Ziel**: Zerlegung komplexer Behauptungen in verifizierbare Teilbehauptungen
- **Ablauf**: Jede Teilbehauptung wird einzeln verifiziert
- **Synthese**: Gesamtbewertung basierend auf Teilverifikationen
- **Qualität**: Vollständigkeit und Zuverlässigkeit der Verifikation

## 🔍 Retrieval System

### Web-Suchmaschinen
- **Bing Search API**: Allgemeine Websuche
- **SerpAPI**: Erweiterte Suchfunktionen
- **Tavily**: Spezialisierte Fact-Checking-Suche

### Wissensdatenbanken
- **Elasticsearch**: Volltextsuche mit Metadaten
- **PostgreSQL + pgvector**: Vektorähnlichkeitssuche
- **Interne Wissensdatenbank**: Curated, hochwertige Quellen

### Quellenbewertung
- **Primärquellen**: Originaldokumente, Studien, offizielle Berichte
- **Sekundärquellen**: Journalistische Berichte, Expertenanalysen
- **Tertiärquellen**: Enzyklopädien, Zusammenfassungen
- **Zuverlässigkeit**: 0-1 Skala basierend auf Domain-Autorität und Metadaten

## 📋 Qualitätskontrolle

### Zitationsanforderungen
- **Mindestanzahl Quellen**: Konfigurierbar (Standard: 3)
- **Zitat-Länge**: Maximal 25 Wörter
- **Datumspflicht**: Veröffentlichungsdatum erforderlich
- **Autorenpflicht**: Optional, aber empfohlen

### Qualitätsmetriken
- **Zitationsvollständigkeit**: 0-1 Skala
- **Quellenvielfalt**: Domain-, Typ- und geografische Diversität
- **Zeitrelevanz**: Aktualität der Quellen
- **Konfliktlösung**: Umgang mit widersprüchlichen Belegen
- **Numerische Genauigkeit**: Verifikationsrate von Zahlen

### Qualitätsbewertung
- **A**: 90-100% (Hervorragend)
- **B**: 80-89% (Gut)
- **C**: 70-79% (Befriedigend)
- **D**: 60-69% (Ausreichend)
- **F**: <60% (Ungenügend)

## 📊 Audit-Logging

### Protokollierte Ereignisse
- **Anfragen**: Vollständige Fact-Check-Anfragen
- **Agent-Interaktionen**: Alle Agenten-Antworten mit Metadaten
- **Suchanfragen**: Web- und Datenbanksuchen
- **Debatten-Runden**: Vollständige Debattenverläufe
- **Fehler**: Alle Fehler mit Kontext

### Metadaten
- **Zeitstempel**: Präzise Zeitangaben
- **Token-Verbrauch**: Kostenverfolgung
- **Verarbeitungszeit**: Performance-Metriken
- **Modell-Informationen**: Verwendete LLM-Modelle
- **Eingabe/Ausgabe**: Sanitisierte Daten

### Export-Formate
- **JSON**: Vollständige Struktur
- **CSV**: Tabellarische Darstellung
- **TXT**: Menschenlesbares Format

## 🚀 Verwendung

### Grundlegende Verwendung

```typescript
import { FactCheckEngine } from './factcheck-engine';

const config = {
  researcherModel: 'gpt-4o',
  skeptikerModel: 'claude-3-5-sonnet',
  analystModel: 'gpt-4o',
  richterModel: 'gpt-4o',
  enableDebate: true,
  enableSelfConsistency: true,
  enableChainOfVerification: true,
  maxSources: 20,
  minSources: 3,
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    wolfram: process.env.WOLFRAM_API_KEY
  }
};

const engine = new FactCheckEngine(config);

const request = {
  id: 'example-1',
  input: {
    text: 'Die globale Erwärmung hat sich in den letzten 20 Jahren um 0.5°C erhöht.',
    language: 'de'
  },
  settings: {
    confidenceThreshold: 0.3,
    maxSources: 10,
    enableDebate: true,
    enableSelfConsistency: true,
    enableChainOfVerification: true
  },
  timestamp: new Date()
};

const result = await engine.factCheck(request);
console.log('Verdict:', result.verdict.overall);
console.log('Confidence:', result.verdict.confidence);
```

### Erweiterte Konfiguration

```typescript
const strictConfig = {
  ...config,
  minSources: 5,
  maxQuoteLength: 20,
  requireDates: true,
  requireAuthors: true,
  maxDebateRounds: 5,
  selfConsistencyVariations: 5
};

const engine = new FactCheckEngine(strictConfig);
```

### Qualitätsbericht

```typescript
const qualityReport = engine.generateQualityReport(result);
console.log('Grade:', qualityReport.grade);
console.log('Score:', qualityReport.metrics.overallScore);
console.log('Issues:', qualityReport.issues);
console.log('Recommendations:', qualityReport.recommendations);
```

### Audit-Bericht

```typescript
const auditReport = engine.getAuditReport(request.id);
console.log('Total tokens:', auditReport.summary.totalTokens);
console.log('Processing time:', auditReport.summary.totalDuration);
console.log('Errors:', auditReport.errors.length);
```

## 🔧 Konfiguration

### API-Schlüssel
```bash
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
WOLFRAM_API_KEY=your_wolfram_key
BING_SEARCH_API_KEY=your_bing_key
SERPAPI_KEY=your_serpapi_key
TAVILY_API_KEY=your_tavily_key
```

### Umgebungsvariablen
```bash
ELASTICSEARCH_URL=http://localhost:9200
POSTGRES_URL=postgresql://localhost:5432/factcheck
```

## 📈 Performance-Optimierung

### Caching
- **Quellen-Cache**: Wiederverwendung von Suchergebnissen
- **Agent-Cache**: Zwischenspeicherung von Agenten-Antworten
- **Verdict-Cache**: Caching von Finalurteilen

### Parallelisierung
- **Parallele Suchen**: Gleichzeitige Abfrage mehrerer Suchmaschinen
- **Parallele Agenten**: Gleichzeitige Verarbeitung mehrerer Claims
- **Batch-Verarbeitung**: Effiziente Verarbeitung mehrerer Anfragen

### Rate Limiting
- **API-Limits**: Respektierung von API-Ratenbegrenzungen
- **Backoff-Strategien**: Exponentiales Backoff bei Fehlern
- **Queue-Management**: Warteschlangen für hohe Lasten

## 🛡️ Sicherheit

### Datenschutz
- **Sanitisierung**: Entfernung sensibler Daten aus Logs
- **Verschlüsselung**: Verschlüsselung von API-Schlüsseln
- **Zugriffskontrolle**: Rollenbasierte Zugriffskontrolle

### Validierung
- **Eingabevalidierung**: Überprüfung aller Eingaben
- **Ausgabevalidierung**: Validierung von Agenten-Ausgaben
- **Quellenvalidierung**: Überprüfung der Quellenauthentizität

## 🔮 Erweiterungen

### Geplante Features
- **Multimodale Analyse**: Bild- und Video-Fact-Checking
- **Real-time Updates**: Live-Updates von Quellen
- **Benutzer-Feedback**: Integration von Benutzerkorrekturen
- **API-Integration**: RESTful API für externe Systeme

### Forschung
- **Neue Agent-Typen**: Spezialisierte Agenten für verschiedene Domänen
- **Verbesserte Muster**: Neue Interaktionsmuster
- **KI-Integration**: Integration neuerer LLM-Modelle
- **Metriken**: Erweiterte Qualitätsmetriken

## 📚 Literatur

- "Multi-Agent Systems for Fact-Checking" (2024)
- "Adversarial Fact-Checking: A New Paradigm" (2024)
- "Chain-of-Verification for Complex Claims" (2024)
- "Quality Metrics for Automated Fact-Checking" (2024)

## 🤝 Beitragen

1. Fork des Repositories
2. Feature-Branch erstellen
3. Tests hinzufügen
4. Pull Request einreichen

## 📄 Lizenz

MIT License - siehe LICENSE-Datei für Details.

