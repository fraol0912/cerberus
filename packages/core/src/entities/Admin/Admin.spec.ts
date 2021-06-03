import { Admin } from "./Admin";

describe("Admin Entity", () => {
  it("compares its password with a given password", () => {
    const admin = new Admin({
      password: "password",
    });

    expect(admin.comparePassword("password")).toBe(true);
    expect(admin.comparePassword("wrong_password")).toBe(false);
  });
});
