import * as bcrypt_lib from "bcrypt";

const HASH_ROUNDS = process.env.NODE_ENV === "test" ? 1 : 12;

export default async (plaintext: string): Promise<string> => {
  const hash = await bcrypt_lib.hash(plaintext, HASH_ROUNDS);
  return `{bcrypt}${hash}`;
};
