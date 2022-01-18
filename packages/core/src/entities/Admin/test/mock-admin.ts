import { Admin } from "../Admin";

export function makeAdmin(password: string) {
  return new Admin({ password });
}
