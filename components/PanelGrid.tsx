'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PanelCard from './PanelCard';

interface Panel {
  id: string;
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

interface PanelGridProps {
  panels: Panel[];
  title?: string;
  subtitle?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PanelGrid({ panels, title, subtitle }: PanelGridProps) {
  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="space-y-2 px-4 sm:px-6 md:px-8">
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          )}
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-700">{subtitle}</p>
          )}
        </div>
      )}
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8"
      >
        {panels.map((panel) => (
          <motion.div key={panel.id} variants={item}>
            <PanelCard
              title={panel.title}
              subtitle={panel.subtitle}
              icon={panel.icon}
              href={panel.href}
              color={panel.color}
              onClick={panel.onClick}
              locked={panel.locked}
              inProgress={panel.inProgress}
              isReady={panel.isReady}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}