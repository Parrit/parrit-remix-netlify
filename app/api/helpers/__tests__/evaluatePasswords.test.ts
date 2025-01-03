import { evaluatePassword } from "../evaluatePassword";
import { describe, expect, it } from '@jest/globals';

describe("evaluatePasswords", () => {
  describe("salted sha256", () => {
    const password =
      "{sha256}{EY/fjfCzSZvP35vJHUpsvxJMfKHZ4iS1vwAcF/Iv6b0=}b3d84360b7dc4fbd26a3c49dcdbec4d8211d2fade465f74e1aec6f46b799a5ee";

    it("fails on bad", async () => {
      expect(await evaluatePassword("WRONG", password)).toBe(false);
    });

    it("succeeds on good", async () => {
      expect(await evaluatePassword("bcrypt_test", password)).toBe(true);
    });

    it("another attempt", async () => {
      expect(
        await evaluatePassword(
          "password",
          "{sha256}{1htkE/1MXKL7uqfqhOC2SI39YzX2lEsd96BqJCHTUCs=}9f62dbe07df8ac7f049cdb1ae1291b02f2d1ea645c7f4df9a1235e93a0f213bd"
        )
      ).toBe(true);
    });
  });

  describe("unsalted sha256", () => {
    const password =
      "{sha256}9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";
    it("fails on bad", async () => {
      expect(await evaluatePassword("WRONG", password)).toBe(false);
    });

    it("succeeds on good", async () => {
      expect(await evaluatePassword("test", password)).toBe(true);
    });
  });

  describe("bcrypt", () => {
    const password =
      "{bcrypt}$2a$10$oOUtgMBJzuf0MUM/i8YU.uiNDgDekB9tcDzokL5dHixoQ.qxlsf4y";
    it("fails on bad", async () => {
      expect(await evaluatePassword("WRONG", password)).toBe(false);
    });

    it("succeeds on good", async () => {
      expect(await evaluatePassword("hunter12", password)).toBe(true);
    });
  });
});
