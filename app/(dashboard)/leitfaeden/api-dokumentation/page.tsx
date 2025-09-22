'use client';

import React, { useState } from 'react';
import { 
  Code,
  Server,
  Key,
  FileText,
  Copy,
  CheckCircle,
  ExternalLink,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/chat',
    description: 'Chat mit ZDF Assistant',
    parameters: [
      { name: 'messages', type: 'ChatMessage[]', required: true, description: 'Chat-Verlauf' },
      { name: 'model', type: 'string', required: false, description: 'AI-Modell (default: gpt-4)' },
      { name: 'temperature', type: 'number', required: false, description: 'Kreativität (0-2)' }
    ]
  },
  {
    method: 'POST',
    endpoint: '/api/factcheck',
    description: 'Wissenschaftliche Faktenprüfung',
    parameters: [
      { name: 'claim', type: 'string', required: true, description: 'Zu prüfende Behauptung' },
      { name: 'question', type: 'string', required: false, description: 'Spezifische Fragestellung' },
      { name: 'context', type: 'string', required: false, description: 'Zusätzlicher Kontext' },
      { name: 'top_k', type: 'number', required: true, description: 'Anzahl Quellen (5-20)' },
      { name: 'language', type: 'string', required: true, description: 'Sprache (de/en)' }
    ]
  },
  {
    method: 'POST',
    endpoint: '/api/transcribe',
    description: 'Audio/Video Transkription',
    parameters: [
      { name: 'file', type: 'File', required: true, description: 'Audio/Video-Datei' },
      { name: 'settings', type: 'TranscriptionSettings', required: true, description: 'Transkriptions-Einstellungen' }
    ]
  }
];

const codeExamples = {
  chat: `// Chat API Beispiel
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hallo ZDF Assistant!' }
    ],
    model: 'gpt-4',
    temperature: 1.0
  }),
});

const data = await response.json();
console.log(data.reply);`,

  factcheck: `// Factcheck API Beispiel
const response = await fetch('/api/factcheck', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    claim: "Vitamin D reduziert Sterblichkeit um 10%",
    context: "Erwachsene Population, RCT Studien",
    top_k: 8,
    language: "de"
  }),
});

const result = await response.json();
console.log(result.verdict);`,

  transcribe: `// Transkription API Beispiel
const formData = new FormData();
formData.append('file', audioFile);
formData.append('settings', JSON.stringify({
  modelSize: 'base',
  task: 'transcribe',
  language: 'de',
  wordTimestamps: true
}));

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result.text);`
};

export default function ApiDokumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="font-medium">Zurück</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-12 py-16 px-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
            <Code className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          API-Dokumentation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Technische Schnittstellen und Integration des ZDF Assistant Systems.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* API Overview */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Server className="w-5 h-5 text-blue-600" />
                API-Übersicht
              </CardTitle>
              <CardDescription className="text-gray-600">
                Verfügbare Endpunkte und deren Funktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`${
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono text-gray-900">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-700 mb-3">{endpoint.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Parameter:</h4>
                      {endpoint.parameters.map((param, pIndex) => (
                        <div key={pIndex} className="flex items-center gap-3 text-sm">
                          <code className="bg-gray-200 px-2 py-1 rounded text-gray-800">
                            {param.name}
                          </code>
                          <Badge variant="outline" className="text-xs">
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Erforderlich
                            </Badge>
                          )}
                          <span className="text-gray-600">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Code className="w-5 h-5 text-purple-600" />
                Code-Beispiele
              </CardTitle>
              <CardDescription className="text-gray-600">
                Praktische Implementierungsbeispiele für alle APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">Chat API</TabsTrigger>
                  <TabsTrigger value="factcheck">Factcheck API</TabsTrigger>
                  <TabsTrigger value="transcribe">Transkription API</TabsTrigger>
                </TabsList>
                
                {Object.entries(codeExamples).map(([key, code]) => (
                  <TabsContent key={key} value={key}>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                      <Button
                        size="sm"
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white"
                        onClick={() => copyToClipboard(code, key)}
                      >
                        {copiedCode === key ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Authentication */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <Key className="w-5 h-5 text-yellow-600" />
                Authentifizierung
              </CardTitle>
              <CardDescription className="text-gray-600">
                API-Schlüssel und Sicherheitsrichtlinien
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-900">API-Schlüssel erforderlich</h4>
                  </div>
                  <p className="text-yellow-800 text-sm">
                    Für die Nutzung der ZDF Assistant APIs benötigen Sie einen gültigen API-Schlüssel. 
                    Kontaktieren Sie das IT-Team für die Bereitstellung.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Sicherheitsrichtlinien:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• API-Schlüssel niemals in Frontend-Code</li>
                      <li>• HTTPS für alle API-Aufrufe</li>
                      <li>• Rate-Limiting beachten</li>
                      <li>• Logs regelmäßig überprüfen</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Best Practices:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Fehlerbehandlung implementieren</li>
                      <li>• Timeouts definieren</li>
                      <li>• Retry-Logic für kritische Calls</li>
                      <li>• Monitoring und Alerting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Resources */}
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-gray-600" />
                Externe Ressourcen
              </CardTitle>
              <CardDescription className="text-gray-600">
                Weiterführende Dokumentation und Tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>OpenAPI Specification</span>
                  <span className="text-xs opacity-75">Swagger/Postman Import</span>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white h-auto py-4 flex-col">
                  <Code className="w-6 h-6 mb-2" />
                  <span>SDK Downloads</span>
                  <span className="text-xs opacity-75">JavaScript, Python, PHP</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}