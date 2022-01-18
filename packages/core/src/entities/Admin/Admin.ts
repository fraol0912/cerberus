export class Admin {
  private password: string;
  constructor(config: AdminConfig) {
    this.password = config.password;
  }

  comparePassword(p: string): boolean {
    return this.password === p;
  }
}
interface AdminConfig {
  password: string;
}
