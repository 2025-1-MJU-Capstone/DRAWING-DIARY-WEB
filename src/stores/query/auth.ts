import { springInstance } from "@/src/utils/axios-instance";

export interface AuthCredentials {
  loginId: string;
  password: string;
}

export interface SignUpPayload extends AuthCredentials {
  email: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const authApi = {
  login: async (credentials: AuthCredentials) => {
    console.log(credentials);
    const res = await springInstance.post<AuthTokens>(
      "auth/login",
      credentials
    );
    return res.data;
  },
  signup: async (payload: SignUpPayload) => {
    await springInstance.post("auth/signup", payload);
  },
  logout: async () => {
    await springInstance.post("auth/logout");
  },
  refresh: async (refresh: string) => {
    const res = await springInstance.post<AuthTokens>("auth/refresh", {
      refreshToken: refresh,
    });
    return res.data;
  },
  getMember: async (payload: ChangePasswordPayload) => {
    await springInstance.patch("members/password", payload);
  },
};
