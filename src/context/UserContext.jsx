// context/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;

// Custom hook to consume UserContext
export function useAuth() {
  return useContext(UserContext);
}
