'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Trash2, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminCommunity() {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase.from('community_comments').select('*').order('created_at', { ascending: false });
      if (data) setComments(data);
    };
    fetchComments();
  }, []);

  const deleteComment = async (id: number) => {
    const { error } = await supabase.from('community_comments').delete().eq('id', id);
    if (!error) setComments(comments.filter(c => c.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-[#001E41] min-h-screen text-white">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 bg-white/5 rounded-xl"><ArrowLeft size={20}/></Link>
        <h1 className="text-2xl font-black uppercase italic text-orange-500">Moderation <span className="text-white">Panel</span></h1>
      </div>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center group">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{c.author_name}</p>
              <p className="text-sm text-white/80">{c.comment_text}</p>
            </div>
            <button 
              onClick={() => deleteComment(c.id)}
              className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}