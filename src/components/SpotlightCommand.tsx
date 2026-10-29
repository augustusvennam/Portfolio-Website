import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ExternalLink, 
  ArrowRight, 
  Briefcase, 
  Code, 
  Sparkles, 
  Check, 
  Copy, 
  X,
  Cpu
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SpotlightCommand: React.FC<SpotlightProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown listener for Esc and ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Construct search items
  const allItems = [
    // Direct actions
    {
      id: 'action-email',
      type: 'action',
      title: 'Copy Email to Clipboard',
      subtitle: PORTFOLIO_DATA.profile.email,
      icon: Copy,
      category: 'Actions',
      action: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
        setCopied(true);
        sound.playClick();
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'action-github',
      type: 'link',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/augustusvennam',
      icon: ExternalLink,
      category: 'Links',
      action: () => window.open(PORTFOLIO_DATA.profile.github, '_blank')
    },
    {
      id: 'action-linkedin',
      type: 'link',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/augustusvennam',
      icon: ExternalLink,
      category: 'Links',
      action: () => window.open(PORTFOLIO_DATA.profile.linkedin, '_blank')
    },
    // Navigation items
    {
      id: 'nav-eeg',
      type: 'nav',
      title: 'BrainWaves Live EEG Simulator',
      subtitle: 'Simulate WebSocket stream, basic metrics & heuristic classifier',
      icon: Cpu,
      category: 'Interactive Demo',
      action: () => {
        onNavigateSection('brainwaves-lab');
        onClose();
      }
    },
    {
      id: 'nav-projects',
      type: 'nav',
      title: 'Browse All Projects',
      subtitle: 'SMART WRITE, HeavenBound Church, Jetson Robot, VEX, Temi',
      icon: Sparkles,
      category: 'Navigation',
      action: () => {
        onNavigateSection('projects');
        onClose();
      }
    },
    {
      id: 'nav-leadership',
      type: 'nav',
      title: 'Experience & Leadership',
      subtitle: 'LRIS Vice President, Student Ambassador, Church AV Director',
      icon: Briefcase,
      category: 'Navigation',
      action: () => {
        onNavigateSection('experience');
        onClose();
      }
    },
    {
      id: 'nav-skills',
      type: 'nav',
      title: 'Skills Matrix & UX Coursework',
      subtitle: 'Python, Java, TypeScript, UX Research, Heuristic Evaluations',
      icon: Code,
      category: 'Navigation',
      action: () => {
        onNavigateSection('skills');
        onClose();
      }
    },
    // Specific Projects
    ...PORTFOLIO_DATA.projects.map(p => ({
      id: `proj-${p.id}`,
      type: 'project',
      title: p.title,
      subtitle: `${p.subtitle} • ${p.badge}`,
      icon: Code,
      category: 'Projects',
      action: () => {
        onSelectProject(p.id);
        onClose();
      }
    }))
  ];

  const filteredItems = query.trim() === ''
    ? allItems
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sound.playClick();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            className="relative w-full max-w-2xl bg-[#141418]/90 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
          >
            {/* Top Specular Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-white/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search projects, skills, leadership, or run actions..."
                className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[11px] bg-white/[0.08] text-white/50 rounded border border-white/10 font-mono">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-white/40 text-sm">
                  No matching results found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        isSelected 
                          ? 'bg-[#2997ff]/15 text-white border border-[#2997ff]/30 shadow-sm' 
                          : 'text-white/80 hover:bg-white/[0.05] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-[#2997ff]/20 text-[#2997ff]' : 'bg-white/[0.06] text-white/60'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="text-sm font-medium truncate flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.id === 'action-email' && copied && (
                              <span className="text-[11px] text-[#30d158] font-normal flex items-center gap-1">
                                <Check className="w-3 h-3" /> Copied!
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/40 truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-white/30 shrink-0 ml-3">
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px]">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#2997ff]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/40">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 bg-white/[0.08] rounded border border-white/10 font-mono">↑</kbd>
                  <kbd className="px-1 bg-white/[0.08] rounded border border-white/10 font-mono">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 bg-white/[0.08] rounded border border-white/10 font-mono">↵</kbd>
                  to select
                </span>
              </div>
              <span>Augustus Vennam Portfolio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
