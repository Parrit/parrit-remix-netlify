import { PasswordInfo, parseHashedPassword } from "./parseHashedPassword";
import { createHash } from "crypto";
import * as bcrypt_lib from "bcrypt";

export const evaluatePassword = async (
  attempt: string,
  storedPassword: string
): Promise<boolean> => {
  const info = parseHashedPassword(storedPassword);
  switch (info?.algorithm) {
    case "sha256":
      return compare_sha256(attempt, info);
    case "bcrypt":
      return await compare_bcrypt(attempt, info);
    default:
      console.error(`Unsupported password algoritm <${info?.algorithm}>`);
      return false;
  }
};

const compare_sha256 = (attempt: string, info: PasswordInfo): boolean => {
  let attemptHash;
  if (info.salt) {
    attemptHash = createHash("sha256")
      .update(attempt)
      .update(`{${info.salt}}`)
      .digest("hex");
  } else {
    attemptHash = createHash("sha256").update(attempt).digest("hex");
  }
  console.log({ attemptHash, actuallHash: info.hash });
  return attemptHash === info.hash;
};

const compare_bcrypt = async (
  attempt: string,
  info: PasswordInfo
): Promise<boolean> => {
  console.log("comparing", attempt, info.hash);
  return bcrypt_lib.compare(attempt, info.hash);
};
