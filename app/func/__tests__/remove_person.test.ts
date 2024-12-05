import { expect } from "@jest/globals";
import { RED_PERSON, PROJECT_START, FLOATING_PERSON } from "./common";
import remove_person from "../remove_person";
import { can_a_pairing_be_made } from "../utils";

describe("remove_person", () => {
  it("removing from pb", () => {
    const result = remove_person(RED_PERSON, PROJECT_START);
    expect(result.pairingBoards[0].people.length).toBe(0);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // only one person in floating, no unpaired assigned
  });

  it("removing from floating", () => {
    const result = remove_person(FLOATING_PERSON, PROJECT_START);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // no floating pairs
  });
});
