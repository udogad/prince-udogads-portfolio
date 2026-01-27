
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Loader2, 
  Mic, 
  MicOff, 
  ExternalLink,
  CheckCircle2,
  Mail,
  Zap,
  Calendar,
  Download,
  Share2
} from 'lucide-react';
// Fix: Corrected import path for geminiService assuming this file is at root level.
import { getPortfolioAssistantResponse } from './services/geminiService.ts';
import { ChatMessage } from './types.ts';
import { CONTACT_EMAIL, NAME } from './constants.tsx';

interface ExtendedChatMessage extends ChatMessage {
  groundingLinks?: { title: string; uri: string }[];
  isMeetingRequest?: boolean;
  meetingDetails?: {
    guest_name: string;
    topic: string;
    preferred_time?: string;
    guest_email: string;
  };
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    { role: 'assistant', content: `Greetings. I am Prince's Personal Assistant. How can I facilitate your investigation into his engineering and AI systems today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          if (event.results && event.results.length > 0) {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
          }
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    } catch (e) {
      console.warn("Speech recognition initialization failed:", e);
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech recognition start failure:", e);
        setIsListening(false);
      }
    }
  };

  const syncToGoogleCalendar = (details: any) => {
    const title = `[Protocol] Meeting with ${NAME}: ${details.topic || 'Consultation'}`;
    const desc = `Guest: ${details.guest_name || 'Visitor'}\nEmail: ${details.guest_email || 'Not provided'}\nObjective: ${details.topic}\n\nInitiated via Prince's Personal Assistant.`;
    const start = new Date().toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(desc)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  const downloadICS = (details: any) => {
    const title = `Meeting with ${NAME}: ${details.topic || 'Consultation'}`;
    const desc = `Guest: ${details.guest_name || 'Visitor'}\\nEmail: ${details.guest_email || 'Not provided'}\\nObjective: ${details.topic}`;
    const start = new Date().toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, "");
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PrinceDev//Protocol//EN
BEGIN:VEVENT
UID:${Date.now()}@prince.dev
DTSTAMP:${start}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${desc}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'meeting_protocol.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeRelay = (details: any) => {
    if (!details) return;
    const subject = encodeURIComponent(`[Protocol] Meeting Request from ${details.guest_name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Prince,\n\nI have authorized a professional meeting request via your Portfolio Personal Assistant.\n\n` +
      `--- PROTOCOL BRIEF ---\n` +
      `Guest Name: ${details.guest_name || 'Pending'}\n` +
      `Contact: ${details.guest_email || 'Pending'}\n` +
      `Objective: ${details.topic || 'Consultation'}\n` +
      `Proposed Window: ${details.preferred_time || 'Pending review'}\n\n` +
      `Assistant Status: Verified`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSend = async () => {
    const userMsg = input.trim();
    if (!userMsg || isLoading) return;

    const historyToPass = [...messages];
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const result = await getPortfolioAssistantResponse(userMsg, historyToPass);
      
      const groundingLinks = result.groundingChunks
        ?.map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri)
        .map((web: any) => ({ title: web.title || 'Source', uri: web.uri }));

      let botContent = result.text;
      let meetingDetails = null;

      // Primary check for structured tool call with null safety
      if (result.functionCalls && Array.isArray(result.functionCalls) && result.functionCalls.length > 0) {
        const scheduleCall = result.functionCalls.find(fc => fc.name === 'schedule_meeting');
        if (scheduleCall) {
          meetingDetails = scheduleCall.args;
        }
      } 
      
      // Fallback: If model mentions "UI controls" or "protocol prepared" in text but didn't emit a tool call, 
      // we attempt to parse intent to ensure the UI is visible.
      if (!meetingDetails && botContent && (botContent.toLowerCase().includes("ui controls") || botContent.toLowerCase().includes("protocol prepared"))) {
        meetingDetails = {
          guest_name: "Visitor",
          topic: "Consultation Request",
          guest_email: ""
        };
      }

      if (meetingDetails) {
        botContent = botContent || `Protocol prepared. I have synthesized the brief for your request. Please finalize the secure transmission to Prince's primary channel below.`;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: botContent || "The personal database did not return a textual response, but I am standing by for your next instruction.",
        groundingLinks: groundingLinks,
        isMeetingRequest: !!meetingDetails,
        meetingDetails: meetingDetails as any
      }]);
    } catch (error) {
      console.error("Chat Handler Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I encountered a synchronization error while processing that query. Please check your network protocol." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 group outline-none"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
            Personal Assistant
          </span>
        </button>
      ) : (
        <div className="w-80 md:w-[450px] glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-500/30">
          <div className="p-5 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-sm tracking-widest uppercase">Personal Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="h-[450px] overflow-y-auto p-5 space-y-6 bg-[#030712]/50 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl flex flex-col gap-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5 shadow-inner'
                }`}>
                  <div className="flex gap-2">
                    {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-1 shrink-0 text-blue-400" />}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>

                  {msg.isMeetingRequest && msg.meetingDetails && (
                    <div className="mt-4 p-5 rounded-2xl bg-blue-600/10 border border-blue-500/40 relative overflow-hidden animate-fade-in-up shadow-xl">
                      <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                        <CheckCircle2 className="w-4 h-4" /> Protocol Prepared
                      </div>
                      
                      <div className="space-y-3 mb-6 relative z-10 bg-black/60 p-4 rounded-xl border border-white/10">
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-gray-500 font-mono uppercase">Guest Entity</span>
                          <span className="text-white text-xs font-bold">{msg.meetingDetails.guest_name || 'Authorized Visitor'}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-gray-500 font-mono uppercase">Topic Brief</span>
                          <span className="text-white text-xs font-bold">{msg.meetingDetails.topic || 'General Consultation'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => executeRelay(msg.meetingDetails)}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-600/30"
                        >
                          Notify Prince via Email <Mail className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => syncToGoogleCalendar(msg.meetingDetails)}
                            className="py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[8px] font-black uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 transition-all"
                          >
                            <Calendar className="w-3 h-3 text-blue-400" /> Google Sync
                          </button>
                          <button 
                            onClick={() => downloadICS(msg.meetingDetails)}
                            className="py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[8px] font-black uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 transition-all"
                          >
                            <Download className="w-3 h-3 text-amber-400" /> .ICS Brief
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-4 text-[8px] text-gray-400 text-center leading-relaxed font-mono opacity-80">
                        Note: Full synchronization requires manual confirmation using the buttons above.
                      </p>
                    </div>
                  )}

                  {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Verified Sources:</p>
                      {msg.groundingLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[10px] text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/5 p-2 rounded-lg border border-blue-400/10"
                        >
                          <ExternalLink className="w-3 h-3" /> {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 shadow-inner">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-xs text-gray-400 font-mono tracking-tighter uppercase">Querying Matrix...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-black/40 border-t border-white/10">
            <div className="relative flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Listening to audio..." : "Initiate query..."}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-blue-500 transition-all`}
                />
                <button
                  onClick={toggleListening}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3.5 bg-blue-600 rounded-2xl hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
