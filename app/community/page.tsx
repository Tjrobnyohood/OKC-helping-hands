'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { MessageCircle, Heart, Star, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

// Make sure this is named exactly like the file folder
export default function CommunityPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ name: '', text: '' });

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from('community_comments')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setComments(data);
    };
    fetchComments();
  }, []);

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    const { data, error } = await supabase
      .from('community_comments')
      .insert([{ author_name: newComment.name, comment_text: newComment.text }])
      .select();

    if (!error && data) {
      setComments([data[0], ...comments]);
      setNewComment({ name: '', text: '' });
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen bg-[#001E41] pb-24 text-white">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 bg-white/5 rounded-xl hover:bg-white/10">
          <ArrowLeft className="text-blue-400" />
        </Link>
        <h1 className="text-2xl font-black italic uppercase italic">
          OKC <span className="text-orange-500">Impact</span>
        </h1>
      </div>

      <section className="space-y-4">
        <div className="bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/30 p-6 rounded-[2rem]">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-orange-500 fill-orange-500" size={18} />
            <span className="text-xs font-black uppercase tracking-widest text-orange-500">Latest Update</span>
          </div>
          <p className="font-bold text-lg leading-tight italic text-white">
            "OKC Helping Hands is live! Checking in on our neighbors today."
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <form onSubmit={postComment} className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] space-y-4">
          <input 
            required
            placeholder="Your Name"
            value={newComment.name}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-orange-500 text-sm"
            onChange={(e) => setNewComment({...newComment, name: e.target.value})}
          />
          <textarea 
            required
            placeholder="Leave a shoutout..."
            value={newComment.text}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-orange-500 text-sm h-24"
            onChange={(e) => setNewComment({...newComment, text: e.target.value})}
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black uppercase py-4 rounded-2xl transition-all text-xs tracking-widest">
            Post Shoutout
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-white/5 border border-white/5 p-6 rounded-[2rem]">
              <div className="flex justify-between items-start mb-2">
                <span className="font-black italic text-orange-500 uppercase text-sm">{c.author_name}</span>
              </div>
              <p className="text-blue-100/70 text-sm">{c.comment_text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}