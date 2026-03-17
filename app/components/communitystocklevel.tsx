"use client";
import React from 'react';
import { ShoppingBag, Star, AlertTriangle } from 'lucide-react';

interface NeedItem {
  item: string;
  status: 'Critical' | 'Low' | 'Stable';
  percentage: number; // 0 to 100 (100 = full/no need, 10 = empty/high need)
}

export default function DonationRegistry() {
  const needs: NeedItem[] = [
    { item: "Work Boots & Shoes", status: 'Critical', percentage: 15 },
    { item: "Pillows & Bedding", status: 'Low', percentage: 40 },
    { item: "Winter Coats", status: 'Stable', percentage: 85 },
    { item: "Hygiene Kits", status: 'Critical', percentage: 5 },
  ];

  return (
    <section className="max-w-5xl mx-auto my-16 px-6 font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
          <ShoppingBag className="text-orange-500" />
          Closet <span className="text-orange-500">Registry</span>
        </h2>
        <p className="text-blue-200/60 text-sm font-medium mt-1 uppercase tracking-widest">
          Check our real-time inventory before you donate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {needs.map((need, index) => (
          <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-black italic uppercase text-lg">{need.item}</h4>
                <div className={`flex items-center gap-2 mt-1 ${
                  need.status === 'Critical' ? 'text-red-500' : 
                  need.status === 'Low' ? 'text-orange-500' : 'text-green-400'
                }`}>
                  {need.status === 'Critical' && <AlertTriangle size={14} className="animate-pulse" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{need.status} Need</span>
                </div>
              </div>
              <Star className={need.status === 'Critical' ? 'text-orange-500 fill-orange-500' : 'text-white/10'} size={20} />
            </div>

            {/* The Gauge */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                <span>In Stock</span>
                <span>{need.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    need.status === 'Critical' ? 'bg-red-500' : 
                    need.status === 'Low' ? 'bg-orange-500' : 'bg-green-400'
                  }`}
                  style={{ width: `${need.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-orange-600 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_10px_30px_rgba(239,66,52,0.3)]">
        <p className="text-white font-black italic uppercase tracking-tight text-lg">
          Have these items? Drop-off is Mon-Fri, 9am - 4pm.
        </p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-black uppercase italic text-sm hover:scale-105 transition-transform">
          Schedule Donation
        </button>
      </div>
    </section>
  );
}