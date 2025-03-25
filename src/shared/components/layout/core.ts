'use client';
import { useEffect, useState } from 'react';

const token = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  role: '',
};
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

  const devLogin = () => {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refeshToken', token.refreshToken);
    localStorage.setItem('roll', token.role);
    setIsLogin(token.accessToken);
    setRole(token.role);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refeshToken');
    localStorage.removeItem('roll');
    setIsLogin(null);
    setRole(null);
  };
  return { isLogin, role, devLogin, handleLogout };
};
