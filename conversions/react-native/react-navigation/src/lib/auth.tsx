// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { type User } from './api';
import dub from '@dub/react-native';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (user: User): Promise<void> => {
    setCurrentUser(user);
    setIsAuthenticated(true);

    // Track lead
    try {
      await dub.trackLead({
        eventName: 'User Sign Up',
        customerExternalId: user.id.toString(),
        customerName: `${user.firstName} ${user.lastName}`,
        customerEmail: user.email,
      });
    } catch (error) {
      console.error('Error tracking lead:', error);
    }
  };

  const logout = (): void => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
