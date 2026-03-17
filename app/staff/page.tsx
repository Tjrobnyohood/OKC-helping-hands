"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { Shirt, Users, Calendar as CalIcon, ArrowLeft, RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function StaffAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to pull appointments from the database
  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('closet_appointments')
      .select('*')
      .order('appointment_date', { ascending: true });

    if (!error) setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-[#001E41] text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Link href="/" className="text-blue-400 flex items-center gap-2 mb-2 hover:text-orange-500 transition-all uppercase text-xs font-black tracking-widest">
              <ArrowLeft size={16} /> Public Hub
            </Link>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Staff <span className="text-orange-400 underline decoration-orange-500">Command</span>
            </h1>
          </div>
          <button 
            onClick={fetchAppointments}
            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10"
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#002D62] p-6 rounded-3xl border border-white/10 shadow-xl">
             <p className="text-xs font-black text-blue-300 uppercase tracking-widest mb-1">Total Bookings</p>
             <p className="text-4xl font-black italic text-orange-400">{appointments.length}</p>
          </div>
          <div className="bg-[#002D62] p-6 rounded-3xl border border-white/10 shadow-xl">
             <p className="text-xs font-black text-blue-300 uppercase tracking-widest mb-1">Next Service</p>
             <p className="text-4xl font-black italic text-blue-100 uppercase tracking-tighter">Closet</p>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="bg-[#002D62]/50 rounded-[2rem] border border-white/10 overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h2 className="font-bold flex items-center gap-2 uppercase italic tracking-tight">
              <Shirt className="text-orange-500" /> Dignity Closet Schedule
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-blue-300 uppercase text-[10px] font-black tracking-[0.2em]">
                  <th className="p-6">Neighbor Name</th>
                  <th className="p-6">Date</th>
                  <th className="p-6">Time Slot</th>
                  <th className="p-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-white/5 transition-all">
                    <td className="p-6 font-bold text-lg">{apt.neighbor_name}</td>
                    <td className="p-6 text-blue-100">{apt.appointment_date}</td>
                    <td className="p-6">
                      <span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-orange-500/20">
                        {apt.time_slot}
                      </span>
                    </td>
                    <td className="p-6">
                      <button className="text-white/20 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-10 text-center text-blue-200/40 italic">
                      No appointments scheduled yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}   