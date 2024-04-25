"use server";

import { signIn } from "@/auth/signIn";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn(formData);
  } catch (err) {
    if (err && typeof err == "object" && "type" in err) {
      switch (err.type) {
        case "InvalidCredentials":
          return "Oops! The credentials you provided are not valid";
        default:
          return "Something went wrong";
      }
    }
    throw err;
  }
}
