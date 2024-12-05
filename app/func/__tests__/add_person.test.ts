import { expect } from "@jest/globals";
import add_person from "../add_person";
import { FRIZZLE, PB_RED, PROJECT_START } from "./common";
import { can_a_pairing_be_made } from "../utils";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";

describe("add_person", () => {
  it("adding to a pb", () => {
    const result = add_person(FRIZZLE, PB_RED, PROJECT_START);
    expect(result.pairingBoards[0].people).toStrictEqual([
      {
        id: "red_parrit_id",
        name: "red_parrit",
        pairing_board_id: "red_id",
        type: "Person",
      },
      {
        id: "99",
        name: "Ms. Frizzle",
        pairing_board_id: "red_id",
        type: "Person",
      },
    ]);
    expect(result.floating.people.length).toBe(
      PROJECT_START.floating.people.length
    );
    expect(can_a_pairing_be_made(result)).toBe(false); // only one floater, all others are paired
  });

  it("add to floating", () => {
    const result = add_person(
      FRIZZLE,
      {
        id: FLOATING_IDX,
        name: "Floating",
        exempt: false,
        people: [],
        roles: [],
      },
      PROJECT_START
    );
    expect(result.floating.people.length).toEqual(2);
    expect(result).toMatchSnapshot();
  });
});
