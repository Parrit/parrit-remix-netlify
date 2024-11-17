export interface ErrorResponse {
  message?: string;
  fieldErrors?: { email?: string; password?: string };
}
