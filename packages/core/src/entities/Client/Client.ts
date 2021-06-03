export class Client {
  private name: string;
  constructor(config: ClientConfig) {
    this.name = config.name;
  }

  getName(): string {
    return this.name;
  }
}

interface ClientConfig {
  name: string;
}
