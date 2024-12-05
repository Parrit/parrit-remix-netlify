import reset_pairs from "../reset_pairs";
import { PROJECT_START } from "./common";
import { expect } from "@jest/globals";

describe("reset_pairs", () => {
  it("moves everything from non-exempt PBs to floating", () => {
    const result = reset_pairs(PROJECT_START);
    expect(result).toMatchSnapshot();
  });
});
