"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Info, Hash, LogOut, Vote } from "lucide-react";
import Link from "next/link";

const mockCandidates = [
  { id: 1, name: "Dr. Sarah Mitchell", party: "Innovate Forward", platform: "Expansion of digital education and sustainable infrastructure.", symbol: "🟦" },
  { id: 2, name: "Marcus Thorne", party: "Liberty Alliance", platform: "Decentralized economic reforms and civil liberty protections.", symbol: "🟩" },
  { id: 3, name: "Elena Rodriguez", party: "Unity Green", platform: "Environmental stewardship and renewable energy transition.", symbol: "🟨" },
];

export default function Dashboard() {
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setLoading(true);
    
    // Simulate Blockchain Transaction
    setTimeout(() => {
      setVoted(true);
      setLoading(false);
      setTxHash("0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(""));
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Voter Dashboard</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">Election ID: 2026-NAT-ELC-01</p>
        </div>
        <button onClick={() => window.location.href = "/"} className="text-slate-400 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {voted ? (
        <div className="bg-emerald-50 border border-emerald-100 p-12 rounded-2xl text-center space-y-6 shadow-sm">
           <div className="mx-auto w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10" />
           </div>
           <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#0f172a]">Vote Successfully Recorded</h2>
              <p className="text-slate-600 font-medium">Your choice has been cryptographically sealed and added to the immutable ledger.</p>
           </div>
           
           <div className="max-w-md mx-auto bg-white p-4 rounded-lg border border-emerald-200 text-left space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                 <span>Blockchain Receipt</span>
                 <span className="text-emerald-500 font-black">Verified</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-2 rounded border border-slate-100">
                 <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                 <code className="text-[10px] text-slate-600 break-all leading-tight font-mono">{txHash}</code>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                 "This hash is a permanent witness to your participation. You can verify this transaction on the public block explorer."
              </p>
           </div>
           
           <div className="pt-6 flex justify-center gap-4">
              <button className="bg-brand-primary text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-md shadow-lg shadow-brand-primary/20">
                 Print Receipt (Secure)
              </button>
              <Link href="/results" className="text-brand-primary text-xs font-bold border border-slate-200 px-6 py-3 rounded-md hover:bg-slate-50">
                 View Real-time Results
              </Link>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {mockCandidates.map((candidate) => (
                <div 
                  key={candidate.id} 
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer group flex items-start gap-4 ${
                    selectedCandidate === candidate.id 
                    ? "border-blue-500 bg-blue-50/30 shadow-md" 
                    : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="text-4xl">{candidate.symbol}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-lg text-[#0f172a]">{candidate.name}</h3>
                      {selectedCandidate === candidate.id && <CheckCircle className="text-blue-500 w-5 h-5" />}
                    </div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">{candidate.party}</p>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{candidate.platform}</p>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <div className="absolute top-0 right-0 h-full w-1 bg-blue-500 rounded-r-xl"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <aside className="glass-panel p-6 space-y-6 sticky top-24">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Info className="w-5 h-5 text-blue-500" />
                <h2 className="font-bold text-sm uppercase tracking-wider">Confirm Your Selection</h2>
              </div>
              
              {selectedCandidate ? (
                <div className="space-y-4">
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Selected Candidate</p>
                      <p className="font-black text-[#0f172a] text-xl">
                        {mockCandidates.find(c => c.id === selectedCandidate)?.name}
                      </p>
                   </div>
                   
                   <div className="space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-[10px] text-slate-500 leading-normal font-medium uppercase tracking-tight">
                          I confirm that this is my final choice. This action is irreversible once sealed.
                        </span>
                      </label>
                   </div>

                   <button 
                    onClick={handleVote}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-4 rounded-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3"
                   >
                     {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                       <>
                        <Vote className="w-5 h-5" />
                        Cast Secure Vote
                       </>
                     )}
                   </button>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <Vote className="w-6 h-6" />
                   </div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select a candidate to proceed</p>
                </div>
              )}

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                    <span>Identity Status</span>
                    <span className="text-green-500 tracking-widest">Verified [0x82...A]</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 tracking-tighter uppercase">
                    <span>Blockchain Node</span>
                    <span className="text-blue-500 tracking-widest">Local_Mainnet_v1</span>
                 </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
