"use server";

import { env } from "@/data/env/server";
import { FormState, LoginFormSchema } from "@/lib/definitions";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const validatePassword = async (password: string) => {
  return await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH ?? "");
};

export async function login(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const fieldsValidation = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  const errorMsg = { message: "Invalid credentials!" };

  if (!fieldsValidation.success) {
    return {
      errors: fieldsValidation.error.flatten().fieldErrors,
    };
  }

  const { username, password } = fieldsValidation.data;

  if (username !== env.ADMIN_USERNAME) return errorMsg;

  const isValid = await validatePassword(password);

  if (!isValid) return errorMsg;

  await createSession({ role: "admin" });
  redirect("/admin/dashboard");
}
