import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'standard';

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('admin'); // Defaulting to admin for initial dev convenience

  return (
    <UserContext.Provider value={{ 
      role, 
      setRole, 
      isAdmin: role === 'admin' 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
