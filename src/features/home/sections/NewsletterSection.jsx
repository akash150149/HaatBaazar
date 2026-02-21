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
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Newsletter</h2>
      <p className="mt-1 text-slate-600">Get updates on new products and category launches.</p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <button type="submit" className="rounded-md bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-500">
          Subscribe
        </button>
      </form>
      {status.message && (
        <p className={status.type === "error" ? "mt-2 text-sm text-red-600" : "mt-2 text-sm text-emerald-700"}>
          {status.message}
        </p>
      )}
    </section>
  );
}
