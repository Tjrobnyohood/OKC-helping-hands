import Link from 'next/link';
import { ChevronLeft, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string; // The '?' means this is optional
  isAdmin?: boolean;
}

export default function Header({ title, subtitle, isAdmin }: HeaderProps) {
  return (
    <nav className="max-w-4xl mx-auto mb-10 space-y-6">
      <div className="flex justify-between items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-orange-500 transition-colors group font-black uppercase tracking-widest text-[10px]"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
            <ChevronLeft size={16} />
          </div>
          Back to Hub
        </Link>

        {isAdmin && (
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <ShieldCheck size={12} />
            Admin Secure
          </div>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
          {title.split(' ')[0]} <span className="text-orange-500">{title.split(' ').slice(1).join(' ')}</span>
        </h1>
        {subtitle && (
          <p className="text-blue-300 text-xs font-bold uppercase tracking-[0.2em] mt-2 opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </nav>
  );
}