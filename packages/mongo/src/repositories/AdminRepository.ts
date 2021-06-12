import { Admin, LoadAdminGateway } from "@cerberus/core";

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
