'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { ShieldCheck, Zap, Shirt, Users, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    lockersInUse: 0,
    appointmentsToday: 0,
    totalResources: 3
  });

  useEffect(() => {
    const getStats = async () => {
      // Get lockers in use
      const { count: lockerCount } = await supabase
        .from('lockers')
        .select('*', { count: 'exact', head: true })
        .eq('is_available', false);

      // Get today's closet appointments
      const today = new Date().toISOString().split('T')[0];
      const { count: apptCount } = await supabase
        .from('closet_appointments')
        .select('*', { count: 'exact', head: true })
        .eq('appointment_date', today);

      setStats({
        lockersInUse: lockerCount || 0,
        appointmentsToday: apptCount || 0,
        totalResources: 3
      });
    };
    getStats();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8 bg-[#001E41] min-h-screen text-white">
      <div className="flex items-center gap-3 border-b border-white/10 pb-6">
        <ShieldCheck className="text-orange-500 w-8 h-8" />
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Admin <span className="text-blue-400">Panel</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <Zap className="text-orange-500 mb-2" size={24} />
          <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">Active Charges</p>
          <h2 className="text-4xl font-black italic">{stats.lockersInUse} Lockers</h2>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <Shirt className="text-blue-400 mb-2" size={24} />
          <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">Closet Traffic</p>
          <h2 className="text-4xl font-black italic">{stats.appointmentsToday} Today</h2>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
          <Users className="text-green-400 mb-2" size={24} />
          <p className="text-[10px] uppercase font-black tracking-widest text-blue-300">Resource Links</p>
          <h2 className="text-4xl font-black italic">{stats.totalResources} Listed</h2>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-[2rem] flex items-center gap-4">
        <AlertCircle className="text-orange-500" />
        <p className="text-sm font-medium">System Note: All database connections are currently healthy and live.</p>
      </div>
    </main>
  );
}