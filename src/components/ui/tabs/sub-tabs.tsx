'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const SubTabs = TabsPrimitive.Root;

const SubTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex flex-wrap gap-2 items-center justify-center rounded-tl-md rounded-br-md p-1  bg-ef text-point font-semibold text-xs md:text-sm lg:text-base',
      className
    )}
    {...props}
  />
));
SubTabsList.displayName = TabsPrimitive.List.displayName;

const SubTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-tl-sm rounded-br-sm p-1 px-2 py-1.5 text-xs md:text-sm lg:text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-dd data-[state=active]:font-bold data-[state=active]:bg-point data-[state=active]:border-b-2 data-[state=active]:border-dd',
      className
    )}
    {...props}
  />
));
SubTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const SubTabsContent = React.forwardRef<
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
SubTabsContent.displayName = TabsPrimitive.Content.displayName;

export { SubTabs, SubTabsList, SubTabsTrigger, SubTabsContent };
