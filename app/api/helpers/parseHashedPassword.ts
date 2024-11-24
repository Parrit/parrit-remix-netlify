export interface PasswordInfo {
  fullHash: string;
  algorithm: string;
  salt?: string;
  hash: string;
}

export function parseHashedPassword(
  hashedPassword: string
): PasswordInfo | null {
  const algorithmMatch = hashedPassword.match(/\{(\w+)\}/);
  if (!algorithmMatch) {
    return null;
  }

  const algorithm = algorithmMatch[1];
  const saltAndHash = hashedPassword.slice(algorithmMatch[0].length);

  const saltEndIndex = saltAndHash.indexOf("}");
  const salt = saltAndHash.slice(1, saltEndIndex);
  const hash = saltAndHash.slice(saltEndIndex + 1);

  return {
    fullHash: hashedPassword,
    algorithm,
    salt,
    hash,
  };
}
