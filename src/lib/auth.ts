import { createClient } from "@/lib/supabase/server";

/**
 * Validates that the current request has an authenticated Supabase user.
 *
 * Uses `getUser()` instead of `getSession()` because `getUser()` makes a
 * server-side call to Supabase Auth to verify the JWT — `getSession()` only
 * reads the local token without validation, which is less secure.
 *
 * @returns The authenticated Supabase `User` object.
 * @throws  Error if no valid authenticated user is found.
 */
export async function requireAuth() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }

  return user;
}
