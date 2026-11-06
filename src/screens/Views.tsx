import React, { useState } from 'react';
import { useAppStore } from '../store';
import { alignTexts } from '../lib/align';
import { startSpeechRecognition, stopSpeechRecognition } from '../lib/speech';
import { calculateFeasibility } from '../lib/plan';
import { AyahSurface } from '../components/Ayah';
import { MicButton, Waveform, ProgressRing, Toast } from '../components/bits';

// === 1. RECITE VIEW WITH WORD LIGHTING ===
export const Recite: React.FC = () => {
  const { currentSurah, currentAyahIndex, quranCache, addStreakCredit } = useAppStore();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [alignedWords, setAlignedWords] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const ayahData = quranCache[currentSurah]?.ayahs?.[currentAyahIndex];
  const targetText = ayahData?.text || '';

  const handleToggleListening = async () => {
    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
      const alignment = alignTexts(targetText, transcript);
      setAlignedWords(alignment.words);
      if (alignment.score > 0.75) {
        addStreakCredit();
        setToastMessage("Excellent Recitation! Streak updated +1");
      }
    } else {
      setTranscript('');
      setIsListening(true);
      try {
        await startSpeechRecognition((text: string) => {
          setTranscript(text);
          const alignment = alignTexts(targetText, text);
          setAlignedWords(alignment.words);
        });
      } catch {
        setIsListening(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-6 max-w-xl mx-auto justify-between">
      <div className="text-center p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur mt-4">
        <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold">Surah {currentSurah} • Ayah {currentAyahIndex + 1}</span>
        <div className="mt-4 dir-rtl text-3xl font-quran text-zinc-900 dark:text-zinc-50 leading-loose">
          <AyahSurface words={alignedWords.length ? alignedWords : (ayahData?.words || [])} mode="recite" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-6 space-y-4 flex-grow">
        {isListening && <Waveform />}
        <MicButton isActive={isListening} onClick={handleToggleListening} />
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};

// === 2. AUDIO LISTEN VIEW ===
export const Listen: React.FC = () => {
  const { currentSurah, quranCache } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const surahData = quranCache[currentSurah];

  return (
    <div className="flex flex-col space-y-6 p-4 max-w-xl mx-auto h-full justify-between">
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">{surahData?.name || `Surah ${currentSurah}`}</h2>
        <p className="text-xs text-zinc-400 mt-1">Audio Streaming Tracker</p>
      </div>
      <div className="flex flex-col items-center justify-center my-auto space-y-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <ProgressRing progress={isPlaying ? 75 : 0} size={192} strokeWidth={6} />
          <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-4 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md text-sm font-semibold">
            {isPlaying ? "Pause" : "Play Audio"}
          </button>
        </div>
        {isPlaying && <Waveform />}
      </div>
    </div>
  );
};

// === 3. INTERACTIVE TEACHER PANEL ===
export const Lesson: React.FC = () => {
  const { preferredTeacher } = useAppStore();
  return (
    <div className="flex flex-col space-y-6 p-4 max-w-xl mx-auto h-full">
      <div className="flex items-center space-x-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 mt-4 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl border-2 border-amber-500 shadow-sm">
          {preferredTeacher === 'female' ? "👩‍🏫" : "👨‍🏫"}
        </div>
        <div>
          <h3 className="text-md font-bold">Interactive Preceptor</h3>
          <p className="text-xs text-zinc-400">Ready to audit your pronunciation and layout details.</p>
        </div>
      </div>
    </div>
  );
};

// === 4. MILESTONE PLANNER SLIDER ===
export const Plan: React.FC = () => {
  const { currentPlan, setPlan } = useAppStore();
  const [pages, setPages] = useState(currentPlan?.totalPages || 30);
  const [days, setDays] = useState(currentPlan?.targetDays || 60);
  const verdict = calculateFeasibility({ totalPages: pages, targetDays: days });

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-xl mx-auto h-full overflow-y-auto pb-24">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl space-y-4 mt-4 shadow-sm">
        <label className="block text-xs font-bold text-zinc-400 tracking-wider">TARGET Hifz PAGES ({pages})</label>
        <input type="range" min="1" max="604" value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-amber-500" />
        <label className="block text-xs font-bold text-zinc-400 tracking-wider">DEADLINE TIMELINE ({days} DAYS)</label>
        <input type="range" min="7" max="1000" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-amber-500" />
      </div>
      <div className={`p-4 rounded-xl text-center border font-medium ${
        verdict.band === 'feasible' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <span className="text-xs font-bold uppercase tracking-wider block">Verdict Plan: {verdict.band}</span>
        <span className="text-2xl font-black">{verdict.pagesPerDay.toFixed(2)} Pages / Day</span>
      </div>
      <button onClick={() => setPlan({ totalPages: pages, targetDays: days, feasibility: verdict.band, dailyPageTarget: verdict.pagesPerDay })} className="w-full py-3 bg-zinc-900 text-white rounded-xl text-sm font-medium active:scale-[0.98] transition-transform">
        Save Target Roadmap
      </button>
    </div>
  );
};
