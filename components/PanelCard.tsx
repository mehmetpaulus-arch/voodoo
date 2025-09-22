'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PanelCardProps {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  href?: string;
  color: string;
  onClick?: () => void;
  locked?: boolean;
  inProgress?: boolean;
  isReady?: boolean;
}

export default function PanelCard({ 
  title, 
  subtitle, 
  icon: Icon, 
  href, 
  color, 
  onClick,
  locked = false,
  inProgress = false,
  isReady = false
}: PanelCardProps) {
  const isOrangePanel = color === 'bg-[#E37222]';
  const textColor = isOrangePanel ? 'text-white' : 'text-gray-900';
  const hoverTextColor = isOrangePanel ? 'text-gray-100' : 'text-gray-800';

  const content = (
    <motion.div
      whileHover={{ scale: locked ? 1 : 1.02, y: locked ? 0 : -2 }}
      whileTap={{ scale: locked ? 1 : 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-lg hover:shadow-md transition-all duration-300",
        locked ? "cursor-not-allowed opacity-60" : "cursor-pointer group",
        "h-48 sm:h-56 md:h-64 p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center",
        color
      )}
      onClick={locked ? undefined : onClick}
    >
        {/* Status indicators overlay */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {inProgress && (
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" title="In Progress" />
          )}
          {isReady && (
            <div className="w-3 h-3 bg-green-500 rounded-full" title="Ready" />
          )}
          {locked && (
            <Lock className="w-6 h-6 text-gray-600" />
          )}
        </div>
      
      {/* Icon at top */}
      <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
        <Icon className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${textColor} ${locked ? '' : 'group-hover:scale-110'} transition-all duration-300`} />
      </div>
      
      {/* Title and subtitle centered */}
      <div className="flex flex-col">
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textColor} mb-2 sm:mb-3 line-clamp-2`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm sm:text-lg md:text-2xl ${textColor} line-clamp-2 leading-relaxed`}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}