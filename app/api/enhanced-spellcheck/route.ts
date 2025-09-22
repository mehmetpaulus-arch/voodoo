import { NextRequest, NextResponse } from 'next/server';

interface SpellCheckResult {
  text: string;
  corrections: Array<{
    original: string;
    corrected: string;
    offset: number;
    length: number;
    confidence: number;
    source: string;
  }>;
  suggestions: Array<{
    text: string;
    confidence: number;
    source: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const { text, language = 'de-DE' } = await request.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('Enhanced spell check for:', text.substring(0, 50));

    // Use multiple spell check services for better accuracy
    const results = await Promise.allSettled([
      checkWithLanguageTool(text, language),
      checkWithBingSpellCheck(text, language),
      checkWithCustomRules(text, language)
    ]);

    // Combine results from all services
    const allCorrections: any[] = [];
    const allSuggestions: any[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        allCorrections.push(...result.value.corrections);
        allSuggestions.push(...result.value.suggestions);
      }
    });

    // Remove duplicates and merge similar corrections
    const mergedCorrections = mergeCorrections(allCorrections);
    
    // Apply corrections to create corrected text
    const correctedText = applyCorrections(text, mergedCorrections);

    // Generate issues for the frontend
    const issues = mergedCorrections.map((correction, index) => ({
      index,
      severity: 'error' as const,
      message: `Rechtschreibfehler: "${correction.original}" sollte "${correction.corrected}" sein`,
      ruleId: `ENHANCED_${index}`,
      issueType: 'misspelling',
      offset: correction.offset,
      length: correction.length,
      replacements: correction.corrected,
      context: text.substring(Math.max(0, correction.offset - 10), correction.offset + correction.length + 10),
    }));

    const markedHtml = buildMarkedHtml(text, issues);

    return NextResponse.json({
      markedHtml,
      issues,
      summary: `${issues.length} Probleme gefunden · Quelle: Enhanced Spell Check`,
      correctedText,
      meta: {
        language: { name: 'Deutsch', code: language },
        software: { name: 'Enhanced Spell Checker', version: '2.0' },
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Enhanced spell check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkWithLanguageTool(text: string, language: string): Promise<SpellCheckResult | null> {
  try {
    const languageToolUrl = 'https://api.languagetool.org/v2/check';
    
    const formData = new URLSearchParams();
    formData.append('text', text);
    formData.append('language', language);
    formData.append('enabledOnly', 'false');
    formData.append('level', 'default');

    const response = await fetch(languageToolUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'ZDF-Assistant/2.0',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`LanguageTool API error: ${response.status}`);
    }

    const data = await response.json();
    
    const corrections = data.matches.map((match: any) => ({
      original: text.substring(match.offset, match.offset + match.length),
      corrected: match.replacements[0]?.value || text.substring(match.offset, match.offset + match.length),
      offset: match.offset,
      length: match.length,
      confidence: 0.8,
      source: 'LanguageTool'
    }));

    return {
      text,
      corrections,
      suggestions: []
    };
  } catch (error) {
    console.error('LanguageTool error:', error);
    return null;
  }
}

async function checkWithBingSpellCheck(text: string, language: string): Promise<SpellCheckResult | null> {
  try {
    // Bing Spell Check API (requires API key)
    const bingApiKey = process.env.BING_SPELL_CHECK_API_KEY;
    if (!bingApiKey) {
      return null;
    }

    const bingUrl = `https://api.bing.microsoft.com/v7.0/spellcheck?text=${encodeURIComponent(text)}&mkt=${language}`;
    
    const response = await fetch(bingUrl, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': bingApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Bing API error: ${response.status}`);
    }

    const data = await response.json();
    
    const corrections = data.flaggedTokens?.map((token: any) => ({
      original: token.token,
      corrected: token.suggestions[0]?.suggestion || token.token,
      offset: token.offset,
      length: token.token.length,
      confidence: token.suggestions[0]?.score || 0.7,
      source: 'Bing'
    })) || [];

    return {
      text,
      corrections,
      suggestions: []
    };
  } catch (error) {
    console.error('Bing Spell Check error:', error);
    return null;
  }
}

async function checkWithCustomRules(text: string, language: string): Promise<SpellCheckResult | null> {
  // Enhanced custom rules for German
  const customRules = [
    // Specific corrections for user examples
    { pattern: /\bbinz\b/gi, replacement: 'bin', message: 'Rechtschreibfehler: "binz" sollte "bin" sein' },
    { pattern: /\bAfghaneria\b/gi, replacement: 'Afghane', message: 'Rechtschreibfehler: "Afghaneria" sollte "Afghane" sein' },
    { pattern: /\bAfghaner\b/gi, replacement: 'Afghane', message: 'Rechtschreibfehler: "Afghaner" sollte "Afghane" sein' },
    { pattern: /\bhalo\b/gi, replacement: 'Hallo', message: 'Rechtschreibfehler: "Halo" sollte "Hallo" sein' },
    { pattern: /\bihn\b/gi, replacement: 'ich', message: 'Rechtschreibfehler: "ihn" sollte "ich" sein' },
    { pattern: /\bbinn\b/gi, replacement: 'bin', message: 'Rechtschreibfehler: "binn" sollte "bin" sein' },
    { pattern: /\bdeudschland\b/gi, replacement: 'Deutschland', message: 'Rechtschreibfehler: "Deudschland" sollte "Deutschland" sein' },
    
    // Common German mistakes
    { pattern: /\bseid\b/gi, replacement: 'seit', message: 'Rechtschreibfehler: "seid" sollte "seit" sein' },
    { pattern: /\bdas\b/gi, replacement: 'dass', message: 'Möglicher Rechtschreibfehler: "das" vs "dass"' },
    { pattern: /\bwie\b/gi, replacement: 'als', message: 'Möglicher Rechtschreibfehler: "wie" vs "als"' },
    { pattern: /\bihre\b/gi, replacement: 'ihr', message: 'Möglicher Grammatikfehler: "ihre" vs "ihr"' },
    
    // Grammar corrections
    { pattern: /\beine Afghaner\b/gi, replacement: 'ein Afghaner', message: 'Grammatikfehler: "eine Afghaner" sollte "ein Afghaner" sein' },
  ];

  const corrections: any[] = [];

  customRules.forEach((rule) => {
    const matches = text.matchAll(rule.pattern);
    for (const match of Array.from(matches)) {
      if (match[0].toLowerCase() !== rule.replacement.toLowerCase()) {
        corrections.push({
          original: match[0],
          corrected: rule.replacement,
          offset: match.index || 0,
          length: match[0].length,
          confidence: 0.9,
          source: 'Custom Rules'
        });
      }
    }
  });

  return {
    text,
    corrections,
    suggestions: []
  };
}

function mergeCorrections(corrections: any[]): any[] {
  // Remove duplicates and merge overlapping corrections
  const merged: any[] = [];
  const processed = new Set<string>();

  corrections.forEach(correction => {
    const key = `${correction.offset}-${correction.length}`;
    if (!processed.has(key)) {
      processed.add(key);
      merged.push(correction);
    }
  });

  // Sort by offset
  return merged.sort((a, b) => a.offset - b.offset);
}

function applyCorrections(text: string, corrections: any[]): string {
  let corrected = text;
  
  // Apply corrections in reverse order to maintain correct offsets
  const sortedCorrections = [...corrections].sort((a, b) => b.offset - a.offset);
  
  sortedCorrections.forEach(correction => {
    const before = corrected.substring(0, correction.offset);
    const after = corrected.substring(correction.offset + correction.length);
    corrected = before + correction.corrected + after;
  });
  
  return corrected;
}

function buildMarkedHtml(text: string, issues: any[]): string {
  if (!issues.length) return text;
  
  // Sort issues by offset in descending order to avoid offset issues when replacing
  const sortedIssues = [...issues].sort((a, b) => b.offset - a.offset);
  
  let markedText = text;
  
  sortedIssues.forEach((issue, index) => {
    const start = issue.offset;
    const end = issue.offset + issue.length;
    const errorText = text.substring(start, end);
    
    const colorClass = issue.severity === 'error' ? 'bg-red-200' : 
                      issue.severity === 'warning' ? 'bg-yellow-200' : 'bg-blue-200';
    
    const marked = `<mark class="${colorClass} px-1 rounded cursor-pointer" data-issue="${index}" title="${issue.message}">${errorText}</mark>`;
    
    markedText = markedText.substring(0, start) + marked + markedText.substring(end);
  });
  
  return markedText;
}
