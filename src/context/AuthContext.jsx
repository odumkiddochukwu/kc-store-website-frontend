import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  hasAuthToken,
} from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(user) || hasAuthToken();

  const login = async (credentials) => {
    setLoading(true);

    try {
      const result = await loginUser(credentials);

      if (result.user) {
        setUser(result.user);
      }

      return result;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);

    try {
      const result = await registerUser(userData);

      if (result.user) {
        setUser(result.user);
      }

      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [user, loading, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};