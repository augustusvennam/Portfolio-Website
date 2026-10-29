import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Layers, 
  Terminal, 
  Briefcase, 
  Cpu, 
  Sparkles,
  Mail
} from 'lucide-react';
import { sound } from '../utils/sound';

interface NavigationDockProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSpotlight: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  activeSection,
  onNavigate,
  onOpenSpotlight
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'brainwaves-lab', label: 'EEG Lab', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills & UX', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const toggleSound = () => {
    const isNowOn = sound.toggle();
    setSoundEnabled(isNowOn);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-5 sm:pb-7 px-3 sm:px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl glass-dock shadow-2xl shadow-black/80 border border-white/15 max-w-2xl sm:max-w-3xl w-auto justify-between"
      >
        {/* Brand / Status Pill */}
        <button 
          onClick={() => {
            sound.playClick();
            onNavigate('overview');
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/5 transition-all text-left group"
        >
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30d158]"></span>
          </div>
          <div className="hidden md:block">
            <span className="text-xs font-semibold text-white/90 tracking-tight group-hover:text-white transition-colors">
              Augustus V.
            </span>
            <span className="text-[10px] text-white/40 block leading-none mt-0.5">
              Laurier CS + UX
            </span>
          </div>
        </button>

        {/* Center Nav items */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.05]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 active:scale-95 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white/90 hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockIndicator"
                    className="absolute inset-0 bg-white/[0.16] rounded-lg border border-white/15 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10 opacity-80" />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right side utilities: Spotlight & Audio toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Spotlight Search Trigger */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenSpotlight();
            }}
            title="Search portfolio (⌘K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] transition-all active:scale-95"
          >
            <Search className="w-3.5 h-3.5 text-white/70" />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-white/[0.08] text-white/60 rounded border border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute interactive audio" : "Enable Apple tactile audio feedback"}
            className={`p-1.5 sm:p-2 rounded-xl text-xs transition-all border active:scale-95 ${
              soundEnabled 
                ? 'bg-[#2997ff]/20 text-[#2997ff] border-[#2997ff]/40 shadow-[0_0_12px_rgba(41,151,255,0.3)]' 
                : 'text-white/40 hover:text-white/75 bg-white/[0.03] border-white/[0.06]'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </motion.nav>
    </div>
  );
};
