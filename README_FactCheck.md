# FactCheck API

Wissenschaftliche Faktenprüfung mit KI-Unterstützung und Multi-Source Integration.

## 🚀 Quick Start

### 1. Abhängigkeiten installieren

```bash
pip install -U fastapi uvicorn httpx pydantic python-dotenv tiktoken
```

### 2. Umgebungsvariablen konfigurieren

```bash
# .env Datei erstellen
cp .env.example .env

# .env bearbeiten und API-Keys eintragen
nano .env
```

**Erforderliche API-Keys:**
- `OPENAI_API_KEY`: OpenAI API Key (erforderlich)
- `TAVILY_API_KEY`: Tavily Web Search API (empfohlen)
- `WOLFRAM_APP_ID`: Wolfram Alpha App ID (empfohlen)
- `SEMANTIC_SCHOLAR_API_KEY`: Semantic Scholar API (optional)
- `CROSSREF_MAILTO`: Ihre E-Mail für Crossref API (optional)

### 3. API starten

```bash
# Mit dem Starter-Script
python start_factcheck_api.py

# Oder direkt mit uvicorn
uvicorn factcheck_api:app --reload --port 8080
```

### 4. API testen

```bash
# Health Check
curl http://localhost:8080/health

# Factcheck Request
curl -s -X POST http://localhost:8080/factcheck \
 -H 'content-type: application/json' \
 -d '{
   "claim":"Vitamin D supplementation reduces all-cause mortality by 10% in adults.",
   "context":"general adult population, RCT evidence",
   "top_k":8,
   "language":"de"
 }' | jq

# Oder mit dem Test-Script
python test_factcheck.py
```

## 📊 API Endpoints

### POST `/factcheck`

Prüft eine wissenschaftliche Behauptung.

**Request Body:**
```json
{
  "claim": "Die zu prüfende Behauptung",
  "question": "Optionale spezifische Fragestellung",
  "context": "Zusätzlicher Kontext (Population, Zeitraum, etc.)",
  "top_k": 8,
  "language": "de"
}
```

**Response:**
```json
{
  "meta": {
    "model": "gpt-4.1",
    "ts": "2025-01-27T10:30:00Z",
    "counts": {"sources": 8}
  },
  "verdict": {
    "verdict": "needs-context",
    "confidence": 0.75,
    "rationale": "Die Behauptung ist teilweise gestützt..."
  },
  "sources": [...],
  "wolfram": {...},
  "gpt_raw": {...}
}
```

### GET `/health`

Überprüft den API-Status.

## 🔍 Datenquellen

Die API integriert mehrere wissenschaftliche Datenquellen:

1. **Tavily** - Web-Suche für aktuelle Informationen
2. **Semantic Scholar** - Wissenschaftliche Publikationen
3. **Crossref** - Akademische Metadaten
4. **PubMed** - Medizinische Literatur
5. **Wolfram Alpha** - Numerische und mathematische Berechnungen

## 📝 Bewertungskategorien

- `true` - Durch Belege gestützt
- `false` - Widerspricht den Belegen
- `unverified` - Nicht genügend Belege
- `misleading` - Technisch korrekt, aber irreführend
- `needs-context` - Benötigt zusätzlichen Kontext
- `outdated` - Information nicht mehr aktuell
- `cherry-picked` - Basiert auf selektiven Daten

## 🛠️ Entwicklung

### Lokale Entwicklung

```bash
# Development Server mit Auto-Reload
uvicorn factcheck_api:app --reload --port 8080

# API Dokumentation
open http://localhost:8080/docs
```

### Tests ausführen

```bash
# Alle Tests
python test_factcheck.py

# Einzelner Test
curl -X POST http://localhost:8080/factcheck \
  -H 'Content-Type: application/json' \
  -d '{"claim": "Test claim", "top_k": 5}'
```

## 🔐 Sicherheit

- API-Keys niemals in Code committen
- `.env` Datei in `.gitignore` aufnehmen
- In Produktion CORS-Origins einschränken
- Rate-Limiting für öffentliche APIs implementieren

## 📚 Integration

Die API kann in verschiedene Anwendungen integriert werden:

- **Web-Frontend** - React/Vue.js Anwendungen
- **Jupyter Notebooks** - Wissenschaftliche Analysen
- **CLI Tools** - Automatisierte Fact-Checking Workflows
- **Slack/Discord Bots** - Team-Integration

## 🤝 Beitragen

1. Fork des Repositories
2. Feature Branch erstellen
3. Änderungen committen
4. Pull Request erstellen

## 📄 Lizenz

MIT License - siehe LICENSE Datei für Details.