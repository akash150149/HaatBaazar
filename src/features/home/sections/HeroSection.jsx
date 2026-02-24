import { Link } from "react-router-dom";
import brandConfig from "../../../config/brandConfig";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-white shadow-premium sm:px-12 sm:py-24 lg:px-20">
      {/* Background Orbs */}
      <div className="absolute -right-20 -top-20 h-[30rem] w-[30rem] rounded-full bg-brand-500/20 blur-[120px] animate-pulse" />
      <div className="absolute -bottom-40 -left-20 h-[25rem] w-[25rem] rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-3xl space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-ping rounded-full bg-brand-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-100">
              Next-Gen Commerce
            </span>
          </div>

          <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl lg:leading-[1.1]">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-500">Fast.</span> <br />
            Sell <span className="italic font-light">Global.</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl mx-auto lg:mx-0">
            {brandConfig.name} provides the high-performance foundation your brand needs to scale without limits. Experience the peak of modern storefronts.
          </p>

          <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row lg:justify-start">
            <Link to="/products" className="group relative overflow-hidden rounded-full bg-brand-500 px-10 py-4 font-bold text-white transition-all hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/20 active:scale-95">
              <span className="relative z-10">Shop Collection</span>
            </Link>
            <Link to="/admin" className="rounded-full border border-white/20 bg-white/5 px-10 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-4 lg:grid">
          <div className="space-y-4">
            {[
              { label: "Category Ready", value: "Any Industry", color: "from-brand-500 to-emerald-400" },
              { label: "Performance", value: "99+ Lighthouse", color: "from-emerald-400 to-cyan-400" },
              { label: "Backend Ready", value: "Node + MongoDB", color: "from-cyan-400 to-brand-500" }
            ].map((feature, i) => (
              <article key={i} className="group flex flex-col justify-center rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:bg-white/10">
                <p className="text-xs font-black uppercase tracking-widest text-brand-200/60 transition-colors group-hover:text-brand-200">
                  {feature.label}
                </p>
                <p className={`mt-1 text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
