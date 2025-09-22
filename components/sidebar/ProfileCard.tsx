'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  isCollapsed: boolean;
}

export default function ProfileCard({ isCollapsed }: ProfileCardProps) {
  const router = useRouter();
  
  const user = {
    name: 'Joshua Kranz',
    role: 'Editor'
  };

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="space-y-2">
      <Link
        href="/profile"
        aria-label="Zum Profil"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FA7D19] rounded-xl"
      >
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/50 transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? (
            <div className="w-8 h-8 rounded-full bg-[#FA7D19]/20 text-[#FA7D19] flex items-center justify-center text-sm font-semibold">
              {initials}
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#FA7D19]/20 text-[#FA7D19] flex items-center justify-center text-base font-semibold">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl font-medium text-white truncate font-sans">
                  {user.name}
                </div>
                <div className="text-lg text-gray-400 truncate font-sans">
                  {user.role}
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
      
      {!isCollapsed && (
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors font-sans"
        >
          Abmelden
        </button>
      )}
    </div>
  );
}