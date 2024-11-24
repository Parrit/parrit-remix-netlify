export interface PasswordInfo {
  fullHash: string;
  algorithm: string;
  salt?: string;
  hash: string;
}

const SALTED = /{(.*)}{(.*)}(.*)/;
const UNSALTED = /{(.*)}(.*)/;

export function parseHashedPassword(
  hashedPassword: string
): PasswordInfo | null {
  const saltMatches = hashedPassword.match(SALTED);
  if (saltMatches) {
    const [fullHash, algorithm, salt, hash] = saltMatches;
    return { fullHash, algorithm, salt, hash };
  }
  const unsaltMatches = hashedPassword.match(UNSALTED);
  if (unsaltMatches) {
    const [fullHash, algorithm, hash] = unsaltMatches;
    return { fullHash, algorithm, hash };
  }

  return null;
}
