import Link from 'next/link';
import { MapPin, Phone, Search, ChevronLeft } from 'lucide-react';

export default function ResourceIndex() {
  const categories = ['All', 'Food', 'Shelter', 'Medical', 'Hygiene'];

  return (
    <main className="min-h-screen bg-[#001E41] p-6 text-white font-sans">
      
      {/* 1. The Back Button Header */}
      <nav className="max-w-4xl mx-auto mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-orange-500 transition-colors group font-black uppercase tracking-widest text-xs"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
            <ChevronLeft size={18} />
          </div>
          Back to Hub
        </Link>
    </nav>

    {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-blue-400" />
          <input 
            type="text" 
            placeholder="Search for resources..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button key={cat} className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-xs font-bold uppercase tracking-widest whitespace-nowrap hover:bg-orange-500 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 group hover:border-blue-400/50 transition-all">
          <h2 className="text-xl font-black italic uppercase text-orange-500 mb-2">OKC Day Shelter</h2>
          <p className="text-sm text-blue-100/70 mb-4 line-clamp-2">Providing safe shelter, showers, and laundry services for those in transition.</p>
          <div className="flex flex-wrap gap-4 text-xs font-bold">
            <span className="flex items-center gap-1 text-blue-300"><MapPin size={14}/> 123 N Broadway</span>
            <span className="flex items-center gap-1 text-blue-300"><Phone size={14}/> 405-555-0199</span>
          </div>
        </div>
      </div>
    </main>
  );
}