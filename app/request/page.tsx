"use client";
import { useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { Send, MapPin, Users, Package, Heart } from 'lucide-react';

export default function RequestPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ 
    requester_name: '', 
    item_needed: '', 
    family_size: 1,
    neighborhood: '', 
    quantity_needed: 1 
  });

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Matches your Supabase screenshot + our new columns
    const { error } = await supabase.from('community_needs').insert([{
      requester_name: form.requester_name,
      family_size: form.family_size,
      item_needed: form.item_needed,
      neighborhood: form.neighborhood,
      quantity_needed: form.quantity_needed,
      status: 'pending'
    }]);

    if (!error) {
      setSubmitted(true);
    } else {
      console.error(error);
      alert("Error saving to database. Check console.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#001E41] flex items-center justify-center p-6">
        <div className="bg-white/5 border border-orange-500 p-12 rounded-[3rem] text-center max-w-md backdrop-blur-xl">
          <Heart className="text-orange-500 w-16 h-16 mx-auto mb-6 fill-orange-500/20" />
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Request Logged</h2>
          <p className="text-blue-200 mt-4 mb-8 italic text-sm">Help is on the way. We have notified our field ops team.</p>
          <button onClick={() => setSubmitted(false)} className="bg-orange-500 text-[#001E41] px-8 py-3 rounded-xl font-bold uppercase text-xs">New Request</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#001E41] text-white p-6">
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
          OKC <span className="text-orange-500">Intake</span>
        </h1>

        <form onSubmit={sendRequest} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Requester Name</label>
            <input required className="w-full bg-[#002a5a] border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500" 
              value={form.requester_name} onChange={e => setForm({...form, requester_name: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest flex items-center gap-1">
                <MapPin size={12}/> Neighborhood
              </label>
              <input required className="w-full bg-[#002a5a] border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-500" 
                placeholder="e.g. Capitol Hill"
                value={form.neighborhood} onChange={e => setForm({...form, neighborhood: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest flex items-center gap-1">
                <Users size={12}/> Family Size
              </label>
              <input type="number" className="w-full bg-[#002a5a] border border-white/10 p-4 rounded-2xl outline-none" 
                value={form.family_size} onChange={e => setForm({...form, family_size: parseInt(e.target.value)})} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Item(s) Needed</label>
              <input required className="w-full bg-[#002a5a] border border-white/10 p-4 rounded-2xl outline-none" 
                placeholder="Size 10 Shoes, Tarp, etc"
                value={form.item_needed} onChange={e => setForm({...form, item_needed: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Quantity</label>
              <input type="number" className="w-full bg-[#002a5a] border border-white/10 p-4 rounded-2xl outline-none" 
                value={form.quantity_needed} onChange={e => setForm({...form, quantity_needed: parseInt(e.target.value)})} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-orange-600 py-5 rounded-2xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-3 transition-all">
            {loading ? "Syncing..." : <><Send size={18}/> Submit to Field Ops</>}
          </button>
        </form>
      </div>
    </main>
  );
}