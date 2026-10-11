import { useState, useEffect } from 'react';
import { X, RefreshCw, AlertTriangle, ShieldCheck, Cpu, HardDrive, Wifi } from 'lucide-react';
import { FrameLoader } from '../services/FrameLoader';
import { TOTAL_FRAMES, formatFrameNumber } from '../utils/frameUrl';
import { FrameStatus } from '../types/engine';

interface DiagnosticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  loader: FrameLoader;
  currentFrame: number;
  onJumpToFrame: (frame: number) => void;
  fps: number;
}

export function DiagnosticsDrawer({
  isOpen,
  onClose,
  loader,
  currentFrame,
  onJumpToFrame,
  fps,
}: DiagnosticsDrawerProps) {
  const [statuses, setStatuses] = useState<FrameStatus[]>(() => loader.getAllStatuses());
  const [inFlightCount, setInFlightCount] = useState(() => loader.getInFlightCount());
  const [loadedCount, setLoadedCount] = useState(() => loader.getCacheSize());
  const [failedCount, setFailedCount] = useState(() => loader.getFailedCount());
  const [concurrency, setConcurrency] = useState(() => loader.getConfig().concurrencyLimit);
  const [simSlow, setSimSlow] = useState(false);
  const [simMissing, setSimMissing] = useState(false);
  const [assetVerificationStatus, setAssetVerificationStatus] = useState<
    'idle' | 'checking' | 'found' | 'not-found'
  >('idle');

  // Network Information state
  const [effectiveType, setEffectiveType] = useState('4g (detected)');
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      };
      if (nav.connection?.effectiveType) {
        setEffectiveType(nav.connection.effectiveType);
      }
      if (nav.connection?.saveData) {
        setSaveData(nav.connection.saveData);
      }
    }
  }, []);

  // Subscribe to FrameLoader updates
  useEffect(() => {
    const unsubscribe = loader.subscribe(() => {
      setStatuses(loader.getAllStatuses());
      setInFlightCount(loader.getInFlightCount());
      setLoadedCount(loader.getCacheSize());
      setFailedCount(loader.getFailedCount());
    });
    return unsubscribe;
  }, [loader]);

  if (!isOpen) return null;

  // Approximate memory calculation (assuming ~120KB per frame JPEG or ~1.5MB decoded in GPU)
  const estimatedMB = (loadedCount * 1.2).toFixed(1);

  const handleVerifyAssets = async () => {
    setAssetVerificationStatus('checking');
    try {
      const res = await fetch('/images/ezgif-frame-001.jpg', { method: 'HEAD' });
      if (res.ok) {
        setAssetVerificationStatus('found');
      } else {
        setAssetVerificationStatus('not-found');
      }
    } catch {
      setAssetVerificationStatus('not-found');
    }
  };

  const handleToggleSlow = () => {
    loader.isSimulatingSlowNetwork = !simSlow;
    setSimSlow(!simSlow);
  };

  const handleToggleMissing = () => {
    loader.isSimulatingMissingAssets = !simMissing;
    setSimMissing(!simMissing);
  };

  const handleConcurrencyChange = (val: number) => {
    setConcurrency(val);
    loader.setConcurrency(val);
  };

  const handlePurge = () => {
    loader.purgeCache();
    setAssetVerificationStatus('idle');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Engine Diagnostics"
      className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-zinc-950/95 backdrop-blur-2xl border-l border-zinc-800 shadow-2xl flex flex-col overflow-hidden text-zinc-100"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-semibold text-white">Engine Diagnostics & Inspector</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">[ESC / D to close]</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close diagnostics drawer"
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">FPS / RENDERING</span>
            <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              {fps || 60} <span className="text-xs text-zinc-400 font-normal">fps</span>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">IN-FLIGHT</span>
            <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
              {inFlightCount} <span className="text-xs text-zinc-400 font-normal">active</span>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">CACHED FRAMES</span>
            <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {loadedCount} <span className="text-xs text-zinc-400 font-normal">/ {TOTAL_FRAMES}</span>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
            <span className="text-[11px] font-mono text-zinc-400 block mb-1">EST. MEMORY</span>
            <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">
              {estimatedMB} <span className="text-xs text-zinc-400 font-normal">MB</span>
            </div>
          </div>
        </div>

        {/* 195 Frame Matrix Map */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-200">195-Frame State Ribbon</span>
            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Loaded
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" /> In-Flight
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-zinc-700 inline-block" /> Idle
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-rose-500 inline-block" /> Failed
              </span>
            </div>
          </div>

          {/* Matrix Cells */}
          <div className="grid grid-cols-15 sm:grid-cols-20 gap-1 p-2 bg-zinc-950/80 rounded-lg max-h-48 overflow-y-auto">
            {statuses.map((status, index) => {
              const frameNum = index + 1;
              const isCurrent = frameNum === currentFrame;

              let bgClass = 'bg-zinc-800';
              if (status === 'loaded') bgClass = 'bg-emerald-500';
              else if (status === 'loading') bgClass = 'bg-amber-400 animate-pulse';
              else if (status === 'failed') bgClass = 'bg-rose-500/80';

              return (
                <button
                  key={frameNum}
                  type="button"
                  onClick={() => onJumpToFrame(frameNum)}
                  title={`Frame ${formatFrameNumber(frameNum)}: ${status}${isCurrent ? ' (Active)' : ''}`}
                  className={`h-4.5 rounded-xs transition-all relative cursor-pointer ${bgClass} ${
                    isCurrent ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-zinc-950 scale-110 z-10' : 'hover:opacity-80'
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Frame 001</span>
            <span>Active: #{formatFrameNumber(currentFrame)}</span>
            <span>Frame 195</span>
          </div>
        </div>

        {/* Live Simulation & Network Controls */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-200">Network & Concurrency Tuning</h3>

          {/* Concurrency slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">Concurrent In-Flight Limit</span>
              <span className="font-mono text-cyan-400 font-semibold">{concurrency} requests</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={concurrency}
              onChange={(e) => handleConcurrencyChange(parseInt(e.target.value, 10))}
              aria-label="Adjust in-flight concurrency limit"
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[11px] text-zinc-400 block">
              Default is 5. Lowers automatically on 2G/3G or Save-Data to protect bandwidth.
            </span>
          </div>

          {/* Simulation Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={handleToggleSlow}
              className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                simSlow
                  ? 'bg-amber-950/40 border-amber-600 text-amber-200'
                  : 'bg-zinc-800/50 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>Simulate Slow 3G</span>
                <span className="font-mono text-[10px]">{simSlow ? 'ON' : 'OFF'}</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Adds +350ms artificial latency per frame to test progressive buffering.
              </p>
            </button>

            <button
              type="button"
              onClick={handleToggleMissing}
              className={`p-3 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                simMissing
                  ? 'bg-rose-950/40 border-rose-600 text-rose-200'
                  : 'bg-zinc-800/50 border-zinc-700/60 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>Simulate Missing Assets</span>
                <span className="font-mono text-[10px]">{simMissing ? 'ON' : 'OFF'}</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Forces frame 404s to verify nearest-neighbor fallback reliability.
              </p>
            </button>
          </div>

          {/* Purge Cache Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handlePurge}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Purge Cache & Restart Anchor</span>
            </button>
          </div>
        </div>

        {/* Asset Drop Instructions & Live Test */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-200">Asset Verification Guide</h3>
            <span className="text-[11px] font-mono text-cyan-400">Target: /public/images/</span>
          </div>

          <div className="p-3 bg-zinc-950/80 rounded-lg text-xs font-mono space-y-1.5 text-zinc-300 border border-zinc-800/60">
            <div className="text-zinc-400">// Expected filenames:</div>
            <div>ezgif-frame-001.jpg</div>
            <div>ezgif-frame-002.jpg</div>
            <div className="text-zinc-400">...</div>
            <div>ezgif-frame-195.jpg</div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleVerifyAssets}
              disabled={assetVerificationStatus === 'checking'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition-colors cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {assetVerificationStatus === 'checking'
                  ? 'Checking server...'
                  : 'Check /images/ezgif-frame-001.jpg'}
              </span>
            </button>

            {assetVerificationStatus === 'found' && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                Assets detected on server
              </span>
            )}
            {assetVerificationStatus === 'not-found' && (
              <span className="text-xs text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Awaiting manual file drop
              </span>
            )}
          </div>
        </div>

        {/* Network & Device Info */}
        <div className="p-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl text-xs space-y-2 text-zinc-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-zinc-400" />
              Network Type:
            </span>
            <span className="font-mono text-zinc-200">{effectiveType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
              Save-Data Mode:
            </span>
            <span className="font-mono text-zinc-200">{saveData ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-zinc-400" />
              Failed / 404 Frames:
            </span>
            <span className="font-mono text-zinc-200">{failedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
