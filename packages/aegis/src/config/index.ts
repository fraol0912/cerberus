import { Server as HttpServer } from "http";

export class Config {
  private static port: number;
  private static mongoURI: string;
  private static adminPassword: string;
  private static server?: HttpServer;

  static getPort() {
    return this.port;
  }
  static setPort(port: number) {
    this.port = port;
  }

  static getMongoURI() {
    return this.mongoURI;
  }
  static setMongoURI(uri: string) {
    this.mongoURI = uri;
  }

  static getAdminPassword() {
    return this.adminPassword;
  }
  static setAdminPassword(password: string) {
    this.adminPassword = password;
  }

  static getServer() {
    return this.server;
  }
  static setServer(server: HttpServer) {
    this.server = server;
  }
}
