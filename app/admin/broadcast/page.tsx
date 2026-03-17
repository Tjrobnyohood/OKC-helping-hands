'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Radio, MessageSquare, Save, Trash2, Mic2, Star, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminBroadcast() {
  const [workshop, setWorkshop] = useState({ title: '', guest: '', time: '' });
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Update the "Live Stage" for everyone
  const updateStage = async () => {
    setLoading(true);
    // This updates a 'settings' or 'broadcast' table in Supabase
    const { error } = await supabase
      .from('site_settings')
      .update({ value: workshop })
      .eq('key', 'current_workshop');

    if (!error) alert("Stage Updated Globally! ⚡");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#001E41] p-6 pb-24 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Broadcast <span className="text-orange-500">Studio</span></h1>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">Rooted Tech Control</p>
          </div>
          <Radio className="text-orange-500 animate-pulse" size={24} />
        </div>

        {/* --- LIVE STAGE CONTROLLER --- */}
        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Star className="text-orange-500" size={16} />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-300">Stage Controller</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase ml-2 opacity-40">Workshop Title</label>
              <input 
                placeholder="Ex: Gardening 101"
                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 outline-none focus:border-orange-500 transition-all font-bold"
                onChange={(e) => setWorkshop({...workshop, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase ml-2 opacity-40">Special Guest</label>
              <input 
                placeholder="Ex: Brother John"
                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 outline-none focus:border-orange-500 transition-all font-bold"
                onChange={(e) => setWorkshop({...workshop, guest: e.target.value})}
              />
            </div>
          </div>

          <button 
            onClick={updateStage}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-white text-[#001E41] font-black uppercase py-5 rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Broadcasting..." : "Push to Live Stage"} <Save size={18} />
          </button>
        </section>

        {/* --- NEIGHBOR FEEDBACK & IDEAS --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-blue-400" size={16} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Neighbor Ideas</h2>
            </div>
            <span className="bg-blue-500/20 text-blue-400 text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-tighter">6 New Suggestions</span>
          </div>

          <div className="grid gap-4">
            {/* Sample Idea Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 hover:border-blue-500/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 font-black italic text-xs">A</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Avery M.</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-green-500/20 hover:text-green-400 transition-colors"><CheckCircle2 size={14}/></button>
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                </div>
              </div>
              <p className="text-sm font-medium italic text-blue-100/80 leading-relaxed">
                "I'd love to see a workshop on basic bike repair. There are a lot of us who rely on bikes to get around OKC and could use the help!"
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                <span className="text-[8px] font-black bg-orange-500/10 text-orange-500 px-2 py-1 rounded-md uppercase">Workshop Idea</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}