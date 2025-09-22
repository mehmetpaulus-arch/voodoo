# .env Datei Setup

## 🔑 ElevenLabs API Key konfigurieren

### 1. .env Datei erstellen
Erstelle eine neue Datei namens `.env` im Projekt-Root (gleicher Ordner wie `package.json`):

```bash
# ElevenLabs API Configuration
ELEVENLABS_API_KEY=sk_3ef9e3052318d33b993e5ee6f1b1cf54be77483a5f9e553f

# OpenAI API Configuration (falls vorhanden)
# OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3003
```

### 2. Server neu starten
Nach dem Erstellen der .env Datei:
```bash
# Stoppe den aktuellen Server (Ctrl+C)
# Dann neu starten:
npm run dev
```

### 3. Testen
Die Landing Page sollte jetzt funktionieren:
```
http://localhost:3003/studio/audio/music-generator/landing
```

## ✅ Was wurde entfernt:
- Marketing-Sektion "Warum ElevenLabs Sound Generator?"
- "Perfekt für" Sektion
- CTA-Sektion "Bereit für professionelle Sound Effects?"

Die Landing Page ist jetzt fokussiert auf die reine Sound-Generierung ohne Marketing-Inhalte.

