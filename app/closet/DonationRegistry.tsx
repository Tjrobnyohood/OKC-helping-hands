"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { ShoppingBag, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  item_name: string;
  current_stock: number;
  target_goal: number;
}

export default function DonationRegistry() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      const { data } = await supabase
        .from('closet_inventory')
        .select('id, item_name, current_stock, target_goal')
        .order('item_name');
      
      if (data) setItems(data);
      setLoading(false);
    };
    fetchInventory();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="text-orange-500" size={24} />
        <h3 className="text-xl font-black italic uppercase text-white tracking-tighter">
          Current <span className="text-orange-500">Needs</span>
        </h3>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="animate-pulse text-blue-300 text-xs italic uppercase">Syncing with Closet...</div>
        ) : (
          items.map((item) => {
            const percentage = Math.round((item.current_stock / item.target_goal) * 100);
            const isCritical = percentage < 30;
            const isFull = percentage >= 100;

            return (
              <div key={item.id} className="group">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h4 className="text-sm font-black uppercase text-white group-hover:text-orange-500 transition-colors">
                      {item.item_name}
                    </h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                      isCritical ? 'text-red-500 animate-pulse' : isFull ? 'text-green-400' : 'text-blue-300'
                    }`}>
                      {isCritical ? 'Critical Need' : isFull ? 'Stocked' : 'Low Stock'}
                    </p>
                  </div>
                  <span className="text-[10px] font-black text-white/40 italic">
                    {item.current_stock} / {item.target_goal}
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex items-center px-0.5">
                  <div 
                    className={`h-1 rounded-full transition-all duration-1000 ${
                      isCritical ? 'bg-red-500 shadow-[0_0_8px_rgba(239,66,52,0.6)]' : 
                      isFull ? 'bg-green-400' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-[10px] text-white/40 font-medium leading-relaxed italic">
          *Registry updates in real-time as items are processed by OKC Helping Hands volunteers.
        </p>
      </div>
    </div>
  );
}