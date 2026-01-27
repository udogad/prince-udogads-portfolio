
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
import { getPortfolioAssistantResponse } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';
import { CONTACT_EMAIL, NAME } from '../constants.tsx';

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
    { role: 'assistant', content: `Hi there! 👋 I'm Prince's Personal Assistant. I'm here to help you learn about his work and projects. What would you like to know?` }
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
      alert("Sorry, voice input isn't supported in your browser. Please try typing your message instead.");
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
    const title = `Meeting with ${NAME}: ${details.topic || 'Consultation'}`;
    const desc = `Name: ${details.guest_name || 'Visitor'}\nEmail: ${details.guest_email || 'Not provided'}\nTopic: ${details.topic}\n\nScheduled via Prince's Personal Assistant.`;
    const start = new Date().toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(desc)}&dates=${start}/${end}`;
    window.open(url, '_blank');
  };

  const downloadICS = (details: any) => {
    const title = `Meeting with ${NAME}: ${details.topic || 'Consultation'}`;
    const desc = `Name: ${details.guest_name || 'Visitor'}\\nEmail: ${details.guest_email || 'Not provided'}\\nTopic: ${details.topic}`;
    const start = new Date().toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, "");
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PrinceDev//Meeting//EN
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
    link.setAttribute('download', 'meeting_invite.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeRelay = (details: any) => {
    if (!details) return;
    const subject = encodeURIComponent(`Meeting Request from ${details.guest_name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Prince,\n\nSomeone would like to schedule a meeting with you via your portfolio website.\n\n` +
      `--- Meeting Details ---\n` +
      `Name: ${details.guest_name || 'Not provided'}\n` +
      `Email: ${details.guest_email || 'Not provided'}\n` +
      `Topic: ${details.topic || 'General consultation'}\n` +
      `Preferred Time: ${details.preferred_time || 'Not specified'}\n\n` +
      `Sent via Personal Assistant`
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

      // Check for tool calling response
      if (result.functionCalls && Array.isArray(result.functionCalls) && result.functionCalls.length > 0) {
        const scheduleCall = result.functionCalls.find(fc => fc.name === 'schedule_meeting');
        if (scheduleCall) {
          meetingDetails = scheduleCall.args;
        }
      } 
      
      // Fallback intent parsing
      if (!meetingDetails && botContent && (botContent.toLowerCase().includes("ui controls") || botContent.toLowerCase().includes("protocol prepared"))) {
        meetingDetails = {
          guest_name: "Visitor",
          topic: "Consultation Request",
          guest_email: ""
        };
      }

      if (meetingDetails) {
        botContent = botContent || `Great! I've prepared your meeting request. Just click the button below to send it to Prince.`;
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: botContent || "I'm here to help! What else would you like to know?",
        groundingLinks: groundingLinks,
        isMeetingRequest: !!meetingDetails,
        meetingDetails: meetingDetails as any
      }]);
    } catch (error) {
      console.error("Chat Handler Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Oops! Something went wrong. Please check your internet connection and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
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
        <div className="fixed md:relative bottom-0 left-0 right-0 md:bottom-auto md:left-auto md:right-auto w-full md:w-[450px] max-h-[85vh] md:max-h-none glass rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-blue-500/30">
          <div className="p-4 md:p-5 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              <span className="font-bold text-xs md:text-sm tracking-widest uppercase">Personal Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="h-[50vh] md:h-[450px] overflow-y-auto p-4 md:p-5 space-y-4 md:space-y-6 bg-[#030712]/50 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 md:p-4 rounded-2xl flex flex-col gap-2 md:gap-3 ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/5 shadow-inner'
                }`}>
                  <div className="flex gap-2">
                    {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-1 shrink-0 text-blue-400" />}
                    <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                  </div>

                  {msg.isMeetingRequest && msg.meetingDetails && (
                    <div className="mt-3 md:mt-4 p-3 md:p-5 rounded-2xl bg-blue-600/10 border border-blue-500/40 relative overflow-hidden animate-fade-in-up shadow-xl">
                      <div className="flex items-center gap-2 text-blue-400 font-black text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-[0.2em] mb-3 md:mb-4">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /> Meeting Request Ready
                      </div>
                      
                      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 relative z-10 bg-black/60 p-3 md:p-4 rounded-xl border border-white/10">
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] md:text-[9px] text-gray-500 font-mono uppercase">Your Name</span>
                          <span className="text-white text-xs font-bold break-words">{msg.meetingDetails.guest_name || 'Visitor'}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-[8px] md:text-[9px] text-gray-500 font-mono uppercase">What You'd Like to Discuss</span>
                          <span className="text-white text-xs font-bold break-words">{msg.meetingDetails.topic || 'General Consultation'}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => executeRelay(msg.meetingDetails)}
                          className="w-full py-3 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] flex items-center justify-center gap-2 md:gap-3 transition-all shadow-lg shadow-emerald-600/30"
                        >
                          Send Email to Prince <Mail className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => syncToGoogleCalendar(msg.meetingDetails)}
                            className="py-2 md:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[7px] md:text-[8px] font-black uppercase tracking-wide md:tracking-widest border border-white/10 flex items-center justify-center gap-1 md:gap-2 transition-all"
                          >
                            <Calendar className="w-3 h-3 text-blue-400" /> <span className="hidden sm:inline">Add to </span>Calendar
                          </button>
                          <button 
                            onClick={() => downloadICS(msg.meetingDetails)}
                            className="py-2 md:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[7px] md:text-[8px] font-black uppercase tracking-wide md:tracking-widest border border-white/10 flex items-center justify-center gap-1 md:gap-2 transition-all"
                          >
                            <Download className="w-3 h-3 text-amber-400" /> Download<span className="hidden sm:inline"> Invite</span>
                          </button>
                        </div>
                      </div>
                      
                      <p className="mt-3 md:mt-4 text-[7px] md:text-[8px] text-gray-400 text-center leading-relaxed font-mono opacity-80">
                        Note: Click the buttons above to complete your meeting request.
                      </p>
                    </div>
                  )}

                  {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                    <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-white/10 space-y-1.5 md:space-y-2">
                      <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-wide md:tracking-widest mb-1">Sources:</p>
                      {msg.groundingLinks.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[9px] md:text-[10px] text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/5 p-2 rounded-lg border border-blue-400/10 break-words"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" /> <span className="line-clamp-1">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5 flex gap-2 md:gap-3 shadow-inner">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-[10px] md:text-xs text-gray-400 font-mono tracking-tighter uppercase">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 md:p-5 bg-black/40 border-t border-white/10">
            <div className="relative flex items-center gap-2 md:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? "Listening..." : "Type your message..."}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl pl-3 md:pl-4 pr-10 md:pr-12 py-2.5 md:py-3.5 text-xs md:text-sm focus:outline-none focus:border-blue-500 transition-all`}
                />
                <button
                  onClick={toggleListening}
                  className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-xl transition-all ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Mic className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2.5 md:p-3.5 bg-blue-600 rounded-2xl hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;
