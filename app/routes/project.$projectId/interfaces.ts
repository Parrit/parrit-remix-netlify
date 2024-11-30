export enum DragType {
  Person = "Person",
  Role = "Role",
}

export enum DropType {
  Floating = "Floating",
  PairingBoard = "PairingBoard",
  TrashBin = "TrashBin",
}

export interface DragItem {
  id: string;
  name: string;
  type: DragType;
}

export interface DropItem {
  type: DropType;
}

export interface DropTarget {
  isOver: boolean;
  canDrop: boolean;
}

export interface DragResult {}
