import { evaluatePassword } from "../evaluatePassword";
import hashPassword from "../hashPassword";
import { describe, expect, it } from '@jest/globals';

describe("hashPassword", () => {
  it("is under test", () => {
    // if it's not under test, then the passwords are much more processor intensive
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("uses bcrypt and is self-verifyable", async () => {
    const hash = await hashPassword("hunter12");
    expect(hash.substring(0, 8)).toBe("{bcrypt}");
    const result = await evaluatePassword("hunter12", hash);
    expect(result).toBe(true);
  });
});
