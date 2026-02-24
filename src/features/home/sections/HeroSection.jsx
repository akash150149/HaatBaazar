import { Link } from "react-router-dom";
import brandConfig from "../../../config/brandConfig";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden rounded-[3rem] bg-slate-950 px-6 py-20 text-white shadow-premium sm:px-12 lg:px-20 flex items-center">
      {/* Ghost Text Background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <h2 className="text-[25vw] font-black leading-none text-ghost opacity-20 tracking-tighter">
          SOLE
        </h2>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative z-10 grid w-full items-center gap-16 lg:grid-cols-2">
        <div className="space-y-10 reveal-up">
          <div className="inline-flex items-center space-x-3 rounded-full border border-white/10 bg-white/5 py-2 pl-2 pr-6 backdrop-blur-md">
            <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">NEW</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-100">
              Spring 2026 Collection
            </span>
          </div>

          <h1 className="font-display text-6xl font-black leading-none tracking-tighter sm:text-8xl lg:text-[10rem]">
            STYLE <br />
            <span className="text-accent">DEFINED.</span>
          </h1>

          <div className="max-w-md space-y-8">
            <p className="text-lg leading-relaxed text-slate-400">
              High-performance footwear engineered for the bold. {brandConfig.name} brings you the next evolution in street aesthetic.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products" className="group flex items-center justify-center space-x-3 rounded-full bg-accent px-10 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-accent-dark hover:shadow-glow active:scale-95">
                <span>Shop Now</span>
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/admin" className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-10 py-5 font-black uppercase tracking-widest text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                Vault
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -left-10 top-20 h-32 w-32 rounded-3xl bg-accent p-6 shadow-glow transition-transform hover:scale-110 rotate-12">
            <p className="text-xs font-black uppercase leading-tight text-white">Premium Quality</p>
          </div>
          <div className="aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden p-8 flex items-center justify-center">
            <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
              <p className="text-ghost text-4xl font-black rotate-[-45deg] opacity-40">SOLESYSTEM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
