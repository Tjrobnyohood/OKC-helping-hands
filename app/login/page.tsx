import React from 'react';
import { Zap, Shirt, Users, MapPin, BatteryCharging, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// 1. Action Card Component (The Nav Buttons)
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'orange';
  href: string;
}

const ActionCard = ({ icon, label, color, href }: ActionCardProps) => (
  <Link href={href} className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95 group">
    <div className={`${color === 'orange' ? 'text-orange-500' : 'text-blue-400'} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-white">{label}</span>
  </Link>
);

export default function Dashboard() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      
      {/* Brand Header */}
      <header className="py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-black text-[#001E41] italic">⚡</div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic text-white">
            Rise City <span className="text-orange-500">Hub</span>
          </h1>
        </div>
      </header>

      {/* Hero Status Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-[#EF4234] rounded-3xl p-8 shadow-2xl">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Live Status</h2>
            <p className="text-orange-100 font-medium">Power Station 4 is currently Available</p>
          </div>
          <BatteryCharging className="w-12 h-12 text-white animate-pulse" />
        </div>
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 text-[12rem] font-black italic text-white">⚡</div>
      </section>

      {/* Main Grid Navigation */}
      <section>
        <h3 className="text-blue-300 uppercase text-[10px] font-black tracking-[0.2em] mb-4 ml-2">Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionCard icon={<MapPin size={24}/>} label="Resources" color="blue" href="/resources" />
          <ActionCard icon={<Users size={24}/>} label="Meetings" color="orange" href="/meetings" />
          <ActionCard icon={<Shirt size={24}/>} label="Closet" color="blue" href="/closet" />
          <ActionCard icon={<Zap size={24}/>} label="Power" color="orange" href="/power" />
        </div>
      </section>

      {/* Recent Activity / News Feed */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white uppercase tracking-tight">Community News</h3>
          <ChevronRight className="text-blue-400 w-5 h-5" />
        </div>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
            <p className="text-sm text-blue-100/80">New seasonal coats arrived in the Community Closet today.</p>
          </div>
        </div>
      </section>

    </main>
  );
}