'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function InventoryManager() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push('/login'); // Boot them out if not logged in
      else setUser(user);
    };
    checkUser();
  }, [router]);

  if (!user) return null;

  return (
    <main className="p-8 bg-[#001E41] min-h-screen text-white">
      <h1 className="text-2xl font-black italic uppercase">Closet <span className="text-orange-500">Inventory</span></h1>
      {/* Here you would list your closet items from Supabase */}
      <div className="mt-8 p-6 bg-white/5 border border-dashed border-white/20 rounded-3xl text-center">
        <p className="text-blue-200/50 italic">Inventory database connection active...</p>
      </div>
    </main>
  );
}