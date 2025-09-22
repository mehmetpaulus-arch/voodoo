# Image Generator Setup Anleitung

## 🎨 Prompt-to-Image Generator mit OpenAI & Gemini

### 🔑 Benötigte API Keys

#### 1. OpenAI API Key (bereits vorhanden)
- **Zweck**: DALL-E 3 Bildgenerierung
- **Status**: ✅ Bereits in .env konfiguriert
- **Umgebungsvariable**: `OPENAI_API_KEY`

#### 2. Gemini API Key (neu hinzufügen)
- **Zweck**: Google Gemini 2.0 Flash Bildgenerierung
- **Website**: [Google AI Studio](https://aistudio.google.com)
- **Kosten**: Kostenloser Plan verfügbar
- **Umgebungsvariable**: `GEMINI_API_KEY`

### 📝 .env Datei erweitern

Füge den Gemini API Key zu deiner .env Datei hinzu:

```bash
# Bestehende Keys
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=sk_3ef9e3052318d33b993e5ee6f1b1cf54be77483a5f9e553f

# Neuer Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3003
```

### 🚀 Gemini API Key holen

1. **Google AI Studio besuchen**: [aistudio.google.com](https://aistudio.google.com)
2. **Google Account anmelden**
3. **API Key erstellen**:
   - Gehe zu "Get API Key"
   - Klicke "Create API Key"
   - Kopiere den generierten Key
4. **In .env eintragen**: `GEMINI_API_KEY=dein_key_hier`

### 🎯 Features des Image Generators

#### **OpenAI DALL-E 3:**
- ✅ **Hochwertige Bilder** mit DALL-E 3
- ✅ **3 Größen**: 1024×1024, 1024×1792, 1792×1024
- ✅ **2 Qualitäten**: Standard, HD
- ✅ **2 Stile**: Vivid, Natural
- ✅ **1 Bild pro Request** (DALL-E 3 Limit)

#### **Google Gemini 2.0 Flash:**
- ✅ **Schnelle Generierung** mit Gemini
- ✅ **Bis zu 4 Bilder** pro Request
- ✅ **Experimentelle Features**
- ✅ **Kostenlose Nutzung**

### 🎨 Verwendung

#### **Navigation:**
1. **Studio Grafik** → **Prompt-to-Image** Kachel klicken
2. **Oder direkt**: `http://localhost:3003/studio/grafik/image-generator`

#### **Bildgenerierung:**
1. **Prompt eingeben**: "A majestic lion in a golden savanna at sunset"
2. **Provider wählen**: OpenAI oder Gemini
3. **Einstellungen anpassen**: Größe, Qualität, Stil
4. **Generieren**: Klick auf "Bilder generieren"
5. **Downloaden**: Einzelne Bilder oder alle auf einmal

### 📋 Beispiel-Prompts

#### **Realistische Bilder:**
- "A professional headshot of a businesswoman in a modern office"
- "Golden retriever playing in a sunny park with autumn leaves"
- "Modern kitchen with marble countertops and natural lighting"

#### **Künstlerische Bilder:**
- "Abstract painting with vibrant blues and oranges, watercolor style"
- "Steampunk airship floating above Victorian London at sunset"
- "Minimalist logo design for a tech startup, geometric shapes"

#### **Fantasy & Sci-Fi:**
- "Dragon flying over a medieval castle at twilight"
- "Futuristic cityscape with flying cars and neon lights"
- "Magical forest with glowing mushrooms and fairy lights"

### ⚙️ Erweiterte Einstellungen

#### **Größen:**
- **1024×1024**: Quadratisch (Standard)
- **1024×1792**: Portrait (Hochformat)
- **1792×1024**: Landscape (Querformat)

#### **Qualitäten:**
- **Standard**: Schnellere Generierung
- **HD**: Höhere Qualität, längere Wartezeit

#### **Stile:**
- **Vivid**: Lebendige, satte Farben
- **Natural**: Natürliche, realistische Farben

### 🔧 Troubleshooting

#### **"OpenAI API Key nicht konfiguriert"**
- Überprüfe `OPENAI_API_KEY` in .env
- Starte Server neu: `npm run dev`

#### **"Gemini API Key nicht konfiguriert"**
- Überprüfe `GEMINI_API_KEY` in .env
- Stelle sicher, dass der Key aktiv ist

#### **"Rate Limit erreicht"**
- Warte einen Moment und versuche es erneut
- Überprüfe dein OpenAI/Gemini Abonnement

#### **"Content Policy Verstoß"**
- Ändere deinen Prompt
- Vermeide problematische Inhalte

### 💰 Kosten

#### **OpenAI DALL-E 3:**
- **Standard**: $0.040 pro Bild
- **HD**: $0.080 pro Bild
- **1024×1024**: Standard-Preis
- **Andere Größen**: 2x Preis

#### **Google Gemini:**
- **Kostenlos**: Bis zu 15 Requests/Minute
- **Pay-as-you-go**: Nach kostenlosem Limit

### 🎯 Nächste Schritte

1. **Gemini API Key** holen und in .env eintragen
2. **Server neu starten**: `npm run dev`
3. **Image Generator testen**: `/studio/grafik/image-generator`
4. **Beide Provider** ausprobieren
5. **Verschiedene Prompts** testen

### 📚 Weitere Ressourcen

- [OpenAI DALL-E 3 Dokumentation](https://platform.openai.com/docs/guides/images)
- [Google Gemini API Dokumentation](https://ai.google.dev/docs)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/images/prompting)

Der Image Generator ist jetzt vollständig funktionsfähig mit beiden APIs! 🎉

