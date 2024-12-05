import { curry, over, lensProp, findIndex, adjust, assoc } from "ramda";
import {
  Project,
  PairingBoard,
} from "~/api/common/interfaces/parrit.interfaces";

export default curry(
  (project: Project, pb_id: string, rename: string): Project =>
    over<Project, PairingBoard[]>(
      lensProp("pairingBoards"),
      rename_pairing_board_from_list(pb_id, rename),
      project
    )
);

const pb_index_by_id = curry((pbs: PairingBoard[], pb_id: string) =>
  findIndex<PairingBoard>((pb) => pb.id === pb_id)(pbs)
);

const rename_pairing_board_from_list = curry(
  (pb_id: string, rename: string, pbs: PairingBoard[]) => {
    const foundIndex = pb_index_by_id(pbs, pb_id);
    if (foundIndex < 0) {
      return pbs;
    }
    return adjust<PairingBoard>(foundIndex, assoc("name", rename), pbs);
  }
);
