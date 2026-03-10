import Link from "next/link";
import { ShieldCheck, Database, Fingerprint, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0f172a] text-white rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
        <div className="flex-1 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Quantum-Safe Encryption Active</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            The Future of <span className="text-blue-500">Democratic</span> Choice.
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            SecureVote utilizes a decentralized blockchain protocol to ensure every vote is immutable, transparent, and anonymous. Architected for national-level integrity.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md font-bold transition-all shadow-lg shadow-blue-600/20">
              Access Voter Dashboard
            </Link>
            <Link href="/results" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-md font-bold border border-slate-700 transition-all">
              Live Results
            </Link>
          </div>
        </div>
        
        {/* Visual Decoration */}
        <div className="flex-1 relative w-full h-64 md:h-96 opacity-40 md:opacity-100">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
           <div className="grid grid-cols-3 gap-4 h-full items-center">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-24 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center animate-bounce" style={{animationDelay: `${i * 0.2}s`}}>
                  <div className="w-8 h-1 bg-blue-500 rounded-full opacity-50"></div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Fingerprint, title: "Biometric Identity", desc: "Multi-factor authentication linked to national identity databases." },
          { icon: Database, title: "Immutable Ledger", desc: "Every vote is a cryptographically hashed transaction on the blockchain." },
          { icon: ShieldCheck, title: "Zero Knowledge", desc: "Verification of eligibility without compromising voter anonymity." },
          { icon: Activity, title: "Real-time Audits", desc: "Open verification endpoints for observers and public scrutiny." }
        ].map((feat, idx) => (
          <div key={idx} className="bg-white p-6 space-y-4 border border-slate-200 rounded-xl hover:border-blue-500/30 transition-colors group shadow-sm">
            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center text-[#0f172a] group-hover:bg-blue-500 group-hover:text-white transition-all">
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">{feat.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Info Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm border-l-4 border-l-blue-500">
         <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">System Integrity Statement</h2>
            <p className="text-slate-500 leading-relaxed">
              This portal operates under strict regulatory compliance. All transactions are logged to a public-private hybrid ledger, allowing for full auditing while maintaining individual secrecy under the 2026 Digital Privacy Act.
            </p>
         </div>
      </section>
    </div>
  );
}
