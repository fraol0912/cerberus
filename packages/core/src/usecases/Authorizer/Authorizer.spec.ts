import { DecoderSpy } from "../../data/test/mockDecoder";
import { LoadAdminGatewaySpy } from "../../data/test/mockLoadAdminGateway";
import { Authorizer } from "./Authorizer";

function makeAuthorizer() {
  const decoderSpy = new DecoderSpy();
  const loadAdminGatewaySpy = new LoadAdminGatewaySpy();

  return {
    authorizer: new Authorizer({
      decoder: decoderSpy,
      loadAdminGateway: loadAdminGatewaySpy,
    }),
    decoderSpy: decoderSpy,
    loadAdminGatewaySpy: loadAdminGatewaySpy,
  };
}

describe("Authorizer", () => {
  it("returns false for an incorrect password", async () => {
    const { authorizer, loadAdminGatewaySpy, decoderSpy } = makeAuthorizer();

    loadAdminGatewaySpy.password = "password";
    decoderSpy.decoded = "wrong_password";

    expect(await authorizer.isValid("encoded_password")).toBe(false);
  });

  it("return true for a correct password", async () => {
    const { authorizer, loadAdminGatewaySpy, decoderSpy } = makeAuthorizer();

    loadAdminGatewaySpy.password = "password";
    decoderSpy.decoded = "password";

    expect(await authorizer.isValid("encoded_password")).toBe(true);
  });

  it("calls the decoder with the right argument", async () => {
    const { authorizer, decoderSpy, loadAdminGatewaySpy } = makeAuthorizer();

    await authorizer.isValid("encoded_password");

    loadAdminGatewaySpy.password = "password";
    decoderSpy.decoded = "password";

    expect(decoderSpy.encodedString).toBe("encoded_password");
  });
});
