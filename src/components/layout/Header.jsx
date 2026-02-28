import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import brandConfig from "../../config/brandConfig";
import { useAuth, useCart } from "../../context";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brand-700"
      : "text-slate-700 transition hover:text-brand-500";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-brand-700" onClick={closeMenu}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-100 text-sm text-brand-700">S</span>
          <span>{brandConfig.logoText}</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">Cart {items.length}</span>
          {isAuthenticated ? (
            <>
              <NavLink to="/my-orders" className={linkClass}>
                Orders
              </NavLink>
              <span className="max-w-40 truncate text-xs font-semibold text-brand-600">Hi, {user?.name}</span>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/auth/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" className={linkClass} onClick={closeMenu}>
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <>
                <NavLink to="/my-orders" className={linkClass} onClick={closeMenu}>
                  My Orders
                </NavLink>
                <p className="text-xs font-semibold text-brand-600">Hi, {user?.name}</p>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-fit rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <NavLink to="/auth/login" className={linkClass} onClick={closeMenu}>Login</NavLink>
                <NavLink to="/auth/register" className={linkClass} onClick={closeMenu}>Register</NavLink>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
