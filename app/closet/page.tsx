"use client";

import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Shirt, Calendar, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
// Import our new impact components
import DonationRegistry from '@/app/closet/DonationRegistry';
import NeighborhoodIndex from '@/app/components/NeighborhoodIndex';

export default function DignityCloset() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [booked, setBooked] = useState(false);

  const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // NOTE: Ensure your Supabase table column name is 'neighbor_name' or 'visitor_name'
    const { error } = await supabase
      .from('closet_appointments')
      .insert([{ neighbor_name: name, appointment_date: date, time_slot: slot }]);

    if (!error) {
      setBooked(true);
    } else {
      alert("Error booking: " + error.message);
    }
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-[#001E41] flex items-center justify-center p-6 text-center">
        <div className="bg-white/5 border border-blue-400 p-10 rounded-[3rem] max-w-md">
          <CheckCircle className="text-orange-500 w-20 h-20 mx-auto mb-6" />
          <h2 className="text-3xl font-black italic uppercase text-white">Confirmed!</h2>
          <p className="text-blue-200 mt-4 mb-8 italic">"Dress for the job you want, for God has given you the strength to do it."</p>
          <Link href="/" className="bg-orange-500 text-[#001E41] px-8 py-3 rounded-xl font-bold uppercase tracking-tighter">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001E41] text-white p-6">
      <Link href="/" className="flex items-center gap-2 text-blue-400 mb-8 hover:text-orange-500 transition-colors">
        <ArrowLeft size={20} /> Back to Hub
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-orange-500 rounded-2xl">
            <Shirt className="text-[#001E41]" size={32} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Dignity <span className="text-orange-500">Closet</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: The Booking Form */}
          <form onSubmit={handleBooking} className="space-y-6 bg-white/5 p-8 rounded-[2rem] border border-white/10 h-fit">
            <h3 className="text-xl font-bold italic uppercase text-blue-400">Book a Visit</h3>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">Neighbor Name</label>
              <input 
                required
                className="w-full bg-[#002D62] border border-white/10 rounded-xl p-4 focus:border-orange-500 outline-none transition-all"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> Date
                </label>
                <input 
                  required
                  type="date"
                  className="w-full bg-[#002D62] border border-white/10 rounded-xl p-4 focus:border-orange-500 outline-none transition-all text-white"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2 flex items-center gap-2">
                  <Clock size={14} /> Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSlot(time)}
                      className={`p-3 rounded-xl text-[10px] font-bold transition-all border ${
                        slot === time ? 'bg-orange-500 border-orange-500 text-[#001E41]' : 'bg-white/5 border-white/10 text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-[#001E41] py-5 rounded-2xl font-black uppercase italic tracking-tighter shadow-xl shadow-orange-500/20 transition-all">
              Request Appointment
            </button>
          </form>

          {/* RIGHT COLUMN: Live Stock Levels */}
          <div className="space-y-6">
            <DonationRegistry />
          </div>
        </div>

        {/* BOTTOM SECTION: The Neighborhood Heatmap */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <NeighborhoodIndex />
        </div>
      </div>
    </div>
  );
}