import React, { useState, useEffect } from 'react';
import { Menu, X, Layers } from 'lucide-react';
import { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Method', href: '#method' },
  { label: 'Studio', href: '#studio' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on scroll state
  const navBg = isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4' : 'bg-transparent py-6';
  const logoBg = isScrolled ? 'bg-brand-black text-white' : 'bg-white text-brand-black';
  const logoText = isScrolled ? 'text-brand-black' : 'text-white';
  const linkText = isScrolled ? 'text-gray-500 hover:text-brand-black' : 'text-gray-300 hover:text-white';
  const buttonBg = isScrolled ? 'bg-brand-black text-white hover:bg-brand-accent' : 'bg-white text-brand-black hover:bg-gray-100';
  const mobileToggleColor = isScrolled ? 'text-brand-black' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Area */}
        <a href="#" className="flex items-center gap-2 group">
          <div className={`w-8 h-8 flex items-center justify-center rounded-md group-hover:rotate-12 transition-all duration-300 ${logoBg}`}>
             <Layers size={18} />
          </div>
          <span className={`font-sans font-medium text-lg tracking-tight transition-colors ${logoText}`}>happening.design</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className={`font-mono text-xs uppercase tracking-widest transition-colors ${linkText}`}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className={`font-mono text-xs px-4 py-2 rounded-full transition-colors ${buttonBg}`}>
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${mobileToggleColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in slide-in-from-top-5">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-3xl text-brand-black hover:text-brand-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-brand-black text-white text-center font-mono text-xs px-4 py-3 rounded-full hover:bg-brand-accent transition-colors">
            Start Project
          </a>
        </div>
      )}
    </nav>
  );
};