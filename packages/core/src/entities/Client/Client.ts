export class Client {
  private name: string;
  private id: string;
  constructor(config: ClientConfig) {
    this.id = config.id;
    this.name = config.name;
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }
}

interface ClientConfig {
  id: string;
  name: string;
}
