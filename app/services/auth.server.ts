import { Authenticator } from "remix-auth";
import { ProjectsRecord } from "src/xata";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import signIn from "~/api/signIn.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<ProjectsRecord>(sessionStorage);

export const PROJECT_PASS = "PROJECT_PASS";

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const projectName = form.get("projectName")?.toString();
    const password = form.get("password")?.toString();
    const project = await signIn({ projectName, password });
    // the type of this project must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return project;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  PROJECT_PASS
);
