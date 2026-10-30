import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Copy, 
  Check, 
  MapPin, 
  Bot, 
  Layout, 
  Cpu,
  GraduationCap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectProject: (projectId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateSection,
  onSelectProject,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeLane, setActiveLane] = useState<'ai' | 'frontend' | 'robotics'>('frontend');

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2200);
  };

  const lanes = [
    {
      id: 'frontend' as const,
      title: 'Frontend & UX Design',
      icon: Layout,
      color: '#2997ff',
      summary: 'React 19 & typed WebSocket UIs with rigorous UX grounding. Tested by real users before launch.',
      highlight: 'HeavenBound Church (4+ yrs live) & SMART WRITE Canva UX loops',
      targetProject: 'heavenbound'
    },
    {
      id: 'robotics' as const,
      title: 'Embedded & Robotics',
      icon: Cpu,
      color: '#30d158',
      summary: 'VP of Laurier Robotics (LRIS), VEX competitive builds, Temi kiosk, and Jetson Nano face detection.',
      highlight: 'BrainWaves EEG-to-Temi pipeline with strict fail-safes',
      targetProject: 'brainwaves'
    },
    {
      id: 'ai' as const,
      title: 'Semi-Local AI Workflows',
      icon: Bot,
      color: '#bf5af2',
      summary: 'Designing autonomous agent workflows balancing local privacy bounds with high-capability cloud reasoning.',
      highlight: 'Model Context Protocol (MCP) and deterministic agent recovery',
      targetProject: 'ai-workflows'
    }
  ];

  return (
    <section id="overview" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#2997ff]/10 via-[#bf5af2]/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="w-full space-y-10 sm:space-y-14">
        {/* Availability Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl text-xs text-white/90">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30d158] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30d158]"></span>
            </span>
            <span className="font-medium text-white/90">
              Open to 4-Month Co-op Placements
            </span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">
              Winter 2027 & Summer 2027
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-white/50">
            <MapPin className="w-3 h-3 text-white/40" />
            <span>Mississauga, Ontario, Canada</span>
          </div>
        </motion.div>

        {/* Hero Title & Identity */}
        <div className="space-y-5">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
          >
            Augustus Vennam
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl lg:text-3xl text-white/70 font-normal max-w-4xl leading-relaxed tracking-tight"
          >
            Computer Science student with a UX Design minor at <strong className="text-white font-medium">Wilfrid Laurier University</strong> — building AI agent workflows, frontend experiences, and embedded robotics systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50 pt-1"
          >
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#2997ff]" />
              Expected Graduation: August 2028
            </span>
            <span>•</span>
            <span>Vice President, Laurier Robotics Innovation Student Society (LRIS)</span>
            <span>•</span>
            <span>Student Ambassador for Laurier</span>
          </motion.div>
        </div>

        {/* Primary Tactile Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <button
            onClick={() => {
              sound.playPop();
              onNavigateSection('projects');
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all active:scale-[0.97] shadow-lg shadow-white/10"
          >
            <span>Explore Featured Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-sm transition-all active:scale-[0.97]"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#30d158]" />
                <span className="text-[#30d158] font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 opacity-60" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5 ml-auto">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white transition-all active:scale-95"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* 3 Core Engineering Lanes — Apple Interactive Segmented Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 pt-4"
        >
          <div className="flex items-center justify-between text-xs text-white/40 px-1 font-mono uppercase tracking-wider">
            <span>Primary Competency Lanes</span>
            <span>Select to inspect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {lanes.map((lane) => {
              const Icon = lane.icon;
              const isSelected = activeLane === lane.id;
              return (
                <div
                  key={lane.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveLane(lane.id);
                  }}
                  className={`relative p-5 rounded-3xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white/[0.07] border-white/20 shadow-xl'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  {/* Active highlight glow */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeLaneOutline"
                      className="absolute inset-0 rounded-3xl border-2 border-white/20 pointer-events-none"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div 
                        className="p-2.5 rounded-2xl"
                        style={{ backgroundColor: `${lane.color}15`, color: lane.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-white/40">
                        {lane.id.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {lane.title}
                      </h3>
                      <p className="text-xs text-white/60 leading-relaxed mt-1">
                        {lane.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                      <span className="text-white/40 truncate mr-2">
                        {lane.highlight}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playPop();
                          onSelectProject(lane.targetProject);
                        }}
                        className="text-[#2997ff] hover:underline font-medium shrink-0 flex items-center gap-0.5"
                      >
                        Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
