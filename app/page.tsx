'use client';
import React, { useState, useEffect } from 'react';
import { Zap, Shirt, Users, MapPin, BatteryCharging, ChevronRight, UserCircle2, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

// --- 1. SCRIPTURE DATA ---
const verses = [
  "Hebrews 13:16 - Do not forget to do good and to share with others.",
  "Proverbs 3:27 - Do not withhold good from those to whom it is due.",
  "Matthew 5:16 - Let your light shine before others.",
  "Galatians 6:2 - Carry each other’s burdens.",
  "1 John 3:18 - Let us not love with words but with actions.",
  "Psalm 121:1 - I lift up my eyes to the mountains—where does my help come from?"
];

// --- 2. THE CARD COMPONENT ---
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'orange';
  href: string;
}

const ActionCard = ({ icon, label, color, href }: ActionCardProps) => (
  <Link href={href} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group shadow-lg backdrop-blur-sm relative z-20">
    <div className={`${color === 'orange' ? 'text-orange-500' : 'text-blue-400'} group-hover:scale-110 transition-all`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/90">{label}</span>
  </Link>
);

export default function Dashboard() {
  const [verseIndex, setVerseIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [fade, setFade] = useState(false);

  // Safety: Handle the "Floating Verses" only after the page loads in the browser
  useEffect(() => {
    setIsMounted(true);
    setFade(true);

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setVerseIndex((prev) => (prev + 1) % verses.length);
        setFade(true);
      }, 1500);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  // Prevent Vercel "Hydration" errors
  if (!isMounted) return <div className="min-h-screen bg-[#001E41]" />;

  return (
    <main className="relative max-w-4xl mx-auto p-6 space-y-8 min-h-screen overflow-hidden bg-[#001E41]">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="fixed inset-0 z-[-1] opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- FLOATING SCRIPTURE --- */}
      <div className={`fixed inset-0 flex items-center justify-center pointer-events-none transition-all duration-[2000ms] z-10 ${fade ? 'opacity-25 scale-105' : 'opacity-0 scale-100'}`}>
        <p className="text-blue-200 italic font-medium text-center px-12 text-sm sm:text-base tracking-[0.25em] uppercase max-w-lg leading-loose font-serif">
          {verses[verseIndex]}
        </p>
      </div>

      {/* --- CONTENT HEADER --- */}
      <header className="relative z-30 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-[#001E41] italic shadow-[0_0_15px_rgba(249,115,22,0.4)]">⚡</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
              OKC <span className="text-orange-500">Helping Hands</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-blue-400 mt-1">Community Hub</p>
          </div>
        </div>

        <Link href="/login" className="flex items-center gap-3 group">
           <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-600 to-orange-500 p-[2px] shadow-xl transition-transform group-active:scale-90">
              <div className="h-full w-full bg-[#001E41] rounded-[14px] flex items-center justify-center text-white">
                <UserCircle2 size={24} className="group-hover:text-orange-500 transition-colors" />
              </div>
           </div>
        </Link>
      </header>

      {/* --- HERO STATUS --- */}
      <section className="relative z-30 overflow-hidden bg-gradient-to-br from-orange-600 via-[#EF4234] to-blue-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Locker Status</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-tight">Station <span className="text-blue-900/40">Online</span></h2>
            <p className="text-orange-100 font-medium opacity-90 text-sm">Power Station 4 is Available in OKC</p>
          </div>
          <BatteryCharging className="w-12 h-12 text-white/50 animate-pulse" />
        </div>
      </section>

      {/* --- ACTION GRID --- */}
      <section className="relative z-30 space-y-4">
        <h3 className="text-blue-300 uppercase text-[11px] font-black tracking-[0.25em] ml-2 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-blue-400/30" />
          Hub Services
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <ActionCard icon={<MapPin size={26}/>} label="Index" color="blue" href="/resources" />
          <ActionCard icon={<Users size={26}/>} label="Meetings" color="orange" href="/meetings" />
          <ActionCard icon={<Shirt size={26}/>} label="Closet" color="blue" href="/closet" />
          <ActionCard icon={<Zap size={26}/>} label="Power" color="orange" href="/power" />
          <ActionCard icon={<MessageCircle size={26}/>} label="Impact" color="blue" href="/community" />
          <ActionCard icon={<Send size={26}/>} label="Request" color="orange" href="/request" />
        </div>
      </section>

      {/* --- BULLETIN --- */}
      <section className="relative z-30 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-white uppercase tracking-wider italic">OKC Bulletin</h3>
        </div>
        <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl">
          <Shirt className="text-orange-500 shrink-0" size={20} />
          <p className="text-sm text-blue-100/70 leading-relaxed italic">
            "New clothing inventory arrived. Check the closet for gear."
          </p>
        </div>
      </section>

    </main>
  );
}