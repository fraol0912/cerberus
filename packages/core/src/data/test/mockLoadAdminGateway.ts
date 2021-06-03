import { LoadAdminGateway } from "../protocols/data-access/Admin/LoadAdminGateway";
import { makeAdmin } from "../../entities/Admin/test";

export class LoadAdminGatewaySpy implements LoadAdminGateway {
  password: string = "password";

  loadAdmin() {
    const admin = makeAdmin(this.password);
    return Promise.resolve(admin);
  }
}
