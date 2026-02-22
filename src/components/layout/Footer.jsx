export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm sm:grid-cols-2 sm:px-6 lg:px-8">
        <p className="text-slate-500">Copyright {new Date().getFullYear()} Shop. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-500 sm:justify-end">
          <p>Privacy</p>
          <p>Terms</p>
          <p>Support</p>
        </div>
      </div>
    </footer>
  );
}
