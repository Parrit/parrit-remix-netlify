import { Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

interface HashResult {
  salt: string;
  hash: string;
  iterations: number;
}

export default async (req: Request, context: Context) => {
  const databaseUrl = Netlify.env.get("SUPABASE_URL");
  const databaseKey = Netlify.env.get("SUPABASE_KEY");
  if (!databaseUrl || !databaseKey) {
    throw new Error("Failed to initialize database; missing config params");
  }
  const { name, password: plaintextPassword } = await req.json();
  if (!name || !plaintextPassword) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "missing parameter",
      }),
    };
  }
  const supabase = createClient(databaseUrl, databaseKey);
  try {
    const hashedPassword = await hashPassword(plaintextPassword);
    const result = await supabase
      .from("project")
      .insert({ name, ...hashedPassword });
    if (result.error) {
      return new Response(JSON.stringify(result), {
        status: 500,
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ statusCode: 500 }));
  }
};

const hashPassword = (password: string): Promise<HashResult> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(128).toString("base64");
    const iterations = 10000;
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else {
          resolve({ salt, hash: derivedKey.toString("hex"), iterations });
        }
      }
    );
  });
};
