'use client';
import { useEffect, useState } from 'react';

const verses = [
  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "I can do all this through him who gives me strength. - Philippians 4:13",
];

export default function Dashboard() {
  const [verseIndex, setVerseIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [fade, setFade] = useState(false);

  // 1. Safety: Only run on the client
  useEffect(() => {
    setIsMounted(true);
    setFade(true);

    const timer = setInterval(() => {
      setFade(false);
      // Wait for fade-out before changing text
      setTimeout(() => {
        setVerseIndex((prev) => (prev + 1) % verses.length);
        setFade(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  // 2. Prevent "Hydration" errors by returning null until mounted
  if (!isMounted) return <div className="min-h-screen bg-[#001E41]" />;

  return (
    <main className="relative max-w-4xl mx-auto p-6 space-y-8 min-h-screen overflow-hidden">
      {/* --- FLOATING SCRIPTURE LAYER --- */}
      <div 
        className={`fixed inset-0 flex items-center justify-center pointer-events-none transition-all duration-[2000ms] ease-in-out z-0 
        ${fade ? 'opacity-20 scale-100' : 'opacity-0 scale-95'}`}
      >
        <p className="text-blue-200 italic font-medium text-center px-12 text-sm sm:text-base tracking-[0.2em] uppercase max-w-lg leading-loose">
          {verses[verseIndex]}
        </p>
      </div>
      
      {/* ... Rest of your code (Header, Grid, etc) ... */}
    </main>
  );
}