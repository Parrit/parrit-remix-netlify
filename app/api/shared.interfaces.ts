import { Session, SessionData } from "@remix-run/node";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  error: string;
}

export interface AuthSession {
  session: Session<SessionData, SessionData>;
  accessToken: string;
  refreshToken: string;
}
