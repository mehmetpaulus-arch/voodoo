'use client';

import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

interface LogoProps {
  isCollapsed: boolean;
}

export default function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className={`p-6 flex justify-center items-center ${isCollapsed ? 'px-3 py-4' : ''}`}>
      <Link href="/" className="group">
        {isCollapsed ? (
          <img 
            src="/ZDF_Logo copy.jpg" 
            alt="ZDF Assistant Logo" 
            className="w-6 h-6 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <img 
            src="/Unbenannt-2.jpg" 
            alt="ZDF Assistant Logo" 
            className="w-48 h-24 rounded-lg object-cover flex-shrink-0"
          />
        )}
      </Link>
    </div>
  );
}