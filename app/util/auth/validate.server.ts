import { ErrorResponse } from "~/models/Error.model";

export function validateLoginCredentials(
  email: string,
  password: string
): ErrorResponse | undefined {
  let fieldErrors: { password?: string; email?: string } = {};
  let emailError = validateEmail(email);
  if (emailError) {
    fieldErrors.email = "Keeaa!? That's not your email.";
  }

  let passwordError = validatePassword(password);
  if (passwordError) {
    fieldErrors.password = "Polly want a cracker? Try another password.";
  }

  if (fieldErrors.email || fieldErrors.password) {
    return {
      message: "Email or Password validation failed.",
      fieldErrors: fieldErrors,
    };
  } else {
    return;
  }
}

export function validateCredentials(
  email: string,
  password: string
): ErrorResponse | undefined {
  let fieldErrors: { password?: string; email?: string } = {};
  let emailError = validateEmail(email);
  if (emailError) {
    fieldErrors.email = emailError;
  }

  let passwordError = validatePassword(password);
  if (passwordError) {
    fieldErrors.password = passwordError;
  }

  if (fieldErrors.email || fieldErrors.password) {
    return {
      message: "Email or Password validation failed.",
      fieldErrors: fieldErrors,
    };
  } else {
    return;
  }
}

export function validateEmail(email: string): string | undefined {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return "Keeaa!? Please enter a valid email.";
  }
}

export function validatePassword(password: string): string | undefined {
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return "Your password must be at least 8 characters long and include lowercase and uppercase letters, along with at least one special character from @$!%*?&.";
  }
}
