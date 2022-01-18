import { LoadAdminGateway } from "../LoadAdminGateway";
import { makeAdmin } from "@cerberus/core/entities/Admin/test";

export class LoadAdminGatewaySpy implements LoadAdminGateway {
  called: boolean;
  constructor() {
    this.called = false;
  }

  loadAdmin() {
    this.called = true;
    return Promise.resolve(makeAdmin("password"));
  }
}
