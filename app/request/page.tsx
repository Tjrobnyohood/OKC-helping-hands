'use client';
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Send, ArrowLeft, MessageSquare, User, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function RequestPage() {
  const [formData, setFormData] = useState({ name: '', type: 'General', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('requests').insert([
      { 
        full_name: formData.name, 
        request_type: formData.type, 
        message: formData.message 
      }
    ]);

    if (error) {
      alert("Error sending request. Please try again.");
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="max-w-4xl mx-auto p-6 min-h-screen bg-[#001E41] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
          <Send className="text-green-500 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black italic uppercase text-white">Request <span className="text-orange-500 font-black">Sent</span></h1>
        <p className="text-blue-200/60 max-w-xs font-medium">OKC Helping Hands staff will review your request shortly.</p>
        <Link href="/" className="bg-white/10 px-8 py-3 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="relative max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-[#001E41] pb-24 text-white overflow-hidden">
      
      {/* Fibonacci Abstract Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4">
        <Link href="/" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
          <ArrowLeft className="text-blue-400" />
        </Link>
        <h1 className="text-2xl font-black italic uppercase text-white">
          Help <span className="text-orange-500 font-black">Request</span>
        </h1>
      </div>

      <div className="relative z-10 bg-orange-500/10 border border-orange-500/20 p-6 rounded-[2.5rem]">
        <p className="text-sm font-bold italic text-orange-100">"How can we support you today? Please let us know what you need."</p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 ml-2">Your Name</label>
          <div className="relative">
            <User className="absolute left-4 top-4 text-blue-400 w-5 h-5" />
            <input 
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all"
              placeholder="Full Name"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 ml-2">Type of Help</label>
          <div className="relative">
            <HelpCircle className="absolute left-4 top-4 text-blue-400 w-5 h-5" />
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all appearance-none"
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option className="bg-[#002D62]">General Help</option>
              <option className="bg-[#002D62]">Clothing / Gear</option>
              <option className="bg-[#002D62]">Food / Water</option>
              <option className="bg-[#002D62]">Transportation</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 ml-2">Details</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 text-blue-400 w-5 h-5" />
            <textarea 
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 transition-all"
              placeholder="Tell us more about how we can help..."
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-[#001E41] font-black uppercase py-5 rounded-[2rem] transition-all active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </main>
  );
}