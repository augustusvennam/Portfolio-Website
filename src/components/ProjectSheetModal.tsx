import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Sparkles
} from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { sound } from '../utils/sound';

interface ProjectSheetModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectSheetModal: React.FC<ProjectSheetModalProps> = ({
  project,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Sheet / Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-3xl max-h-[90vh] sm:max-h-[85vh] bg-[#121216] border-t sm:border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
          {/* Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-white/[0.02]">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#2997ff]/20 text-[#2997ff] border border-[#2997ff]/30">
                  {project.badge}
                </span>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.period}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm text-white/60">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Honest Framing Callout (Prompt instruction: do not soften, preserve truth) */}
            {project.honestFraming && (
              <div className="p-4 rounded-2xl bg-[#ff9f0a]/10 border border-[#ff9f0a]/25 text-xs text-[#ff9f0a] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[#ff9f0a]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Honest Engineering Framing & Boundaries</span>
                </div>
                <p className="leading-relaxed text-white/80">
                  {project.honestFraming}
                </p>
              </div>
            )}

            {/* Overview & Role */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">
                Role & Overview
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {project.summary}
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/70">
                <strong className="text-white">Role:</strong> {project.role}
              </div>
            </div>

            {/* Key User & Developer Story */}
            {project.keyStory && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">
                  User Experience & Feedback Cycle
                </h4>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-sm text-white/80 leading-relaxed flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#2997ff] shrink-0 mt-0.5" />
                  <div>
                    <p>{project.keyStory}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Technical Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">
                Architecture & Implementation Highlights
              </h4>
              <ul className="space-y-2">
                {project.technicalHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-white/75">
                    <CheckCircle2 className="w-4 h-4 text-[#30d158] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/40">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl text-xs bg-white/[0.06] text-white/80 border border-white/10 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="p-5 sm:p-6 bg-white/[0.02] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-white/40 font-mono">
              Status: {project.status}
            </span>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2997ff] hover:bg-[#2997ff]/90 text-white text-xs font-medium transition-all shadow-md shadow-[#2997ff]/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Live Website</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
