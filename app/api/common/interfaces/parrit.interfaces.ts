import { DragItem } from "~/api/common/interfaces/dragdrop.interface";

export interface Project {
  id: string;
  name: string;
  pairingBoards: PairingBoard[];
  floating: PairingBoard;
  people: Person[]; // the new cannonical location for people
  roles: Role[]; // the new cannonical location for roles
}

export const FLOATING_IDX = "-1";

export interface PairingBoard {
  id: string;
  name: string;
  exempt: boolean;
}

export interface Person extends DragItem {
  id: string;
  name: string;
  type: "Person";
}

export interface Role extends DragItem {
  id: string;
  name: string;
  type: "Role";
}

export interface ProjectPairingSnapshot {
  id: string;
  projectId: string;
  pairingTime: string;
  pairingInstances: PairingInstance[];
}

export interface PairingInstance {
  projectId: string;
  pairingBoardName: string | null;
  people: Person[];
  pairingTime: string;
}
