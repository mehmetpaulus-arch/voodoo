'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Search, 
  FileText, 
  Users, 
  Brain, 
  Scale, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Download,
  Settings,
  Play,
  Loader2,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface FactCheckResult {
  id: string;
  originalText: string;
  context: string;
  priority: string;
  status: 'completed' | 'error';
  timestamp: string;
  results: {
    overallScore: number;
    confidence: string;
    claims: Array<{
      id: string;
      text: string;
      verification: {
        status: string;
        confidence: number;
        sources: Array<{
          url: string;
          title: string;
          credibility: string;
        }>;
      };
    }>;
    recommendations: string[];
  };
  claudeAnalysis?: {
    reasoning: string;
    keyFindings: string[];
    riskAssessment: string;
  };
  openaiAnalysis?: {
    factualityScore: number;
    biasDetection: string[];
    sourceCredibility: string;
    additionalInsights: string[];
  };
  googleFactChecks?: Array<{
    text: string;
    claimant: string;
    claimDate: string;
    claimReview: Array<{
      publisher: string;
      reviewDate: string;
      textualRating: string;
      url: string;
    }>;
  }>;
}

export default function FactChecking2Page() {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('de');
  const [settings, setSettings] = useState({
    enableDebate: true,
    enableSelfConsistency: true,
    enableChainOfVerification: true,
    maxSources: 15,
    confidenceThreshold: 0.3
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<FactCheckResult | null>(null);

  const handleFactCheck = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setProgress(0);
    setResult(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 1000);

      const response = await fetch('/api/factcheck2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input,
          context: `Language: ${language}`,
          priority: 'medium'
        }),
      });

      if (!response.ok) {
        throw new Error('Fact-check failed');
      }

      const data = await response.json();
      setProgress(100);
      setResult(data.result);

      setTimeout(() => setProgress(0), 1000);
    } catch (error) {
      console.error('Fact-check error:', error);
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'wahr': return 'text-green-600 bg-green-100';
      case 'teilwahr': return 'text-yellow-600 bg-yellow-100';
      case 'unbelegt': return 'text-gray-600 bg-gray-100';
      case 'falsch': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'wahr': return <CheckCircle className="w-5 h-5" />;
      case 'teilwahr': return <AlertTriangle className="w-5 h-5" />;
      case 'unbelegt': return <Clock className="w-5 h-5" />;
      case 'falsch': return <AlertTriangle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#e5e7eb' }}>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/studio/scripts" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="font-medium">Zurück</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/leitfaeden" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Leitfäden</Link>
                <Link href="/leitfaeden/redaktionsrichtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Redaktionsrichtlinien</Link>
                <Link href="/leitfaeden/ci-richtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">CI-Richtlinien</Link>
                <Link href="/leitfaeden/qualitaetsstandards" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Qualitätsstandards</Link>
                <Link href="/leitfaeden/barrierefreiheit" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Barrierefreiheit</Link>
                <Link href="/leitfaeden/datenschutz" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Datenschutz</Link>
              </div>
            </div>
          </div>
          
          <Link href="/forum" className="hover:text-white transition-colors font-medium text-xl">
            Forum
          </Link>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Compliance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/compliance" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Compliance</Link>
                <Link href="/compliance/richtlinien" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Richtlinien</Link>
                <Link href="/compliance/audit" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Audit</Link>
                <Link href="/compliance/schulungen" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Schulungen</Link>
                <Link href="/compliance/meldungen" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Meldungen</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Changelog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/changelog" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Changelog</Link>
                <Link href="/changelog/systemstatus" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Systemstatus</Link>
                <Link href="/changelog/release-notes" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Release Notes</Link>
                <Link href="/changelog/roadmap" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Roadmap</Link>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Support
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
              <div className="p-2">
                <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Hilfe-Center</Link>
                <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Ticket erstellen</Link>
                <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">Onboarding & Schulungen</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#E37222] rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Fact-Checking 2.0</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Multi-Agent System
              </Badge>
            </div>
            <p className="text-gray-600 text-lg">
              Die eingesetzten KI-Systeme sind so miteinander vernetzt, dass sie ihre Resultate wechselseitig kontrollieren. Durch diesen kontinuierlichen Abgleich entsteht ein mehrstufiges Prüfverfahren, das höchste Genauigkeit und Konsistenz garantiert.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Input Section */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#E37222]" />
                    Behauptung eingeben
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Geben Sie den Text ein, der überprüft werden soll
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="input" className="text-gray-700">Text zur Überprüfung</Label>
                    <Textarea
                      id="input"
                      placeholder="Geben Sie hier die Behauptung ein, die Sie überprüfen möchten..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="min-h-[120px] resize-none text-gray-600 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-gray-700">Sprache</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="en">Englisch</SelectItem>
                          <SelectItem value="fr">Französisch</SelectItem>
                          <SelectItem value="es">Spanisch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxSources" className="text-gray-700">Max. Quellen</Label>
                      <Select 
                        value={settings.maxSources.toString()} 
                        onValueChange={(value) => setSettings(prev => ({ ...prev, maxSources: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Quellen</SelectItem>
                          <SelectItem value="10">10 Quellen</SelectItem>
                          <SelectItem value="15">15 Quellen</SelectItem>
                          <SelectItem value="20">20 Quellen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleFactCheck}
                    disabled={!input.trim() || isProcessing}
                    className="w-full bg-[#E37222] hover:bg-[#D16212] text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Fact-Check läuft...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Fact-Check starten
                      </>
                    )}
                  </Button>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Verarbeitung...</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Advanced Settings */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#E37222]" />
                    Erweiterte Einstellungen
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Konfigurieren Sie die Multi-Agent-Verarbeitung
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">Debatten-Muster</Label>
                        <p className="text-sm text-gray-500">Agenten diskutieren gegeneinander</p>
                      </div>
                      <Switch
                        checked={settings.enableDebate}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableDebate: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">Self-Consistency</Label>
                        <p className="text-sm text-gray-500">Konsistenzprüfung durch Variationen</p>
                      </div>
                      <Switch
                        checked={settings.enableSelfConsistency}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableSelfConsistency: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">Chain-of-Verification</Label>
                        <p className="text-sm text-gray-500">Zerlegung in Teilbehauptungen</p>
                      </div>
                      <Switch
                        checked={settings.enableChainOfVerification}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableChainOfVerification: checked }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">Konfidenz-Schwelle</Label>
                      <Select 
                        value={settings.confidenceThreshold.toString()} 
                        onValueChange={(value) => setSettings(prev => ({ ...prev, confidenceThreshold: parseFloat(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.1">10% (Sehr niedrig)</SelectItem>
                          <SelectItem value="0.3">30% (Niedrig)</SelectItem>
                          <SelectItem value="0.5">50% (Mittel)</SelectItem>
                          <SelectItem value="0.7">70% (Hoch)</SelectItem>
                          <SelectItem value="0.9">90% (Sehr hoch)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">

              {/* Results */}
              {result && (
                <>
                  {/* Overall Score */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-[#E37222]" />
                        Claude Analyse
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge className={`px-3 py-1 ${
                          result.results.overallScore > 0.8 ? 'bg-green-100 text-green-800' :
                          result.results.overallScore > 0.6 ? 'bg-yellow-100 text-yellow-800' :
                          result.results.overallScore > 0.4 ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          Score: {Math.round(result.results.overallScore * 100)}%
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {result.results.confidence}
                        </Badge>
                      </div>
                      
                      {result.claudeAnalysis?.reasoning && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Begründung:</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {result.claudeAnalysis.reasoning}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Claims gefunden:</span>
                          <span className="font-medium">{result.results.claims.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Empfehlungen:</span>
                          <span className="font-medium">{result.results.recommendations.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Erstellt:</span>
                          <span className="font-medium">{new Date(result.timestamp).toLocaleString('de-DE')}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* OpenAI Analysis */}
                  {result.openaiAnalysis && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-[#E37222]" />
                          OpenAI Analyse
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge className={`px-3 py-1 ${
                            result.openaiAnalysis.factualityScore > 0.8 ? 'bg-green-100 text-green-800' :
                            result.openaiAnalysis.factualityScore > 0.6 ? 'bg-yellow-100 text-yellow-800' :
                            result.openaiAnalysis.factualityScore > 0.4 ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Faktizität: {Math.round(result.openaiAnalysis.factualityScore * 100)}%
                          </Badge>
                        </div>
                        
                        {result.openaiAnalysis.sourceCredibility && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Quellenglaubwürdigkeit:</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                              {result.openaiAnalysis.sourceCredibility}
                            </p>
                          </div>
                        )}

                        {result.openaiAnalysis.biasDetection.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Bias-Erkennung:</h4>
                            <div className="space-y-1">
                              {result.openaiAnalysis.biasDetection.map((bias, index) => (
                                <div key={index} className="text-sm text-gray-600 bg-yellow-50 p-2 rounded border-l-4 border-yellow-400">
                                  {bias}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {result.openaiAnalysis.additionalInsights.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Zusätzliche Erkenntnisse:</h4>
                            <div className="space-y-1">
                              {result.openaiAnalysis.additionalInsights.map((insight, index) => (
                                <div key={index} className="text-sm text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                                  {insight}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Claims Analysis */}
                  {result.results.claims.length > 0 && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <Target className="w-5 h-5 text-[#E37222]" />
                          Claims Analyse
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.results.claims.map((claim, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-900 flex-1">
                                {claim.text}
                              </h4>
                              <Badge variant="secondary" className={`ml-2 ${
                                claim.verification.status === 'verified' ? 'bg-green-100 text-green-800' :
                                claim.verification.status === 'partially_verified' ? 'bg-yellow-100 text-yellow-800' :
                                claim.verification.status === 'unverified' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {claim.verification.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600 mb-2">
                              <span>Konfidenz: {Math.round(claim.verification.confidence * 100)}%</span>
                              <span>Quellen: {claim.verification.sources.length}</span>
                            </div>
                            
                            {/* Sources */}
                            {claim.verification.sources && claim.verification.sources.length > 0 && (
                              <div className="mt-2">
                                <h5 className="text-xs font-medium text-gray-700 mb-1">Quellen:</h5>
                                <div className="space-y-1">
                                  {claim.verification.sources.map((source, sourceIndex) => (
                                    <div key={sourceIndex} className="text-xs">
                                      <a 
                                        href={source.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline"
                                      >
                                        {source.title}
                                      </a>
                                      <span className="text-gray-500 ml-1">
                                        ({source.credibility})
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Key Findings */}
                  {result.claudeAnalysis?.keyFindings && result.claudeAnalysis.keyFindings.length > 0 && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-[#E37222]" />
                          Wichtige Befunde
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {result.claudeAnalysis.keyFindings.map((finding, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span className="text-sm text-gray-700">{finding}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Risk Assessment */}
                  {result.claudeAnalysis?.riskAssessment && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-[#E37222]" />
                          Risikobewertung
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                          {result.claudeAnalysis.riskAssessment}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Google Fact Checks */}
                  {result.googleFactChecks && result.googleFactChecks.length > 0 && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <Search className="w-5 h-5 text-[#E37222]" />
                          Google Fact Checks
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {result.googleFactChecks.map((factCheck, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg">
                            <div className="mb-2">
                              <h4 className="text-sm font-medium text-gray-900 mb-1">
                                {factCheck.text}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <span>Von: {factCheck.claimant}</span>
                                <span>•</span>
                                <span>{new Date(factCheck.claimDate).toLocaleDateString('de-DE')}</span>
                              </div>
                            </div>
                            
                            {factCheck.claimReview.length > 0 && (
                              <div className="space-y-2">
                                {factCheck.claimReview.map((review, reviewIndex) => (
                                  <div key={reviewIndex} className="bg-white p-2 rounded border">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-medium text-gray-700">
                                        {review.publisher}
                                      </span>
                                      <Badge variant="secondary" className={`text-xs ${
                                        review.textualRating?.toLowerCase().includes('false') ? 'bg-red-100 text-red-800' :
                                        review.textualRating?.toLowerCase().includes('true') ? 'bg-green-100 text-green-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {review.textualRating}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                      <span>{new Date(review.reviewDate).toLocaleDateString('de-DE')}</span>
                                      {review.url && (
                                        <a 
                                          href={review.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-[#E37222] hover:underline"
                                        >
                                          Quelle →
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Recommendations */}
                  {result.results.recommendations.length > 0 && (
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#E37222]" />
                          Empfehlungen
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {result.results.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span className="text-sm text-gray-700">{rec}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

