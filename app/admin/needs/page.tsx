"use client";
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/app/utils/supabase';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/header';
import { CheckCircle2, Clock, Truck, Trash2, LogOut } from 'lucide-react';

export default function AdminNeeds() {
  const [needs, setNeeds] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  const fetchNeeds = useCallback(async () => {
    const { data } = await supabase
      .from('community_needs')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setNeeds(data);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setAuthorized(true);
        fetchNeeds();
      }
    };
    checkUser();
  }, [router, fetchNeeds]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('community_needs')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchNeeds();
  };

  const updateDebris = async (id: number, weight: string) => {
    const { error } = await supabase
      .from('community_needs')
      .update({ debris_weight: parseInt(weight) || 0 })
      .eq('id', id);
    if (!error) fetchNeeds();
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'in-progress': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    }
  };

  if (!authorized) return <div className="min-h-screen bg-[#001E41]" />;

  return (
    <main className="min-h-screen bg-[#001E41] p-6 text-white font-sans">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-4">
        <Header title="Needs Command" subtitle="Operational Logistics" isAdmin={true} />
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
        >
          <LogOut size={14} /> Exit System
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">
              <th className="p-6">Community Member</th>
              <th className="p-6">Requirement</th>
              <th className="p-6">Debris (Lbs)</th>
              <th className="p-6">Live Status</th>
              <th className="p-6 text-right">Update Phase</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {needs.map((need) => (
              <tr key={need.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6">
                  <div className="font-bold text-white tracking-tight">{need.requester_name}</div>
                  <div className="text-[10px] uppercase font-black text-white/40 mt-1">{need.neighborhood || 'OKC SECTOR'}</div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">{need.item_needed}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-white/60">x{need.quantity_needed}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 bg-[#001E41] border border-white/10 rounded-xl px-3 py-1 w-24 focus-within:border-blue-400 transition-all">
                    <Trash2 size={12} className="text-white/30" />
                    <input 
                      type="number"
                      placeholder="0"
                      className="bg-transparent w-full text-xs font-bold outline-none text-blue-400"
                      value={need.debris_weight || ''}
                      onChange={(e) => updateDebris(need.id, e.target.value)}
                    />
                  </div>
                </td>
                <td className="p-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${getStatusStyle(need.status || 'pending')}`}>
                    {need.status === 'delivered' && <CheckCircle2 size={10} />}
                    {need.status === 'in-progress' && <Truck size={10} />}
                    {need.status === 'pending' || !need.status && <Clock size={10} />}
                    {need.status || 'pending'}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <select 
                    value={need.status || 'pending'}
                    onChange={(e) => updateStatus(need.id, e.target.value)}
                    className="bg-[#001E41] border border-white/10 rounded-xl px-3 py-1 text-xs font-bold text-blue-400 outline-none focus:border-blue-400 transition-all cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}