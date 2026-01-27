
import React from 'react';
import { Monitor, Smartphone, Database, BrainCircuit, ShieldCheck, Cpu, Cloud, Terminal, GitBranch } from 'lucide-react';
import { TECH_STACK } from '../constants';

interface TechStackProps {
  isFuturistic: boolean;
  activeLens: string | null;
}

const iconMap: Record<string, any> = {
  Monitor,
  Smartphone,
  Database,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  Terminal,
  GitBranch
};

const TechStack: React.FC<TechStackProps> = ({ isFuturistic, activeLens }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
      {TECH_STACK.map((group: any, idx) => {
        const Icon = iconMap[group.icon] || Cpu;
        const isActive = activeLens === group.lens || !activeLens;
        
        return (
          <div 
            key={group.category}
            className={`glass p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border transition-all duration-700 group/stack flex flex-col relative overflow-hidden h-full ${
              isActive 
                ? (isFuturistic ? 'border-blue-500/30 bg-blue-500/5 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.1)]' : 'border-black/10 bg-gray-50') 
                : 'opacity-40 grayscale blur-[1px] hover:blur-0 hover:grayscale-0 hover:opacity-100'
            }`}
          >
            {/* Ambient Pulse */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full group-hover/stack:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8 relative z-10">
              <div className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl ${isFuturistic ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg' : 'bg-black text-white'}`}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg leading-tight text-white">{group.category}</h3>
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/70 mt-1">Core Expertise 0{idx + 1}</div>
              </div>
            </div>

            <p className={`text-[11px] sm:text-[12px] mb-8 sm:mb-10 leading-relaxed font-medium relative z-10 h-auto sm:h-12 line-clamp-2 ${isFuturistic ? 'text-slate-400' : 'text-gray-600'}`}>
              {group.description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-auto relative z-10">
              {group.items.map((item: string) => (
                <span 
                  key={item}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] border transition-all duration-300 transform active:scale-95 ${
                    isFuturistic 
                      ? 'bg-white/5 border-white/5 text-slate-300 hover:border-blue-500/50 hover:text-white hover:bg-blue-600/10 shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-black hover:text-black shadow-sm'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            
            <div className={`mt-8 sm:mt-10 pt-5 sm:pt-6 border-t flex items-center justify-between group-hover/stack:opacity-100 transition-all duration-500 ${isFuturistic ? 'border-white/5 opacity-40' : 'border-gray-200'}`}>
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-600">Verified System</span>
              <div className="flex gap-1 sm:gap-1.5">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (idx + 1) ? 'bg-blue-500 animate-pulse' : 'bg-slate-800'}`} style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
