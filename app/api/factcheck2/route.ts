import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { google } from 'googleapis';

interface FactCheckRequest {
  text: string;
  context?: string;
  priority?: 'low' | 'medium' | 'high';
}

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

export async function POST(request: NextRequest) {
  try {
    const body: FactCheckRequest = await request.json();
    const { 
      text, 
      context = '',
      priority = 'medium'
    } = body;

    // Validate required fields
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Text is required for fact-checking' },
        { status: 400 }
      );
    }

    console.log('Fact-Checking 2 request:', {
      textLength: text.length,
      context: context ? 'provided' : 'none',
      priority
    });

    // Initialize Claude
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    if (!claudeApiKey || claudeApiKey === 'your_claude_api_key_here') {
      return NextResponse.json({
        success: false,
        error: 'Claude API key not configured. Please add your Claude API key to the .env file.'
      }, { status: 500 });
    }

    const anthropic = new Anthropic({
      apiKey: claudeApiKey,
    });

    // Initialize OpenAI
    const openaiApiKey = process.env.OPENAI_API_KEY;
    let openai: OpenAI | null = null;
    if (openaiApiKey && openaiApiKey !== 'your_openai_api_key_here') {
      openai = new OpenAI({
        apiKey: openaiApiKey,
      });
    }

    // Create comprehensive fact-checking prompt
    const factCheckPrompt = `Du bist ein professioneller Fact-Checker für ZDF. Analysiere den folgenden Text gründlich und führe eine umfassende Faktenprüfung durch.

TEXT ZUM PRÜFEN:
"${text.trim()}"

${context ? `KONTEXT: ${context.trim()}` : ''}

PRIORITÄT: ${priority}

Bitte führe eine detaillierte Analyse durch und antworte im folgenden JSON-Format:

{
  "overallScore": 0.85,
  "confidence": "high|medium|low",
  "claims": [
    {
      "id": "claim_1",
      "text": "Extrahierter Claim aus dem Text",
      "verification": {
        "status": "verified|unverified|contradicted|partially_verified",
        "confidence": 0.9,
        "sources": [
          {
            "url": "https://example.com/source1",
            "title": "Quellentitel",
            "credibility": "high|medium|low"
          }
        ]
      }
    }
  ],
  "recommendations": [
    "Empfehlung 1",
    "Empfehlung 2"
  ],
  "reasoning": "Detaillierte Begründung der Analyse",
  "keyFindings": [
    "Wichtiger Befund 1",
    "Wichtiger Befund 2"
  ],
  "riskAssessment": "Bewertung der Risiken und potenziellen Probleme"
}

WICHTIGE HINWEISE:
- Sei objektiv und neutral
- Identifiziere alle überprüfbaren Claims
- Bewerte die Glaubwürdigkeit basierend auf verfügbarem Wissen
- Gib konkrete Empfehlungen für weitere Recherche
- Antworte nur mit dem JSON-Objekt, keine zusätzlichen Erklärungen`;

    console.log('Sending request to Claude for fact-checking...');
    
    // Initialize Google Fact Checking API
    const googleApiKey = process.env.GOOGLE_FACTCHECK_API_KEY;
    let googleResults: any[] = [];
    
    if (googleApiKey && googleApiKey !== 'your_google_factcheck_api_key_here') {
      try {
        console.log('Searching Google Fact Checking API...');
        const factcheck = google.factchecktools({ version: 'v1alpha1', auth: googleApiKey });
        
        // Search for fact checks related to the text
        const searchResponse = await factcheck.claims.search({
          query: text.substring(0, 100), // Limit query length
          languageCode: 'de', // Default to German
          pageSize: 5
        });
        
        if (searchResponse.data.claims) {
          googleResults = searchResponse.data.claims.map((claim: any) => ({
            text: claim.text,
            claimant: claim.claimant,
            claimDate: claim.claimDate,
            claimReview: claim.claimReview?.map((review: any) => ({
              publisher: review.publisher?.name,
              reviewDate: review.reviewDate,
              textualRating: review.textualRating,
              url: review.url
            })) || []
          }));
        }
        
        console.log(`Found ${googleResults.length} Google fact checks`);
      } catch (googleError) {
        console.error('Google Fact Checking API error:', googleError);
        // Continue without Google results
      }
    }
    
    // Call Claude API
      const claudeResponse = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        temperature: 0.1,
        messages: [
          {
            role: 'user',
            content: factCheckPrompt
          }
        ]
      });

    const claudeAnalysis = claudeResponse.content[0];
    if (claudeAnalysis.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    console.log('Claude response received, parsing...');
    
    // Parse Claude's response
    let claudeResult;
    try {
      claudeResult = JSON.parse(claudeAnalysis.text);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', parseError);
      throw new Error('Failed to parse Claude analysis');
    }

    // OpenAI Analysis
    let openaiResult = null;
    if (openai) {
      try {
        console.log('Running OpenAI fact-checking analysis...');
        
        const openaiPrompt = `Du bist ein Experte für Faktenprüfung und Bias-Erkennung. Analysiere den folgenden Text auf Faktizität, mögliche Verzerrungen und Quellenglaubwürdigkeit.

TEXT ZUM ANALYSIEREN:
"${text.trim()}"

${context ? `KONTEXT: ${context.trim()}` : ''}

Bitte antworte im folgenden JSON-Format:

{
  "factualityScore": 0.85,
  "biasDetection": [
    "Mögliche Verzerrung 1",
    "Mögliche Verzerrung 2"
  ],
  "sourceCredibility": "Bewertung der Quellenglaubwürdigkeit",
  "additionalInsights": [
    "Zusätzliche Erkenntnis 1",
    "Zusätzliche Erkenntnis 2"
  ]
}

WICHTIGE HINWEISE:
- Bewerte die Faktizität auf einer Skala von 0.0 (völlig falsch) bis 1.0 (völlig korrekt)
- Identifiziere mögliche Verzerrungen oder einseitige Darstellungen
- Bewerte die Glaubwürdigkeit der impliziten oder expliziten Quellen
- Gib zusätzliche Erkenntnisse, die für die Bewertung relevant sind
- Antworte nur mit dem JSON-Objekt, keine zusätzlichen Erklärungen`;

        const openaiResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: openaiPrompt
            }
          ],
          temperature: 0.1,
          max_tokens: 2000
        });

        const openaiContent = openaiResponse.choices[0]?.message?.content;
        if (openaiContent) {
          openaiResult = JSON.parse(openaiContent);
          console.log('OpenAI analysis completed');
        }
      } catch (openaiError) {
        console.error('OpenAI analysis error:', openaiError);
        // Continue without OpenAI results
      }
    }

    // Create comprehensive fact-check result
    const factCheckResult: FactCheckResult = {
      id: `fc_${Date.now()}`,
      originalText: text.trim(),
      context: context.trim(),
      priority,
      status: 'completed',
      timestamp: new Date().toISOString(),
      results: {
        overallScore: claudeResult.overallScore || 0.5,
        confidence: claudeResult.confidence || 'medium',
        claims: claudeResult.claims || [],
        recommendations: claudeResult.recommendations || []
      },
      claudeAnalysis: {
        reasoning: claudeResult.reasoning || '',
        keyFindings: claudeResult.keyFindings || [],
        riskAssessment: claudeResult.riskAssessment || ''
      },
      openaiAnalysis: openaiResult ? {
        factualityScore: openaiResult.factualityScore || 0.5,
        biasDetection: openaiResult.biasDetection || [],
        sourceCredibility: openaiResult.sourceCredibility || '',
        additionalInsights: openaiResult.additionalInsights || []
      } : undefined,
      googleFactChecks: googleResults.length > 0 ? googleResults : undefined
    };

    console.log('Fact-checking completed:', {
      resultId: factCheckResult.id,
      overallScore: factCheckResult.results.overallScore,
      claimsCount: factCheckResult.results.claims.length,
      claudeAnalysis: !!factCheckResult.claudeAnalysis,
      openaiAnalysis: !!factCheckResult.openaiAnalysis,
      googleFactChecks: factCheckResult.googleFactChecks?.length || 0
    });

    return NextResponse.json({
      success: true,
      result: factCheckResult
    });

  } catch (error) {
    console.error('Fact-checking error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      },
      { status: 500 }
    );
  }
}

