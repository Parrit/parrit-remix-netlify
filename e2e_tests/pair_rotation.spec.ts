import { test, expect } from "./fixtures";

test("saves recommended pairs", async ({ cleanProject }) => {
  await cleanProject.recommendPairs();
  await cleanProject.page.reload();
  // wait for page to finish reloading
  await expect(cleanProject).boardContainsAll("Macaw", "Alice", "Bob");
});

test("old pairs should not be repeated", async ({ withPairingHistory }) => {
  await withPairingHistory.createParrit("Camile");
  await withPairingHistory.recommendPairs();
  await expect(withPairingHistory).not.boardContainsAll(
    "Macaw",
    "Alice",
    "Bob"
  );
  await expect(withPairingHistory).boardContainsAll("Macaw", "Camile");
});

test("exempt parrits should not be paired", async ({ withPairingHistory }) => {
  await withPairingHistory.createParrit("Camile");
  await withPairingHistory.dragParritToBoard("Camile", "Out of office");
  await withPairingHistory.recommendPairs();
  await expect(withPairingHistory).boardContainsAll("Macaw", "Alice", "Bob");
});
