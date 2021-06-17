import { AdminRepository } from "@cerberus/mongo";
import { Config } from "../config";

export const adminRepo = new AdminRepository({
  password: Config.getAdminPassword(),
});
