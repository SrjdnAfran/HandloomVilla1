'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminSessionValid, setAdminAuthenticated, logoutAdmin } from '@/lib/adminAuth';

export function useAdminAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isValid = isAdminSessionValid();
    setIsAuthenticated(isValid);
    setIsLoading(false);
    
    if (!isValid) {
      setAdminAuthenticated(false);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simple hardcoded check
    if (email === 'admin@handloomvilla.com' && password === 'Admin@123') {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    router.push('/admin-login');
  };

  return {
    isLoading,
    isAuthenticated,
    login,
    logout,
  };
}