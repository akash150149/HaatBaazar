import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
