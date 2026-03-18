'use client';
import React from 'react';
import { Trophy, Medal, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// The "default export" is what makes this a "Module"
export default function LeaderboardPage() {
  const ranks = [
    { name: "Avery M.", pts: 450, rank: 1, label: "Elite" },
    { name: "Marcus T.", pts: 380, rank: 2, label: "Veteran" },
    { name: "Sarah J.", pts: 310, rank: 3, label: "Active" }
  ];

  return (
    <main className="min-h-screen bg-[#001E41] text-white p-6 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <Link href="/community" className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500 transition-all">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Vindicator <span className="text-orange-500">Ranks</span></h1>
        </header>

        <div className="grid gap-4">
          {ranks.map((v) => (
            <div key={v.rank} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex justify-between items-center group hover:bg-white/10 transition-all">
              <div className="flex items-center gap-6">
                <span className="text-2xl font-black italic text-white/10">#{v.rank}</span>
                <div>
                  <h4 className="font-black uppercase italic text-lg leading-none">{v.name}</h4>
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                    <Shield size={10} /> {v.label} Vindicator
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-orange-500 tracking-tighter">{v.pts}</div>
                <div className="text-[8px] font-black uppercase text-white/30">Impact Pts</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-[2.5rem] p-8 text-center border-dashed">
          <Trophy className="mx-auto text-orange-500 mb-4" size={32} />
          <p className="text-xs font-bold italic text-orange-100 opacity-60">"The greatest among you shall be your servant."</p>
        </div>
      </div>
    </main>
  );
}