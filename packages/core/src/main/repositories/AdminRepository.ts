import { Admin } from "@cerberus/core/entities";
import { LoadAdminGateway } from "@cerberus/core/protocols/data-access";

export class AdminRepository implements LoadAdminGateway {
  private admin: Admin;
  constructor(config: AdminConfig) {
    this.admin = new Admin({
      password: config.password,
    });
  }

  loadAdmin() {
    return Promise.resolve(this.admin);
  }
}

interface AdminConfig {
  password: string;
}
