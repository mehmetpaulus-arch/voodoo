'use client';

import React, { useState } from 'react';
import { 
  MessageCircle,
  Send,
  Paperclip,
  AlertTriangle,
  Info,
  Bug,
  Lightbulb,
  Bell,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ticketTypes = [
  { value: 'bug', label: 'Bug Report', icon: Bug, description: 'Fehler oder unerwartetes Verhalten' },
  { value: 'feature', label: 'Feature Request', icon: Lightbulb, description: 'Neue Funktion vorschlagen' },
  { value: 'support', label: 'Technischer Support', icon: MessageCircle, description: 'Hilfe bei der Nutzung' },
  { value: 'question', label: 'Allgemeine Frage', icon: Info, description: 'Fragen zur Anwendung' }
];

const priorities = [
  { value: 'low', label: 'Niedrig', description: 'Kann warten' },
  { value: 'medium', label: 'Mittel', description: 'Normale Bearbeitung' },
  { value: 'high', label: 'Hoch', description: 'Dringend' },
  { value: 'critical', label: 'Kritisch', description: 'Produktionsausfall' }
];

export default function TicketPage() {
  const [ticketData, setTicketData] = useState({
    type: '',
    priority: 'medium',
    subject: '',
    description: '',
    steps: '',
    expected: '',
    actual: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate ticket submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <nav className="flex items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-2 bg-[#E37222] text-white px-4 py-2 rounded-lg hover:bg-[#D16212] transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Zurück</span>
          </Link>
        </nav>

        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="bg-white shadow-lg border border-gray-200 max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket erstellt!</h2>
              <p className="text-gray-600 mb-4">
                Ihr Support-Ticket wurde erfolgreich übermittelt. Sie erhalten eine Bestätigung per E-Mail.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Ticket-ID:</strong> #ZDF-{Date.now().toString().slice(-6)}
                </p>
              </div>
              <Button 
                onClick={() => setSubmitted(false)}
                className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white"
              >
                Neues Ticket erstellen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <div className="p-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100">
            <MessageCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Support-Ticket erstellen
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Beschreiben Sie Ihr Problem oder Ihre Anfrage. Unser Support-Team hilft Ihnen gerne weiter.
        </p>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Ticket-Details</CardTitle>
                    <CardDescription className="text-gray-600">
                      Bitte füllen Sie alle relevanten Felder aus
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Ticket Type */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Art der Anfrage *</Label>
                      <Select value={ticketData.type} onValueChange={(value) => setTicketData(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wählen Sie den Ticket-Typ..." />
                        </SelectTrigger>
                        <SelectContent>
                          {ticketTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Priorität *</Label>
                      <Select value={ticketData.priority} onValueChange={(value) => setTicketData(prev => ({ ...prev, priority: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label} - {priority.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Betreff *</Label>
                      <Input
                        placeholder="Kurze Beschreibung des Problems..."
                        value={ticketData.subject}
                        onChange={(e) => setTicketData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Beschreibung *</Label>
                      <Textarea
                        placeholder="Detaillierte Beschreibung Ihres Problems oder Ihrer Anfrage..."
                        value={ticketData.description}
                        onChange={(e) => setTicketData(prev => ({ ...prev, description: e.target.value }))}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    {/* Steps to Reproduce (for bugs) */}
                    {ticketData.type === 'bug' && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Schritte zur Reproduktion</Label>
                          <Textarea
                            placeholder="1. Gehen Sie zu...&#10;2. Klicken Sie auf...&#10;3. Das Problem tritt auf..."
                            value={ticketData.steps}
                            onChange={(e) => setTicketData(prev => ({ ...prev, steps: e.target.value }))}
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700">Erwartetes Verhalten</Label>
                            <Textarea
                              placeholder="Was sollte passieren?"
                              value={ticketData.expected}
                              onChange={(e) => setTicketData(prev => ({ ...prev, expected: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700">Tatsächliches Verhalten</Label>
                            <Textarea
                              placeholder="Was passiert stattdessen?"
                              value={ticketData.actual}
                              onChange={(e) => setTicketData(prev => ({ ...prev, actual: e.target.value }))}
                              rows={3}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* File Attachment */}
                    <div className="space-y-2">
                      <Label className="text-gray-700">Anhänge (optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                          Screenshots oder Dateien hier ablegen
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Info Section */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Ticket-Informationen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ticketData.type && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          {(() => {
                            const selectedType = ticketTypes.find(t => t.value === ticketData.type);
                            if (selectedType) {
                              const IconComponent = selectedType.icon;
                              return (
                                <>
                                  <IconComponent className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-blue-900">{selectedType.label}</span>
                                </>
                              );
                            }
                            return null;
                          })()}
                        </div>
                        <p className="text-blue-700 text-sm">
                          {ticketTypes.find(t => t.value === ticketData.type)?.description}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3 text-sm text-gray-600">
                      <div>
                        <strong>Antwortzeit:</strong>
                        <div className="mt-1">
                          • Kritisch: 2 Stunden
                          • Hoch: 4 Stunden  
                          • Mittel: 1 Werktag
                          • Niedrig: 3 Werktage
                        </div>
                      </div>
                      
                      <div>
                        <strong>Support-Zeiten:</strong>
                        <div className="mt-1">
                          Mo-Fr: 8:00-18:00 Uhr
                          <br />
                          Notfall: 24/7 verfügbar
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Tipps für bessere Hilfe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        Beschreiben Sie das Problem detailliert
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        Fügen Sie Screenshots hinzu
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        Nennen Sie Browser und Betriebssystem
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        Geben Sie Schritte zur Reproduktion an
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!ticketData.type || !ticketData.subject || !ticketData.description || isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Ticket senden
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}