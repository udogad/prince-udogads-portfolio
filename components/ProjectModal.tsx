
import React, { useEffect } from 'react';
import { X, ExternalLink, Code, Terminal, Zap, Calendar, Target, CheckCircle2, ArrowRight, Github, BookOpen, Layers, AlertCircle, Award, Sparkles, Star, Globe, ShieldAlert } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const PRIVATE_SOURCE_CODE_MESSAGE =
  "Source code is private due to NDA/confidentiality obligations. I worked on this project, but I’m not permitted to publish the repository.";

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const hasPublicSourceCode = Boolean(project.sourceCodeUrl);
  const hasPrivateSourceCode = Boolean(project.isSourceCodePrivate && !project.sourceCodeUrl);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[110] bg-[#020617] animate-in fade-in duration-700 flex flex-col overflow-y-auto custom-scrollbar w-full"
      role="dialog"
      aria-modal="true"
    >
      {/* Cinematic Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 px-4 sm:px-8 md:px-16 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="p-3 sm:p-4 bg-blue-600 rounded-xl sm:rounded-2xl text-white shadow-2xl shadow-blue-600/30">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-blue-500">SYSTEMS_REPORT_{project.id.toUpperCase()}</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight truncate max-w-[150px] sm:max-w-none">{project.title}</h2>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-3 sm:p-5 bg-white/5 hover:bg-white text-slate-400 hover:text-black rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <X className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>
      </header>

      {/* Hero Visual - Editorial Style */}
      <section className="relative w-full h-[50vh] sm:h-[65vh] flex-shrink-0 flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0">
           <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-40 blur-sm scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 md:px-16 text-center md:text-left">
          <div className="space-y-6 sm:space-y-10">
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center md:justify-start">
               <span className="px-4 sm:px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-blue-400">{project.category}</span>
               <span className="px-4 sm:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-slate-400">{project.year}</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-serif font-bold text-white leading-none tracking-tighter">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Architecture - GRID DRIVEN */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 md:px-16 py-16 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-20 items-start">
          
          <div className="lg:col-span-8 space-y-20 sm:space-y-32">
            
            {/* The Mission */}
            <div className="space-y-6 sm:space-y-10">
              <div className="flex items-center gap-4 sm:gap-6">
                 <div className="w-10 h-10 sm:w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                 </div>
                 <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-blue-500">The Brief</h3>
              </div>
              <p className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
                {project.theBrief}
              </p>
            </div>

            {/* Strategic Features - ENHANCED GRID */}
            <div className="space-y-6 sm:space-y-10">
              <div className="flex items-center gap-4 sm:gap-6">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                 </div>
                 <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-emerald-400">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-900/50 border border-white/5 flex flex-col gap-4 group/feat hover:bg-slate-800 transition-all duration-500 h-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover/feat:scale-110 transition-all">
                      <Star className="w-4 h-4" />
                    </div>
                    <p className="text-sm sm:text-base font-bold text-slate-200 leading-snug">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Resolution */}
            <div className="space-y-8 sm:space-y-12 p-8 sm:p-12 bg-amber-500/5 border border-amber-500/10 rounded-[2.5rem] sm:rounded-[4rem] relative overflow-hidden group/challenge">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover/challenge:opacity-10 transition-opacity">
                  <ShieldAlert className="w-32 h-32 sm:w-64 sm:h-64 text-amber-500" />
               </div>
               <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                     <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-amber-500">The Challenges</h3>
               </div>
               <div className="space-y-6 sm:space-y-8 relative z-10">
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white leading-snug">
                     {project.theChallenges}
                  </p>
                  <div className="flex items-start gap-4 p-5 sm:p-6 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                     <Sparkles className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                     <p className="text-xs sm:text-sm text-amber-100/80 italic font-medium">
                        Strategic technical pivot: Identifying performance bottlenecks early allowed for a more robust architectural solution.
                     </p>
                  </div>
               </div>
            </div>

            {/* Engineering & Outcomes - GRID PAIR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
              {/* Execution */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4">
                  <Layers className="w-5 h-5 text-purple-500" />
                  <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-purple-500">Execution</h3>
                </div>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-medium">
                  {project.theExecution}
                </p>
                <div className="p-6 sm:p-8 bg-slate-900 border border-white/5 rounded-2xl sm:rounded-3xl space-y-4">
                   <div className="flex items-center gap-3 text-blue-400">
                     <Terminal className="w-4 h-4" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Protocol Specs</span>
                   </div>
                   <p className="font-mono text-xs sm:text-sm text-slate-400 italic leading-relaxed">
                     {project.techDetails}
                   </p>
                </div>
              </div>

              {/* Impact */}
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-4">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] text-emerald-400">Impact</h3>
                </div>
                <div className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-emerald-500/5 border border-emerald-500/10 h-full flex flex-col justify-center gap-6">
                   <p className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tighter">Mission<br/>Success.</p>
                   <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                      {project.theImpact}
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optimized Sidebar */}
          <aside className="lg:col-span-4 sticky top-32 space-y-8">
            <div className="glass rounded-[2rem] sm:rounded-[2.5rem] border-white/10 p-8 sm:p-10 bg-slate-900/80">
               <div className="space-y-8 sm:space-y-10">
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">System Data</h4>

                  <div className="grid grid-cols-1 gap-6 sm:gap-8">
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ARCHITECTURE</p>
                        <div className="flex flex-wrap gap-2">
                           {project.tags.map(tag => (
                              <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black text-slate-300">
                                 {tag.toUpperCase()}
                              </span>
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">ROLE</p>
                           <p className="text-xs font-bold text-white leading-tight">{project.role}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">STATUS</p>
                           <p className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">{project.status}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <a 
                 href={project.link} 
                 target="_blank" 
                 className="w-full py-6 sm:py-8 bg-white text-black text-center font-black uppercase tracking-widest text-[11px] rounded-2xl sm:rounded-3xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-4 shadow-xl"
               >
                 Visit Live Site <Globe className="w-5 h-5" />
               </a>
               {hasPublicSourceCode ? (
                 <a 
                   href={project.sourceCodeUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full py-6 sm:py-8 bg-white/5 border border-white/10 text-white text-center font-black uppercase tracking-widest text-[11px] rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-all flex items-center justify-center gap-4"
                 >
                   <Github className="w-5 h-5" /> Source Code
                 </a>
               ) : hasPrivateSourceCode ? (
                 <div className="space-y-3">
                   <div className="w-full py-6 sm:py-8 bg-white/5 border border-white/10 text-slate-400 text-center font-black uppercase tracking-widest text-[11px] rounded-2xl sm:rounded-3xl flex items-center justify-center gap-4 cursor-not-allowed">
                     <Github className="w-5 h-5" /> Source Code Private
                   </div>
                   <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                     <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                     <p className="text-xs text-amber-100/90 leading-relaxed">
                       {PRIVATE_SOURCE_CODE_MESSAGE}
                     </p>
                   </div>
                 </div>
               ) : (
                 <div className="w-full py-6 sm:py-8 bg-white/5 border border-white/10 text-slate-400 text-center font-black uppercase tracking-widest text-[11px] rounded-2xl sm:rounded-3xl flex items-center justify-center gap-4 cursor-not-allowed">
                   <Github className="w-5 h-5" /> Source Code Unavailable
                 </div>
               )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
