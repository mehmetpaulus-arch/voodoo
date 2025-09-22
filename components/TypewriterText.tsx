'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({ 
  text, 
  speed = 30, 
  onComplete,
  className = ""
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const currentChar = text[currentIndex];
      // Vary speed based on character type for more realistic typing
      let charSpeed = speed;
      if (currentChar === ' ') {
        charSpeed = speed * 0.5; // Faster for spaces
      } else if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
        charSpeed = speed * 2; // Slower for sentence endings
      } else if (currentChar === ',' || currentChar === ';') {
        charSpeed = speed * 1.5; // Slightly slower for commas
      }

      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, charSpeed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className={className}>
      <span>{displayedText}</span>
      {!isComplete && (
        <span className="inline-block w-0.5 h-5 bg-white animate-pulse ml-1">|</span>
      )}
    </div>
  );
}
