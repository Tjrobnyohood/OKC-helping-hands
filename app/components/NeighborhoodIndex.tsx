"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { MapPin, AlertCircle, BarChart3, Info } from 'lucide-react';

interface NeighborhoodStat {
  neighborhood: string;
  total_needs: number;
  debris_total: number;
}

export default function NeighborhoodIndex() {
  const [stats, setStats] = useState<NeighborhoodStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeighborhoodData = async () => {
      // We fetch all delivered/pending needs to see the geographic spread
      const { data, error } = await supabase
        .from('community_needs')
        .select('neighborhood, debris_weight, status');

      if (data) {
        // Grouping logic: Organize data by neighborhood name
        const grouped = data.reduce((acc: any, curr) => {
          const name = curr.neighborhood || "Unspecified";
          if (!acc[name]) {
            acc[name] = { neighborhood: name, total_needs: 0, debris_total: 0 };
          }
          acc[name].total_needs += 1;
          acc[name].debris_total += (Number(curr.debris_weight) || 0);
          return acc;
        }, {});

        // Convert back to array and sort by most needs first
        const sortedStats = Object.values(grouped) as NeighborhoodStat[];
        setStats(sortedStats.sort((a, b) => b.total_needs - a.total_needs));
      }
      setLoading(false);
    };

    fetchNeighborhoodData();
  }, []);

  return (
    <section className="max-w-5xl mx-auto my-16 px-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
            <MapPin className="text-orange-500" />
            OKC <span className="text-orange-500">Service Heatmap</span>
          </h2>
          <p className="text-blue-200/60 text-sm font-medium mt-1 uppercase tracking-widest">
            Geographic distribution of community support
          </p>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl flex items-center gap-3">
          <Info size={18} className="text-orange-500" />
          <p className="text-[10px] text-orange-200 leading-tight uppercase font-bold">
            Data available for<br/>partner agencies
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-white animate-pulse italic">Scanning OKC Neighborhoods...</div>
        ) : stats.length === 0 ? (
          <div className="bg-white/5 border border-white/10 p-12 rounded-[2rem] text-center">
            <AlertCircle className="mx-auto text-white/20 mb-4" size={48} />
            <p className="text-white/40 italic uppercase text-xs font-black tracking-widest">No geographic data logged yet</p>
          </div>
        ) : (
          stats.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all border-l-4 border-l-blue-400 group"
            >
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 bg-blue-400/10 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-navy transition-all">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black italic uppercase tracking-tight text-xl">
                    {item.neighborhood}
                  </h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.1em]">
                    Service Intensity: {item.total_needs > 10 ? 'High' : 'Moderate'}
                  </p>
                </div>
              </div>

              <div className="flex gap-12 text-right">
                <div className="hidden md:block">
                  <span className="block text-white font-black italic text-2xl tracking-tighter">{item.debris_total.toLocaleString()} Lbs</span>
                  <span className="block text-[10px] text-blue-400 font-black uppercase tracking-widest">Total Debris</span>
                </div>
                <div>
                  <span className="block text-orange-500 font-black italic text-2xl tracking-tighter">{item.total_needs}</span>
                  <span className="block text-[10px] text-orange-500/50 font-black uppercase tracking-widest">Requests</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 text-center bg-blue-400/5 p-4 rounded-xl border border-blue-400/10">
        <p className="text-[11px] text-blue-300 italic font-medium">
          "OKC Helping Hands provides these metrics to assist City Planning and other NGO partners in resource allocation."
        </p>
      </div>
    </section>
  );
}