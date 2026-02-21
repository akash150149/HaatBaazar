import { createContext, useContext, useMemo, useState } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { login as loginService, register as registerService } from "../services/authService";

const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredAuth());

  const persistAuth = (authPayload) => {
    const normalized = {
      ...authPayload.user,
      token: authPayload.token
    };
    setUser(normalized);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(normalized));
    return normalized;
  };

  const login = async (credentials) => {
    const authPayload = await loginService(credentials);
    return persistAuth(authPayload);
  };

  const register = async (payload) => {
    const authPayload = await registerService(payload);
    return persistAuth(authPayload);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.token),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
