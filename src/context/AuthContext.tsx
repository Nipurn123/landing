import { createContext, useContext, type ReactNode } from 'react';
import { useAuth, useUser, useClerk, SignIn } from '@clerk/clerk-react';

interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  user: ReturnType<typeof useUser>['user'];
  signOut: () => Promise<void>;
  openSignIn: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn ?? false,
        isLoaded,
        userId: userId ?? null,
        user,
        signOut: async () => {
          await signOut();
        },
        openSignIn: () => {
          openSignIn({});
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

export { SignIn };
