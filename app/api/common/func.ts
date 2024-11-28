import { PairingBoard, Person } from "./interfaces";
import { append, assoc } from "ramda";

// Functional programing utilities for working with interfaces

export const personToBoard = (
  person: Person,
  board: PairingBoard
): PairingBoard => assoc("people", append(person, board.people), board);
