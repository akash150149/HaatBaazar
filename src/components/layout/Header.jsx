import { Link, NavLink } from "react-router-dom";
import brandConfig from "../../config/brandConfig";
import { useAuth, useCart } from "../../context";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" }
];

export default function Header() {
  const { items } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-brand-700">{brandConfig.logoText}</Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "text-brand-700" : "text-slate-700 transition hover:text-brand-500"
              }
            >
              {item.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "text-brand-700" : "text-slate-700 transition hover:text-brand-500"
              }
            >
              Admin
            </NavLink>
          )}
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{items.length}</span>
          {isAuthenticated ? (
            <>
              <span className="hidden text-xs text-slate-500 sm:inline">{user?.email}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  isActive ? "text-brand-700" : "text-slate-700 transition hover:text-brand-500"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  isActive ? "text-brand-700" : "text-slate-700 transition hover:text-brand-500"
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
