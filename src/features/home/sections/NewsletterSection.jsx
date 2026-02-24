import { useState } from "react";
import { isEmail } from "../../../utils/validators";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isEmail(email)) {
      setStatus({ type: "error", message: "Enter a valid email address." });
      return;
    }

    setStatus({ type: "success", message: "Subscribed successfully. We will keep you updated." });
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-brand-900 px-8 py-12 text-white shadow-premium sm:px-12 sm:py-16">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Join the <span className="text-brand-300">Inner Circle.</span>
        </h2>
        <p className="mt-4 text-brand-100/80">
          Get exclusive access to new drops, limited editions, and curated picks.
        </p>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-brand-200/50 outline-none backdrop-blur-md transition-all focus:border-white/40 focus:bg-white/20"
            />
            {status.message && (
              <p className={`absolute -bottom-6 left-6 text-xs font-medium ${status.type === "error" ? "text-orange-400" : "text-emerald-400"}`}>
                {status.message}
              </p>
            )}
          </div>
          <button type="submit" className="w-full whitespace-nowrap rounded-full bg-white px-10 py-4 font-bold text-brand-900 transition-all hover:bg-brand-50 sm:w-auto">
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}
