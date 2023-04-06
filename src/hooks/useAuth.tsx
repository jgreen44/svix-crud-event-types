import React, { createContext, useContext } from 'react';

interface AuthContextType {
  user: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: '',
});

export const AuthProvider = ({ children }: any) => {
  return (
    <AuthContext.Provider
      value={{
        user: 'Jason',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
