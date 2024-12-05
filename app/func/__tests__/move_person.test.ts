import { expect } from "@jest/globals";
import {
  PROJECT_START,
  FLOATING_PERSON,
  PB_BLUE,
  RED_PERSON,
  FLOATING_PARRITS,
} from "./common";
import move_person from "../move_person";
import { can_a_pairing_be_made, get_empty_pairing_board } from "../utils";

describe("move_person", () => {
  it("moving from floating to blue", () => {
    const result = move_person(PROJECT_START, FLOATING_PERSON, PB_BLUE);
    expect(result.floating.people.length).toBe(0);
    expect(result.pairingBoards[1].people.length).toBe(1);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // no floating
    expect(get_empty_pairing_board(result)).toBeUndefined();
  });

  it("moving from red to floating", () => {
    const result = move_person(PROJECT_START, RED_PERSON, FLOATING_PARRITS);
    expect(result).toMatchSnapshot();
    expect(result.floating.people.length).toBe(2);
    expect(result.pairingBoards[1].people.length).toBe(0);
    expect(can_a_pairing_be_made(result)).toBe(true); // 2 floating
  });

  it("handles copies of objects", () => {
    const result = move_person(
      PROJECT_START,
      { ...RED_PERSON },
      FLOATING_PARRITS
    );
    expect(result).toMatchSnapshot();
    expect(result.floating.people.length).toBe(2);
    expect(result.pairingBoards[1].people.length).toBe(0);
    expect(can_a_pairing_be_made(result)).toBe(true); // 2 floating
  });

  xit("does not move a person that doesn't exist in the project", () => {
    throw "not yet written";
  });
});
