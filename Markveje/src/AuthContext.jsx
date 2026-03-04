import { createContext, useContext, useState, useEffect } from 'react';
import API_URL from './config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        // Fetch cart count when logged in
        fetchCartCount();
      } else {
        setUser(null);
        setCartCount(0);
      }
    } catch (err) {
      setUser(null);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setCartCount(data.cart.length);
      }
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  const login = (userData) => {
    setUser(userData);
    fetchCartCount();
  };

  const logout = async () => {
    await fetch(`${API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    setCartCount(0);
  };

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <AuthContext.Provider value={{ user, loading, cartCount, login, logout, checkAuth, fetchCartCount, updateCartCount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}