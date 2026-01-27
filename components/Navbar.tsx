
import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Github, Linkedin } from 'lucide-react';
import { ThemeVibe } from '../types';
import { GITHUB_URL, LINKEDIN_URL } from '../constants';

interface NavbarProps {
  theme: ThemeVibe;
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', target: 'projects' },
    { name: 'Stack', target: 'tech-stack' },
    { name: 'About', target: 'about' },
    { name: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isScrolled ? 'py-6' : 'py-16'}`} role="navigation">
      <div className="container mx-auto px-6">
        <div className={`mx-auto max-w-4xl px-8 py-5 rounded-[2.5rem] transition-all duration-700 ${isScrolled ? 'glass shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10 scale-95' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-4 group cursor-pointer" 
            >
              <div className="p-3 rounded-2xl bg-blue-600 text-white transform group-hover:rotate-6 transition-transform shadow-xl">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase font-serif text-white">
                Prince<span className="text-blue-500">.</span>Dev
              </span>
            </div>

            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.target)}
                  className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-all relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
              ))}
              
              <div className="flex items-center gap-5 border-l border-white/10 pl-12">
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-white transition-all transform hover:scale-125">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-blue-500 transition-all transform hover:scale-125">
                    <Linkedin className="w-5 h-5" />
                  </a>
              </div>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-3 text-white glass rounded-2xl border-white/10">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-10 glass border-t border-white/10 animate-fade-in mx-6 rounded-[3rem] mt-6 shadow-3xl">
          <div className="flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => handleNavClick(link.target)} className="text-3xl font-serif font-bold italic tracking-tighter text-gray-200">
                {link.name}
              </button>
            ))}
            <div className="flex justify-center gap-10 pt-10 border-t border-white/5">
                <a href={GITHUB_URL} className="text-gray-400 transform scale-125"><Github className="w-8 h-8" /></a>
                <a href={LINKEDIN_URL} className="text-gray-400 transform scale-125"><Linkedin className="w-8 h-8" /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
