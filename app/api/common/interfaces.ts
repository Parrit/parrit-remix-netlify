import { DragItem, DragType } from "~/routes/project.$projectId/interfaces";

export interface LoginRequest {
  projectName?: string;
  password?: string;
}

export interface LoginResult {
  message: string;
}

export interface Project {
  id: string;
  name: string;
  pairingBoards: PairingBoard[];
  people: Person[];
}

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
  type: DragType.Person;
}

export interface Role extends DragItem {
  id: string;
  name: string;
  type: DragType.Person;
}

export interface PairingArrangementDTO {
  id: string;
  pairingTime: string;
  pairingHistories: PairingHistory[];
}

export interface PairingHistory {
  pairingBoardName: string;
  people: Person[];
}
