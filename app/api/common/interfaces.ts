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

export interface Person {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface PairingArrangementDTO {
  id: number; // this should be changed to string
  pairingTime: string;
  pairingHistories: PairingHistory[];
}

export interface PairingHistory {
  pairingBoardName: string;
  people: Person[];
}
