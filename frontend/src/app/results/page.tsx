"use client";
import { useState, useEffect } from "react";
import { BarChart3, Lock, ShieldCheck, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const mockResults = [
  { id: 1, name: "Dr. Sarah Mitchell", party: "Innovate Forward", votes: 4520, color: "bg-blue-500" },
  { id: 2, name: "Marcus Thorne", party: "Liberty Alliance", votes: 3105, color: "bg-emerald-500" },
  { id: 3, name: "Elena Rodriguez", party: "Unity Green", votes: 1240, color: "bg-amber-500" },
];

export default function ResultsPage() {
  const totalVotes = mockResults.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Public Audit Dashboard</h1>
          <p className="text-sm font-bold text-slate-400 p-1 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Live Verification Source: Block-Chain-912
          </p>
        </div>
        <div className="flex flex-col items-end">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Live Sync Active
           </div>
           <p className="text-xs font-medium text-slate-500 mt-2">Last Block Synced: #1,842,091</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Results Chart */}
        <div className="md:col-span-2 glass-panel p-8 space-y-8">
           <h2 className="text-xl font-black text-[#0f172a] tracking-tight flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-500" />
              Real-time Vote Distribution
           </h2>
           
           <div className="space-y-10">
              {mockResults.map((candidate) => (
                 <div key={candidate.id} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-sm font-black text-[#0f172a]">{candidate.name}</p>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{candidate.party}</p>
                       </div>
                       <p className="text-lg font-black text-[#0f172a]">{candidate.votes.toLocaleString()}</p>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                       <div 
                        className={`h-full ${candidate.color} transition-all duration-1000 ease-out`} 
                        style={{ width: `${(candidate.votes / totalVotes) * 100}%` }}
                       ></div>
                    </div>
                 </div>
              ))}
           </div>

           <div className="pt-8 border-t border-slate-100 flex items-center gap-6">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Participation</p>
                 <p className="text-2xl font-black text-[#0f172a]">{totalVotes.toLocaleString()}</p>
              </div>
              <div className="w-px h-10 bg-slate-100"></div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Turnout Rate</p>
                 <p className="text-2xl font-black text-blue-600">84.2%</p>
              </div>
           </div>
        </div>

        {/* Security Info */}
        <aside className="space-y-6">
           <div className="bg-brand-primary text-white p-6 rounded-xl shadow-xl space-y-4">
              <h3 className="font-bold border-b border-white/10 pb-3 flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-blue-400" />
                 Integrity Profile
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase font-bold tracking-tighter">Chain Status</span>
                    <span className="text-green-400 font-black">CONSENSUS</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase font-bold tracking-tighter">Encryption</span>
                    <span className="font-bold">AES-256-GCM</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 uppercase font-bold tracking-tighter">Audit Logs</span>
                    <span className="text-blue-400 font-bold underline">DOWNLOAD</span>
                 </div>
              </div>
           </div>

           <div className="glass-panel p-6 space-y-4 border-l-4 border-l-orange-500">
              <h3 className="font-bold text-sm uppercase tracking-tight flex items-center gap-2">
                 <Lock className="w-4 h-4 text-orange-500" />
                 Transaction Explorer
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                 Every vote is individually verifiable. Use your anonymous fingerprint to search for your transaction in our public explorer.
              </p>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-widest py-3 rounded-md transition-all flex items-center justify-center gap-2 group">
                 Open Explorer <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
           </div>
        </aside>
      </div>

      <div className="text-center pt-8">
         <Link href="/" className="text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest underline underline-offset-4">
            Return to National Portal Home
         </Link>
      </div>
    </div>
  );
}
