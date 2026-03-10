import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureVote | National Voting Portal",
  description: "A secure, blockchain-backed national voting platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-height-screen bg-muted/30")}>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-primary text-white h-16 flex items-center px-6 shadow-xl">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0f172a"/>
                  <path d="M2 17L12 22L22 17" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold tracking-tight text-lg uppercase">SecureVote Portal</span>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium opacity-90">
              <a href="/" className="hover:text-brand-accent transition-colors">Home</a>
              <a href="/verify" className="hover:text-brand-accent transition-colors underline decoration-brand-accent underline-offset-4 tracking-wide">Verify Audit</a>
              <button className="bg-brand-accent text-white px-4 py-1.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-sm">
                Official Access
              </button>
            </div>
          </div>
        </nav>
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto uppercase tracking-wide text-[10px] font-bold text-muted-foreground mb-8 flex items-center gap-2">
            <span className="w-1 h-1 bg-brand-success rounded-full animate-pulse"></span>
            System Online: Government Server Alpha-4
          </div>
          {children}
        </main>
        <footer className="border-t border-border mt-12 py-12 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p className="font-bold uppercase tracking-widest mb-2 text-brand-primary opacity-40">Digital National Infrastructure</p>
            <p>&copy; 2026 National Election Commission. End-to-End Encrypted. Immutable Blockchain Ledger.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
