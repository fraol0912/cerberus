import { Controller } from "../main";
import { ClientRepository } from "@cerberus/memory";

class TestController extends Controller {
  private clientRepo: ClientRepository;
  constructor() {
    super();
    this.clientRepo = new ClientRepository();
  }

  getAdminPassword() {
    return "password";
  }

  getClientRepo() {
    return this.clientRepo;
  }
}

export const testController = new TestController();
