// src/stores/store/auth-context.tsx
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren,
} from "react";
import { springInstance } from "@/src/utils/axios-instance";
import { useStorageState } from "@/src/utils/secure-storage-state";
import { authApi, AuthCredentials } from "../query/auth";
interface AuthContextType {
  signIn: (cred: AuthCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSession = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useSession must be within <SessionProvider />");
  return ctx;
};

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] = useStorageState("session");
  const [[, refreshToken], setRefreshToken] = useStorageState("refresh");

  const refreshAccessToken = useCallback(async (): Promise<string> => {
    if (!refreshToken) throw new Error("No refresh token");
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await authApi.refresh(refreshToken);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    return newAccessToken;
  }, [refreshToken, setAccessToken, setRefreshToken]);

  const signIn = useCallback(
    async (cred: AuthCredentials) => {
      const { accessToken, refreshToken } = await authApi.login(cred);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    },
    [setAccessToken, setRefreshToken]
  );

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
    }
  }, [setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (!isLoading && !accessToken && refreshToken) {
      refreshAccessToken().catch(() => {
        setAccessToken(null);
        setRefreshToken(null);
      });
    }
  }, [isLoading, accessToken, refreshAccessToken, refreshToken]);

  useEffect(() => {
    const reqId = springInstance.interceptors.request.use((config) => {
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    let refreshPromise: Promise<string> | null = null;

    const resId = springInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry && refreshToken) {
          original._retry = true;

          if (!refreshPromise) {
            refreshPromise = refreshAccessToken().finally(() => {
              refreshPromise = null;
            });
          }

          try {
            const newTok = await refreshPromise;
            original.headers.Authorization = `Bearer ${newTok}`;
            return springInstance(original);
          } catch (e) {
            await signOut();
            return Promise.reject(e);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      springInstance.interceptors.request.eject(reqId);
      springInstance.interceptors.response.eject(resId);
    };
  }, [accessToken, refreshToken, refreshAccessToken, signOut]);

  const value = useMemo<AuthContextType>(
    () => ({ signIn, signOut, session: accessToken, isLoading }),
    [signIn, signOut, accessToken, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
