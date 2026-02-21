import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section className="rounded-3xl bg-slate-900 px-6 py-10 text-white md:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ready to launch your storefront?</h2>
          <p className="mt-1 text-slate-300">This architecture is built for easy payment and backend integrations.</p>
        </div>
        <Link to="/checkout" className="inline-flex w-fit rounded-md bg-brand-500 px-5 py-2.5 font-semibold text-white transition hover:bg-brand-700">
          Start Checkout Flow
        </Link>
      </div>
    </section>
  );
}
