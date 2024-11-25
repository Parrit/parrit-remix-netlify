import { AuthResponse } from "./shared.interfaces";

export default async (request: any): Promise<AuthResponse> => {
  console.log("signUp", request);
  return {
    accessToken: "__access",
    refreshToken: "__refresh",
    error: "__error",
  };
};
