"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { StreamShareLogo } from '@/components/icons/StreamShareLogo';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-center h-16 px-4 border-b md:px-6 bg-background/80 backdrop-blur-sm">
             <Link href="/" className="flex items-center gap-2 font-semibold">
                <StreamShareLogo className="w-6 h-6 text-primary" />
                <span className="text-lg font-headline">StreamShare</span>
            </Link>
        </header>
    )
  }

  const navLinks = [
    { href: '#services', label: 'Servicios' },
    { href: '#about-us', label: 'Nosotros' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center h-16 px-4 border-b md:px-6 bg-background/80 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2 mr-6 font-semibold">
        <StreamShareLogo className="w-6 h-6 text-primary" />
        <span className="hidden text-lg sm:inline-block font-headline">StreamShare</span>
      </Link>
      <nav className="items-center hidden gap-6 text-sm font-medium lg:flex">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors hover:text-primary",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:w-auto">
         <div className="flex-1 md:hidden"></div>
         <div className="items-center hidden gap-2 md:flex">
            <Button variant="outline" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Sign Up</Link>
            </Button>
         </div>

        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "transition-colors hover:text-primary",
                          pathname === link.href ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                     <div className='flex flex-col gap-4 mt-4'>
                        <Button variant="outline" asChild>
                            <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/register">Sign Up</Link>
                        </Button>
                     </div>
                </nav>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
