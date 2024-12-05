import { expect } from "@jest/globals";
import { FLOATING_IDX } from "~/api/common/interfaces/parrit.interfaces";
import { PROJECT_START, PB_RED } from "./common";
import rename_pairing_board from "../rename_pairing_board";

describe("rename_paring_board", () => {
  it("happy path", () => {
    const result = rename_pairing_board(PROJECT_START, PB_RED.id, "Frog Board");
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
