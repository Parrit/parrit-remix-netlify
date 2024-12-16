import { expect } from "@jest/globals";
import {
  PROJECT_START,
  FLOATING_PERSON,
  PB_BLUE,
  RED_PERSON,
  FLOATING_PARRITS,
  PB_RED,
} from "./common";
import move_person from "../move_person";
import { can_a_pairing_be_made, get_empty_pairing_board } from "../utils";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";

describe("move_person", () => {
  it("moving from floating to blue", () => {
    const result = move_person(PROJECT_START, FLOATING_PERSON, PB_BLUE);
    const floating = result.people.filter(
      (p) => p.pairing_board_id === FLOATING_IDX
    );
    const blueies = result.people.filter(
      (p) => p.pairing_board_id === PB_BLUE.id
    );
    expect(floating.length).toBe(0);
    expect(blueies.length).toBe(1);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // no floating
    expect(get_empty_pairing_board(result)).toBeUndefined();
  });

  it("moving from red to floating", () => {
    const result = move_person(PROJECT_START, RED_PERSON, FLOATING_PARRITS);
    const floating = result.people.filter(
      (p) => p.pairing_board_id === FLOATING_IDX
    );
    const reddies = result.people.filter(
      (p) => p.pairing_board_id === PB_RED.id
    );
    expect(floating.length).toBe(2);
    expect(reddies.length).toBe(0);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(true); // 2 floating
  });

  it("handles copies of objects", () => {
    const result = move_person(
      PROJECT_START,
      { ...RED_PERSON },
      FLOATING_PARRITS
    );
    const floating = result.people.filter(
      (p) => p.pairing_board_id === FLOATING_IDX
    );
    const reddies = result.people.filter(
      (p) => p.pairing_board_id === PB_RED.id
    );
    expect(floating.length).toBe(2);
    expect(reddies.length).toBe(0);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(true); // 2 floating
  });

  xit("does not move a person that doesn't exist in the project", () => {
    throw "not yet written";
  });
});
