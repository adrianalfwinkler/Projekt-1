"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled
        ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">IdeaForge AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">FAQ</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" variant="gradient" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-3">
          <Link href="#features" className="block text-sm text-gray-600 dark:text-gray-400 py-2" onClick={() => setIsMobileOpen(false)}>Features</Link>
          <Link href="#how-it-works" className="block text-sm text-gray-600 dark:text-gray-400 py-2" onClick={() => setIsMobileOpen(false)}>How it works</Link>
          <Link href="#pricing" className="block text-sm text-gray-600 dark:text-gray-400 py-2" onClick={() => setIsMobileOpen(false)}>Pricing</Link>
          <Link href="#faq" className="block text-sm text-gray-600 dark:text-gray-400 py-2" onClick={() => setIsMobileOpen(false)}>FAQ</Link>
          <div className="pt-2 space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button variant="gradient" className="w-full" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
