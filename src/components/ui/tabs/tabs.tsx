'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, title, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex  items-center justify-center rounded-none bg-ef p-1 text-muted-foreground',
      className
    )}
    {...props}
  >
    {/* 첫 번째에 타이틀 배치 */}
    {title && (
      <span
        className={cn(
          'px-1 md:px-2 lg:px-5 -ml-2 py-4 sm:py-5 mr-1',
          'flex justify-center items-center w-full h-full px-1',
          'rounded-none',
          'font-extrabold text-sm md:text-lg lg:text-xl',
          'bg-two text-white'
        )}
      >
        {title}
      </span>
    )}
    {props.children}
  </TabsPrimitive.List>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap px-1 py-4 border-b',
      'sm:px-2 sm:py-6 dm:py-8 text-xs md:text-sm lg:text-base font-base',
      'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'hover:text-point disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:text-two data-[state=active]:font-medium',
      'data-[state=active]:border-b-point data-[state=active]:border-b-2 sm:data-[state=active]:border-b-2',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
