import React from 'react';
import MatchScheduler from './components/MatchScheduler';

export default function App() {
  return (
    <main className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">SUKOL 2025 - Jadual Perlawanan</h1>
      <MatchScheduler />
    </main>
  );
}