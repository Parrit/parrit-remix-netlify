import type { Context } from "@netlify/functions";

export interface Result {
  databaseUrl?: string;
  databaseKey?: string;
}

export default async (req: Request, context: Context) => {
  const databaseUrl = Netlify.env.get("SUPABASE_URL");
  const databaseKey = Netlify.env.get("SUPABASE_KEY");
  const result: Result = { databaseUrl, databaseKey };
  return new Response(JSON.stringify(result));
};
