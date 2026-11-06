import React from 'react';

// Animated Soundwave for when microphone is active
export const Waveform: React.FC = () => (
  <div className="flex items-center justify-center space-x-1 h-8 my-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="w-1 bg-amber-500 rounded-full animate-noor-bar"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// Tap-to-talk Mic Button
interface MicProps { isActive: boolean; onClick: () => void; }
export const MicButton: React.FC<MicProps> = ({ isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
      isActive 
        ? 'bg-red-500 text-white scale-105 ring-4 ring-red-200' 
        : 'bg-amber-500 text-white hover:bg-amber-600'
    }`}
  >
    <span className="text-xl font-bold">{isActive ? "🛑" : "🎙️"}</span>
  </button>
);

// Milestone Completion Ring Tracker
interface RingProps { progress: number; size: number; strokeWidth: number; }
export const ProgressRing: React.FC<RingProps> = ({ progress, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E4E4E7" strokeWidth={strokeWidth} fill="transparent" />
      <circle
        cx={size / 2} cy={size / 2} r={radius} stroke="#F59E0B" strokeWidth={strokeWidth} fill="transparent"
        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
};

// Success Pop-Up Message Box
interface ToastProps { message: string; onClose: () => void; }
export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  React.useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl z-50">
      {message}
    </div>
  );
};

// Layout Background Aesthetics
export const StarField: React.FC = () => <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 to-transparent pointer-events-none" />;
export const Lattice: React.FC = () => <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />;
