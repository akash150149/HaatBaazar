const testimonials = [
  {
    id: "t1",
    quote: "The modular product architecture let us pivot categories in a day.",
    name: "Avery Stone",
    role: "Head of Commerce"
  },
  {
    id: "t2",
    quote: "Fast load times, clean UX, and easy admin controls for our team.",
    name: "Mila Chen",
    role: "Operations Lead"
  },
  {
    id: "t3",
    quote: "Exactly the kind of scalable frontend foundation we needed.",
    name: "Noah Patel",
    role: "Product Manager"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">What teams say</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm leading-relaxed text-slate-700">"{item.quote}"</p>
            <p className="mt-4 font-semibold text-slate-900">{item.name}</p>
            <p className="text-xs uppercase tracking-wider text-slate-500">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
