
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  PolarRadiusAxis,
  Tooltip
} from 'recharts';
import { SKILLS } from '../constants';
import { Sparkles } from 'lucide-react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass p-3 sm:p-5 rounded-xl sm:rounded-2xl border-blue-500/30 shadow-2xl animate-in zoom-in-95 duration-200 backdrop-blur-xl bg-black/80 max-w-[200px] sm:max-w-[240px]">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider sm:tracking-widest">{data.name}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed mb-3 sm:mb-4">
          {data.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] sm:text-[10px] font-black text-blue-400/70 tracking-wide sm:tracking-widest uppercase">Expertise Level</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-blue-400">{data.value}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000" 
            style={{ width: `${data.value}%` }}
          />
        </div>
      </div>
    );
  }
  return null;
};

const SkillsRadar: React.FC = () => {
  if (!SKILLS || SKILLS.length === 0) return null;

  return (
    <div className="w-full h-[400px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center relative group/radar">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)] opacity-50"></div>
        <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-[100px] sm:blur-[150px] animate-pulse"></div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius="85%" 
          data={SKILLS}
          margin={{ top: 55, right: 110, bottom: 75, left: 110 }}
        >
          {/* Circular Grid System for a cleaner "Scope" look */}
          <PolarGrid gridType="circle" stroke="#1e293b" strokeOpacity={0.8} strokeWidth={1} />
          
          <PolarAngleAxis 
            dataKey="name" 
            tick={(props) => {
              const { x, y, payload, index } = props;
              
              // Points: 0: WEB (Top), 1: MOBI (Bottom Right), 2: AI (Bottom Left)
              let dy = 0;
              let dx = 0;
              let textAnchor = "middle";

              if (index === 0) { // Top vertex (WEB)
                dy = -25;
              } else if (index === 1) { // Bottom Right vertex (MOBILE)
                dy = 30;
                dx = 35;
                textAnchor = "start";
              } else if (index === 2) { // Bottom Left vertex (AI)
                dy = 30;
                dx = -35;
                textAnchor = "end";
              }
              
              return (
                <text
                  x={x}
                  y={y}
                  dx={dx}
                  dy={dy}
                  textAnchor={textAnchor}
                  fill="#f1f5f9"
                  fontSize={16}
                  fontWeight={900}
                  className="font-serif italic select-none"
                  style={{ 
                    letterSpacing: '0.25em', 
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))',
                    paintOrder: 'stroke',
                    stroke: 'rgba(59,130,246,0.3)',
                    strokeWidth: '4px'
                  }}
                >
                  {payload.value}
                </text>
              );
            }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '10 10' }} 
            wrapperStyle={{ zIndex: 100 }}
          />
          <Radar
            name="Expertise"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={5}
            fill="url(#radarCoreGradient)"
            fillOpacity={0.8}
            animationBegin={0}
            animationDuration={1800}
            activeDot={{ 
              r: 10, 
              fill: '#fff', 
              stroke: '#3b82f6', 
              strokeWidth: 4, 
              className: 'drop-shadow-[0_0_20px_rgba(59,130,246,1)]' 
            }}
          />
          <defs>
            <linearGradient id="radarCoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.4}/>
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Centered Decorative Core Hub - Re-aligned to perfectly match origin */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center translate-y-[-1px]">
        {/* Outermost ring */}
        <div className="absolute w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 border border-blue-500/5 rounded-full animate-[spin_15s_linear_infinite]"></div>
        {/* Middle pulse ring */}
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 border-dashed border-blue-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
        {/* The Central Glow Heart */}
        <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 blur-[40px] sm:blur-[50px] rounded-full animate-pulse"></div>
            <div className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-blue-400/10 blur-[25px] sm:blur-[30px] rounded-full"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-[0_0_30px_10px_rgba(59,130,246,1)] sm:shadow-[0_0_50px_15px_rgba(59,130,246,1)] z-10 border-2 sm:border-4 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillsRadar;
