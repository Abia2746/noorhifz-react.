import React from 'react';
import { useAppStore } from './store';
import { TabBar } from './components/TabBar';
import { Recite, Listen, Lesson, Plan } from './screens/Views';
import { Lattice, StarField } from './components/bits';

export const App: React.FC = () => {
  const { activeTab, theme, streak } = useAppStore();

  return (
    <div className="relative min-h-screen w-full bg-[#FAF6EC] text-[#241C17] flex flex-col font-sans antialiased overflow-hidden">
      <StarField />
      <Lattice />
      <header className="sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between border-b border-zinc-200/50 bg-[#FAF6EC]/80 backdrop-blur-md">
        <h1 className="text-md font-bold tracking-tight bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">NoorHifz</h1>
        <div className="bg-amber-50 border border-amber-200/40 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-700">🔥 {streak} Days</div>
      </header>
      <main className="flex-grow relative z-10 w-full h-[calc(100vh-115px)] overflow-hidden">
        {activeTab === 'recite' && <Recite />}
        {activeTab === 'listen' && <Listen />}
        {activeTab === 'lesson' && <Lesson />}
        {activeTab === 'plan' && <Plan />}
      </main>
      <TabBar />
    </div>
  );
};
