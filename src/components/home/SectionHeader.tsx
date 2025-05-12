'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      className='text-center py-10 sm:py-12 md:py-14 lg:py-16'
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className='flex items-center justify-center gap-4'>
        <span className='w-10 h-px bg-point/20' />
        <h3 className='text-xl md:text-2xl lg:text-3xl font-medium text-three'>
          {title}
        </h3>
        <span className='w-10 h-px bg-point/20' />
      </div>
      <p className='mt-3 text-sm md:text-lg font-medium drop-shadow  text-three/60'>
        {description}
      </p>
    </motion.div>
  );
};
