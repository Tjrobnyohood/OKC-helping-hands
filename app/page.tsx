"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Zap, Shirt, Users, MapPin, CheckCircle2, BatteryCharging, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#001E41] text-white font-sans selection:bg-orange-500">
      
      {/* HEADER: The OKC Helping Hands Branding */}
      <nav className="p-6 border-b border-white/10 flex justify-between items-center bg-[#002D62]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
             <Heart className="text-[#001E41] fill-[#001E41]" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            OKC <span className="text-orange-500 font-extrabold tracking-normal">Helping Hands</span>
          </span>
        </div>
        <button className="bg-white/5 border border-white/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
          Member Login
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        
        {/* WELCOME SECTION: Faith-Based "Hand Up" Messaging */}
        <section className="py-4">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2">
            Strength for <span className="text-orange-500 underline decoration-4 underline-offset-4">Today</span>
          </h1>
          <p className="text-blue-200/70 text-lg font-medium max-w-xl">
            A community built on grace. We provide the tools; God provides the future. Welcome home, Neighbor.
          </p>
        </section>

        {/* URGENT STATUS: Charging & Real-time Info */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#007AC1] to-[#002D62] rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <BatteryCharging className="text-orange-400 animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">Connection Corner</span>
              </div>
              <h2 className="text-2xl font-bold italic uppercase leading-tight">Secure Charging <br/>Available Now</h2>
              <p className="mt-2 text-blue-100/80 font-medium">Locker Station 4 is currently open for your devices.</p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-[#001E41] px-8 py-4 rounded-2xl font-black uppercase italic transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/30">
              Claim A Locker
            </button>
          </div>
          {/* Subtle background element */}
          <div className="absolute -right-10 -bottom-10 opacity-5 text-[12rem] font-black italic select-none">OKC</div>
        </section>

        {/* RESOURCE GRID: The 4 Pillars */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <PillarCard 
    icon={<MapPin size={32} />} 
    title="Resource Index" 
    desc="Find housing, food, and legal aid in the 405."
    href="/resources"
    color="orange"
  />
  <PillarCard 
    icon={<Shirt size={32} />} 
    title="Dignity Closet" 
    desc="Professional attire for your next big opportunity."
    href="/closet"
    color="blue"
  />
  <PillarCard 
    icon={<Users size={32} />} 
    title="Neighbor Meetings" 
    desc="Peer-led support rooted in community and faith."
    href="/meetings"
    color="orange"
  />
  <PillarCard 
    icon={<Zap size={32} />} 
    title="Power Hub" 
    desc="Stay connected with free electronics charging."
    href="/charging"
    color="blue"
  />
</div>
{/* FOOTER VERSE */}
        <footer className="text-center py-12 border-t border-white/5">
          <p className="text-blue-200/40 text-sm font-medium italic">
            "For I know the plans I have for you," declares the Lord... "to give you hope and a future." — Jeremiah 29:11
          </p>
        </footer>
      </main>
    </div>
  );
}

// Reusable Card Component to keep the code clean
interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  color: 'blue' | 'orange';
}

function PillarCard({ icon, title, desc, href, color }: PillarCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 hover:border-blue-400/50 transition-all active:scale-95 h-full">
        <div className={`mb-4 transition-transform group-hover:scale-110 ${color === 'orange' ? 'text-orange-500' : 'text-blue-400'}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tight text-white">{title}</h3>
        <p className="text-blue-100/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function ServiceCard({ icon, title, desc }: ServiceCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 hover:border-blue-400/50 transition">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tight">{title}</h3>
      <p className="text-blue-100/60 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// 1. Define the "Shape" of the data
interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'orange';
  href?: string; // optional navigation target
}

const ActionCard = ({ icon, label, color }: ActionCardProps) => (
  <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all active:scale-95">
    <div className={color === 'orange' ? 'text-orange-500' : 'text-blue-400'}>
      {icon}
    </div>
    <span className="text-xs font-black uppercase tracking-wider text-white">
      {label}
    </span>
  </button>
);