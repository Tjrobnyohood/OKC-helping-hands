'use client';
import React from 'react';
import { 
  Target, Shield, Zap, Heart, Users, 
  ArrowRight, Globe, Eye, Scale
} from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-[#001E41] text-white font-sans pb-24 overflow-x-hidden">
      
      {/* 1. ATMOSPHERE */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-16">
        
        {/* HEADER */}
        <header className="pt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/30">
            <Target size={14} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">The 2026 Blueprint</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Operation <span className="text-orange-500">Rooted</span>
          </h1>
          <p className="text-blue-300/60 font-bold italic text-lg max-w-xl mx-auto uppercase tracking-tight">
            "A Circular Economy of Dignity, Safety, and Skill in OKC."
          </p>
        </header>

        {/* 2. THE THREE CORE MANDATES */}
        <section className="grid md:grid-cols-3 gap-6">
          <MandateCard 
            icon={<Zap />} 
            title="Immediate Relief" 
            desc="AI-driven inventory matching for clothes, food, and power."
          />
          <MandateCard 
            icon={<Users />} 
            title="Skill Wealth" 
            desc="Elders teaching youth (Legacy Labs) and bartering expertise (Skill Swap)."
          />
          <MandateCard 
            icon={<Shield />} 
            title="Active Safety" 
            desc="Discreet protection and awareness for Human Trafficking prevention."
          />
        </section>

        {/* 3. CURRENT OPERATIONAL SCOPE */}
        <section className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-8">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <Eye className="text-blue-400" />
            <h2 className="text-2xl font-black italic uppercase italic">Scope <span className="text-blue-400">Inventory</span></h2>
          </div>

          <div className="grid gap-8">
            <ScopeItem 
              label="The Hub" 
              status="Online" 
              details="Digital request portal, Inventory management, and Impact tracking." 
            />
            <ScopeItem 
              label="The Vindicators" 
              status="Deploying" 
              details="Micro-volunteering for 'Flash Tasks' like trash cleanup and loading." 
            />
            <ScopeItem 
              label="The Exchange" 
              status="Building" 
              details="Barter-based Skill Swap and Beauty School (Dignity Day) partnerships." 
            />
            <ScopeItem 
              label="Guardian Gate" 
              status="Proposed" 
              details="Trauma-informed safety signals for those in high-risk environments." 
            />
          </div>
        </section>

        {/* 4. THE VISION STATEMENT */}
        <section className="text-center py-10 space-y-6">
          <p className="text-blue-100/40 italic font-medium leading-loose text-lg max-w-2xl mx-auto">
            "We don't give handouts; we build hand-ups. By connecting the waste of the city (unused resources) to the will of the city (the neighbors), we create a network that is impossible to break."
          </p>
          <div className="h-px w-24 bg-orange-500 mx-auto" />
          <Link href="/community" className="inline-flex items-center gap-3 text-orange-500 font-black uppercase tracking-widest text-xs hover:gap-5 transition-all">
            Back to the Exchange <ArrowRight size={16} />
          </Link>
        </section>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function MandateCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-4 hover:bg-orange-500 transition-all group">
      <div className="text-orange-500 group-hover:text-[#001E41] transition-colors">{icon}</div>
      <h3 className="text-xl font-black italic uppercase group-hover:text-[#001E41]">{title}</h3>
      <p className="text-xs font-bold text-blue-100/60 leading-relaxed group-hover:text-[#001E41]/80">{desc}</p>
    </div>
  );
}

function ScopeItem({ label, status, details }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="md:w-40">
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{status}</span>
        <h4 className="text-lg font-black italic uppercase">{label}</h4>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-blue-100/60 italic leading-relaxed">{details}</p>
      </div>
    </div>
  );
}