import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import SeoHelmet from "../../../seo/SeoHelmet";
import { isEmail } from "../../../utils/validators";
import { useAuth } from "../../../context";

export default function RegisterPage() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!isEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({ name: form.name, email: form.email, password: form.password });
      setSuccess("Account created successfully. Redirecting...");
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Google registration failed.");
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <SeoHelmet title="Register" />
      <h1 className="text-2xl font-semibold text-center">Register</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Full name"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="Email"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          placeholder="Password"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(event) => updateField("confirmPassword", event.target.value)}
          placeholder="Confirm password"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-emerald-700">{success}</p>}
        <button type="submit" className="w-full rounded-md bg-brand-700 px-4 py-2 text-white">
          Create account
        </button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-300"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500">Or continue with</span></div>
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Login failed.")}
          useOneTap
        />
      </div>

      <div className="text-center mt-4">
        <Link to="/auth/login" className="text-brand-700 text-sm">Back to login</Link>
      </div>
    </section>
  );
}
