import { Link } from "react-router-dom";
import brandConfig from "../../../config/brandConfig";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-brand-900 to-brand-700 px-5 py-12 text-white shadow-xl sm:px-8 sm:py-16 lg:px-12">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 left-6 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="relative grid items-end gap-10 lg:grid-cols-2">
        <div className="max-w-2xl space-y-5">
          <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
            Scalable Commerce System
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Build once, sell anything.
          </h1>
          <p className="text-base text-emerald-50 sm:text-lg">
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

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-emerald-100">Category Ready</p>
            <p className="mt-2 text-2xl font-bold">Any Industry</p>
          </article>
          <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-emerald-100">Performance</p>
            <p className="mt-2 text-2xl font-bold">Fast SPA UX</p>
          </article>
          <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-emerald-100">Backend Ready</p>
            <p className="mt-2 text-2xl font-bold">Mongo + APIs</p>
          </article>
        </div>
      </div>
    </section>
  );
}
