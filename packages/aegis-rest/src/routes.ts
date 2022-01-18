import { Router, json } from "express";
import { Controller } from "@cerberus/aegis";
import { makeClientRouter, makeAssertionRouter } from "./controllers";

export function makeApp(controller: Controller): Router {
  const router = Router();

  router.use(json());

  router.use("/clients", makeClientRouter(controller));
  router.use("/assertions", makeAssertionRouter(controller));

  return router;
}
