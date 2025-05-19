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
  login: async (credentials: AuthCredentials): Promise<AuthTokens> => {
    const { data } = await springInstance.post<AuthTokens>(
      "auth/login",
      credentials
    );
    return data;
  },
  signup: async (payload: SignUpPayload): Promise<void> => {
    await springInstance.post("auth/signup", payload);
  },
  logout: async (): Promise<void> => {
    await springInstance.post("auth/logout");
  },
  getMember: async (payload: ChangePasswordPayload): Promise<void> => {
    await springInstance.patch("members/password", payload);
  },
};
