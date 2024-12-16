import {
  Person,
  PairingBoard,
  FLOATING_IDX,
  Project,
  Role,
} from "~/api/common/interfaces/parrit.interfaces";

export const FRIZZLE: Person = {
  id: "99",
  name: "Ms. Frizzle",
  type: "Person",
  pairing_board_id: "brand new individual",
};

export const RED_PERSON: Person = {
  id: "red_parrit_id",
  name: "red_parrit",
  type: "Person",
  pairing_board_id: "red_id",
};

export const OOO_Person: Person = {
  id: "absent",
  name: "Permanent Vacation",
  type: "Person",
  pairing_board_id: "exempt",
};

export const OOO_Role: Role = {
  id: "ooo",
  name: "OOOROLE",
  type: "Role",
  pairing_board_id: "exempt",
};

export const BLUE_Role: Role = {
  id: "blue_role",
  name: "Blue Role",
  type: "Role",
  pairing_board_id: "blue_id",
};

export const PB_RED: PairingBoard = {
  id: "red_id",
  name: "red_start",
  exempt: false,
};

export const OUT_OF_OFFICE: PairingBoard = {
  id: "exempt",
  name: "out_of_office",
  exempt: true,
};

export const FLOATING_PERSON: Person = {
  id: "floater_id",
  name: "floater_name_start",
  type: "Person",
  pairing_board_id: FLOATING_IDX,
};

export const PB_BLUE: PairingBoard = {
  id: "blue_id",
  name: "blue_start",
  exempt: false,
};

export const FLOATING_PARRITS: PairingBoard = {
  id: FLOATING_IDX,
  name: "floating_board_name",
  exempt: false,
};

export const PROJECT_START: Project = {
  id: "project_id",
  name: "project_name",
  pairingBoards: [PB_RED, PB_BLUE, OUT_OF_OFFICE],
  floating: FLOATING_PARRITS,
  people: [RED_PERSON, FRIZZLE, OOO_Person, FLOATING_PERSON],
  roles: [BLUE_Role, OOO_Role],
};
