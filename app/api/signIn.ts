import useXataClient from "~/server-hooks/useXataClient";
import { ProjectsRecord } from "src/xata";
import { createHash } from "crypto";
import * as bcrypt_lib from "bcrypt";

interface Request {
  projectName?: string;
  password?: string;
}

const ALG_REGEX = /{(.*)}(.*)/;
const PARSE_HASHED_REGEX = /\{(\w+)\}(\{.+\})/;

export default async ({
  projectName,
  password,
}: Request): Promise<ProjectsRecord> => {
  console.log("signIn");
  if (!projectName || !password) {
    console.error("Missing project projectName or password.");
    throw new Error("Missing project projectName or password.");
  }
  const xata = useXataClient();
  const project = await xata.db.Projects.filter({
    name: projectName,
  }).getFirstOrThrow();
  console.log("got project", project);

  if (!project.password) {
    throw new Error("Project does not have a password. Fatal error.");
  }

  const info = parseHashedPassword(project.password);
  if (!info) {
    console.error("Unable to understand this hashed password.");
    throw new Error("Unable to understand this hashed password.");
  }

  let correctPassword: boolean = false;

  switch (algorithm) {
    case "sha256":
      correctPassword = compare_sha256(password, storedHash);
      break;
    case "bcrypt":
      correctPassword = await compare_bcrypt(password, storedHash);
      break;
    default:
      console.error(
        `Unsupported password hashing algorithm: [${encryptionAlgoritm}]`
      );
      throw new Error(
        `Unsupported password hashing algorithm: [${encryptionAlgoritm}]`
      );
  }

  if (correctPassword) {
    console.log("successfully logged in to Project", project);
    return project;
  } else {
    console.error("inorrect password");
    throw new Error("Incorrect password.");
  }
};

const evaluateAttempt(attempt: string, {fullHash, algorithm, salt, hash}: PasswordInfo): boolean => {
  
}

const compare_sha256 = (attempt: string, stored: string): boolean => {
  const saltMatch = stored.match(ALG_REGEX);
  let hash: string = "";
  if (saltMatch) {
    const [_full, salt, salted] = saltMatch;
    console.log("salt", salt);
    console.log("salted", salted);
    // created with a salt
    hash = createHash("sha256")
      .update(attempt + salt)
      .digest("hex");
    return hash === salted;
  }
  hash = createHash("sha256").update(attempt).digest("hex");
  return hash === stored;
};

const compare_bcrypt = async (
  attempt: string,
  stored: string
): Promise<boolean> => bcrypt_lib.compare(attempt, stored);
