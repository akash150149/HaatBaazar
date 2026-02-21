import { Link } from "react-router-dom";
import SeoHelmet from "../seo/SeoHelmet";

export default function NotFoundPage() {
  return (
    <section className="space-y-3 text-center">
      <SeoHelmet title="Page Not Found" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-slate-600">The page you are looking for does not exist.</p>
      <Link to="/" className="text-brand-700">Go to home</Link>
    </section>
  );
}
