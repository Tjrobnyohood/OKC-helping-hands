'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { BatteryCharging, Lock, Unlock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PowerPage() {
  const [lockers, setLockers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLockers = async () => {
      const { data, error } = await supabase
        .from('lockers')
        .select('*')
        .order('locker_number', { ascending: true });
      if (!error) setLockers(data);
      setLoading(false);
    };
    fetchLockers();
  }, []);

  const claimLocker = async (lockerId: number) => {
    const { error } = await supabase
      .from('lockers')
      .update({ is_available: false })
      .eq('id', lockerId);

    if (error) {
      alert("Error claiming locker");
    } else {
      setLockers(prev => prev.map(l => l.id === lockerId ? { ...l, is_available: false } : l));
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-[#001E41]">
      {/* The rest of your code (the .map and Instructions) goes here */}
      <div className="space-y-4">
        {lockers.map((locker) => (
            <div 
              key={locker.id}
              className={`p-6 rounded-3xl border transition-all ${
                locker.is_available 
                ? 'bg-white/5 border-white/10 hover:border-orange-500/50' 
                : 'bg-red-500/10 border-red-500/20 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl font-black italic text-white/20">#{locker.locker_number}</span>
                {locker.is_available ? (
                  <Unlock className="text-green-400 w-5 h-5" />
                ) : (
                  <Lock className="text-red-400 w-5 h-5" />
                )}
              </div>
              
              <p className={`font-bold uppercase text-xs tracking-widest ${locker.is_available ? 'text-blue-400' : 'text-red-400'}`}>
                {locker.is_available ? 'Available' : 'In Use'}
              </p>

              {locker.is_available && (
                <button className="mt-4 w-full py-2 bg-orange-500 text-[#001E41] font-black text-[10px] uppercase rounded-xl hover:bg-orange-400 transition-colors">
                  Claim Locker
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Instructions */}
      <section className="bg-white/5 rounded-2xl p-4 border border-white/5">
        <p className="text-[10px] text-blue-300 uppercase font-black mb-2">Safety Note</p>
        <p className="text-xs text-white/60 leading-relaxed">
          Devices left for more than 4 hours will be moved to secure storage by Hub staff. Please keep your locker ID safe.
        </p>
      </section>
    </main>
  );
}