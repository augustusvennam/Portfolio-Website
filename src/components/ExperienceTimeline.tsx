import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  ChevronDown, 
  CheckCircle2, 
  Users
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const ExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('lris-vp');

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-16 sm:py-24 w-full space-y-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#30d158] uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Leadership & University Impact</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Where I Lead & Serve
        </h2>
        <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
          Leading robotics workshops, representing Wilfrid Laurier University to prospective families, and directing live multi-track AV operations for 200+ weekly congregants.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {PORTFOLIO_DATA.experience.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: "spring", stiffness: 280, damping: 28, delay: index * 0.08 }}
              className={`rounded-3xl border transition-colors overflow-hidden ${
                isExpanded 
                  ? 'bg-white/[0.05] border-white/20 shadow-xl' 
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              {/* Header clickable bar */}
              <button
                onClick={() => toggleExpand(exp.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {exp.role}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.08] text-white/70 font-mono">
                      {exp.type}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-[#2997ff]">
                    {exp.organization}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className={`p-2 rounded-xl bg-white/[0.05] text-white/60 transition-transform duration-200 shrink-0 ${
                  isExpanded ? 'rotate-180 text-white' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Expandable details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/[0.06] space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                        Core Responsibilities & Accomplishments
                      </div>
                      <ul className="space-y-2.5">
                        {exp.highlights.map((hl, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#30d158] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
