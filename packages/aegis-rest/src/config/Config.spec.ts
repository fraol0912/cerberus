import { Config } from "./Config";

describe("Config", () => {
  describe("Validate object", () => {
    it("reports errors for an empty object", () => {
      expect(Config.validateObject({})).toStrictEqual([
        "No name provided for cerberus",
        "No admin password provided for cerberus",
        "No encryption password provided for cerberus",
        "No port provided for cerberus",
        "No database object provided for cerberus",
      ]);
    });

    it("reports errors for an object with only a name", () => {
      expect(Config.validateObject({ name: "name" })).toStrictEqual([
        "No admin password provided for cerberus",
        "No encryption password provided for cerberus",
        "No port provided for cerberus",
        "No database object provided for cerberus",
      ]);
    });

    it("reports errors for an object with only a name and an admin password", () => {
      expect(
        Config.validateObject({ name: "name", adminPassword: "password" })
      ).toStrictEqual([
        "No encryption password provided for cerberus",
        "No port provided for cerberus",
        "No database object provided for cerberus",
      ]);
    });

    it("reports errors for a database type not being provided", () => {
      expect(
        Config.validateObject({
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
        })
      ).toStrictEqual([
        "No port provided for cerberus",
        "No database object provided for cerberus",
      ]);
    });

    it("reports errors for a port not being provided", () => {
      expect(
        Config.validateObject({
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {
            name: "memory",
          },
        })
      ).toStrictEqual(["No port provided for cerberus"]);
    });

    it("reports errors for an empty database object", () => {
      expect(
        Config.validateObject({
          port: 8000,
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {},
        })
      ).toStrictEqual(["No database name provided for cerberus"]);
    });

    it("reports errors for a database object with an invalid name", () => {
      expect(
        Config.validateObject({
          port: 8000,
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {
            name: "unknown",
          },
        })
      ).toStrictEqual(["The database name provided is not supported"]);
    });

    it("reports errors for a database object with no url", () => {
      expect(
        Config.validateObject({
          port: 8000,
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {
            name: "mongo",
          },
        })
      ).toStrictEqual(["No database url provided for cerberus"]);
    });

    it("doesn't require a url for a database that doesn't require a url", () => {
      expect(
        Config.validateObject({
          port: 8000,
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {
            name: "memory",
          },
        })
      ).toStrictEqual([]);
    });

    it("doesn't report an error for a correct config with a database that requires a url", () => {
      expect(
        Config.validateObject({
          port: 8000,
          name: "name",
          adminPassword: "password",
          encryptionPassword: "password",
          database: {
            name: "mongo",
            url: "url",
          },
        })
      ).toStrictEqual([]);
    });
  });

  describe("create config from json", () => {
    it("throws errors for an invalid config", () => {
      expect(() => Config.fromJSON(JSON.stringify({}))).toThrow(
        "No name provided for cerberus, \
No admin password provided for cerberus, \
No encryption password provided for cerberus, \
No port provided for cerberus, \
No database object provided for cerberus"
      );
    });

    it("creates a config successfully from json", () => {
      const configFromJson = Config.fromJSON(
        JSON.stringify({
          port: 8000,
          name: "name",
          database: {
            name: "mongo",
            url: "url",
          },
          adminPassword: "password",
          encryptionPassword: "password",
        })
      );

      const createdConfig = new Config({
        port: 8000,
        name: "name",
        database: {
          name: "mongo",
          url: "url",
        },
        adminPassword: "password",
        encryptionPassword: "password",
      });

      expect(configFromJson).toStrictEqual(createdConfig);
    });
  });
});
