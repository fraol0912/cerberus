import express from "express";
import { Config } from "./config";
import { makeApp } from "./routes";
import { AegisRestController } from "./AegisRestController";

import { readFileSync } from "fs";

export function makeServer(config: Config): express.Express {
  const controller = new AegisRestController(config);

  const app = express();
  const router = makeApp(controller);

  app.use(router);

  return app;
}

function run() {
  try {
    const jsonConfig = readFileSync("./cerberus.json", "utf-8");
    const config = Config.fromJSON(jsonConfig);

    const app = makeServer(config);

    app.listen(config.port, () => {
      console.log(`Listening on port ${config.port}...`);
    });
  } catch (err) {
    console.log(err.message);
  }
}

run();
