import { test, expect } from "./fixtures";

test("records pairing history", async ({ withPairingHistory }) => {
  await expect(withPairingHistory).pairingHistoryContains(
    "Macaw",
    "Alice",
    "Bob"
  );
});
