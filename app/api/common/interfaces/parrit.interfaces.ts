import { DragItem } from "~/api/common/interfaces/dragdrop.interface";

export interface Project {
  id: string;
  name: string;
  pairingBoards: PairingBoard[];
  floating: PairingBoard;
}

export const FLOATING_IDX = "-1";

export interface PairingBoard {
  id: string;
  name: string;
  exempt: boolean;
  people: Person[];
  roles: Role[];
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
  pairingTime: string;
  pairingInstances: PairingInstance[];
}

export interface PairingInstance {
  pairingBoardName: string | null;
  people: Person[];
  pairingTime: string;
}
