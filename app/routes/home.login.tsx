import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { PROJECT_PASS, authenticator } from "~/services/auth.server";
import { ParritError } from "~/api/common/ParritError";
import {
  LoginResult,
  LoginRequest,
} from "~/api/common/interfaces/network.interfaces";
import { ProjectForm } from "~/ui/ProjectForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate(PROJECT_PASS, request, {
      successRedirect: "/project",
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }
};

export default function Home_Login() {
  const data = useActionData<typeof action>() as LoginResult | undefined;
  const error = ParritError.fromString<LoginRequest>(data?.message);
  const navigation = useNavigation();
  const submitting = navigation.formAction === "/home/login";

  return (
    <ProjectForm
      submitting={submitting}
      error={error}
      strings={{
        title: "Login to your project",
        actionButton: "Login",
        linkButton: { href: "/home/signup", text: "Create a new project" },
      }}
    />
  );
}
