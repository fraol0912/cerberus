import { Decoder } from "@cerberus/core/protocols/cryptology";
import { Authorizer } from "@cerberus/core/protocols/authorizer";
import { LoadAdminGateway } from "@cerberus/core/protocols/data-access";

export class MainAuthorizer implements Authorizer {
  private decoder: Decoder;
  private loadAdmin: LoadAdminGateway;
  constructor(config: MainAuthorizerConfig) {
    this.decoder = config.decoder;
    this.loadAdmin = config.loadAdmin;
  }

  async isValid(password: string) {
    const decodedPassword = await this.decoder.decode(password);
    const admin = await this.loadAdmin.loadAdmin();
    return admin.comparePassword(decodedPassword);
  }
}

export interface MainAuthorizerConfig {
  decoder: Decoder;
  loadAdmin: LoadAdminGateway;
}
