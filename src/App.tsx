import { useState, useEffect } from 'react';
import { NavigationDock } from './components/NavigationDock';
import { SpotlightCommand } from './components/SpotlightCommand';
import { HeroSection } from './components/HeroSection';
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
    const sections = ['overview', 'projects', 'experience', 'skills', 'contact'];
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.35;
        let currentSection = sections[0];

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el && el.getBoundingClientRect().top <= marker) {
            currentSection = sectionId;
          }
        }

        setActiveSection(previousSection =>
          previousSection === currentSection ? previousSection : currentSection
        );
        frameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
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
          width: '100px',
          height: '100px',
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
      <main className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1440px] mx-auto space-y-0 sm:space-y-0 pb-30 sm:pb-48">
        {/* Hero Section */}
        <HeroSection
          onNavigateSection={handleNavigate}
          onSelectProject={handleSelectProject}
        />

        {/* Featured Projects Gallery */}
        <ProjectsGallery
          onSelectProject={handleSelectProject}
        />

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
