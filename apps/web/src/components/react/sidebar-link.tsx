'use client';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@repo/shadcn/button';
import { forwardRef } from 'react';

export const SidebarLink = forwardRef<
  any,
  { href: string; children: React.ReactNode; pathname: string }
>(({ href, children, pathname }, ref) => {
  const isActive = pathname === href;
  const className = isActive
    ? 'justify-start w-full gap-x-3 px-3'
    : 'justify-start w-full gap-x-3 bg-white font-normal px-3';
  return (
    <a
      href={href}
      ref={ref}
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'secondary' }),
        className,
      )}
    >
      {children}
    </a>
  );
});

SidebarLink.displayName = 'SidebarLink';
