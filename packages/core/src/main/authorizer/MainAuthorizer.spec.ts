import { MainAuthorizer } from "./MainAuthorizer";
import { DecoderSpy } from "@cerberus/core/protocols/cryptology/test";
import { LoadAdminGatewaySpy } from "@cerberus/core/protocols/data-access/Admin/test";

describe("Main Authorizer", () => {
  it("calls the decoder with right argument", async () => {
    const decoder = new DecoderSpy();
    const loadAdmin = new LoadAdminGatewaySpy();

    const authorizer = new MainAuthorizer({
      decoder,
      loadAdmin,
    });

    await authorizer.isValid("x");

    expect(decoder.calledWithPassword).toBe("x");
  });

  it("calls the load admin with right argument", async () => {
    const decoder = new DecoderSpy();
    const loadAdmin = new LoadAdminGatewaySpy();

    const authorizer = new MainAuthorizer({
      decoder,
      loadAdmin,
    });

    await authorizer.isValid("x");

    expect(loadAdmin.called).toBe(true);
  });
});
