import React, { useState, useEffect, useRef } from 'react';
import { 
  WifiOff, 
  Radio, 
  Bot, 
  AlertTriangle, 
  RefreshCw,
  Info
} from 'lucide-react';
import { sound } from '../utils/sound';

export const BrainWavesSimulator: React.FC = () => {
  // State
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'reconnecting' | 'offline'>('connected');
  const [activeTab, setActiveTab] = useState<'visualizer' | 'architecture' | 'code'>('visualizer');
  
  // Cortex Basic Streams (0 to 100)
  const [metrics, setMetrics] = useState({
    engagement: 74,
    excitement: 42,
    stress: 28,
    focus: 81,
    relaxation: 63,
  });

  const [robotSpeech, setRobotSpeech] = useState<string>("User is highly focused. Maintaining steady interaction stance.");
  const [wavePoints, setWavePoints] = useState<number[]>([]);

  // Sine wave generator for dynamic brainwave visuals
  const timeRef = useRef(0);
  useEffect(() => {
    if (connectionStatus !== 'connected') {
      setWavePoints([]);
      return;
    }

    const interval = setInterval(() => {
      timeRef.current += 0.15;
      const t = timeRef.current;
      const points: number[] = [];
      const samples = 48;

      const primaryFreq = 0.3 + (metrics.focus / 100) * 0.4;
      const secondaryFreq = 0.8 + (metrics.excitement / 100) * 0.9;
      const noise = (metrics.stress / 100) * 8;

      for (let i = 0; i < samples; i++) {
        const val = 
          Math.sin(i * primaryFreq + t) * 18 +
          Math.sin(i * secondaryFreq - t * 1.5) * 10 +
          (Math.random() - 0.5) * noise;
        points.push(Math.round(val));
      }
      setWavePoints(points);
    }, 45);

    return () => clearInterval(interval);
  }, [connectionStatus, metrics]);

  // Update heuristic speech when metrics change
  useEffect(() => {
    if (connectionStatus === 'offline') {
      setRobotSpeech("TEMI OFFLINE: WebSocket stream unreachable. Retrying with exponential backoff...");
      return;
    }
    if (connectionStatus === 'reconnecting') {
      setRobotSpeech("HEURISTIC PAUSED: Cortex headset link dropped. Awaiting reconnection...");
      return;
    }

    if (metrics.focus > 75 && metrics.stress < 40) {
      setRobotSpeech("Heuristic: High Cognitive Engagement. Temi will remain stationary to prevent disturbance.");
    } else if (metrics.stress > 65) {
      setRobotSpeech("Heuristic: Elevated Stress detected. Temi softening speech volume and backing off 0.5m.");
    } else if (metrics.excitement > 70) {
      setRobotSpeech("Heuristic: Peak Excitement detected. Temi nodding head display in acknowledgment.");
    } else if (metrics.relaxation > 70) {
      setRobotSpeech("Heuristic: Relaxed Baseline. Temi entering conversational open-inquiry mode.");
    } else {
      setRobotSpeech("Heuristic: Nominal cognitive activity. Telepresence link stable at 60 Hz.");
    }
  }, [metrics, connectionStatus]);

  const handleMetricChange = (key: keyof typeof metrics, val: number) => {
    sound.playClick();
    setMetrics(prev => ({ ...prev, [key]: val }));
  };

  const handleStatusChange = (status: 'connected' | 'reconnecting' | 'offline') => {
    sound.playPop();
    setConnectionStatus(status);
  };

  return (
    <div className="relative rounded-3xl bg-[#0f0f13] border border-white/10 overflow-hidden shadow-2xl">
      {/* Top Specular Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2997ff]/40 to-transparent" />

      {/* Header bar */}
      <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02]">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#2997ff]/10 border border-[#2997ff]/20 text-[#2997ff]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white tracking-tight">
                BrainWaves / BrainBot Architecture Lab
              </h3>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.07] text-white/70 border border-white/10">
                11/11 Tests Passed
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Live interactive simulator of Augustus's typed WebSocket EEG transport & Temi robot speech pipeline
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08] self-start md:self-auto">
          <button
            onClick={() => { sound.playClick(); setActiveTab('visualizer'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'visualizer' 
                ? 'bg-white/15 text-white shadow-sm' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            Live Visualizer
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('architecture'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'architecture' 
                ? 'bg-white/15 text-white shadow-sm' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            System Topology
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('code'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code' 
                ? 'bg-white/15 text-white shadow-sm' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            Typed TS Schema
          </button>
        </div>
      </div>

      {/* Honest Framing Banner */}
      <div className="px-5 py-2.5 bg-[#ff9f0a]/10 border-b border-[#ff9f0a]/20 flex items-center justify-between text-xs text-[#ff9f0a]">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-[#ff9f0a]" />
          <span>
            <strong>Honest Framing:</strong> Mood output is a heuristic demonstration, not validated emotion detection. Basic Cortex streams only, no raw EEG.
          </span>
        </div>
        <span className="hidden lg:inline text-[11px] opacity-80">
          Hardware demo slated for Laurier Open House (Nov 11)
        </span>
      </div>

      {/* Main Interactive Content */}
      <div className="p-5 sm:p-7">
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            {/* Top Diagnostics & Connection state selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/50">Stream Transport State:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleStatusChange('connected')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      connectionStatus === 'connected'
                        ? 'bg-[#30d158]/20 text-[#30d158] border border-[#30d158]/40'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                    Connected (60 Hz)
                  </button>
                  <button
                    onClick={() => handleStatusChange('reconnecting')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      connectionStatus === 'reconnecting'
                        ? 'bg-[#ff9f0a]/20 text-[#ff9f0a] border border-[#ff9f0a]/40'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3 animate-spin text-[#ff9f0a]" />
                    Reconnecting
                  </button>
                  <button
                    onClick={() => handleStatusChange('offline')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      connectionStatus === 'offline'
                        ? 'bg-[#ff453a]/20 text-[#ff453a] border border-[#ff453a]/40'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <WifiOff className="w-3 h-3 text-[#ff453a]" />
                    Offline Diagnostic
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-white/40">
                Source: Emotiv EPOC X • Cortex API v2
              </div>
            </div>

            {/* Live Oscilloscope Waveform */}
            <div className="relative h-36 rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-4">
              {/* Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {connectionStatus === 'connected' ? (
                <div className="relative w-full h-full flex items-center justify-between">
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 60">
                    <defs>
                      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2997ff" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#64d2ff" stopOpacity="1" />
                        <stop offset="100%" stopColor="#2997ff" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <path
                      d={
                        wavePoints.length > 0
                          ? `M 0,30 ` +
                            wavePoints
                              .map((pt, i) => `L ${(i / (wavePoints.length - 1)) * 100},${30 + pt * 0.8}`)
                              .join(' ')
                          : 'M 0,30 L 100,30'
                      }
                      fill="none"
                      stroke="url(#waveGrad)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute top-2 right-3 text-[10px] font-mono text-[#64d2ff] bg-[#2997ff]/10 px-2 py-0.5 rounded border border-[#2997ff]/20">
                    SYNTHESIZED HARMONIC 4-30 Hz
                  </div>
                </div>
              ) : connectionStatus === 'reconnecting' ? (
                <div className="relative z-10 flex flex-col items-center gap-2 text-center text-[#ff9f0a]">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  <span className="text-xs font-medium">Re-establishing Cortex WebSocket pipeline...</span>
                  <span className="text-[11px] text-white/40">Clean unmount handler active</span>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col items-center gap-2 text-center text-[#ff453a]">
                  <AlertTriangle className="w-6 h-6" />
                  <span className="text-xs font-medium">Honest Offline State Active</span>
                  <span className="text-[11px] text-white/40">Explicit diagnostics rendered instead of a blank UI</span>
                </div>
              )}
            </div>

            {/* Cortex Basic Stream Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Engagement */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Engagement (met/eng)</span>
                  <span className="font-mono text-[#2997ff] font-semibold">{metrics.engagement}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics.engagement}
                  onChange={(e) => handleMetricChange('engagement', Number(e.target.value))}
                  disabled={connectionStatus !== 'connected'}
                  className="w-full accent-[#2997ff] cursor-pointer disabled:opacity-30"
                />
                <div className="text-[10px] text-white/40">Alpha/Beta band ratio</div>
              </div>

              {/* Excitement */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Excitement (met/exc)</span>
                  <span className="font-mono text-[#ff9f0a] font-semibold">{metrics.excitement}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics.excitement}
                  onChange={(e) => handleMetricChange('excitement', Number(e.target.value))}
                  disabled={connectionStatus !== 'connected'}
                  className="w-full accent-[#ff9f0a] cursor-pointer disabled:opacity-30"
                />
                <div className="text-[10px] text-white/40">High Beta short-term arousal</div>
              </div>

              {/* Stress */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Stress (met/str)</span>
                  <span className="font-mono text-[#ff453a] font-semibold">{metrics.stress}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics.stress}
                  onChange={(e) => handleMetricChange('stress', Number(e.target.value))}
                  disabled={connectionStatus !== 'connected'}
                  className="w-full accent-[#ff453a] cursor-pointer disabled:opacity-30"
                />
                <div className="text-[10px] text-white/40">Beta/Gamma tension index</div>
              </div>

              {/* Focus */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Focus (met/foc)</span>
                  <span className="font-mono text-[#30d158] font-semibold">{metrics.focus}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics.focus}
                  onChange={(e) => handleMetricChange('focus', Number(e.target.value))}
                  disabled={connectionStatus !== 'connected'}
                  className="w-full accent-[#30d158] cursor-pointer disabled:opacity-30"
                />
                <div className="text-[10px] text-white/40">Gamma cognitive vigilance</div>
              </div>

              {/* Relaxation */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70 font-medium">Relaxation (met/rel)</span>
                  <span className="font-mono text-[#bf5af2] font-semibold">{metrics.relaxation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={metrics.relaxation}
                  onChange={(e) => handleMetricChange('relaxation', Number(e.target.value))}
                  disabled={connectionStatus !== 'connected'}
                  className="w-full accent-[#bf5af2] cursor-pointer disabled:opacity-30"
                />
                <div className="text-[10px] text-white/40">Alpha baseline rhythm</div>
              </div>
            </div>

            {/* Robot Speech Output Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.03] to-[#2997ff]/[0.05] border border-white/10 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                <Bot className="w-5 h-5 text-[#2997ff]" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Temi Robot Speech Pipeline
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.08] text-white/50 font-mono">
                    MethodChannel Bridge
                  </span>
                </div>
                <p className="text-sm text-white/90 font-mono italic">
                  "{robotSpeech}"
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-[#2997ff]/20 text-[#2997ff] flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="text-sm font-semibold text-white">Emotiv EPOC X Headset</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Wireless EEG headset streaming Cortex Basic metrics (Engagement, Excitement, Stress, Focus, Relaxation). Augustus specifically bounds scope to Basic streams without claiming raw microvolt research arrays.
                </p>
                <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.08]">
                  Transport: Bluetooth LE &rarr; Cortex Service
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-[#30d158]/20 text-[#30d158] flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="text-sm font-semibold text-white">Laptop Orchestrator</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Vite + React 19 typed dashboard built under strict tsconfig. Employs <code className="text-white/80">src/services/websocket.ts</code> with robust unmount cleanup and explicit unavailable states.
                </p>
                <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.08]">
                  Transport: Typed WebSockets (JSON payload)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-[#bf5af2]/20 text-[#bf5af2] flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="text-sm font-semibold text-white">Temi Telepresence Robot</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Reflects computed heuristic mood through speech and physical responses. Interfaced via Android SDK & MethodChannel bridge with native TTS fallback.
                </p>
                <div className="text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.08]">
                  Action: Native TTS & Head tilt animation
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-white/50 leading-relaxed">
              <strong>Architecture Note:</strong> The pipeline purposefully disconnects emotion claims from raw neuroscience. Rather than promising mind-reading, Augustus engineered a clean transport layer with 11 passing automated unit tests, strict type boundaries, and graceful degradation during network drops.
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#09090c] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto space-y-2">
              <div className="text-white/40 text-[11px] pb-2 border-b border-white/[0.08] flex items-center justify-between">
                <span>EEGDashboard.tsx — Typed Props & Generics</span>
                <span className="text-[#30d158]">Strict TypeScript 5+</span>
              </div>
              <pre className="text-white/90">
{`// Augustus Vennam's Typed Cortex Stream Architecture
export type CortexMetric = 'eng' | 'exc' | 'str' | 'foc' | 'rel';

export interface CortexStreamPayload {
  timestamp: number;
  battery: number;
  signalQuality: number;
  metrics: Record<CortexMetric, number>;
}

export interface EEGDashboardProps {
  wsUrl: string;
  onMoodEstimate: (mood: HeuristicMood) => void;
  reconnectAttempts?: number;
}

// Clean lifecycle unmount cleanup preventing memory leaks
useEffect(() => {
  const wsService = new CortexWebSocketService(wsUrl);
  const unsubscribe = wsService.subscribe((payload: CortexStreamPayload) => {
    setStreamData(payload);
  });

  return () => {
    unsubscribe();
    wsService.disconnect(); // Safe socket shutdown
  };
}, [wsUrl]);`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
