import { Authenticator } from "remix-auth";
import { ProjectsRecord } from "src/xata";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import login from "~/api/login.server";
import signup from "~/api/signup.server";
import { ParritError } from "~/api/common/ParritError";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<ProjectsRecord>(sessionStorage);

export const PROJECT_PASS = "PROJECT_PASS";
export const NEW_PROJECT = "NEW_PROJECT";

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const projectName = form.get("projectName")?.toString();
    const password = form.get("password")?.toString();
    try {
      const project = await login({ projectName, password });
      // the type of this project must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return project;
    } catch (error) {
      if (error instanceof ParritError) {
        throw error;
      }
      const message =
        (error as { message?: string })?.message ?? "Unknown error";
      throw new ParritError({ server: message });
    }
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  PROJECT_PASS
);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const projectName = form.get("projectName")?.toString();
    const password = form.get("password")?.toString();
    try {
      const project = await signup({ projectName, password });
      // the type of this project must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return project;
    } catch (error) {
      if (error instanceof ParritError) {
        throw error;
      }
      const message =
        (error as { message?: string })?.message ?? "Unknown error";
      throw new ParritError({ server: message });
    }
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  NEW_PROJECT
);
