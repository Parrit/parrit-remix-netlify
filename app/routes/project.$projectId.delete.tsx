import { ActionFunction, redirect } from "@remix-run/node";
import {
  Form,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useState } from "react";
import parritXataClient from "~/api/parritXataClient";
import { LoadingSpinner } from "~/ui/LoadingSpinner";

const PROJECT_RE = /\/project\/([^/]+)/;

export const action: ActionFunction = async ({ request }) => {
  const xata = parritXataClient();
  const pathmatch = request.url.match(PROJECT_RE);
  const project_id = pathmatch?.[1];
  if (!project_id) {
    console.error("No project_id found in", request.url);
    throw new Response("No project id found in URL", { status: 400 });
  }

  switch (request.method) {
    case "DELETE": {
      const pbs = await xata.db.PairingBoards.filter({ project_id }).getAll();
      const people = await xata.db.Persons.filter({ project_id }).getAll();
      const roles = await xata.db.PairingBoardRoles.filter({
        $any: pbs.map((pb) => ({ pairing_board_id: pb.xata_id })),
      }).getAll();
      const history = await xata.db.PairingHistory.filter({
        project_id,
      }).getAll();
      const historyPersons = await xata.db.PairingHistory_Persons.filter({
        $any: history.map((h) => ({ pairing_history_id: h.xata_id })),
      }).getAll();
      const p_bs = await xata.db.Project_Banners.filter({
        project_id,
      }).getAll();

      await Promise.all(
        p_bs.map((pb) => xata.db.Project_Banners.delete(pb.xata_id))
      );
      await Promise.all(
        historyPersons.map((hp) =>
          xata.db.PairingHistory_Persons.delete(hp.xata_id)
        )
      );
      await Promise.all(
        history.map((h) => xata.db.PairingHistory.delete(h.xata_id))
      );
      await Promise.all(people.map((p) => xata.db.Persons.delete(p.xata_id)));
      await Promise.all(
        roles.map((r) => xata.db.PairingBoardRoles.delete(r.xata_id))
      );
      await Promise.all(
        pbs.map((pb) => xata.db.PairingBoards.delete(pb.xata_id))
      );
      await xata.db.Projects.delete(project_id);

      throw redirect("/logout");
    }
    default: {
      console.error("no handler found for method", request.method);
      return new Response("This route doesn't know how to handle this method", {
        status: 400,
      });
    }
  }
};

export default function DeleteProject() {
  const navigation = useNavigation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const location = useLocation();
  const action = location.pathname;
  const deleting = navigation.formAction === action;

  return (
    <div>
      <div className="ReactModal__Overlay" />
      <div className="fixed inset-0 flex items-center justify-center z-2">
        <div className="relative bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto w-percent-50 text-center space-y-4">
          <div className="form-header">
            <h1>Delete Project</h1>
          </div>
          {confirmDelete ? (
            <p>
              Are you sure you want to delete this project? This is irreversible
            </p>
          ) : (
            <button
              data-cy="delete-project"
              className="button-red w-full"
              onClick={() => setConfirmDelete(true)}
            >
              Delete Project
            </button>
          )}
          <Form method="delete" action={action} hidden={!confirmDelete}>
            <button
              data-cy="confirm-delete"
              type="submit"
              className="button-red w-full"
              disabled={deleting}
            >
              {deleting ? (
                <div className="flex items-center justify-center spacing-x-2">
                  <LoadingSpinner /> <>Deleting...</>
                </div>
              ) : (
                <>Confirm Delete</>
              )}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
