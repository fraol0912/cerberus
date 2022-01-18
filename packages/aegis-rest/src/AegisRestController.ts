import { Config } from "./config";
import { Controller } from "@cerberus/aegis";
import {
  connectToDB as connectToMongoDB,
  ClientRepository as MongoClientRepository,
  AssertionRepository as MongoAssertionRepository,
} from "@cerberus/mongo";
import {
  ClientRepository as MemoryClientRepository,
  AssertionRepository as MemoryAssertionRepository,
} from "@cerberus/memory";

export class AegisRestController extends Controller {
  private config: Config;
  private memoryClientRepository: MemoryClientRepository;
  private memoryAssertionRepository: MemoryAssertionRepository;
  private mongoClientRepository: MongoClientRepository;
  private mongoAssertionRepository: MongoAssertionRepository;

  constructor(config: Config) {
    super();
    this.config = config;

    if (this.config.database.name === "mongo") {
      connectToMongoDB(this.config.database.url).catch(() => {
        console.log(
          "An Error Occurred while connecting to the database with url",
          this.config.database.url
        );
      });
      this.mongoClientRepository = new MongoClientRepository();
      this.mongoAssertionRepository = new MongoAssertionRepository();
    } else {
      this.memoryClientRepository = new MemoryClientRepository();
      this.memoryAssertionRepository = new MemoryAssertionRepository();
    }
  }

  getIssuerName() {
    return this.config.name;
  }

  getAudienceField() {
    return "/assertions/introspect";
  }

  getAdminPassword() {
    return this.config.adminPassword;
  }

  getEncryptionPassword() {
    return this.config.encryptionPassword;
  }

  // repositories
  getClientRepo() {
    if (this.config.database.name === "mongo") {
      return this.mongoClientRepository;
    } else {
      return this.memoryClientRepository;
    }
  }

  getAssertionRepo() {
    if (this.config.database.name === "mongo") {
      return this.mongoAssertionRepository;
    } else {
      return this.memoryAssertionRepository;
    }
  }
}
