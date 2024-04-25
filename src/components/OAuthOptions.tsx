import { signIn } from "@/auth";
import { FaGoogle } from "react-icons/fa";

export default function OAuthOptions() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">
        <FaGoogle /> Continue with Google
      </button>
    </form>
  );
}
