import {
  type User,
  type SupabaseClient,
  type Session,
} from "@supabase/supabase-js";

import { ErrorResponse } from "~/models/Error.model";

export type SignUpResponse = {
  data?: { session: Session; user: User };
  error?: ErrorResponse;
};
