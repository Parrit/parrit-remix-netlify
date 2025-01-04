import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import {
  LoginResult,
  LoginRequest,
} from "~/api/common/interfaces/network.interfaces";
import { ParritError } from "~/api/common/ParritError";

import { NEW_PROJECT, authenticator } from "~/services/auth.server";
import { ProjectForm } from "~/ui/ProjectForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate(NEW_PROJECT, request, {
      successRedirect: "/project",
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }
};

export default function Home_Signup() {
  const data = useActionData<typeof action>() as LoginResult | undefined;
  const error = ParritError.fromString<LoginRequest>(data?.message);
  const navigation = useNavigation();
  const submitting = navigation.formAction === "/home/signup";

  return (
    <ProjectForm
      submitting={submitting}
      error={error}
      strings={{
        title: "Create a new project",
        actionButton: "Create",
        linkButton: { href: "/home/login", text: "Login to existing project" },
      }}
    />
  );
}
