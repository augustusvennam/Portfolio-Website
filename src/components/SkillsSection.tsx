import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  BookOpen, 
  Award
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const SkillsSection: React.FC = () => {
  const [showCerts, setShowCerts] = useState<boolean>(false);

  const getLevelBadge = (level?: string) => {
    switch (level) {
      case 'strongest':
        return { label: 'Strongest', bg: 'bg-[#2997ff]/20 text-[#2997ff] border-[#2997ff]/30' };
      case 'real-use':
        return { label: 'Real Production / Build', bg: 'bg-[#30d158]/20 text-[#30d158] border-[#30d158]/30' };
      case 'contributed':
        return { label: 'Contributed Model / Training', bg: 'bg-[#bf5af2]/20 text-[#bf5af2] border-[#bf5af2]/30' };
      case 'working':
        return { label: 'Working Familiarity', bg: 'bg-white/10 text-white/70 border-white/15' };
      default:
        return { label: 'Verified Skill', bg: 'bg-white/5 text-white/60 border-white/10' };
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 w-full space-y-10">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#bf5af2] uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>Honest Technical Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Skills & UX Grounding
        </h2>
        <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
          Proficiency is stated honestly with zero artificial inflation. Built across Wilfrid Laurier coursework, leadership, and production builds.
        </p>
      </div>

      {/* Coursework Spotlight Pill Bar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="flex items-center gap-1.5 font-semibold text-white/80">
            <BookOpen className="w-4 h-4 text-[#2997ff]" />
            Wilfrid Laurier University — Fall 2026 Core Coursework
          </span>
          <span className="font-mono text-[11px]">BSc CS + UX Minor</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {PORTFOLIO_DATA.coursework.fall2026.map(course => (
            <div key={course} className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
              <span>{course}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 text-xs text-white/50 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-white/40 font-mono text-[11px]">Applied in projects:</span>
          {PORTFOLIO_DATA.coursework.appliedPrinciples.map(p => (
            <span key={p} className="text-white/70 bg-white/[0.04] px-2 py-0.5 rounded text-[11px]">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Matrix Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PORTFOLIO_DATA.skills.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: "spring", stiffness: 280, damping: 26, delay: (index % 3) * 0.08 }}
            className="p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all space-y-4"
          >
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {category.title}
              </h3>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {category.skills.map((skill) => {
                const badge = getLevelBadge(skill.level);
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/90 hover:bg-white/[0.08] transition-colors"
                  >
                    <span className="font-medium">{skill.name}</span>
                    {skill.level && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${badge.bg}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications Accordion Drawer */}
      <div className="pt-2">
        <button
          onClick={() => {
            sound.playClick();
            setShowCerts(!showCerts);
          }}
          className="w-full p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex items-center justify-between text-left transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#bf5af2]/15 text-[#bf5af2]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Industry Certifications & Credentials ({PORTFOLIO_DATA.certifications.length})
              </div>
              <div className="text-xs text-white/50 mt-0.5">
                Anthropic AI & Model Context Protocol suite, Riipen Customer Experience
              </div>
            </div>
          </div>

          <span className="text-xs font-mono text-[#2997ff] hover:underline">
            {showCerts ? 'Hide' : 'View All'} &darr;
          </span>
        </button>

        <AnimatePresence initial={false}>
          {showCerts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PORTFOLIO_DATA.certifications.map(cert => (
                  <div
                    key={cert.title}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-medium text-white/90">{cert.title}</div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {cert.issuer} • {cert.date}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-white/60 shrink-0">
                      {cert.category}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
