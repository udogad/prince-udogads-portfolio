
import React, { useState, useEffect, useCallback } from 'react';
import { Activity, Shield, Globe, Terminal, X, Zap, MapPin, UserCheck, RefreshCw, Camera, Save, Info, Bell, Settings } from 'lucide-react';
import { SENTINEL_WEBHOOK_URL, NAME, PROFILE_IMAGE_URL } from '../constants.tsx';

interface AccessLog {
  id: string;
  timestamp: string;
  hash: string;
  device: string;
  location: string;
  status: 'AUTHORIZED' | 'PENDING' | 'REJECTED';
  isGpsVerified?: boolean;
}

const SentinelPulse: React.FC = () => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'logs' | 'identity' | 'config'>('logs');
  
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedLogs = localStorage.getItem('sentinel_access_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        localStorage.removeItem('sentinel_access_logs');
      }
    }

    const customImg = localStorage.getItem('prince_custom_profile_img');
    if (customImg) setTempImageUrl(customImg);
  }, []);

  const trackVisit = useCallback(async (isManualVerify = false) => {
    const userAgent = navigator.userAgent;
    const device = /mobile/i.test(userAgent) ? 'Mobile Device' : 'Desktop Computer';
    const hash = window.location.hash || '#home';
    
    let location = 'Location Hidden';
    let isGpsVerified = false;

    if (isManualVerify) {
      setIsVerifying(true);
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        location = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`;
        isGpsVerified = true;
      } catch (e) {}
      setIsVerifying(false);
    }

    if (!isGpsVerified) {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          location = `${data.city || 'Unknown City'}, ${data.country_name || 'Somewhere'}`;
        }
      } catch (e) {}
    }

    const newLog: AccessLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      hash: hash.replace('#', '').toUpperCase() || 'HOME',
      device,
      location,
      status: isGpsVerified ? 'AUTHORIZED' : 'PENDING',
      isGpsVerified
    };

    setLogs(prevLogs => {
      const updated = [newLog, ...prevLogs].slice(0, 50);
      localStorage.setItem('sentinel_access_logs', JSON.stringify(updated));
      return updated;
    });

    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 2000);

    if (SENTINEL_WEBHOOK_URL) {
      try {
        await fetch(SENTINEL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Sentinel',
            embeds: [{
              title: isGpsVerified ? "Verified Visitor Detected" : "New Visitor Alert",
              color: isGpsVerified ? 0x10b981 : 0x3b82f6,
              fields: [
                { name: "Device", value: device, inline: true },
                { name: "Location", value: location, inline: true },
                { name: "Viewing", value: newLog.hash, inline: true }
              ],
              footer: { text: `Prince's Portfolio Sentinel` }
            }]
          })
        });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    trackVisit(false);
    const handleHash = () => trackVisit(false);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [trackVisit]);

  const handleSaveIdentity = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('prince_custom_profile_img', tempImageUrl);
      setIsSaving(false);
      window.dispatchEvent(new Event('profile-img-updated'));
    }, 1000);
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 sm:bottom-24 left-4 sm:left-6 z-[45] flex items-center gap-2 sm:gap-3 cursor-pointer group"
      >
        <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl glass border transition-all duration-500 ${pulseActive ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'border-white/10'}`}>
          <Activity className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${pulseActive ? 'text-blue-400' : 'text-blue-500 group-hover:text-blue-400'}`} />
        </div>
        <div className="hidden sm:flex flex-col opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">Sentinel Online</span>
          <span className="text-[10px] font-mono text-gray-500">Waiting for signals...</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="w-full max-w-2xl glass rounded-2xl sm:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
            <div className="p-4 sm:p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-blue-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-600/20">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Command Center</h2>
                  <div className="flex gap-3 sm:gap-6 mt-1 sm:mt-2">
                    <button onClick={() => setActiveTab('logs')} className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors ${activeTab === 'logs' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>Activity</button>
                    <button onClick={() => setActiveTab('identity')} className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors ${activeTab === 'identity' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>Identity</button>
                    <button onClick={() => setActiveTab('config')} className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-colors ${activeTab === 'config' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}>Alerts</button>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors hover:scale-110">
                <X className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-black/40">
              {activeTab === 'logs' && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-blue-500/5 border border-white/5 mb-4 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                    <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">The system is currently monitoring visitor signals. To verify your own location as the owner, use the button.</p>
                    <button 
                      onClick={() => trackVisit(true)}
                      disabled={isVerifying}
                      className="shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wide sm:tracking-widest rounded-lg sm:rounded-xl transition-all shadow-lg shadow-blue-600/20"
                    >
                      {isVerifying ? <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" /> : <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />}
                      Verify Now
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {logs.length === 0 ? (
                      <div className="text-center py-12 sm:py-20 text-gray-600 font-mono text-[10px] sm:text-xs italic">No signals detected yet...</div>
                    ) : logs.map((log) => (
                      <div key={log.id} className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 group">
                        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
                          <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${log.isGpsVerified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-gray-100 truncate">{log.location}</span>
                              <span className={`text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full font-black tracking-tighter ${log.isGpsVerified ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600/20 text-blue-400'}`}>
                                {log.isGpsVerified ? 'SECURE' : 'PENDING'}
                              </span>
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-2 sm:gap-3 mt-1 sm:mt-1.5 flex-wrap">
                              <span className="font-mono truncate">{log.device}</span>
                              <span className="opacity-30 hidden sm:inline">|</span>
                              <span className="text-blue-500/70 font-black truncate">VIEWING: {log.hash}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-gray-600 group-hover:text-blue-400 transition-colors">[{log.timestamp}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'identity' && (
                <div className="space-y-10">
                  <div className="flex items-start gap-6 p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10">
                    <Camera className="w-10 h-10 text-amber-500 shrink-0" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-amber-500">Update Profile Picture</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Update the professional headshot shown across the entire portfolio. Simply paste a link to your image below.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Image Link (Direct URL)</label>
                      <input 
                        type="text" 
                        value={tempImageUrl}
                        onChange={(e) => setTempImageUrl(e.target.value)}
                        placeholder="https://your-website.com/photo.jpg" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-blue-500 transition-all text-white font-mono text-xs" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Live Preview</label>
                         <div className="aspect-square rounded-[2rem] border-2 border-white/5 bg-white/5 overflow-hidden flex items-center justify-center relative shadow-2xl">
                            {tempImageUrl ? (
                              <img src={tempImageUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="w-16 h-16 text-white/5" />
                            )}
                         </div>
                      </div>
                      <div className="flex flex-col justify-end gap-6 pb-2">
                         <p className="text-[11px] text-gray-500 leading-relaxed italic opacity-80">
                           Professional images improve visual authority. Changes are stored in your browser's memory.
                         </p>
                         <button 
                          onClick={handleSaveIdentity}
                          disabled={isSaving || !tempImageUrl}
                          className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/30"
                         >
                           {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                           Update Portfolio
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'config' && (
                <div className="space-y-10">
                  <div className="flex items-start gap-6 p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
                    <Bell className="w-10 h-10 text-indigo-400 shrink-0" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-indigo-400">Mobile Notifications</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Want to be notified on your phone when someone visits your site? Follow the steps below.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8 bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
                    <div className="space-y-6">
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">1</div>
                        <div>
                          <p className="font-bold mb-1">Create a Discord or Slack Webhook</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed">Go to your channel settings and create a new Webhook URL. It only takes 30 seconds!</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">2</div>
                        <div>
                          <p className="font-bold mb-1">Connect to Code</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed">Open <code className="bg-black/50 px-2 py-0.5 rounded text-blue-400">constants.tsx</code> and paste that URL into the <code className="text-blue-400">SENTINEL_WEBHOOK_URL</code> field.</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs shrink-0">3</div>
                        <div>
                          <p className="font-bold mb-1">Stay Notified</p>
                          <p className="text-[11px] text-gray-500 leading-relaxed">You will now receive a push notification on your device every time someone explores your work!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center gap-4">
                    <Settings className="w-5 h-5 text-blue-400" />
                    <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Notification Engine: {SENTINEL_WEBHOOK_URL ? 'CONNECTED' : 'LOCAL_ONLY'}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-black/60 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-500/70 uppercase">System Status: Optimal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Live Matrix Sync</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SentinelPulse;
