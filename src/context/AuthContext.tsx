'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
};

export type Order = {
  id: string;
  orderNumber: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  getOrders: () => Order[];
  getOrderById: (orderId: string) => Order | undefined;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample orders data (in real app, fetch from API)
const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'HL20240427001',
    date: new Date('2024-04-27'),
    status: 'delivered',
    total: 89.99,
    items: [
      {
        id: 1,
        name: 'Banarasi Silk Saree',
        quantity: 1,
        price: 89.99,
        image: '/images/products/banarasi-silk.jpg',
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'Colombo',
      state: 'Western',
      postalCode: '00100',
      country: 'Sri Lanka',
    },
  },
  {
    id: '2',
    orderNumber: 'HL20240420002',
    date: new Date('2024-04-20'),
    status: 'shipped',
    total: 135.98,
    items: [
      {
        id: 2,
        name: 'Handloom Cotton Kurta',
        quantity: 2,
        price: 45.99,
        image: '/images/products/cotton-kurta.jpg',
      },
      {
        id: 3,
        name: 'Chanderi Dupatta',
        quantity: 1,
        price: 35.99,
        image: '/images/products/chanderi-dupatta.jpg',
      },
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'Colombo',
      state: 'Western',
      postalCode: '00100',
      country: 'Sri Lanka',
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('handloom_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo login - accept any email/password for testing
    if (email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email: email,
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('handloom_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('handloom_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('handloom_user');
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('handloom_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, verify old password with backend
    return true;
  };

  const getOrders = () => {
    return orders.filter(order => order.shippingAddress.fullName === user?.name);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        changePassword,
        getOrders,
        getOrderById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
