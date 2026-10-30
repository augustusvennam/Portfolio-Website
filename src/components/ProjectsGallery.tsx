import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  Bot,
  Layout,
  Cpu,
  Smartphone
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface ProjectsGalleryProps {
  onSelectProject: (projectId: string) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onSelectProject
}) => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'robotics' | 'ai' | 'mobile'>('all');
  const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);
  const filterTimer = useRef<number | null>(null);

  const filterTabs = [
    { id: 'all' as const, label: 'All Projects', icon: Layers },
    { id: 'frontend' as const, label: 'Frontend & UX', icon: Layout },
    { id: 'robotics' as const, label: 'Robotics & Hardware', icon: Cpu },
    { id: 'ai' as const, label: 'AI & Agents', icon: Bot },
    { id: 'mobile' as const, label: 'Mobile Apps', icon: Smartphone },
  ];

  const filteredProjects = filter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === filter);

  useEffect(() => {
    return () => {
      if (filterTimer.current !== null) {
        window.clearTimeout(filterTimer.current);
      }
    };
  }, []);

  const changeFilter = (nextFilter: typeof filter) => {
    if (nextFilter === filter || isFilterTransitioning) {
      return;
    }

    setIsFilterTransitioning(true);
    filterTimer.current = window.setTimeout(() => {
      setFilter(nextFilter);
      setIsFilterTransitioning(false);
      filterTimer.current = null;
    }, 700);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 w-full space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#2997ff] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Engineered for Real People
          </h2>
          <p className="text-sm text-white/60 max-w-xl mt-1">
            From production web applications serving live communities to hardware robotics kiosks and typed WebSocket dashboards.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-2xl border border-white/[0.08] overflow-x-auto max-w-full">
          {filterTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  changeFilter(tab.id);
                }}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-white/15 rounded-xl border border-white/10"
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                )}
                <Icon className="w-3 h-3 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: isFilterTransitioning ? 0 : 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0 && filter === 'all';
            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  sound.playPop();
                  onSelectProject(project.id);
                }}
                className={`group relative p-6 sm:p-7 rounded-3xl glass-card transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/[0.05] via-[#121216] to-[#0d0d10]' : ''
                }`}
              >
                {/* Specular hairline */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#2997ff]/40 transition-colors" />

                {/* Project image slot */}
                <div
                  aria-label={`${project.title} project image`}
                  className="mb-5 aspect-video rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent overflow-hidden"
                >
                  {project.video ? (
                    <video
                      src={project.video}
                      poster={project.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} project image`}
                      className="w-full h-full object-contain"
                    />
                  ) : null}
                </div>

                <div className="space-y-4">
                  {/* Top Bar: Badge + Period */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/[0.08] text-white/80 border border-white/10 group-hover:border-[#2997ff]/40 group-hover:text-white transition-colors">
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono text-white/40">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#2997ff] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#2997ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-white/50 mt-1 line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                </div>

                {/* Footer: Tech Stack */}
                <div className="pt-5 mt-5 border-t border-white/[0.06] space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/25">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-white/[0.04] text-white/60 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isFilterTransitioning ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 z-10 rounded-3xl bg-black pointer-events-none"
        />
      </div>
    </section>
  );
};
