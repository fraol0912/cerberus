import { AdminRepository } from "./AdminRepository";

describe("Admin Repository", () => {
  it("loads a an admin", async () => {
    const repo = new AdminRepository({
      password: "password",
    });

    const admin = await repo.loadAdmin();

    expect(admin.comparePassword("password")).toBe(true);
  });
});
