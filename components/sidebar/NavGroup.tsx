'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems: SubItem[];
  href?: string;
  locked?: boolean;
}

interface NavGroupProps {
  item: NavItem;
  isCollapsed: boolean;
  currentPath: string;
}

export default function NavGroup({ item, isCollapsed, currentPath }: NavGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasActiveSubItem = item.subItems.some(subItem => currentPath === subItem.href);
  const isGroupActive = hasActiveSubItem || (item.href && currentPath === item.href);

  // Auto-expand if current path matches any sub-item
  useEffect(() => {
    if (hasActiveSubItem && !isCollapsed) {
      setIsExpanded(true);
    }
  }, [hasActiveSubItem, isCollapsed]);

  // Collapse when sidebar is collapsed
  useEffect(() => {
    if (isCollapsed) {
      setIsExpanded(false);
    }
  }, [isCollapsed]);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCollapsed && item.subItems.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isCollapsed && item.subItems.length > 0) {
        setIsExpanded(!isExpanded);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.href && item.subItems.length === 0) {
      // Direct navigation for items with href and no subitems
      window.location.href = item.href;
    } else {
      toggleExpanded(e);
    }
  };

  const NavContent = () => (
    <button
      className={cn(
        "flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 group",
        "justify-start text-left",
        "justify-start text-left",
        item.locked 
          ? "cursor-not-allowed opacity-50" 
          : "hover:bg-gray-800/50 focus:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#FA7D19]/50",
        isGroupActive && !item.locked && "bg-[#FA7D19]/10 border-l-4 border-[#FA7D19] text-[#FA7D19]",
        !isGroupActive && !item.locked && "text-gray-300 hover:text-white",
        item.locked && "text-gray-500"
      )}
      onClick={item.locked ? undefined : handleClick}
      onKeyDown={item.locked ? undefined : handleKeyDown}
      aria-expanded={isExpanded}
      aria-controls={`nav-group-${item.id}`}
      tabIndex={item.locked ? -1 : 0}
      disabled={item.locked}
    >
      <item.icon className={cn("w-5 h-5 flex-shrink-0", item.locked && "opacity-50")} />
      
      {!isCollapsed && (
        <>
          <span className="flex-1 ml-3 font-medium font-sans text-xl">{item.label}</span>
          <div className="flex items-center gap-2">
            {item.locked && (
              <Lock className="w-4 h-4 text-gray-500" />
            )}
            {item.subItems.length > 0 && !item.locked && (
              <div className="p-1 rounded hover:bg-gray-700/50 transition-colors">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            )}
          </div>
        </>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="block">
            <NavContent />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700">
          <div className="font-medium flex items-center gap-2">
            {item.label}
            {item.locked && <Lock className="w-3 h-3 text-gray-500" />}
          </div>
          {item.locked && (
            <div className="text-xs text-gray-400 mt-1">Noch nicht verfügbar</div>
          )}
          {item.subItems.length > 0 && !item.locked && (
            <div className="mt-1 space-y-1">
              {item.subItems.map((subItem) => (
                <div key={subItem.href} className="text-sm text-gray-300">
                  {subItem.label}
                </div>
              ))}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div>
      <NavContent />
      
      <AnimatePresence>
        {isExpanded && !isCollapsed && item.subItems.length > 0 && !item.locked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
            id={`nav-group-${item.id}`}
          >
            <ul className="ml-4 mt-1 space-y-1" role="menu">
              {item.subItems.map((subItem) => {
                const isSubActive = currentPath === subItem.href;
                return (
                  <li key={subItem.href} role="none">
                    <Link
                      href={subItem.href}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-base transition-all duration-200",
                        "text-left",
                        "text-left",
                        "hover:bg-gray-800/50 focus:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#FA7D19]/50",
                        isSubActive 
                          ? "bg-[#FA7D19]/10 border-l-4 border-[#FA7D19] text-[#FA7D19] mr-2 mb-1" 
                          : "text-gray-400 hover:text-white",
                        "flex items-center px-3 py-2 rounded-lg text-base transition-all duration-200",
                        "justify-start text-left"
                      )}
                    >
                      <span className="text-left">{subItem.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}