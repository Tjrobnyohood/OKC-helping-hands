'use client';
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Mic2, Zap, Hammer, Sprout, 
  Repeat, Heart, Utensils, Shirt, Trash2, 
  Users, Star, Car, Scissors, ChevronRight,
  ShieldCheck, Clock
} from 'lucide-react';
import Link from 'next/link';

// --- THE FULL COMMUNITY POWER PAGE ---
export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('vindicators');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#001E41]" />;

  return (
    <main className="relative min-h-screen bg-[#001E41] text-white font-sans pb-40 overflow-x-hidden">
      
      {/* 1. BACKGROUND ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[5%] left-[-5%] w-[400px] h-[400px] bg-orange-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-6 space-y-12">
        
        {/* HEADER */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-5">
            <Link href="/" className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500 hover:bg-white/10 transition-all group">
              <ArrowLeft size={22} className="text-blue-400 group-hover:text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                The <span className="text-orange-500">Exchange</span>
              </h1>
              <p className="text-[10px] font-black text-blue-400/60 uppercase tracking-[0.5em] mt-2">OKC Community Wealth</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl">
            <ShieldCheck size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Verified Hub</span>
          </div>
        </header>

        {/* --- 2. IMPACT TRACKER (Live Data Placeholder) --- */}
        <section className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 ml-4">Real-Time Impact</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ImpactStat icon={<Users size={20}/>} label="Families Helped" count="124" color="text-blue-400" />
            <ImpactStat icon={<Utensils size={20}/>} label="Meals Procured" count="850" color="text-orange-500" />
            <ImpactStat icon={<Shirt size={20}/>} label="Clothes Given" count="312" color="text-blue-400" />
            <ImpactStat icon={<Trash2 size={20}/>} label="Trash Cleaned" count="45lbs" color="text-orange-500" />
          </div>
        </section>

        {/* --- 3. THE WORKSHOP PILLARS (The "Prospect" Section) --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Knowledge Pillars</p>
            <Link href="/partners" className="text-[9px] font-black uppercase tracking-widest text-orange-500 hover:underline">Partner with us</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <PillarCard 
              title="Legacy Labs" 
              desc="Elders passing down sewing, carpentry, and life skills to the youth." 
              icon={<Hammer className="text-orange-500" />} 
              tag="Mentorship"
            />
            <PillarCard 
              title="Nourish Network" 
              desc="Rescue meal systems turning excess local food into community hot plates." 
              icon={<Utensils className="text-blue-400" />} 
              tag="Food Power"
            />
            <PillarCard 
              title="Polished Potential" 
              desc="Beauty school partnerships providing cuts and confidence for interviews." 
              icon={<Scissors className="text-orange-500" />} 
              tag="Dignity Day"
            />
            <PillarCard 
              title="Resilience Rides" 
              desc="Volunteer carpool network helping neighbors reach jobs and clinics." 
              icon={<Car className="text-blue-400" />} 
              tag="Transport"
            />
          </div>
        </section>

        {/* --- 4. THE INTERACTIVE EXCHANGE (Tabs) --- */}
        <div className="space-y-6 pt-6 border-t border-white/5">
          <div className="flex gap-3 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
            <button 
              onClick={() => setActiveTab('vindicators')} 
              className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'vindicators' ? 'bg-orange-500 text-[#001E41] shadow-lg' : 'text-blue-300/50 hover:text-white'}`}
            >
              Volunteer Vindicators
            </button>
            <button 
              onClick={() => setActiveTab('trades')} 
              className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'trades' ? 'bg-orange-500 text-[#001E41] shadow-lg' : 'text-blue-300/50 hover:text-white'}`}
            >
              Skill Swap
            </button>
          </div>

          <div className="min-h-[400px]">
            {activeTab === 'vindicators' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="bg-gradient-to-br from-[#002B5B] to-[#001E41] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-4 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 bg-blue-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        <Clock size={12} /> Live Flash Task
                      </div>
                      <h3 className="text-3xl font-black italic uppercase leading-tight max-w-md">
                        Help Unload <span className="text-orange-500">Nourish Network</span> Delivery
                      </h3>
                      <p className="text-blue-100/60 font-medium italic text-sm">Est. Time: 15 Mins • Reward: 1 Meal Token</p>
                    </div>
                    <button className="w-full md:w-auto bg-white text-[#001E41] hover:bg-orange-500 transition-all font-black uppercase text-xs tracking-[0.2em] px-10 py-5 rounded-[2rem] shadow-2xl active:scale-95">
                      I'll Tackle This
                    </button>
                  </div>
                  <Zap className="absolute right-[-20px] top-[-20px] w-40 h-40 text-white/5" />
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* Placeholder for Skill Swap (Bartering) */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center space-y-6 border-dashed opacity-50">
                  <Repeat size={48} className="text-blue-400" />
                  <div>
                    <h3 className="text-2xl font-black italic uppercase">Barter Board Online Soon</h3>
                    <p className="text-[10px] font-bold text-blue-300/50 uppercase tracking-[0.5em] mt-2">Skill Swap Network Initializing</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

// --- REUSABLE PIECES ---

function ImpactStat({ icon, label, count, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center text-center group transition-all hover:border-white/20 hover:bg-white/[0.07]">
      <div className={`${color} mb-4 group-hover:scale-110 transition-transform duration-500`}>{icon}</div>
      <span className="text-3xl font-black italic text-white tracking-tighter leading-none">{count}</span>
      <span className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em] mt-3">{label}</span>
    </div>
  );
}

function PillarCard({ title, desc, icon, tag }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6 hover:border-orange-500/50 transition-all group cursor-pointer relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <span className="text-[9px] font-black uppercase bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full border border-blue-500/20">{tag}</span>
      </div>
      <div className="relative z-10">
        <h4 className="font-black uppercase italic text-2xl tracking-tight text-white mb-3 group-hover:text-orange-500 transition-colors">{title}</h4>
        <p className="text-sm font-medium text-blue-100/60 italic leading-relaxed">{desc}</p>
      </div>
      <div className="absolute bottom-[-20px] right-[-20px] opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
    </div>
  );
}