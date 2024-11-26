import { parseHashedPassword } from "../parseHashedPassword";
import { expect } from "@jest/globals";

describe("parseHashedPasswords", () => {
  it("salted", () => {
    const result = parseHashedPassword(
      "{sha256}{EY/fjfCzSZvP35vJHUpsvxJMfKHZ4iS1vwAcF/Iv6b0=}b3d84360b7dc4fbd26a3c49dcdbec4d8211d2fade465f74e1aec6f46b799a5ee"
    );
    expect(result).not.toBeNull();
    expect(result?.algorithm).toBe("sha256");
    expect(result?.salt).toBe("EY/fjfCzSZvP35vJHUpsvxJMfKHZ4iS1vwAcF/Iv6b0=");
    expect(result?.hash).toBe(
      "b3d84360b7dc4fbd26a3c49dcdbec4d8211d2fade465f74e1aec6f46b799a5ee"
    );
  });

  it("unsalted", () => {
    const result = parseHashedPassword(
      "{sha256}b3d84360b7dc4fbd26a3c49dcdbec4d8211d2fade465f74e1aec6f46b799a5ee"
    );
    expect(result).not.toBeNull();
    expect(result?.algorithm).toBe("sha256");
    expect(result?.salt).toBe(undefined);
    expect(result?.hash).toBe(
      "b3d84360b7dc4fbd26a3c49dcdbec4d8211d2fade465f74e1aec6f46b799a5ee"
    );
  });
});
