import React from 'react';
import { Zap, Shirt, Users, MapPin, BatteryCharging, ChevronRight, UserCircle2 } from 'lucide-react';
import Link from 'next/link';

// 1. Upgraded Action Card Component
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'orange';
  href: string;
}

const ActionCard = ({ icon, label, color, href }: ActionCardProps) => (
  <Link href={href} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 group shadow-lg">
    <div className={`${color === 'orange' ? 'text-orange-500' : 'text-blue-400'} group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] transition-all`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/90">{label}</span>
  </Link>
);

export default function Dashboard() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      
      {/* Brand Header with Integrated Member Access */}
      <header className="py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center font-black text-[#001E41] italic shadow-[0_0_15px_rgba(249,115,22,0.4)]">⚡</div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">
            Helping Hands <span className="text-orange-500 block text-xs tracking-[0.3em] not-italic">Community Hub</span>
          </h1>
        </div>

        {/* Member Login Button */}
        <Link href="/login" className="flex items-center gap-3 group">
           <div className="text-right hidden xs:block">
              <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest leading-none">Member</p>
              <p className="text-xs font-bold text-white group-hover:text-orange-500 transition-colors">Sign In</p>
           </div>
           <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-400 via-blue-600 to-orange-500 p-[2px] transition-all group-hover:rotate-3 group-active:scale-90 shadow-xl">
              <div className="h-full w-full bg-[#001E41] rounded-[14px] flex items-center justify-center text-white">
                <UserCircle2 size={24} className="group-hover:text-orange-500 transition-colors" />
              </div>
           </div>
        </Link>
      </header>

      {/* High-Impact Hero Status Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-[#EF4234] to-blue-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/10">
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Facility Status</span>
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Power Online</h2>
            <p className="text-orange-100 font-medium opacity-90">Locker Station 4 is currently Available</p>
          </div>
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-xl border border-white/20">
            <BatteryCharging className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>
        {/* Background "Thunder" Element */}
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 text-[15rem] font-black italic text-white pointer-events-none select-none">⚡</div>
      </section>

      {/* Main Grid Navigation */}
      <section className="space-y-4">
        <h3 className="text-blue-300 uppercase text-[11px] font-black tracking-[0.25em] ml-2 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-blue-400/30" />
          Core Services
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionCard icon={<MapPin size={26}/>} label="Index" color="blue" href="/resources" />
          <ActionCard icon={<Users size={26}/>} label="Meetings" color="orange" href="/meetings" />
          <ActionCard icon={<Shirt size={26}/>} label="Closet" color="blue" href="/closet" />
          <ActionCard icon={<Zap size={26}/>} label="Power" color="orange" href="/power" />
        </div>
      </section>

      {/* Community News Feed */}
      <section className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-white uppercase tracking-wider italic text-lg">Hub Bulletin</h3>
          <div className="bg-blue-500/10 p-2 rounded-full group-hover:bg-orange-500/20 transition-colors">
            <ChevronRight className="text-blue-400 w-5 h-5 group-hover:text-orange-500 transition-colors" />
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors cursor-default">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
              <Shirt className="text-orange-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-1">Closet Update</p>
              <p className="text-sm text-blue-100/80 leading-relaxed font-medium">New seasonal coats and professional wear arrived today. Book a slot to browse.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}