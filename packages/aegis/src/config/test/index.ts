import { Config } from "../";

Config.setPort(8000);
Config.setMongoURI("mongodb://localhost:27017/cerberus");
Config.setAdminPassword("password");

export const config = {
  port: Config.getPort(),
  adminPassword: Config.getAdminPassword(),
  mongoURI: Config.getMongoURI(),
  PASSWORD: Buffer.from(Config.getAdminPassword(), "utf-8").toString("base64"),
  serverURL: `http://localhost:${Config.getPort()}`,
};
