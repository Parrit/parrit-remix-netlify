export interface LoginRequest {
  projectName?: string;
  password?: string;
}

export interface LoginResult {
  message: string;
}
