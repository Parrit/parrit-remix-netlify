import { Person } from "~/api/common/interfaces/parrit.interfaces";
import { recommendPairs } from "../recommend_pairs";
import { can_a_pairing_be_made } from "../utils";
import { PROJECT_START } from "./common";
import { describe, expect, it } from '@jest/globals';

describe("recommend_pairs", () => {
  it("recommends pairs", () => {
    expect(can_a_pairing_be_made(PROJECT_START)).toBe(true);
    const after = recommendPairs(PROJECT_START, []);
    expect(after).toMatchSnapshot();
  });

  it("doesn't shove everyone onto the same board", () => {
    const before = {
      ...PROJECT_START,
      people: [
        ...PROJECT_START.people,
        ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (num) =>
            ({
              id: `floaty_${num}`,
              name: `Floaty${num}`,
              pairing_board_id: "-1",
              type: "Person",
            } as Person)
        ),
      ],
    };
    const after = recommendPairs(before, []);
    expect(after).toMatchSnapshot();
  });
});
