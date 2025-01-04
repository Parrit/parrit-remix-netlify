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
  projectId: string;
  pairingTime: string;
  pairingInstances: PairingInstance[];
}

export interface PairingInstance {
  id?: string; // if id is undefined that means this isn't persisted yet
  projectId: string;
  pairingBoardName: string | null;
  people: Person[];
  pairingTime: string;
}

export interface Banner {
  id: string;
  title: string;
  paragraphs: string[];
  action_text: string;
  action_url?: string;
  seen_at?: string;
}
