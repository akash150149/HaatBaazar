import { useState } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { isEmail } from "../../../utils/validators";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSuccess("If an account exists for this email, a reset link has been sent.");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <SeoHelmet title="Forgot Password" />
      <h1 className="text-2xl font-semibold">Forgot Password</h1>
      <p className="text-slate-600">Enter your email and we will send you a mock reset link.</p>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-emerald-700">{success}</p>}
        <button type="submit" className="w-full rounded-md bg-brand-700 px-4 py-2 text-white">
          Send Reset Link
        </button>
      </form>
      <Link to="/auth/login" className="text-brand-700">Back to login</Link>
    </section>
  );
}
