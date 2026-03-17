"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase';
import { Trash2, Home, Activity, Target } from 'lucide-react';

// --- TYPESCRIPT DEFINITIONS (Fixes the "any" errors) ---
interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  unit?: string;
}

// --- HELPER COMPONENT ---
const MetricCard = ({ icon, value, label, color, unit = "" }: MetricCardProps) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-4xl font-black italic text-white mb-1 tracking-tighter">
        {value} {unit && <span className="text-sm uppercase not-italic">{unit}</span>}
      </span>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${color}`}>
        {label}
      </span>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export default function ImpactTicker() {
  const [stats, setStats] = useState({ families: 0, debris: 0, activeRequests: 0 });
  
  // Annual goals for OKC Helping Hands
  const DEBRIS_GOAL = 20000; 
  const progressPercentage = Math.min(Math.round((stats.debris / DEBRIS_GOAL) * 100), 100);

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Fetch Families
      const { count: familyCount } = await supabase
        .from('community_needs')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'delivered');

      // 2. Fetch Debris
      const { data: debrisData } = await supabase
        .from('community_needs')
        .select('debris_weight')
        .eq('status', 'delivered');
      
      const totalDebris = debrisData?.reduce((acc, curr) => acc + (Number(curr.debris_weight) || 0), 0) || 0;

      // 3. Fetch Active Ops
      const { count: activeCount } = await supabase
        .from('community_needs')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'delivered');

      setStats({ 
        families: familyCount || 0, 
        debris: totalDebris, 
        activeRequests: activeCount || 0 
      });
    };

    fetchStats();
  }, []);

  return (
    <section className="max-w-5xl mx-auto my-12 px-6 font-sans">
      {/* Top Row: The Big Three Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          icon={<Home size={40}/>} 
          value={`${stats.families}+`} 
          label="Families Supported" 
          color="text-orange-500" 
        />
        <MetricCard 
          icon={<Trash2 size={40}/>} 
          value={stats.debris.toLocaleString()} 
          label="Lbs Debris Removed" 
          color="text-blue-400" 
          unit="Lbs" 
        />
        <MetricCard 
          icon={<Activity size={40}/>} 
          value={stats.activeRequests} 
          label="Live Field Ops" 
          color="text-white" 
        />
      </div>

      {/* Bottom Row: Goal Progress Tracker */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl border-l-4 border-l-orange-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <Target size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">2026 Cleanup Mission</span>
            </div>
            <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
              Road to <span className="text-orange-500">{DEBRIS_GOAL.toLocaleString()} Lbs</span>
            </h3>
          </div>
          <div className="text-left md:text-right">
            <span className="text-4xl font-black italic text-white">{progressPercentage}%</span>
            <p className="text-[10px] font-bold text-white/40 uppercase">Mission Complete</p>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1">
          <div 
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(239,66,52,0.5)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="mt-4 text-[11px] text-blue-200/60 font-medium italic">
          *Real-time data verified by OKC Helping Hands Field Operations.
        </p>
      </div>
    </section>
  );
}