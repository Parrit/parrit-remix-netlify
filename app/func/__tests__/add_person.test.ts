import { describe, expect, it } from "@jest/globals";
import add_person from "../add_person";
import { FRIZZLE, PB_RED, PROJECT_START } from "./common";
import { can_a_pairing_be_made, floating_people } from "../utils";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";

describe("add_person", () => {
  it("adding to a pb", () => {
    const result = add_person(FRIZZLE, PB_RED.id, PROJECT_START);
    expect(
      result.people.filter(
        ({ pairing_board_id }) => pairing_board_id === PB_RED.id
      )
    ).toStrictEqual([
      {
        id: "red_parrit_id",
        name: "red_parrit",
        pairing_board_id: "red_id",
        project_id: "20232",
        type: "Person",
      },
      {
        id: "99",
        name: "Ms. Frizzle",
        pairing_board_id: "red_id",
        project_id: "20232",
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
    const result = add_person(FRIZZLE, FLOATING_IDX, PROJECT_START);
    expect(floating_people(result).length).toEqual(start_count + 1);
    expect(floating_people(result)).toMatchSnapshot();
  });
});
