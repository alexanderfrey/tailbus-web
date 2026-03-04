"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getAuth, clearAuth, type AuthState } from "@/lib/auth";

interface AuthContextValue {
  user: { email: string } | null;
  loading: boolean;
  logout: () => void;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: () => {},
  refresh: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    const auth = getAuth();
    if (auth) {
      setUser({ email: auth.email });
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  const refresh = () => {
    checkAuth();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}
