"use client";
import { useState } from "react";
import { Shield, Fingerprint, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [voterId, setVoterId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">Voter Authentication</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium uppercase tracking-widest">
            Identity Verification Required
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="voter-id" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                National Voter ID (Encrypted)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <input
                  id="voter-id"
                  name="voterId"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="V-XXXX-XXXX-XXXX"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="pass" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                Secure Access PIN
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Shield className="h-5 w-5" />
                </div>
                <input
                  id="pass"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-slate-200 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="flex items-center gap-2 uppercase tracking-widest">
                  Verify & Enter <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>
          
          <div className="text-center text-xs text-slate-400 pt-4 font-medium italic">
            "Your identity is linked and protected via decentralized ledger technology."
          </div>
        </form>
      </div>
    </div>
  );
}
