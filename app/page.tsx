'use client';
import React from 'react';
import { Zap, Shirt, Users, MapPin, BatteryCharging, ChevronRight, UserCircle2, MessageCircle, Send } from 'lucide-react';
import Link from 'next/link';

// --- 1. THE CARD COMPONENT (The Buttons) ---
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'orange';
  href: string;
}

const ActionCard = ({ icon, label, color, href }: ActionCardProps) => (
  <Link href={href} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group shadow-lg">
    <div className={`${color === 'orange' ? 'text-orange-500' : 'text-blue-400'} group-hover:scale-110 transition-all`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/90">{label}</span>
  </Link>
);

// --- 2. THE MAIN DASHBOARD PAGE ---
export default function Dashboard() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      
      {/* --- 3. OKC HELPING HANDS HEADER --- */}
      <header className="py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-[#001E41] italic shadow-[0_0_15px_rgba(249,115,22,0.4)]">⚡</div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
              OKC <span className="text-orange-500 font-black">Helping Hands</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-blue-400 mt-1">Community Resource Hub</p>
          </div>
        </div>

        {/* Member Access Button */}
        <Link href="/login" className="flex items-center gap-3 group">
           <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-600 to-orange-500 p-[2px] shadow-xl transition-transform group-active:scale-90">
              <div className="h-full w-full bg-[#001E41] rounded-[14px] flex items-center justify-center text-white">
                <UserCircle2 size={24} className="group-hover:text-orange-500 transition-colors" />
              </div>
           </div>
        </Link>
      </header>

      {/* --- 4. LIVE STATUS HERO --- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-[#EF4234] to-blue-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Locker Status</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-tight">Station <span className="text-blue-900/40 font-black">Online</span></h2>
            <p className="text-orange-100 font-medium opacity-90">Power Station 4 is Available in OKC</p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/20">
            <BatteryCharging className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 text-[15rem] font-black italic text-white pointer-events-none">⚡</div>
      </section>

      {/* --- 5. SERVICE GRID (NAV BUTTONS) --- */}
      <section className="space-y-4">
        <h3 className="text-blue-300 uppercase text-[11px] font-black tracking-[0.25em] ml-2 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-blue-400/30" />
          Hub Services
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4"> {/* Changed to 3 columns for better fit */}
          <ActionCard icon={<MapPin size={26}/>} label="Index" color="blue" href="/resources" />
          <ActionCard icon={<Users size={26}/>} label="Meetings" color="orange" href="/meetings" />
          <ActionCard icon={<Shirt size={26}/>} label="Closet" color="blue" href="/closet" />
          <ActionCard icon={<Zap size={26}/>} label="Power" color="orange" href="/power" />
          <ActionCard icon={<MessageCircle size={26}/>} label="Impact" color="blue" href="/community" /> {/* New Button */}
          <ActionCard icon={<Send size={26}/>} label="Request" color="orange" href="/request" /> {/* New Button */}
        </div>
      </section>

      {/* --- 6. COMMUNITY BULLETIN --- */}
      <section className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm group">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-white uppercase tracking-wider italic text-lg">OKC Bulletin</h3>
          <div className="bg-blue-500/10 p-2 rounded-full group-hover:bg-orange-500/20 transition-colors">
            <ChevronRight className="text-blue-400 w-5 h-5 transition-colors" />
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
              <Shirt className="text-orange-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">Closet News</p>
              <p className="text-sm text-blue-100/80 leading-relaxed font-medium">New clothing inventory for OKC neighbors. Book your slot today.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}