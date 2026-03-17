"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabase'; // Using the '@' alias for safety

export default function AdminNeeds() {
  const [needs, setNeeds] = useState<any[]>([]);

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = async () => {
    // We select location_area now too!
    const { data } = await supabase
      .from('community_needs')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setNeeds(data);
  };

  const markPickedUp = async (id: number) => {
    await supabase.from('community_needs').update({ is_picked_up: true, status: 'delivered' }).eq('id', id);
    fetchNeeds(); 
  };

  return (
    <main className="min-h-screen bg-[#001E41] p-6 text-white font-sans">
      <h1 className="text-4xl font-black mb-2">Needs Command</h1>
      <p className="text-white/60 mb-6">Mutual Aid Dashboard</p>

      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white/5 rounded-2xl overflow-hidden">
          <thead>
            <tr className="border-b border-white/10 text-orange-500 uppercase text-[10px] font-black tracking-[0.2em]">
              <th className="p-6">Requester / Area</th>
              <th className="p-6">Item (Qty)</th>
              <th className="p-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {needs.map(need => (
              <tr key={need.id} className="border-b border-white/5 hover:bg-white/10 transition-colors">
                <td className="p-6">
                  <div className="font-bold text-white text-lg">{need.requester_name}</div>
                  <div className="text-blue-400 font-black text-xs uppercase italic">{need.location_area || 'OKC Area'}</div>
                  <div className="text-[10px] opacity-50 mt-1">Family of {need.family_size}</div>
                </td>
                <td className="p-6">
                  <span className="text-orange-500 font-bold">{need.item_needed}</span>
                  <span className="text-white/40 ml-2">x{need.quantity_needed}</span>
                </td>
                <td className="p-6 text-right">
                  {!need.is_picked_up ? (
                    <button 
                      onClick={() => markPickedUp(need.id)} 
                      className="bg-blue-600 hover:bg-orange-500 text-white font-black px-4 py-2 rounded-xl text-[10px] uppercase transition-all active:scale-95"
                    >
                      Mark Picked Up
                    </button>
                  ) : (
                    <span className="text-green-500 font-black text-[10px] uppercase italic">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}