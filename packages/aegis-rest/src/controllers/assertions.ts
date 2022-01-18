import { Router } from "express";
import { Controller } from "@cerberus/aegis";
import { getAdminPasswordFromRequest } from "../helpers";

export function makeAssertionRouter(controller: Controller): Router {
  const router = Router();

  router.get("/", async (req, res) => {
    const listAssertionController = controller.getListAssertionController();

    const json = await listAssertionController.handle({
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  router.post("/", async (req, res) => {
    const createAssertionController = controller.getCreateAssertionController();

    const json = await createAssertionController.handle({
      adminPassword: getAdminPasswordFromRequest(req),
      assertionName: req.body?.assertionName,
      clientId: req.body?.clientId,
      expiresAt: req.body?.expiresAt,
      notBefore: req.body?.notBefore,
    });

    res.json(json);
  });

  router.get("/:id", async (req, res) => {
    const getAssertionController = controller.getGetAssertionController();

    const json = await getAssertionController.handle({
      adminPassword: getAdminPasswordFromRequest(req),
      assertionId: req.params?.id,
    });

    res.json(json);
  });

  router.delete("/:id", async (req, res) => {
    const revokeAssertionController = controller.getRevokeAssertionController();

    const json = await revokeAssertionController.handle({
      adminPassword: getAdminPasswordFromRequest(req),
      assertionId: req.params?.id,
    });

    res.json(json);
  });

  router.post("/introspect", async (req, res) => {
    const introspectAssertionController =
      controller.getIntrospectAssertionController();

    const json = await introspectAssertionController.handle({
      assertion: req.body?.assertion,
    });

    res.json(json);
  });

  return router;
}
