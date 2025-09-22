'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2, Save, X, Camera, Phone, MapPin, Clock, Users, Link2 } from 'lucide-react';

type User = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  mobile?: string;
  department?: string;
  location?: string;
  workingHours?: string;
  avatarUrl?: string;
  linkedAccounts?: {
    slack?: string;
    teams?: string;
    zdfMail?: string;
  };
};

function getUser(): User {
  // ⚠️ Hier nur Dummy-Daten verwenden, nichts anderes im Projekt anfassen
  return {
    name: 'Joshua Kranz',
    role: 'Editor',
    email: 'kranz.j@zdf.de',
    phone: '+49 6131 70-1234',
    mobile: '+49 172 123 4567',
    department: 'Redaktion Digital',
    location: 'Mainz, ZDF-Zentrum',
    workingHours: 'Mo-Fr 9:00-17:00',
    linkedAccounts: {
      slack: '@joshua.kranz',
      teams: 'joshua.kranz@zdf.de',
      zdfMail: 'kranz.j@zdf.de'
    }
  };
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>(getUser());
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User>(user);

  const handleEdit = () => {
    setEditData(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkedAccountChange = (platform: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      linkedAccounts: {
        ...prev.linkedAccounts,
        [platform]: value
      }
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditData(prev => ({
          ...prev,
          avatarUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {/* Main Content */}
      <div className="relative px-8 pt-8">
        <div className="max-w-2xl mx-auto">
          {/* Edit Button - moved here for better visibility */}
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <Button onClick={handleEdit} variant="secondary" size="sm" className="bg-white shadow-lg hover:bg-gray-50 text-gray-700 border">
                <Edit2 className="w-4 h-4 mr-2" />
                Bearbeiten
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" className="bg-[#FA7D19] hover:bg-[#E86D0A] text-white shadow-lg">
                  <Save className="w-4 h-4 mr-2" />
                  Speichern
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm" className="bg-white hover:bg-gray-50 shadow-lg">
                  <X className="w-4 h-4 mr-2" />
                  Abbrechen
                </Button>
              </div>
            )}
          </div>
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="p-8 text-center bg-gray-50">
              <div className="relative inline-block mb-6">
                {(isEditing ? editData.avatarUrl : user.avatarUrl) ? (
                  <img
                    src={isEditing ? editData.avatarUrl : user.avatarUrl}
                    alt="Profilbild"
                    className="h-24 w-24 rounded-full object-cover mx-auto shadow-lg border-4 border-white"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-[#FA7D19]/20 text-[#FA7D19] flex items-center justify-center text-3xl font-bold mx-auto shadow-lg border-4 border-white">
                    {initials(isEditing ? editData.name : user.name)}
                  </div>
                )}
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-[#FA7D19] hover:bg-[#E86D0A] text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              {!isEditing ? (
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-lg text-gray-500">{user.role}</p>
                </div>
              ) : (
                <div className="space-y-4 max-w-md mx-auto">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 block text-left mb-2">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-center text-xl font-semibold"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-sm font-medium text-gray-700 block text-left mb-2">
                      Funktion
                    </Label>
                    <Input
                      id="role"
                      value={editData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="text-center"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="border-t border-gray-100 p-8 bg-gray-50">
              <div className="max-w-md mx-auto space-y-6">
                {/* E-Mail */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">E-Mail-Adresse</Label>
                  {!isEditing ? (
                    <div className="mt-2 text-lg text-gray-900">{user.email ?? '—'}</div>
                  ) : (
                    <Input
                      value={editData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      type="email"
                      className="mt-2"
                      placeholder="E-Mail-Adresse eingeben"
                    />
                  )}
                </div>

                {/* Kontakt */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefon
                    </Label>
                    {!isEditing ? (
                      <div className="mt-2 text-lg text-gray-900">{user.phone ?? '—'}</div>
                    ) : (
                      <Input
                        value={editData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-2"
                        placeholder="Telefonnummer"
                      />
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Mobil
                    </Label>
                    {!isEditing ? (
                      <div className="mt-2 text-lg text-gray-900">{user.mobile ?? '—'}</div>
                    ) : (
                      <Input
                        value={editData.mobile || ''}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="mt-2"
                        placeholder="Mobilnummer"
                      />
                    )}
                  </div>
                </div>

                {/* Abteilung & Standort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Abteilung
                    </Label>
                    {!isEditing ? (
                      <div className="mt-2 text-lg text-gray-900">{user.department ?? '—'}</div>
                    ) : (
                      <Input
                        value={editData.department || ''}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="mt-2"
                        placeholder="Abteilung / Team"
                      />
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Standort
                    </Label>
                    {!isEditing ? (
                      <div className="mt-2 text-lg text-gray-900">{user.location ?? '—'}</div>
                    ) : (
                      <Input
                        value={editData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="mt-2"
                        placeholder="Büro / Stadt"
                      />
                    )}
                  </div>
                </div>

                {/* Arbeitszeiten */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Arbeitszeiten
                  </Label>
                  {!isEditing ? (
                    <div className="mt-2 text-lg text-gray-900">{user.workingHours ?? '—'}</div>
                  ) : (
                    <Input
                      value={editData.workingHours || ''}
                      onChange={(e) => handleInputChange('workingHours', e.target.value)}
                      className="mt-2"
                      placeholder="z.B. Mo-Fr 9:00-17:00"
                    />
                  )}
                </div>

                {/* Verknüpfte Accounts */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-4">
                    <Link2 className="w-4 h-4" />
                    Verknüpfte Accounts
                  </Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">S</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">Slack</div>
                        {!isEditing ? (
                          <div className="text-sm text-gray-500">{user.linkedAccounts?.slack ?? '—'}</div>
                        ) : (
                          <Input
                            value={editData.linkedAccounts?.slack || ''}
                            onChange={(e) => handleLinkedAccountChange('slack', e.target.value)}
                            className="mt-1"
                            placeholder="@username"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">T</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">MS Teams</div>
                        {!isEditing ? (
                          <div className="text-sm text-gray-500">{user.linkedAccounts?.teams ?? '—'}</div>
                        ) : (
                          <Input
                            value={editData.linkedAccounts?.teams || ''}
                            onChange={(e) => handleLinkedAccountChange('teams', e.target.value)}
                            className="mt-1"
                            placeholder="teams@zdf.de"
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-semibold text-sm">Z</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">ZDF Mail</div>
                        {!isEditing ? (
                          <div className="text-sm text-gray-500">{user.linkedAccounts?.zdfMail ?? '—'}</div>
                        ) : (
                          <Input
                            value={editData.linkedAccounts?.zdfMail || ''}
                            onChange={(e) => handleLinkedAccountChange('zdfMail', e.target.value)}
                            className="mt-1"
                            placeholder="mail@zdf.de"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}