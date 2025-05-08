import { useStorageState } from "@/src/business/use-storage-state";
import { createContext, useContext, type PropsWithChildren } from "react";

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

export function useSession(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return context;
}

// Provider 컴포넌트
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const value: AuthContextType = {
    signIn: () => {
      // 실제 로그인 로직을 여기에
      setSession("xxx");
    },
    signOut: () => {
      setSession(null);
    },
    session,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
