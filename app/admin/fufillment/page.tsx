'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { CheckCircle2, Package, Clock, User, ArrowLeft, ChevronRight, MapPin, Zap, Truck } from 'lucide-react';
import Link from 'next/link';

export default function AdminFulfillment() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'pending')
      .order('location_zone', { ascending: true }) // Group by Quadrant
      .order('created_at', { ascending: false });

    if (!error) setRequests(data);
    setLoading(false);
  }

  const handleFulfillAndDeduct = async (requestId: number, manifest: any[]) => {
    setProcessingId(requestId);
    try {
      for (const entry of manifest) {
        const { data: invItem } = await supabase
          .from('inventory')
          .select('id, quantity')
          .ilike('item_name', `%${entry.item}%`)
          .eq('size', entry.size)
          .single();

        if (invItem && invItem.quantity >= parseInt(entry.qty)) {
          await supabase
            .from('inventory')
            .update({ quantity: invItem.quantity - parseInt(entry.qty) })
            .eq('id', invItem.id);
        }
      }

      await supabase.from('requests').update({ status: 'completed' }).eq('id', requestId);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setProcessingId(null);
    }
  };

  // Helper to group requests by their Zone (NW, NE, etc)
  const zones = ['NW OKC', 'NE OKC', 'SW OKC', 'SE OKC'];

  if (loading) return <div className="min-h-screen bg-[#001E41] flex items-center justify-center text-orange-500 font-black italic uppercase tracking-[0.3em] animate-pulse text-sm">Organizing Hub Logistics...</div>;

  return (
    <main className="min-h-screen bg-[#001E41] p-6 pb-32 text-white font-sans overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 flex justify-between items-end relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <Link href="/" className="hover:text-orange-500 transition-colors"><ArrowLeft size={18} /></Link>
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Control Center</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
            Dispatch <span className="text-orange-500">& Fulfillment</span>
          </h1>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4 backdrop-blur-md">
           <div className="text-right">
             <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active Requests</p>
             <p className="text-xl font-black italic text-white leading-none">{requests.length}</p>
           </div>
           <Truck className="text-orange-500" size={24} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {zones.map(zone => {
          const zoneRequests = requests.filter(r => r.location_zone === zone);
          if (zoneRequests.length === 0) return null;

          return (
            <section key={zone} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Zone Divider */}
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-[#001E41] font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest italic shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                  {zone}
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {zoneRequests.map((req) => (
                  <div key={req.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl flex flex-col hover:border-blue-500/40 transition-all">
                    
                    {/* Neighbor Top Bar */}
                    <div className="p-6 bg-white/5 flex justify-between items-center border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white italic shadow-lg">
                          {req.full_name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-black uppercase italic tracking-tight text-white">{req.full_name}</h3>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-blue-400/60 uppercase">
                            <Clock size={10} /> {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <MapPin size={18} className="text-orange-500/40" />
                    </div>

                    {/* AI Checklist Area */}
                    <div className="p-8 flex-1 space-y-6">
                      <div className="space-y-3">
                        {req.ai_manifest?.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="text-orange-500 font-black italic text-sm">{item.qty}x</span>
                              <span className="text-[11px] font-black uppercase tracking-wide text-blue-100">{item.item}</span>
                            </div>
                            <span className="text-[9px] font-black bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20 uppercase">
                              {item.size}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl border border-dashed border-white/10 text-[10px] text-white/40 italic leading-relaxed">
                        "{req.message}"
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-6 pt-0">
                      <button 
                        disabled={processingId === req.id}
                        onClick={() => handleFulfillAndDeduct(req.id, req.ai_manifest)}
                        className="w-full bg-blue-600 hover:bg-orange-500 text-white hover:text-[#001E41] font-black uppercase py-5 rounded-[1.8rem] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 tracking-widest text-[10px]"
                      >
                        {processingId === req.id ? 'Updating Hub...' : 'Fulfill & Sync Stock'}
                        <Zap size={14} className="group-hover:scale-125 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {requests.length === 0 && (
          <div className="text-center py-32 bg-white/5 rounded-[3.5rem] border border-dashed border-white/10">
            <CheckCircle2 className="mx-auto text-orange-500 mb-6 opacity-20" size={64} />
            <h2 className="text-2xl font-black uppercase italic text-white/20 tracking-tighter">All Quadrants Clear</h2>
            <p className="text-[10px] font-bold text-blue-400/20 uppercase tracking-[0.5em] mt-2">Standing by for new requests</p>
          </div>
        )}
      </div>

      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </main>
  );
}