import { Link } from "react-router-dom";
import brandConfig from "../../../config/brandConfig";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 px-6 py-16 text-white shadow-xl md:px-12">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-emerald-200/30 blur-2xl" />
      <div className="relative max-w-3xl space-y-5">
        <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
          Scalable Commerce System
        </p>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Build once, sell anything.
        </h1>
        <p className="text-base text-emerald-50 md:text-lg">
          {brandConfig.name} is a category-agnostic storefront foundation designed for modern brands and rapid feature growth.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/products" className="rounded-md bg-white px-5 py-2.5 font-semibold text-brand-900 transition hover:bg-emerald-50">
            Shop Collection
          </Link>
          <Link to="/admin" className="rounded-md border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10">
            Open Admin
          </Link>
        </div>
      </div>
    </section>
  );
}
