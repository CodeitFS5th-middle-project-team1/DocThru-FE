'use client';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [role, setRole] = useState<string | null>('');
  const [isLogin, setIsLogin] = useState<string | null>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('accessToken');
      const role = localStorage.getItem('role');
      setIsLogin(auth);
      setRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLogin(null);
    setRole(null);
  };
  return { isLogin, role, handleLogout };
};
