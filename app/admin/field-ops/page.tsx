"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { CheckCircle2, Clock, MapPin, Users, Package, RefreshCw } from 'lucide-react';

interface NeedRequest {
  id: number;
  requester_name: string;
  neighborhood: string;
  item_needed: string;
  family_size: number;
  status: string;
  created_at: string;
}

export default function FieldOpsDashboard() {
  const [requests, setRequests] = useState<NeedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('community_needs')
      .select('*')
      .eq('status', 'pending') // Only show active needs
      .order('created_at', { ascending: false });
    
    if (data) setRequests(data);
    setLoading(false);
  };

  const markResolved = async (id: number) => {
    const { error } = await supabase
      .from('community_needs')
      .update({ status: 'resolved' })
      .eq('id', id);

    if (!error) {
      setRequests(requests.filter(r => r.id !== id));
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  return (
    <main className="min-h-screen bg-[#001E41] p-8 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">
              Field <span className="text-orange-500">Ops</span>
            </h1>
            <p className="text-blue-300/50 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Active Neighborhood Missions</p>
          </div>
          <button onClick={fetchRequests} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-20 rounded-[3rem] text-center">
            <CheckCircle2 className="mx-auto text-green-400 mb-4" size={48} />
            <p className="text-white/40 italic font-black uppercase tracking-widest text-xs">All missions clear. Great work team.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-blue-400/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Clock size={14} className="text-white/20" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center text-[#001E41]">
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-black italic uppercase text-lg tracking-tight leading-none">{req.requester_name}</h3>
                      <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">Family of {req.family_size}</p>
                    </div>
                  </div>

                  <div className="space-y-2 py-4 border-y border-white/5">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <MapPin size={14} className="text-orange-500" />
                      <span className="uppercase text-white/80">{req.neighborhood || 'Unspecified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Package size={14} className="text-blue-400" />
                      <span className="text-white">{req.item_needed}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => markResolved(req.id)}
                    className="w-full bg-blue-600 hover:bg-green-500 text-white py-4 rounded-xl font-black uppercase italic tracking-tighter text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} /> Mark Delivered
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