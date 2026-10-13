import React, { useState, useEffect } from 'react';
import { useSyncoraStore } from './store/useSyncoraStore';
import { Role } from './types';
import { LandingPage } from './views/LandingPage';
import { LoginChooser } from './views/LoginChooser';
import { LoginRolePage } from './views/LoginRolePage';
import { OwnerApp } from './views/owner/OwnerApp';
import { EventHeadApp } from './views/event-head/EventHeadApp';
import { TeamLeadApp } from './views/team-lead/TeamLeadApp';
import { VolunteerApp } from './views/volunteer/VolunteerApp';
import { ToastContainer } from './components/common/ToastContainer';

export default function App() {
  const { currentRole, setRole, isSimulating, completeTask, tasks } = useSyncoraStore();

  // Ensure any legacy light mode class is removed
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Navigation states: 'landing' | 'chooser' | 'login-role' | 'app'
  const [currentView, setCurrentView] = useState<'landing' | 'chooser' | 'login-role' | 'app'>('landing');
  const [selectedLoginRole, setSelectedLoginRole] = useState<Role>('owner');

  // Initial Cinematic Loading Screen (2.2s skippable)
  const [isLoadingIntro, setIsLoadingIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingIntro(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Background activity simulation (fires realistic updates every 10s when active)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Find an in-progress task to complete while maintaining active tasks across all departments
      const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
      if (inProgressTasks.length > 20) {
        const randomTask = inProgressTasks[Math.floor(Math.random() * inProgressTasks.length)];
        completeTask(randomTask.id);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isSimulating, tasks, completeTask]);

  // Handle Role selection from Landing or Chooser
  const handleSelectRoleFromChooser = (role: Role) => {
    setSelectedLoginRole(role);
    setCurrentView('login-role');
  };

  const handleLoginSuccess = () => {
    setCurrentView('app');
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans overflow-x-hidden selection:bg-[#2f7be8]/40 selection:text-white">
      {/* Toast Notification Stack */}
      <ToastContainer />

      {/* Cinematic Intro Splash Screen */}
      {isLoadingIntro && (
        <div 
          onClick={() => setIsLoadingIntro(false)}
          className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 cursor-pointer animate-out fade-out duration-700 select-none"
        >
          {/* Animated Glowing Ring from Aurora */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-40 h-20 rounded-full border-[6px] border-transparent bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#cdbbf0] [background-origin:border-box] animate-spin [animation-duration:6s] opacity-90 shadow-[0_0_50px_rgba(47,123,232,0.6)]" />
            <div className="absolute w-36 h-18 rounded-full border-2 border-white/80 opacity-70" />
          </div>

          {/* SYNCORA Wordmark Fade & Spacing Animation */}
          <div className="flex flex-col items-center animate-pulse">
            <img
              src="/assets/logo.png"
              alt="SYNCORA"
              className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_0_24px_rgba(205,187,240,0.4)]"
            />
          </div>

          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-8">
            Click anywhere to skip intro · Initializing Syncora Engine
          </span>
        </div>
      )}

      {/* VIEW ROUTER */}
      {currentView === 'landing' && (
        <LandingPage
          onSelectRole={(role) => {
            setSelectedLoginRole(role);
            setCurrentView('login-role');
          }}
          onOpenRoleChooser={() => setCurrentView('chooser')}
        />
      )}

      {currentView === 'chooser' && (
        <LoginChooser
          onSelectRole={handleSelectRoleFromChooser}
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'login-role' && (
        <LoginRolePage
          role={selectedLoginRole}
          onSuccessLogin={handleLoginSuccess}
          onSwitchRole={() => setCurrentView('chooser')}
          onBackToLanding={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'app' && (
        <>
          {currentRole === 'owner' && (
            <OwnerApp onBackToLanding={() => setCurrentView('landing')} />
          )}
          {currentRole === 'event-head' && (
            <EventHeadApp onBackToLanding={() => setCurrentView('landing')} />
          )}
          {currentRole === 'team-lead' && (
            <TeamLeadApp onBackToLanding={() => setCurrentView('landing')} />
          )}
          {currentRole === 'volunteer' && (
            <VolunteerApp onBackToLanding={() => setCurrentView('landing')} />
          )}
        </>
      )}
    </div>
  );
}
