import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Copy, 
  Check, 
  MapPin, 
  ArrowUpRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { sound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 w-full space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 overflow-hidden shadow-2xl"
      >
        {/* Specular hairline */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2997ff]/60 to-transparent" />

        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#30d158]/10 text-[#30d158] border border-[#30d158]/30">
            <span className="w-2 h-2 rounded-full bg-[#30d158] animate-pulse" />
            <span>Co-op Placement Availability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Let's build something honest and lasting.
          </h2>

          <p className="text-base text-white/70 leading-relaxed">
            I am actively seeking 4-month co-op or internship placements for <strong>Winter 2027 (Jan–Apr)</strong> and <strong>Summer 2027 (May–Aug)</strong>. Interested in software engineering, agentic AI integration, UI/UX systems, and embedded robotics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-xl shadow-white/10 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#30d158]" />
                  <span>Email Copied ({PORTFOLIO_DATA.profile.email})</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black/60" />
                  <span>Copy {PORTFOLIO_DATA.profile.email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-medium text-sm transition-all active:scale-95 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Direct Email</span>
            </a>
          </div>
        </div>

        {/* Quick contact card grid */}
        <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={PORTFOLIO_DATA.profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between text-xs text-white/80 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <LinkedinIcon className="w-4 h-4 text-[#2997ff]" />
              <span>LinkedIn Profile</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </a>

          <a
            href={PORTFOLIO_DATA.profile.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between text-xs text-white/80 group transition-all"
          >
            <div className="flex items-center gap-2.5">
              <GithubIcon className="w-4 h-4 text-white" />
              <span>GitHub Repositories</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </a>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs text-white/60">
            <MapPin className="w-4 h-4 text-[#30d158]" />
            <span>Mississauga, Ontario (GTA)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/[0.08] text-xs text-white/40 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <span>Augustus Vennam &copy; 2026. Built with React 19 & Apple HIG craft.</span>
      </div>

      <div className="flex items-center gap-4 text-white/50">
        <a 
          href="https://hbcc.ca" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors"
        >
          hbcc.ca
        </a>
        <span>•</span>
        <a 
          href="https://github.com/augustusvennam/BrainWaves-Project" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors"
        >
          BrainWaves Repo
        </a>
        <span>•</span>
        <a 
          href="https://github.com/augustusvennam/TempoSet-Mobile-App" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-white transition-colors"
        >
          TempoSet Repo
        </a>
      </div>
    </footer>
  );
};
