import { Controller } from "../main";
import { ClientRepository } from "@cerberus/mongo";

class TestController extends Controller {
  getAdminPassword() {
    return "password";
  }

  getClientRepo() {
    return new ClientRepository();
  }
}

export const testController = new TestController();
