import { expect } from "@jest/globals";
import {
  FLOATING_IDX,
  PairingBoard,
  Person,
  Project,
} from "./interfaces/parrit.interfaces";
import { DragType } from "./interfaces/dragdrop.interface";
import {
  add_person,
  can_a_pairing_be_made,
  get_empty_pairing_board,
  move_person,
  remove_person,
  rename_pairing_board,
} from "./func";

const FRIZZLE: Person = {
  id: "99",
  name: "Ms. Frizzle",
  type: DragType.Person,
  pairing_board_id: "brand new individual",
};

const RED_PERSON: Person = {
  id: "red_parrit_id",
  name: "red_parrit",
  type: DragType.Person,
  pairing_board_id: "red_id_start",
};

const PB_RED: PairingBoard = {
  id: "red_id_start",
  name: "red_start",
  exempt: false,
  people: [RED_PERSON],
  roles: [],
};

const FLOATING_PERSON: Person = {
  id: "floater_id_start",
  name: "floater_name_start",
  type: DragType.Person,
  pairing_board_id: FLOATING_IDX,
};

const PB_BLUE: PairingBoard = {
  id: "blue_id_start",
  name: "blue_start",
  exempt: false,
  people: [],
  roles: [
    {
      id: "role1",
      name: "role",
      type: DragType.Role,
      pairing_board_id: "blue_id_start",
    },
  ],
};

const FLOATING_PARRITS: PairingBoard = {
  people: [FLOATING_PERSON],
  id: FLOATING_IDX,
  name: "floating_board_name_start",
  exempt: false,
  roles: [],
};

const PROJECT_START: Project = {
  id: "project_id_start",
  name: "project_name_start",
  pairingBoards: [PB_RED, PB_BLUE],
  floating: FLOATING_PARRITS,
};

describe("func", () => {
  it("initial state", () => {
    expect(can_a_pairing_be_made(PROJECT_START)).toBe(true);
    const emptyPB = get_empty_pairing_board(PROJECT_START);
    expect(emptyPB).not.toBeUndefined();
  });
  describe("add_person", () => {
    it("adding to a pb", () => {
      const result = add_person(FRIZZLE, PB_RED, PROJECT_START);
      expect(result.pairingBoards[0].people).toStrictEqual([
        {
          id: "red_parrit_id",
          name: "red_parrit",
          pairing_board_id: "red_id_start",
          type: "Person",
        },
        {
          id: "99",
          name: "Ms. Frizzle",
          pairing_board_id: "red_id_start",
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

  describe("rename_paring_board", () => {
    it("happy path", () => {
      const result = rename_pairing_board(
        PROJECT_START,
        PB_RED.id,
        "Frog Board"
      );
      expect(result.pairingBoards[0].name).toBe("Frog Board");
      expect(result).toMatchSnapshot();
    });

    it("does not rename the floating board", () => {
      const result = rename_pairing_board(
        PROJECT_START,
        FLOATING_IDX,
        "NO, DONT"
      );
      expect(result).toMatchSnapshot();
    });
  });

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
});
