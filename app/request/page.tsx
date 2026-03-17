'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Send, ArrowLeft, MessageSquare, User, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// --- 1. THE AI DECIPHER LOGIC ---
const decipherRequest = (text: string) => {
  const itemPattern = /(\d+)?\s*(small|medium|large|xl|size\s*\d+)?\s*([a-zA-Z\s]{3,20})(?:,|\band\b|\.|$)/gi;
  let match;
  const items = [];
  while ((match = itemPattern.exec(text)) !== null) {
    items.push({
      qty: match[1] || "1",
      size: match[2] || "N/A",
      item: match[3].trim().replace(/\s+/g, ' ')
    });
  }
  return items;
};

export default function RequestPage() {
  const [formData, setFormData] = useState({ name: '', zone: '', message: '' });
  const [manifest, setManifest] = useState<{qty: string, size: string, item: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTextChange = (text: string) => {
    setFormData({ ...formData, message: text });
    setManifest(decipherRequest(text));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.zone) return alert("Please select your side of town.");
    
    setLoading(true);
    const { error } = await supabase.from('requests').insert([
      { 
        full_name: formData.name, 
        location_zone: formData.zone, 
        message: formData.message,
        ai_manifest: manifest,
        status: 'pending'
      }
    ]);

    if (error) alert("Sync Error: " + error.message);
    else setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="max-w-4xl mx-auto p-6 min-h-screen bg-[#001E41] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/50 animate-pulse text-orange-500">
            <CheckCircle2 size={40} />
        </div>
        <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">Request <span className="text-orange-500">Received</span></h1>
        <p className="text-blue-200/60 max-w-xs font-bold uppercase text-[10px] tracking-[0.2em]">We are checking the closet for your items now.</p>
        <Link href="/" className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 hover:text-[#001E41] transition-all">Back to Hub</Link>
      </main>
    );
  }

  return (
    <main className="relative max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-[#001E41] pb-24 text-white overflow-hidden font-sans">
      
      {/* Background Polish */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4">
        <Link href="/" className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500 transition-colors">
          <ArrowLeft className="text-blue-400 w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Help <span className="text-orange-500">Request</span></h1>
          <p className="text-[9px] font-black text-blue-400/50 uppercase tracking-[0.3em]">OKC Community Support</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        
        {/* Name Input */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 ml-2">Neighbor Name</label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input required placeholder="Your name or initials" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-orange-500 transition-all font-bold text-white placeholder:text-white/20"
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
        </div>

        {/* Side of Town (Quadrant Selector) */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 ml-2">Side of Town</label>
          <div className="grid grid-cols-2 gap-3">
            {['NW OKC', 'NE OKC', 'SW OKC', 'SE OKC'].map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setFormData({...formData, zone})}
                className={`py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest border transition-all ${
                  formData.zone === zone 
                  ? 'bg-orange-500 border-orange-500 text-[#001E41] shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:border-blue-500/50 hover:text-white'
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Message / The "Decipher" Area */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 ml-2">What do you need?</label>
          <div className="relative">
            <MessageSquare className="absolute left-5 top-6 text-blue-400 w-5 h-5" />
            <textarea required rows={4} placeholder="Ex: I need 2 large hoodies and size 10 shoes..." 
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-14 pr-6 outline-none focus:border-orange-500 transition-all font-medium leading-relaxed text-white placeholder:text-white/10"
              onChange={(e) => handleTextChange(e.target.value)} />
          </div>
        </div>

        {/* AI MANIFEST PREVIEW */}
        {manifest.length > 0 && (
          <div className="bg-blue-500/5 border border-blue-400/20 rounded-[2.5rem] p-8 space-y-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2">
              <Sparkles className="text-orange-500 w-4 h-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">AI Manifest Deciphered</p>
            </div>
            <div className="grid gap-3">
              {manifest.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-[#001E41]/80 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500 font-black italic">{item.qty}x</span>
                    <span className="text-xs font-bold uppercase tracking-wide">{item.item}</span>
                  </div>
                  <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full uppercase tracking-tighter">
                    {item.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-[#001E41] font-black uppercase py-6 rounded-[2.5rem] transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 text-sm tracking-widest">
          {loading ? 'Transmitting...' : (
            <>
              Submit Request <Send size={18} />
            </>
          )}
        </button>
      </form>
    </main>
  );
}