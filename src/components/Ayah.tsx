import React from 'react';

interface Word { ar: string; matched: boolean; hidden?: boolean; }
interface AyahSurfaceProps { words: Word[]; mode: 'recite' | 'listen'; }

export const AyahSurface: React.FC<AyahSurfaceProps> = ({ words }) => {
  return (
    <div className="flex flex-wrap flex-row-reverse justify-center gap-x-3 gap-y-4 px-2 py-4">
      {words.map((word, idx) => (
        <span
          key={idx}
          className={`px-1.5 py-0.5 rounded transition-all duration-300 font-quran text-3xl select-none ${
            word.matched
              ? 'text-amber-600 bg-amber-50 font-bold shadow-sm dark:bg-amber-950/30'
              : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          {word.ar}
        </span>
      ))}
    </div>
  );
};
