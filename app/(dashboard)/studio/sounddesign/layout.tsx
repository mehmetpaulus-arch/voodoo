'use client';

import React from 'react';

export default function SounddesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2c363d' }}>
      {children}
    </div>
  );
}
