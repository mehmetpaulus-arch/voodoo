# ElevenLabs API Setup Anleitung

## 🚀 ElevenLabs API Key Konfiguration

### 1. ElevenLabs Account erstellen
1. Gehe zu [ElevenLabs.io](https://elevenlabs.io)
2. Erstelle einen kostenlosen Account
3. Verifiziere deine E-Mail-Adresse

### 2. API Key generieren
1. Logge dich in dein ElevenLabs Dashboard ein
2. Gehe zu **Profile** → **API Keys**
3. Klicke auf **"Create API Key"**
4. Gib einen Namen ein (z.B. "ZDF Music Generator")
5. Kopiere den generierten API Key

### 3. API Key in der Anwendung konfigurieren

#### Option A: .env.local Datei (Empfohlen)
Erstelle eine `.env.local` Datei im Projekt-Root:

```bash
# ElevenLabs API Configuration
ELEVENLABS_API_KEY=dein_api_key_hier

# Andere Umgebungsvariablen
OPENAI_API_KEY=dein_openai_key_hier
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

#### Option B: System-Umgebungsvariablen
```bash
# Windows (PowerShell)
$env:ELEVENLABS_API_KEY="dein_api_key_hier"

# Windows (CMD)
set ELEVENLABS_API_KEY=dein_api_key_hier

# macOS/Linux
export ELEVENLABS_API_KEY="dein_api_key_hier"
```

### 4. Server neu starten
Nach dem Hinzufügen der API Key:
```bash
npm run dev
```

## 🎵 Verwendung

### Sound Generation
1. Gehe zu `/studio/audio/music-generator/landing`
2. Gib eine Sound-Beschreibung ein
3. Passe die Einstellungen an:
   - **Dauer**: 0.5 - 30 Sekunden
   - **Prompt Einfluss**: 0 - 100%
   - **Format**: MP3 oder PCM
   - **Loop**: Für wiederholbare Sounds
4. Klicke auf "Sound generieren"

### Beispiel-Prompts
- `"Ein hölzernes Schiff, das auf den Wellen knarrt"`
- `"Heavy wooden door slamming shut with echo"`
- `"Powerful thunder clap with deep rumble and reverb"`
- `"Satisfying mechanical button click with tactile feedback"`
- `"Rain falling on leaves with gentle wind"`
- `"Laser beam firing with energy buildup"`

## 📋 API Limits

### Kostenlose Version
- 10.000 Zeichen pro Monat
- Standard Modelle
- MP3 Format

### Creator Plan ($22/Monat)
- 500.000 Zeichen pro Monat
- Alle Modelle
- MP3 192kbps
- Kommerzielle Nutzung

### Pro Plan ($99/Monat)
- Unbegrenzte Zeichen
- Custom Modelle
- PCM Format
- API Access
- White-label Optionen

## 🔧 Troubleshooting

### "API Key nicht konfiguriert"
- Überprüfe, ob `ELEVENLABS_API_KEY` in `.env.local` gesetzt ist
- Starte den Server neu
- Überprüfe die Schreibweise

### "Ungültiger API Key"
- Überprüfe, ob der API Key korrekt kopiert wurde
- Stelle sicher, dass der Key aktiv ist
- Überprüfe dein ElevenLabs Abonnement

### "Kontingent überschritten"
- Überprüfe dein ElevenLabs Abonnement
- Warte bis zum nächsten Monat
- Upgrade auf einen höheren Plan

## 📚 Weitere Ressourcen

- [ElevenLabs API Dokumentation](https://docs.elevenlabs.io/)
- [Sound Generation Guide](https://docs.elevenlabs.io/sound-generation)
- [API Rate Limits](https://docs.elevenlabs.io/rate-limits)
- [Supported Formats](https://docs.elevenlabs.io/supported-formats)

## 🎯 Nächste Schritte

1. **API Key konfigurieren** ✅
2. **Erste Sound-Generierung testen**
3. **Verschiedene Prompts ausprobieren**
4. **Für Produktion: Abonnement upgraden**
5. **Custom Modelle trainieren** (Pro Plan)

