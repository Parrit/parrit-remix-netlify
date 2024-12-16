import { expect, fit } from "@jest/globals";
import add_person from "../add_person";
import { FRIZZLE, PB_RED, PROJECT_START } from "./common";
import { can_a_pairing_be_made, floating_people } from "../utils";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";

describe("add_person", () => {
  it("adding to a pb", () => {
    console.log("before", PROJECT_START.people);
    const result = add_person(FRIZZLE, PB_RED, PROJECT_START);
    console.log("after", result.people);
    expect(
      result.people.filter(
        ({ pairing_board_id }) => pairing_board_id === PB_RED.id
      )
    ).toStrictEqual([
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
    expect(floating_people(result).length).toBe(
      floating_people(PROJECT_START).length
    );
    expect(can_a_pairing_be_made(result)).toBe(false); // only one floater, all others are paired
  });

  it("add to floating", () => {
    const start_count = floating_people(PROJECT_START).length;
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
    expect(floating_people(result).length).toEqual(start_count + 1);
    expect(floating_people(result)).toMatchSnapshot();
  });
});
