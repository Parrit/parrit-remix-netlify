import {
  FLOATING_IDX,
  Project,
} from "~/api/common/interfaces/parrit.interfaces";

export default (project: Project) => {
  const boards = project.pairingBoards;

  const people = project.people.map((p) => {
    const board =
      boards.find((b) => b.id === p.pairing_board_id) ?? project.floating;
    if (board.exempt || board.id === FLOATING_IDX) {
      return p;
    }
    return { ...p, pairing_board_id: FLOATING_IDX };
  });

  return { ...project, people };
};
