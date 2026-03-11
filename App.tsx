
import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Activity, 
  Loader2, 
  Github, 
  Linkedin, 
  Twitter, 
  Cpu,
  Monitor,
  Smartphone,
  BrainCircuit,
  ArrowRight,
  Plus,
  Zap,
  ChevronDown,
  Globe,
  Database,
  Cloud,
  Terminal,
  GitBranch
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import SkillsRadar from './components/SkillsRadar.tsx';
import TechStack from './components/TechStack.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import SentinelPulse from './components/SentinelPulse.tsx';
import AIChatBot from './components/AIChatBot.tsx';
import { PROJECTS, INTERESTS, NAME, GITHUB_URL, LINKEDIN_URL, TWITTER_URL, PROFILE_IMAGE_URL, SENTINEL_WEBHOOK_URL } from './constants.tsx';
import { InterestCategory, Project, ThemeVibe } from './types.ts';

const App: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState<InterestCategory | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleInterestSelect = (interest: InterestCategory | null) => {
    setSelectedInterest(interest);
    if (interest) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const message = messageRef.current?.value;

    if (!name || !email || !message) return;
    setFormState('sending');

    if (SENTINEL_WEBHOOK_URL) {
      try {
        await fetch(SENTINEL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Contact Alert',
            embeds: [{
              title: "📬 New Inquiry from " + name,
              color: 0x3b82f6,
              fields: [
                { name: "Sender", value: name, inline: true },
                { name: "Email", value: email, inline: true },
                { name: "Phone", value: phone || "Not provided", inline: true },
                { name: "Message", value: message }
              ],
              timestamp: new Date().toISOString()
            }]
          })
        });
      } catch (err) {
        console.error("Webhook failed:", err);
      }
    }
    
    setTimeout(() => setFormState('success'), 1200);
  };

  const filteredProjects = selectedInterest 
    ? PROJECTS.filter(p => p.category === selectedInterest) 
    : PROJECTS;

  return (
    <div className="min-h-screen bg-[#010208] text-slate-50 selection:bg-blue-500/30 w-full antialiased">
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      <Navbar theme={ThemeVibe.FUTURISTIC} onThemeToggle={() => {}} />

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] opacity-50"></div>
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
      </div>

      <main className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section id="home" className="container mx-auto px-4 sm:px-6 pt-32 sm:pt-48 md:pt-64 pb-24 sm:pb-48">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 animate-fade-in-up">
            <div className="flex-1 text-left space-y-8 sm:space-y-12">
              <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full border-2 border-emerald-500/40 bg-emerald-500/15 text-emerald-300 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] mb-4 shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all duration-500">
                Available for work <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-serif font-bold leading-[0.85] sm:leading-[0.8] tracking-tighter text-white">
                {NAME.split(' ').slice(0, 1)} <span className="gradient-text italic font-normal tracking-[-0.05em]">{NAME.split(' ').slice(1, 2)}</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-4xl text-slate-400 max-w-2xl font-medium leading-tight">
                <span className="text-white">Full-Stack Developer</span> building high-performance products across <span className="text-white">Web Development</span>, <span className="text-white">Mobile Apps</span>, and <span className="text-blue-500">AI Systems</span>.
              </p>
              
              <div className="flex flex-wrap gap-6 sm:gap-10 items-center pt-4 sm:pt-8">
                <button 
                  aria-label="Scroll to Featured Projects"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-10 sm:px-14 py-6 sm:py-8 bg-white text-black rounded-[2rem] sm:rounded-[2.5rem] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[11px] sm:text-[13px] hover:bg-blue-600 hover:text-white transition-all transform hover:scale-[1.05] active:scale-95 shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Featured Projects</span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Status Verified</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-2 tracking-widest uppercase whitespace-nowrap">Online Now <Activity className="w-3 h-3" /></span>
                </div>
              </div>
            </div>

            <div className="relative group shrink-0 w-full sm:w-auto mt-12 lg:mt-0">
               <div className="absolute inset-0 bg-blue-400/40 blur-[150px] sm:blur-[220px] rounded-full group-hover:bg-blue-300/70 transition-all duration-1000 animate-pulse"></div>
               <div className="absolute -inset-10 sm:-inset-20 bg-gradient-to-tr from-blue-500/40 via-purple-600/40 to-cyan-400/40 blur-[120px] opacity-70"></div>
               
               <div className="relative w-full max-w-[320px] sm:w-[480px] md:w-[540px] lg:w-[580px] aspect-square mx-auto rounded-[5rem] sm:rounded-[7.5rem] border-[3px] border-white/40 p-2 sm:p-2.5 bg-gradient-to-br from-white/20 via-blue-500/10 to-transparent backdrop-blur-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] transform hover:scale-[1.02] transition-all duration-700 will-change-transform">
                  <div className="w-full h-full rounded-[4.5rem] sm:rounded-[6.8rem] overflow-hidden relative">
                    <img 
                      src={PROFILE_IMAGE_URL} 
                      alt={NAME} 
                      fetchpriority="high"
                      decoding="async"
                      className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 brightness-[1.15] contrast-[1.05] saturate-[1.1]" 
                    />
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-24 sm:mt-32 flex justify-center animate-bounce opacity-20">
            <ChevronDown className="w-10 h-10" />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="container mx-auto px-4 sm:px-6 py-24 sm:py-48 border-t border-white/5 bg-[#000105]">
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24 sm:mb-40 gap-12 lg:gap-16">
                <div className="space-y-6 sm:space-y-8">
                   <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-serif font-bold italic leading-[0.8] tracking-tighter">Selected <span className="gradient-text italic font-normal">Works.</span></h2>
                   <p className="text-slate-500 text-lg sm:text-2xl font-medium max-w-xl leading-relaxed">A look at some of my recent web, mobile, and AI projects.</p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 p-3 sm:p-4 glass rounded-[2.5rem] sm:rounded-[3.5rem] border-white/10 shadow-2xl bg-white/5">
                   <button 
                      aria-label="Filter All Projects"
                      onClick={() => handleInterestSelect(null)}
                      className={`px-8 sm:px-12 py-4 sm:py-5 rounded-[2rem] sm:rounded-[2.5rem] text-[9px] sm:text-[11px] font-black uppercase tracking-widest transition-all transform active:scale-95 ${!selectedInterest ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-white'}`}
                   >
                      All
                   </button>
                   {INTERESTS.map(interest => (
                      <button
                         key={interest.id}
                         aria-label={`Filter by ${interest.label}`}
                         onClick={() => handleInterestSelect(interest.id)}
                         className={`px-8 sm:px-12 py-4 sm:py-5 rounded-[2rem] sm:rounded-[2.5rem] text-[9px] sm:text-[11px] font-black uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-3 ${selectedInterest === interest.id ? 'bg-blue-600 text-white shadow-2xl' : 'text-slate-500 hover:text-white'}`}
                      >
                         {interest.id === 'WEB' && <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />}
                         {interest.id === 'MOBILE' && <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />}
                         {interest.id === 'AI_SYSTEMS' && <BrainCircuit className="w-3 h-3 sm:w-4 sm:h-4" />}
                         {interest.label.split(' ')[0]}
                      </button>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {filteredProjects.map((project) => (
                    <div 
                        key={project.id} 
                        onClick={() => setActiveProject(project)}
                        className="group cursor-pointer relative transform transition-all duration-700 hover:-translate-y-2 sm:hover:-translate-y-4 will-change-transform"
                    >
                        <div className="relative h-[45vh] sm:h-[55vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 group-hover:border-blue-500/50 transition-all duration-700 shadow-3xl">
                           <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-1" 
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-8 sm:p-10 flex flex-col justify-end">
                              <div className="space-y-4">
                                 <div className="flex flex-wrap gap-2">
                                    <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-blue-500/20">{project.year}</span>
                                    <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/5">{project.tags[0]}</span>
                                 </div>
                                 <div className="flex justify-between items-end gap-4">
                                   <div className="flex-1 space-y-2">
                                      <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:translate-x-2 transition-transform duration-700 leading-none tracking-tighter">{project.title}</h3>
                                      {project.isSourceCodePrivate && (
                                        <p className="text-[9px] sm:text-[10px] font-semibold text-slate-300/85 tracking-wide">
                                          Built for client/company • Source code private due to NDA.
                                        </p>
                                      )}
                                   </div>
                                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center transform group-hover:rotate-12 hover:scale-110 transition-all duration-500 shadow-xl shrink-0">
                                      <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7" />
                                   </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                    </div>
                ))}
             </div>
           </div>
        </section>

        {/* HOW I BUILD SECTION */}
        <section id="tech-stack" className="container mx-auto px-4 sm:px-6 py-24 sm:py-64 bg-black border-y border-white/5 relative">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 sm:h-64 bg-gradient-to-b from-blue-500 to-transparent opacity-30"></div>
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col gap-16 sm:gap-24">
                <div className="max-w-4xl space-y-6 sm:space-y-8">
                   <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold italic leading-tight tracking-tighter text-white">How I<br/><span className="gradient-text italic font-normal">Build.</span></h2>
                   <p className="text-slate-400 text-lg sm:text-2xl leading-relaxed font-medium">I specialize in building reliable web applications, mobile apps, and smart AI systems.</p>
                </div>
                <TechStack isFuturistic={true} activeLens={null} />
             </div>
           </div>
        </section>

        {/* HOW I WORK SECTION */}
        <section id="about" className="container mx-auto px-4 sm:px-6 py-24 sm:py-64 bg-[#010208]">
           <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-48 items-center">
              <div className="space-y-12 sm:space-y-20">
                 <h2 className="text-6xl sm:text-8xl md:text-9xl font-serif font-bold italic leading-[0.85] sm:leading-[0.8] tracking-tighter text-white">How I<br/><span className="gradient-text italic font-normal">Work.</span></h2>
                 <p className="text-xl sm:text-3xl text-slate-300 leading-snug font-medium italic border-l-4 sm:border-l-8 border-blue-600 pl-6 sm:pl-12 py-3 sm:py-4">
                    "I believe in building software that is clean, fast, and easy to use. I focus on creating value through smart engineering and great design."
                 </p>
                 <div className="grid grid-cols-2 gap-8 sm:gap-16">
                    <div className="space-y-2 sm:space-y-4">
                       <span className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tighter">01_</span>
                       <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-slate-600">Plan & Design</p>
                    </div>
                    <div className="space-y-2 sm:space-y-4">
                       <span className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tighter">02_</span>
                       <p className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-slate-600">Build & Scale</p>
                    </div>
                 </div>
              </div>
              <div className="relative w-full max-w-[500px] mx-auto lg:max-w-none">
                 <div className="absolute inset-0 bg-blue-500/15 blur-[150px] sm:blur-[200px] rounded-full"></div>
                 <div className="relative glass p-8 sm:p-16 rounded-[3rem] sm:rounded-[6rem] border-white/10 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] transform hover:scale-105 transition-all duration-700">
                    <SkillsRadar />
                 </div>
              </div>
           </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="container mx-auto px-4 sm:px-6 py-24 sm:py-64 border-t border-white/5 bg-black">
           <div className="max-w-5xl mx-auto text-center space-y-16 sm:space-y-24">
              <h2 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-serif font-bold italic leading-none tracking-tighter text-white">Get In<br/><span className="gradient-text italic font-normal">Touch.</span></h2>
              
              {formState === 'success' ? (
                 <div className="p-16 sm:p-32 rounded-[3rem] sm:rounded-[6rem] bg-emerald-500/5 border border-emerald-500/20 animate-in zoom-in-95 duration-700">
                    <CheckCircle2 className="w-20 h-20 sm:w-32 sm:h-32 text-emerald-500 mx-auto mb-8 sm:mb-12 animate-bounce" />
                    <h3 className="text-4xl sm:text-6xl font-serif font-bold mb-4 sm:mb-6 text-white tracking-tighter">Message Sent.</h3>
                    <p className="text-slate-400 text-lg sm:text-2xl font-medium">Thanks for reaching out! I'll get back to you as soon as possible.</p>
                 </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-8 sm:space-y-12 text-left p-8 sm:p-16 md:p-32 glass rounded-[3rem] sm:rounded-[6rem] border-white/10 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.9)] relative bg-slate-900/40">
                    <div className="space-y-3 sm:space-y-4">
                       <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 ml-6 sm:ml-8">Your Name</label>
                       <input ref={nameRef} required type="text" placeholder="Full Name" className="w-full bg-slate-900/50 border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] px-8 sm:px-12 py-6 sm:py-8 focus:outline-none focus:border-blue-500 transition-all text-white text-lg sm:text-xl font-medium placeholder:text-slate-700" />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                       <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 ml-6 sm:ml-8">Email Address</label>
                       <input ref={emailRef} required type="email" placeholder="Email Address" className="w-full bg-slate-900/50 border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] px-8 sm:px-12 py-6 sm:py-8 focus:outline-none focus:border-blue-500 transition-all text-white text-lg sm:text-xl font-medium placeholder:text-slate-700" />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                       <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 ml-6 sm:ml-8">Phone (Optional)</label>
                       <input ref={phoneRef} type="tel" placeholder="Phone Number" className="w-full bg-slate-900/50 border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] px-8 sm:px-12 py-6 sm:py-8 focus:outline-none focus:border-blue-500 transition-all text-white text-lg sm:text-xl font-medium placeholder:text-slate-700" />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                       <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 ml-6 sm:ml-8">Your Message</label>
                       <textarea ref={messageRef} required placeholder="What would you like to build together?" rows={6} className="w-full bg-slate-900/50 border border-white/10 rounded-[2rem] sm:rounded-[3rem] px-8 sm:px-12 py-8 sm:py-10 focus:outline-none focus:border-blue-500 transition-all text-white text-lg sm:text-xl font-medium resize-none placeholder:text-slate-700"></textarea>
                    </div>
                    <button 
                        disabled={formState === 'sending'}
                        type="submit"
                        className="w-full py-8 sm:py-12 bg-white hover:bg-blue-600 text-black hover:text-white rounded-[2.5rem] sm:rounded-[3.5rem] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-xs sm:text-sm flex items-center justify-center gap-4 sm:gap-6 transition-all transform hover:scale-[1.01] active:scale-95 shadow-3xl disabled:opacity-50"
                    >
                        {formState === 'sending' ? <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin" /> : <>Send Message <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" /></>}
                    </button>
                </form>
              )}
           </div>
        </section>
      </main>

      <footer className="relative z-10 py-24 sm:py-52 bg-[#000105] w-full">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 sm:gap-24">
               <div className="flex items-center gap-6 sm:gap-8 group">
                  <div className="p-4 sm:p-6 bg-blue-600 rounded-2xl sm:rounded-3xl text-white transform group-hover:rotate-12 transition-transform shadow-3xl"><Cpu className="w-10 h-10 sm:w-14 sm:h-14" /></div>
                  <span className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase font-serif text-white">Prince<span className="text-blue-500">.</span>Dev</span>
               </div>
               <div className="flex gap-12 sm:gap-20">
                  <a aria-label="Github Profile" href={GITHUB_URL} className="text-slate-500 hover:text-white transition-all transform hover:scale-125"><Github className="w-10 h-10 sm:w-14 sm:h-14" /></a>
                  <a aria-label="Linkedin Profile" href={LINKEDIN_URL} className="text-slate-500 hover:text-blue-500 transition-all transform hover:scale-125"><Linkedin className="w-10 h-10 sm:w-14 sm:h-14" /></a>
                  <a aria-label="Twitter Profile" href={TWITTER_URL} className="text-slate-500 hover:text-blue-400 transition-all transform hover:scale-125"><Twitter className="w-10 h-10 sm:w-14 sm:h-14" /></a>
               </div>
            </div>
            <div className="mt-24 sm:mt-48 text-center border-t border-white/5 pt-12 sm:pt-20">
               <p className="text-[10px] sm:text-[13px] text-slate-800 uppercase tracking-[0.5em] sm:tracking-[1em] font-black">
                  PRINCE DEV © {new Date().getFullYear()} • ALL RIGHTS RESERVED
               </p>
            </div>
         </div>
      </footer>

      <SentinelPulse />
      <AIChatBot />
    </div>
  );
};

export default App;
