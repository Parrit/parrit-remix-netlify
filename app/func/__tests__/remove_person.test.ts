import { expect } from "@jest/globals";
import { RED_PERSON, PROJECT_START, FLOATING_PERSON } from "./common";
import remove_person from "../remove_person";
import { can_a_pairing_be_made } from "../utils";
import {
  FLOATING_IDX,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

describe("remove_person", () => {
  it("removing from pb", () => {
    const result = remove_person({ ...RED_PERSON }, PROJECT_START);
    expect(result.pairingBoards[0].people.length).toBe(0);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // only one person in floating, no unpaired assigned
  });

  it("removing from floating", () => {
    const result = remove_person({ ...FLOATING_PERSON }, PROJECT_START);
    expect(result).toMatchSnapshot();
    expect(can_a_pairing_be_made(result)).toBe(false); // no floating pairs
  });

  it("problematic input", () => {
    const before: Project = {
      floating: {
        name: "",
        id: FLOATING_IDX,
        exempt: false,
        roles: [],
        people: [
          {
            id: "20233",
            name: "David",
            type: "Person",
            pairing_board_id: "-1",
          },
          {
            id: "19093",
            name: "Billy",
            type: "Person",
            pairing_board_id: "-1",
          },
          { id: "19092", name: "John", type: "Person", pairing_board_id: "-1" },
          {
            id: "rec_ct6kg2ve4lpv8v5i3200",
            name: "Mario",
            type: "Person",
            pairing_board_id: "-1",
          },
          {
            id: "rec_ct8k0bfhvh3f7vsh7050",
            name: "jimbo",
            type: "Person",
            pairing_board_id: "-1",
          },
          {
            id: "rec_ct8k0bvhvh3f7vsh705g",
            name: "jimbo",
            type: "Person",
            pairing_board_id: "-1",
          },
          {
            id: "rec_ct8k0bu44ggk3j1pqng0",
            name: "jimbo",
            type: "Person",
            pairing_board_id: "-1",
          },
        ],
      },
      id: "",
      name: "",
      pairingBoards: [],
    };

    const after = remove_person(
      {
        id: "rec_ct8k0bu44ggk3j1pqng0",
        name: "jimbo",
        type: "Person",
        pairing_board_id: "-1",
      },
      before
    );

    expect(after.floating.people.map((p) => p.id)).not.toContain(
      "rec_ct8k0bu44ggk3j1pqng0"
    );
    expect(after).toMatchSnapshot();
  });
});
