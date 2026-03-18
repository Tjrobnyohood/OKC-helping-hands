'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { 
  CheckCircle2, Package, User, MapPin, 
  Trash2, AlertCircle, Loader2, ArrowLeft, Shirt 
} from 'lucide-react';
import Link from 'next/link';

export default function FulfillmentPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (!error) setRequests(data || []);
    setLoading(false);
  };

  const handleComplete = async (request: any) => {
    setProcessingId(request.id);

    // 1. DEDUCT FROM INVENTORY (Based on the AI Manifest)
    if (request.ai_manifest) {
      for (const item of request.ai_manifest) {
        await supabase.rpc('deduct_inventory', { 
          item_id: item.id, 
          qty: item.qty 
        });
      }
    }

    // 2. UPDATE IMPACT STATS (Families +1, Items +Count)
    const itemCount = request.ai_manifest?.reduce((acc: number, i: any) => acc + i.qty, 0) || 1;
    await supabase.rpc('increment_impact', { row_label: 'Families Helped', amount: 1 });
    await supabase.rpc('increment_impact', { row_label: 'Clothes Given', amount: itemCount });

    // 3. MARK REQUEST AS FULFILLED
    const { error } = await supabase
      .from('requests')
      .update({ status: 'fulfilled' })
      .eq('id', request.id);

    if (!error) {
      setRequests(prev => prev.filter(r => r.id !== request.id));
    }
    setProcessingId(null);
  };

  return (
    <main className="min-h-screen bg-[#001E41] text-white p-6 pb-20 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">Mission <span className="text-orange-500">Control</span></h1>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Pending Requests</p>
            </div>
          </div>
          <div className="text-right">
             <span className="text-4xl font-black italic text-white/20">{requests.length}</span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 opacity-40 italic font-bold">No missions pending. All families served.</div>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400">
                      <User size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">{req.full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40">
                      <MapPin size={14} />
                      <span className="text-[10px] font-bold uppercase">{req.location_zone}</span>
                    </div>
                  </div>
                  <div className="text-[9px] font-black bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full border border-orange-500/20 uppercase">
                    Needs Fulfillment
                  </div>
                </div>

                {/* AI MANIFEST (The Items needed) */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                   <div className="flex items-center gap-2 mb-4 opacity-40">
                     <Shirt size={14} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Manifest</span>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     {req.ai_manifest?.map((item: any, idx: number) => (
                       <div key={idx} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                         <span className="font-bold text-blue-100 italic">{item.item_name} ({item.size})</span>
                         <span className="font-black text-orange-500">x{item.qty}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleComplete(req)}
                    disabled={processingId === req.id}
                    className="flex-1 bg-blue-600 hover:bg-orange-500 text-white font-black uppercase text-[10px] tracking-widest py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
                  >
                    {processingId === req.id ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={18} />}
                    Complete Mission
                  </button>
                  <button className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/20 hover:text-red-400 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}