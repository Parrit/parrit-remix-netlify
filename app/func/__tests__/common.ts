import { DragType } from "~/api/common/interfaces/dragdrop.interface";
import {
  Person,
  PairingBoard,
  FLOATING_IDX,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

export const FRIZZLE: Person = {
  id: "99",
  name: "Ms. Frizzle",
  type: DragType.Person,
  pairing_board_id: "brand new individual",
};

export const RED_PERSON: Person = {
  id: "red_parrit_id",
  name: "red_parrit",
  type: DragType.Person,
  pairing_board_id: "red_id_start",
};

export const PB_RED: PairingBoard = {
  id: "red_id_start",
  name: "red_start",
  exempt: false,
  people: [RED_PERSON],
  roles: [],
};

export const FLOATING_PERSON: Person = {
  id: "floater_id_start",
  name: "floater_name_start",
  type: DragType.Person,
  pairing_board_id: FLOATING_IDX,
};

export const PB_BLUE: PairingBoard = {
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

export const FLOATING_PARRITS: PairingBoard = {
  people: [FLOATING_PERSON],
  id: FLOATING_IDX,
  name: "floating_board_name_start",
  exempt: false,
  roles: [],
};

export const PROJECT_START: Project = {
  id: "project_id_start",
  name: "project_name_start",
  pairingBoards: [PB_RED, PB_BLUE],
  floating: FLOATING_PARRITS,
};
