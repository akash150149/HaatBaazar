import { Link } from "react-router-dom";

export default function LookbookSection() {
    return (
        <section className="relative overflow-hidden py-24 bg-slate-950">
            <div className="absolute top-0 left-0 w-full h-[30vw] bg-ghost text-[20vw] font-black leading-none opacity-5 select-none tracking-tighter overflow-hidden">
                LOOKBOOK
            </div>

            <div className="relative z-10 px-6 sm:px-12 lg:px-20">
                <div className="flex flex-col items-center text-center space-y-6 mb-20">
                    <h2 className="font-display text-5xl font-black uppercase tracking-tighter text-white sm:text-8xl">
                        Styled with <span className="text-accent underline decoration-8 underline-offset-[12px]">Sole.</span>
                    </h2>
                    <p className="max-w-2xl text-slate-400 text-lg font-medium">
                        Our community defines the vibe. Share your look with #SOLESTYLE and get featured in the global vault.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 auto-rows-[250px] md:auto-rows-[300px]">
                    {/* Mock Images - Using generic high quality placeholders for now */}
                    <div className="col-span-2 row-span-2 overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" alt="Look 1" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="col-span-2 row-span-1 overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" alt="Look 2" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="col-span-1 row-span-1 overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800" alt="Look 3" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="col-span-1 row-span-1 md:row-span-2 overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800" alt="Look 4" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                    <div className="col-span-2 row-span-1 overflow-hidden rounded-[2.5rem] bg-accent flex items-center justify-center p-12 text-center group">
                        <div className="space-y-4">
                            <p className="text-white font-black uppercase tracking-widest text-xl">The Vault</p>
                            <Link to="/products" className="inline-block rounded-full bg-slate-950 px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-slate-950 group-hover:shadow-glow">Explore All</Link>
                        </div>
                    </div>
                    <div className="col-span-1 row-span-1 overflow-hidden rounded-[2.5rem] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" alt="Look 5" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                </div>
            </div>
        </section>
    );
}
