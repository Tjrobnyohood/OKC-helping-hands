'use client';
import React, { useState, useEffect } from 'react';
import { 
  BatteryCharging, MapPin, Users, Shirt, Zap, 
  MessageCircle, Send, UserCircle2, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

const verses = [
  "Wait on the LORD: be of good courage, and he shall strengthen thine heart.",
  "The LORD is my shepherd; I shall not want.",
  "God is our refuge and strength, a very present help in trouble.",
  "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
  "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil."
];

export default function Dashboard() {
  const [verseIndex, setVerseIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setFade(true);
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setVerseIndex((prev) => (prev + 1) % verses.length);
        setFade(true);
      }, 1500);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#001E41]" />;

  return (
    <main className="relative min-h-screen bg-[#001E41] font-sans flex flex-col">
      
      {/* 1. BACKGROUND GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="relative z-20 max-w-4xl mx-auto p-6 space-y-12 flex-grow">
        
        {/* HEADER */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-[#001E41] italic shadow-lg">⚡</div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
                OKC <span className="text-orange-500">Helping Hands</span>
              </h1>
              <p className="text-[9px] tracking-[0.4em] uppercase font-bold text-blue-400 mt-1">Community Hub</p>
            </div>
          </div>
          <Link href="/login" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-orange-500 transition-all">
            <UserCircle2 size={24} />
          </Link>
        </header>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-blue-900 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
           <div className="relative z-10 flex justify-between items-center">
             <div className="space-y-2">
               <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase text-white tracking-widest">Locker Status</span>
               </div>
               <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Station <span className="opacity-40">Online</span></h2>
               <p className="text-orange-100 font-bold text-xs">Power Station 4 Available</p>
             </div>
             <BatteryCharging className="w-16 h-16 text-white/30" />
           </div>
        </section>

        {/* HUB SERVICES GRID */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <ActionCard icon={<MapPin size={26}/>} label="Index" color="blue" href="/resources" />
          <ActionCard icon={<Users size={26}/>} label="Meetings" color="orange" href="/meetings" />
          <ActionCard icon={<Shirt size={26}/>} label="Closet" color="blue" href="/closet" />
          <ActionCard icon={<Zap size={26}/>} label="Power" color="orange" href="/power" />
          <ActionCard icon={<MessageCircle size={26}/>} label="Impact" color="blue" href="/community" />
          <ActionCard icon={<Send size={26}/>} label="Request" color="orange" href="/request" />
        </section>

        {/* OKC BULLETIN */}
        <section className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 ml-4">OKC Bulletin</p>
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:border-orange-500/50 transition-all cursor-pointer">
             <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500 transition-all">
                <Shirt className="text-orange-500 group-hover:text-[#001E41]" size={28} />
             </div>
             <p className="flex-1 text-blue-100/70 italic font-bold text-xs sm:text-sm">
               "New clothing inventory arrived. Check the closet for gear."
             </p>
             <ChevronRight className="text-white/20 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
          </div>
        </section>
      </div>

      {/* --- 3. THE SCRIPTURE SHELF (BOTTOM) --- */}
      {/* This is positioned at the very end of the scrollable area */}
      <footer className="relative z-10 w-full py-20 mt-10">
        <div className={`transition-all duration-[4000ms] ease-in-out flex justify-center ${fade ? 'opacity-40 scale-100' : 'opacity-0 scale-95'}`}>
           <p className="text-blue-300 italic font-black text-center px-12 text-[10px] sm:text-[12px] tracking-[0.6em] uppercase max-w-xl leading-[2.5]">
             "{verses[verseIndex]}"
           </p>
        </div>
      </footer>
    </main>
  );
}

function ActionCard({ icon, label, color, href }: { icon: any, label: string, color: 'blue' | 'orange', href: string }) {
  const isOrange = color === 'orange';
  return (
    <Link href={href} className={`
      relative h-32 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden transition-all group active:scale-95
      ${isOrange ? 'bg-orange-500' : 'bg-white/5 border border-white/10 hover:border-blue-500/50'}
    `}>
      <div className={`${isOrange ? 'text-[#001E41]' : 'text-blue-400'} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className={`text-[11px] font-black uppercase tracking-widest ${isOrange ? 'text-[#001E41]' : 'text-white'}`}>
        {label}
      </span>
    </Link>
  );
}