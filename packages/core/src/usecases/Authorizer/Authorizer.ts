import { Decoder } from "../../data/protocols/cryptography/Decoder";
import { LoadAdminGateway } from "../../data/protocols/data-access/Admin/LoadAdminGateway";

export class Authorizer {
  private loadAdminGateway: LoadAdminGateway;
  private decoder: Decoder;
  constructor(config: AuthorizerConfig) {
    this.loadAdminGateway = config.loadAdminGateway;
    this.decoder = config.decoder;
  }

  async isValid(encodedPassword: string) {
    const decoded = await this.decoder.decode(encodedPassword);
    const admin = await this.loadAdminGateway.loadAdmin();
    return admin.comparePassword(decoded);
  }
}
interface AuthorizerConfig {
  loadAdminGateway: LoadAdminGateway;
  decoder: Decoder;
}
