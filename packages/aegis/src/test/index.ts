import { Controller } from "../main";
import { ClientRepository, AssertionRepository } from "@cerberus/memory";

class TestController extends Controller {
  private clientRepo: ClientRepository;
  private assertionRepo: AssertionRepository;
  constructor() {
    super();
    this.clientRepo = new ClientRepository();
    this.assertionRepo = new AssertionRepository();
  }

  getAdminPassword() {
    return "password";
  }

  getClientRepo() {
    return this.clientRepo;
  }

  getAssertionRepo() {
    return this.assertionRepo;
  }

  getIssuerName() {
    return "issuer";
  }

  getAudienceField() {
    return "audience";
  }

  getEncryptionPassword() {
    return "password";
  }
}

export const testController = new TestController();
