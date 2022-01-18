import { Router } from "express";
import { Controller } from "@cerberus/aegis";
import { getAdminPasswordFromRequest } from "../helpers";

export function makeClientRouter(controller: Controller): Router {
  const router = Router();

  router.get("/", async (req, res) => {
    const listClientController = controller.getListClientController();

    const json = await listClientController.handle({
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  router.post("/", async (req, res) => {
    const createClientController = controller.getCreateClientController();

    const json = await createClientController.handle({
      clientName: req.body?.clientName,
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  router.get("/:id", async (req, res) => {
    const getClientController = controller.getGetClientController();

    const json = await getClientController.handle({
      clientId: req.params?.id,
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  router.put("/:id", async (req, res) => {
    const updateClientController = controller.getUpdateClientController();

    const json = await updateClientController.handle({
      clientId: req.params?.id,
      clientName: req.body?.clientName,
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  router.delete("/:id", async (req, res) => {
    const deleteClientController = controller.getDeleteClientController();

    const json = await deleteClientController.handle({
      clientId: req.params?.id,
      adminPassword: getAdminPasswordFromRequest(req),
    });

    res.json(json);
  });

  return router;
}
