'use client';
import React from 'react';
import { Users, Calendar, Clock, MapPin, ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// --- 1. MEETING CARD COMPONENT ---
const MeetingCard = ({ name, time, location, type, lead }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-orange-500/40 transition-all group relative overflow-hidden">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest">{type}</p>
        </div>
        <h3 className="text-xl font-black text-white italic group-hover:text-orange-500 transition-colors">{name}</h3>
      </div>
      <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-400/20">
        <Users className="text-blue-400 w-5 h-5" />
      </div>
    </div>
    
    <div className="space-y-3 relative z-10">
      <div className="flex items-center gap-6 text-blue-200/60 text-xs font-bold uppercase tracking-tighter">
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-400"/> {time}</span>
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-400"/> {location}</span>
      </div>
      <p className="text-[10px] text-white/40 font-medium tracking-wide leading-relaxed">
        Led by: <span className="text-white/80">{lead}</span> • All OKC neighbors welcome.
      </p>
    </div>

    {/* Subtle Background Icon */}
    <Users size={80} className="absolute right-[-20px] bottom-[-20px] text-white/5 -rotate-12 pointer-events-none" />
  </div>
);

// --- 2. MAIN PAGE ---
export default function MeetingsPage() {
  const schedule = [
    { 
      name: "Recovery Path", 
      time: "10:00 AM", 
      location: "East Wing", 
      type: "Support Group",
      lead: "Community Lead"
    },
    { 
      name: "Job Readiness", 
      time: "1:30 PM", 
      location: "Tech Lab", 
      type: "Workshop",
      lead: "Skills Team"
    },
    { 
      name: "OKC Unity Table", 
      time: "5:00 PM", 
      location: "Main Hall", 
      type: "Social Meal",
      lead: "Helping Hands Staff"
    },
  ];

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-[#001E41] pb-24 text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft className="text-blue-400" />
          </Link>
          <h1 className="text-2xl font-black italic uppercase text-white leading-none">
            Hub <span className="text-orange-500">Meetings</span>
          </h1>
        </div>
        <div className="hidden xs:block text-right">
          <p className="text-[10px] text-blue-300 uppercase font-black tracking-widest leading-none">Schedule</p>
          <p className="text-xs font-bold text-white">Today's Calendar</p>
        </div>
      </div>

      {/* Date Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-transparent border-l-4 border-orange-500 p-6 rounded-r-[2rem]">
        <div className="flex items-center gap-3 mb-1">
          <Calendar className="text-orange-500 w-5 h-5" />
          <h2 className="text-lg font-black italic uppercase">Tuesday, March 17</h2>
        </div>
        <p className="text-blue-100/60 text-xs font-medium uppercase tracking-widest">OKC Helping Hands Daily Schedule</p>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {schedule.map((item, i) => (
          <MeetingCard key={i} {...item} />
        ))}
      </div>

      {/* Bottom Note */}
      <div className="bg-white/5 rounded-3xl p-6 border border-white/5 flex items-start gap-4">
        <div className="bg-orange-500/20 p-2 rounded-lg">
          <ChevronRight className="text-orange-500 w-4 h-4" />
        </div>
        <p className="text-[11px] text-white/50 leading-relaxed italic">
          Need a private meeting space or have a suggestion for a new group? 
          <Link href="/request" className="text-orange-500 font-black uppercase ml-1 hover:underline">Submit a Request</Link>
        </p>
      </div>

    </main>
  );
}