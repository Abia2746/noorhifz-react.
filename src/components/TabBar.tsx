import React from 'react';
import { useAppStore } from '../store';

export const TabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();
  const tabs = [
    { id: 'recite', label: 'Recite', icon: '🎙️' },
    { id: 'listen', label: 'Listen', icon: '🎧' },
    { id: 'lesson', label: 'Teacher', icon: '🎓' },
    { id: 'plan', label: 'Plan', icon: '📅' }
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-[#FAF6EC]/95 dark:bg-zinc-950/95 backdrop-blur-lg px-6 py-2.5 flex justify-around items-center z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center space-y-1 transition-all ${
            activeTab === tab.id ? 'text-amber-600 scale-105 font-medium' : 'text-zinc-400'
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-[10px] tracking-wide uppercase font-semibold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
