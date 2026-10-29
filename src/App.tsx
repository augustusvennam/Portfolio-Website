import { useState, useEffect } from 'react';
import { NavigationDock } from './components/NavigationDock';
import { SpotlightCommand } from './components/SpotlightCommand';
import { HeroSection } from './components/HeroSection';
import { BrainWavesSimulator } from './components/BrainWavesSimulator';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ProjectSheetModal } from './components/ProjectSheetModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection, Footer } from './components/ContactSection';
import { ScrollReveal, ScrollProgressBar } from './components/ScrollReveal';
import { PORTFOLIO_DATA, type Project } from './data/portfolioData';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [spotlightOpen, setSpotlightOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mouse ambient glow coordinates
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Section scroll tracker
  useEffect(() => {
    const sections = ['overview', 'projects', 'brainwaves-lab', 'experience', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - offset;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProject = (projectId: string) => {
    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] relative selection:bg-[#2997ff]/30 selection:text-white overflow-x-hidden">
      {/* Top Apple Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Dynamic Apple Ambient Spotlight following cursor */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-700 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, rgba(191, 90, 242, 0.03) 5%, transparent 10%)',
        }}
      />

      {/* Floating Navigation Bar */}
      <NavigationDock
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />

      {/* Spotlight Command Palette (⌘K) */}
      <SpotlightCommand
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onSelectProject={handleSelectProject}
        onNavigateSection={handleNavigate}
      />

      {/* Project Detail Sheet Modal */}
      <ProjectSheetModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Main Container */}
      <main className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto space-y-28 sm:space-y-40 pb-36 sm:pb-48">
        {/* Hero Section */}
        <HeroSection
          onNavigateSection={handleNavigate}
          onSelectProject={handleSelectProject}
        />

        {/* Featured Projects Gallery */}
        <ProjectsGallery
          onSelectProject={handleSelectProject}
        />

        {/* BrainWaves / BrainBot Interactive Simulator Lab */}
        <ScrollReveal distance={40}>
          <section id="brainwaves-lab" className="py-12 sm:py-16 scroll-mt-24 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2997ff] uppercase tracking-wider">
                <span>Hardware & Systems Integration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Interactive EEG Telepresence Lab
              </h2>
              <p className="text-sm sm:text-base text-white/60 max-w-3xl leading-relaxed">
                Explore the real architecture of Augustus's flagship integration: streaming Emotiv EPOC X Cortex metrics through a typed React + WebSocket pipeline directly to a Temi robot.
              </p>
            </div>

            <BrainWavesSimulator />
          </section>
        </ScrollReveal>

        {/* Experience & Leadership Timeline */}
        <ScrollReveal distance={40}>
          <ExperienceTimeline />
        </ScrollReveal>

        {/* Skills & UX Coursework Grounding */}
        <ScrollReveal distance={40}>
          <SkillsSection />
        </ScrollReveal>

        {/* Contact & Availability */}
        <ScrollReveal distance={40} scale>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto pb-28 sm:pb-32">
        <Footer />
      </div>
    </div>
  );
}

export default App;
