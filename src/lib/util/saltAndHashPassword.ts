import bcrypt from "bcrypt";

export async function saltAndHashPassword(pw: string) {
  bcrypt.hash(pw, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    return hash;
  });
}
