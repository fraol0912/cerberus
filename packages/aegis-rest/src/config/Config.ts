export class Config {
  name: string;
  port: number;
  adminPassword: string;
  encryptionPassword: string;
  database: {
    name: "mongo" | "memory";
    url: string;
  };

  constructor(params: {
    name: string;
    port: number;
    adminPassword: string;
    encryptionPassword: string;
    database: {
      name: "mongo" | "memory";
      url: string;
    };
  }) {
    this.name = params.name;
    this.port = params.port;
    this.database = params.database;
    this.adminPassword = params.adminPassword;
    this.encryptionPassword = params.encryptionPassword;
  }

  static validateObject(obj: any): string[] {
    let errors: string[] = [];

    if (!obj.name) {
      errors.push("No name provided for cerberus");
    }

    if (!obj.adminPassword) {
      errors.push("No admin password provided for cerberus");
    }

    if (!obj.encryptionPassword) {
      errors.push("No encryption password provided for cerberus");
    }

    if (!obj.port) {
      errors.push("No port provided for cerberus");
    }

    if (!obj.database) {
      errors.push("No database object provided for cerberus");
    } else {
      if (!obj.database.name) {
        errors.push("No database name provided for cerberus");
      } else {
        if (
          !(obj.database.name === "mongo" || obj.database.name === "memory")
        ) {
          errors.push("The database name provided is not supported");
        }

        if (obj.database.name === "mongo") {
          if (!obj.database.url) {
            errors.push("No database url provided for cerberus");
          }
        }
      }
    }

    return errors;
  }

  static fromJSON(json: string) {
    const object = JSON.parse(json);

    const errors = this.validateObject(object);

    if (errors.length !== 0) {
      throw new Error(errors.join(", "));
    }

    return new Config({
      name: object.name,
      port: object.port,
      database: object.database,
      adminPassword: object.adminPassword,
      encryptionPassword: object.encryptionPassword,
    });
  }
}
