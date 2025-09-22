'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  count?: number;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Fact-Check abgeschlossen',
    message: 'Die Überprüfung von "Klimawandel-Daten 2024" wurde erfolgreich abgeschlossen.',
    timestamp: 'vor 5 Min.',
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Upload-Fehler',
    message: 'Video-Upload "Interview_Merkel.mp4" fehlgeschlagen. Bitte erneut versuchen.',
    timestamp: 'vor 15 Min.',
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Neue KI-Modelle verfügbar',
    message: 'DALL-E 3 und GPT-4 Turbo sind jetzt in der Beta-Version verfügbar.',
    timestamp: 'vor 1 Std.',
    isRead: false
  },
  {
    id: '4',
    type: 'success',
    title: 'Transkription fertig',
    message: 'Audio-Datei "Podcast_Episode_42.mp3" wurde erfolgreich transkribiert.',
    timestamp: 'vor 2 Std.',
    isRead: true
  },
  {
    id: '5',
    type: 'info',
    title: 'System-Update',
    message: 'Wartungsarbeiten sind für heute 23:00 Uhr geplant. Dauer: ca. 30 Min.',
    timestamp: 'vor 3 Std.',
    isRead: true
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    case 'error':
      return <AlertTriangle className="w-4 h-4 text-red-400" />;
    case 'info':
    default:
      return <Info className="w-4 h-4 text-[#E37222]" />;
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'error':
      return 'bg-red-50 border-red-200';
    case 'info':
    default:
      return 'bg-blue-50 border-blue-200';
  }
};

export default function NotificationDropdown({ count = 3 }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-white transition-colors p-1 sm:p-2 rounded-lg hover:bg-gray-800/50 relative"
        style={{ color: '#5D6165' }}
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">{unreadCount}</span>
          </div>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Benachrichtigungen</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#E37222] hover:text-[#FF8C42] font-medium"
                >
                  Alle als gelesen markieren
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p>Keine Benachrichtigungen</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-700 transition-colors ${
                      !notification.isRead ? 'bg-gray-700/50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-white' : 'text-gray-300'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-[#E37222] hover:text-[#FF8C42] font-medium"
                              >
                                Gelesen
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-700 bg-gray-900">
              <button className="w-full text-center text-sm text-[#E37222] hover:text-[#FF8C42] font-medium">
                Alle Benachrichtigungen anzeigen
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
