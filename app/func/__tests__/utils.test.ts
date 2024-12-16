import { expect } from "@jest/globals";
import { PROJECT_START } from "./common";
import { can_a_pairing_be_made, get_empty_pairing_board } from "../utils";

it("initial state", () => {
  expect(can_a_pairing_be_made(PROJECT_START)).toBe(true);
  const emptyPB = get_empty_pairing_board(PROJECT_START);
  expect(emptyPB).not.toBeUndefined();
  expect(PROJECT_START.people).toMatchSnapshot();
});
