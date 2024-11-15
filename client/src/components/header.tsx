'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { UserButton } from "./shared/user-button";

const navItems: { name: string; href: string }[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "#pricing-section" },
  { name: "Privacy Policy", href: "#" },
];

export function Header() {
  const pathname = usePathname();

  
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo Section */}
        <Link href={"/"} className="flex items-center space-x-2 text-white font-bold text-2xl tracking-wide">
          <span className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
            L
          </span>
          <span>LOGO</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              scroll={false}
              className={cn(
                "transition-all hover:text-blue-200",
                pathname === item.href ? "text-white font-semibold" : "text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Link href="#pricing-section">
            <Button
              variant="secondary"
              className="hidden md:inline-block text-blue-700 bg-white hover:bg-blue-100 px-4 py-2"
            >
              View Plans
            </Button>
          </Link>
          <UserButton />
        </div>
      </div>
    </header>
  );
}


/**Notes
 * using top to increase or decrease the size won't affect the elements below it but using h will affect them(test on header first className)

 */

/**
 * 
 * 'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./shared/user-button";

const navItems: { name: string; href: string }[] = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Pricing", href: "/pricing" },
    { name: "Privacy Policy", href: "/pricing" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="mr-6 flex items-center text-lg font-semibold">
                    LOGO
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-white/80",
                                pathname === item.href ? "text-white" : "text-white/60"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <UserButton />
            </div>
        </header>
    );
}
 */