import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SeoHelmet from "../../../seo/SeoHelmet";
import { useAuth } from "../../../context";
import { isEmail } from "../../../utils/validators";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isEmail(email) || password.length < 6) {
      setError("Enter a valid email and password (min 6 chars).");
      return;
    }

    try {
      await login({ email, password });
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <SeoHelmet title="Login" />
      <h1 className="text-2xl font-semibold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full rounded-md bg-brand-700 px-4 py-2 text-white">Login</button>
      </form>
      <div className="flex justify-between text-sm">
        <Link to="/auth/register" className="text-brand-700">Register</Link>
        <Link to="/auth/forgot-password" className="text-brand-700">Forgot password?</Link>
      </div>
    </section>
  );
}
