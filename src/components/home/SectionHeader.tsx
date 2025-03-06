import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className='text-center py-10 sm:py-12 md:py-14 lg:py-16'>
      <div className='flex items-center justify-center gap-4'>
        <span className='w-10 h-px bg-gray-300' />
        <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-three'>
          {title}
        </h3>
        <span className='w-10 h-px bg-dd' />
      </div>
      <p className='mt-3 text-sm md:text-lg font-medium drop-shadow  text-three/60'>
        {description}
      </p>
    </div>
  );
};
