'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  FileAudio, 
  FileVideo, 
  Download, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Bell,
  ChevronLeft
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';

interface TranscriptionResult {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'error';
  text?: string;
  language?: string;
  duration?: number;
  formats: {
    txt?: string;
  };
  error?: string;
  thumbnail?: string;
}

export default function TranscriptionPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [modelSize, setModelSize] = useState('base');
  const [task, setTask] = useState('transcribe');
  const [language, setLanguage] = useState('auto');
  const [wordTimestamps, setWordTimestamps] = useState(false);
  const [results, setResults] = useState<TranscriptionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = {
    video: ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v'],
    audio: ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.aac', '.wma']
  };

  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.addEventListener('loadedmetadata', () => {
        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Seek to 1 second or 10% of video duration, whichever is smaller
        const seekTime = Math.min(1, video.duration * 0.1);
        video.currentTime = seekTime;
      });
      
      video.addEventListener('seeked', () => {
        if (ctx) {
          // Draw the video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to data URL
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        } else {
          reject(new Error('Canvas context not available'));
        }
      });
      
      video.addEventListener('error', () => {
        reject(new Error('Error loading video'));
      });
      
      // Load the video file
      video.src = URL.createObjectURL(file);
      video.load();
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
    
    // Generate thumbnail for the first video file
    const firstVideoFile = uploadedFiles.find(file => 
      supportedFormats.video.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    
    if (firstVideoFile) {
      try {
        const thumbnail = await generateVideoThumbnail(firstVideoFile);
        setVideoPreview(thumbnail);
      } catch (error) {
        console.error('Error generating video thumbnail:', error);
        setVideoPreview(null);
      }
    } else {
      setVideoPreview(null);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      
      // If we removed the first video file, clear the thumbnail
      if (newFiles.length === 0 || !newFiles.some(file => 
        supportedFormats.video.some(ext => file.name.toLowerCase().endsWith(ext))
      )) {
        setVideoPreview(null);
      }
      
      return newFiles;
    });
  };

  const processTranscription = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const resultId = `result-${Date.now()}-${i}`;
      
      // Generate thumbnail for video files
      let thumbnail: string | undefined;
      if (supportedFormats.video.some(ext => file.name.toLowerCase().endsWith(ext))) {
        try {
          thumbnail = await generateVideoThumbnail(file);
        } catch (error) {
          console.error('Error generating thumbnail:', error);
        }
      }
      
      // Add processing result
      const processingResult: TranscriptionResult = {
        id: resultId,
        filename: file.name,
        status: 'processing',
        formats: {},
        thumbnail
      };
      
      setResults(prev => [...prev, processingResult]);

      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('settings', JSON.stringify({
          modelSize,
          task,
          language: language === 'auto' ? '' : language,
          wordTimestamps
        }));

        // Update progress
        setProgress((i * 50) / files.length);

        // Call transcription API
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData,
        });

        setProgress((i * 80) / files.length);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Transcription failed');
        }

        const result: TranscriptionResult = await response.json();
        
        // Update result with thumbnail
        const resultWithThumbnail = { ...result, thumbnail };
        setResults(prev => prev.map(r => r.id === resultId ? resultWithThumbnail : r));
        
        setProgress(((i + 1) * 100) / files.length);

      } catch (error) {
        console.error('Transcription error:', error);
        
        const errorResult: TranscriptionResult = {
          id: resultId,
          filename: file.name,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          formats: {}
        };

        setResults(prev => prev.map(r => r.id === resultId ? errorResult : r));
      }
    }

    setIsProcessing(false);
    setFiles([]);
    setVideoPreview(null);
  };

  const downloadResult = async (result: TranscriptionResult, format: string) => {
    try {
      console.log(`Downloading ${format} for ${result.filename}`);
      
      // Generate content based on format
      let content = '';
      let mimeType = 'text/plain';
      let fileExtension = format;
      
      const baseName = result.filename.split('.')[0];
      
      switch (format) {
        case 'txt':
          content = result.text || 'No transcription text available';
          mimeType = 'text/plain';
          break;
        case 'docx':
          await downloadWordDocument(result);
          return; // Early return for Word document
        case 'pdf':
          await downloadPDFDocument(result);
          return; // Early return for PDF document
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log(`Successfully downloaded: ${baseName}.${fileExtension}`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Download fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    }
  };


  // Helper function to generate Word document
  const downloadWordDocument = async (result: TranscriptionResult) => {
    const baseName = result.filename.split('.')[0];
    
    try {
      // Create DOCX document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: "Transkription",
                  bold: true,
                  size: 32,
                  color: "E37222", // ZDF Orange
                }),
              ],
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.LEFT,
              spacing: {
                after: 400,
              },
            }),
            
            // File information section
            new Paragraph({
              children: [
                new TextRun({
                  text: "Datei-Informationen:",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: 200,
                after: 200,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Dateiname: ${result.filename}`,
                  size: 20,
                }),
              ],
              spacing: {
                after: 100,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Sprache: ${result.language || 'Auto-Erkennung'}`,
                  size: 20,
                }),
              ],
              spacing: {
                after: 100,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Dauer: ${result.duration ? `${Math.floor(result.duration / 60)}:${(result.duration % 60).toFixed(2).padStart(5, '0')}` : 'N/A'}`,
                  size: 20,
                }),
              ],
              spacing: {
                after: 100,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Erstellt am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}`,
                  size: 20,
                }),
              ],
              spacing: {
                after: 300,
              },
            }),
            
            // Transcription section
            new Paragraph({
              children: [
                new TextRun({
                  text: "Transkription:",
                  bold: true,
                  size: 24,
                }),
              ],
              heading: HeadingLevel.HEADING_2,
              spacing: {
                before: 200,
                after: 200,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: result.text || 'Keine Transkription verfügbar',
                  size: 20,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            
            // Footer
            new Paragraph({
              children: [
                new TextRun({
                  text: "Erstellt mit ZDF Assistant - KI-Transkription",
                  size: 16,
                  italics: true,
                  color: "666666",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                before: 400,
              },
            }),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: `Datum: ${new Date().toLocaleDateString('de-DE')}`,
                  size: 16,
                  italics: true,
                  color: "666666",
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }],
      });

      // Generate and download the DOCX file
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}_Transkription.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log(`Word document downloaded: ${baseName}_Transkription.docx`);
    } catch (error) {
      console.error('Error creating Word document:', error);
      alert('Fehler beim Erstellen des Word-Dokuments');
    }
  };

  // Helper function to generate PDF document
  const downloadPDFDocument = async (result: TranscriptionResult) => {
    const baseName = result.filename.split('.')[0];
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set font and colors
    doc.setFont('helvetica');
    doc.setTextColor(227, 114, 34); // ZDF Orange
    
    // Title
    doc.setFontSize(20);
    doc.text('Transkription', 20, 30);
    
    // Reset color for content
    doc.setTextColor(0, 0, 0);
    
    // File information section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Datei-Informationen:', 20, 50);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Dateiname: ${result.filename}`, 20, 60);
    doc.text(`Sprache: ${result.language || 'Auto-Erkennung'}`, 20, 68);
    doc.text(`Dauer: ${result.duration ? `${Math.floor(result.duration / 60)}:${(result.duration % 60).toFixed(2).padStart(5, '0')}` : 'N/A'}`, 20, 76);
    doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}`, 20, 84);
    
    // Transcription section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Transkription:', 20, 100);
    
    // Add transcription text with word wrapping
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const transcriptionText = result.text || 'Keine Transkription verfügbar';
    const splitText = doc.splitTextToSize(transcriptionText, 170); // 170mm width
    doc.text(splitText, 20, 110);
    
    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Erstellt mit ZDF Assistant - KI-Transkription', 20, pageHeight - 20);
    doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 20, pageHeight - 15);
    
    // Save the PDF
    doc.save(`${baseName}_Transkription.pdf`);
    
    console.log(`PDF document downloaded: ${baseName}_Transkription.pdf`);
  };

  const downloadAll = async () => {
    const completedResults = results.filter(r => r.status === 'completed');
    
    for (const result of completedResults) {
      for (const [format, path] of Object.entries(result.formats)) {
        if (path) {
          await downloadResult(result, format);
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
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
          <div className="relative">
            <button className="text-gray-800 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-200">
              <Bell className="w-6 h-6" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Leitfäden
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Redaktions-Workflows</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Styleguide (CI/CD)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Barrierefreiheit (WCAG)</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">API-Dokumentation</a>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <a href="/forum" className="text-gray-800 hover:text-gray-900 transition-colors font-medium text-xl">
              Forum
            </a>
          </div>
          
          <div className="relative group">
            <button className="text-gray-800 hover:text-gray-900 transition-colors flex items-center gap-1 font-medium text-xl">
              Compliance
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Bild- & Musikrechte</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Datenschutz & DSGVO</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Archiv & Lizenzen</a>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Systemstatus</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Release Notes</a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Roadmap</a>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <Link href="/support/hilfe-center" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Hilfe-Center</Link>
                <Link href="/support/ticket" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Ticket erstellen</Link>
                <Link href="/support/onboarding" className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded">Onboarding & Schulungen</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              KI-Transkription
            </h1>
            <p className="text-xl text-gray-700">
              Audio- und Videomaterial automatisch verschriftlichen
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-600 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#E37222]" />
                    Einstellungen
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Modell und Sprache konfigurieren
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Model Size */}
                  <div className="space-y-2">
                    <Label className="text-white">Modell-Größe</Label>
                    <Select value={modelSize} onValueChange={setModelSize}>
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="tiny">Tiny (sehr schnell, ~1s, gute Qualität)</SelectItem>
                        <SelectItem value="base">Base (schnell, ~1.2s, beste Balance - empfohlen)</SelectItem>
                        <SelectItem value="small">Small (mittel, ~3s, hohe Genauigkeit)</SelectItem>
                        <SelectItem value="medium">Medium (langsam, ~8s, sehr hohe Genauigkeit)</SelectItem>
                        <SelectItem value="large">Large (sehr langsam, ~17s, höchste Genauigkeit)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Task */}
                  <div className="space-y-2">
                    <Label className="text-white">Aufgabe</Label>
                    <Select value={task} onValueChange={setTask}>
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="transcribe">Transkribieren (Originalsprache)</SelectItem>
                        <SelectItem value="translate">Übersetzen (nach Englisch)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <Label className="text-white">Sprache</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="auto">Auto-Erkennung</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="en">Englisch</SelectItem>
                        <SelectItem value="fr">Französisch</SelectItem>
                        <SelectItem value="es">Spanisch</SelectItem>
                        <SelectItem value="it">Italienisch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Word Timestamps */}
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Timestamps</Label>
                    <Switch
                      checked={wordTimestamps}
                      onCheckedChange={setWordTimestamps}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload and Processing Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-600 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-[#E37222]" />
                    Dateien hochladen
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Video: {supportedFormats.video.join(', ')} | Audio: {supportedFormats.audio.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Area */}
                  <div
                    className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-gray-500 transition-colors bg-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {videoPreview ? (
                      <div className="space-y-4">
                        <div className="relative inline-block">
                          <img 
                            src={videoPreview} 
                            alt="Video Vorschau" 
                            className="max-w-full max-h-48 rounded-lg shadow-lg mx-auto"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                            📹 Video
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">Video-Vorschau geladen</p>
                        <p className="text-gray-500 text-sm">Klicken zum Ändern oder weitere Dateien hinzufügen</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-700 mb-2">Dateien hier ablegen oder klicken zum Auswählen</p>
                        <p className="text-gray-500 text-sm">Maximale Dateigröße: 2 GB</p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={[...supportedFormats.video, ...supportedFormats.audio].join(',')}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-white">Ausgewählte Dateien:</Label>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            {supportedFormats.video.some(ext => file.name.toLowerCase().endsWith(ext)) ? (
                              <FileVideo className="w-5 h-5 text-blue-400" />
                            ) : (
                              <FileAudio className="w-5 h-5 text-green-400" />
                            )}
                            <span className="text-white">{file.name}</span>
                            <span className="text-gray-400 text-sm">
                              ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Entfernen
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Process Button */}
                  <Button
                    onClick={processTranscription}
                    disabled={files.length === 0 || isProcessing}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verarbeitung läuft...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Transkription starten
                      </>
                    )}
                  </Button>

                  {/* Progress */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fortschritt</span>
                        <span className="text-white">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-8">
              <Card className="bg-gray-600 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Transkriptions-Ergebnisse
                    </CardTitle>
                    {results.some(r => r.status === 'completed') && (
                      <Button
                        onClick={downloadAll}
                        className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Alle herunterladen
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.map((result) => (
                    <div key={result.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${
                              result.status === 'completed' ? 'bg-green-500' :
                              result.status === 'processing' ? 'bg-yellow-500 animate-pulse' :
                              'bg-red-500'
                            }`} />
                            <span className="text-white font-medium">{result.filename}</span>
                          </div>
                          <div className="flex items-center gap-4 ml-6">
                            {result.language && (
                              <span className="text-gray-400 text-sm">Sprache: {result.language}</span>
                            )}
                            {result.duration && (
                              <span className="text-gray-400 text-sm">
                                Dauer: {Math.floor(result.duration / 60)}:{(result.duration % 60).toString().padStart(2, '0')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {result.status === 'completed' && (
                            <>
                              {result.formats.txt && (
                                <Button
                                  size="sm"
                                  className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white border-0"
                                  onClick={() => downloadResult(result, 'txt')}
                                >
                                  TXT
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="bg-[#2B579A] hover:bg-[#1E3F73] text-white border-0"
                                onClick={() => downloadResult(result, 'docx')}
                              >
                                📄 Word
                              </Button>
                              <Button
                                size="sm"
                                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white border-0"
                                onClick={() => downloadResult(result, 'pdf')}
                              >
                                📑 PDF
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {result.status === 'error' && result.error && (
                        <div className="bg-red-900/30 border border-red-700 rounded p-3 mt-3">
                          <div className="flex items-center gap-2 text-red-300">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">Fehler:</span>
                          </div>
                          <p className="text-red-200 text-sm mt-1">{result.error}</p>
                        </div>
                      )}
                      
                      {result.text && (
                        <div className="mt-3">
                          {/* Video Thumbnail */}
                          {result.thumbnail && (
                            <div className="mb-3">
                              <img 
                                src={result.thumbnail} 
                                alt="Video Vorschau" 
                                className="w-32 h-20 object-cover rounded-lg shadow-lg"
                              />
                            </div>
                          )}
                          
                          {/* Transcription Text */}
                          <div className="bg-gray-800 rounded p-3">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {result.text}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}