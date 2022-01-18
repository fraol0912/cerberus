import { sign, verify } from "jsonwebtoken";

export const jwt = {
  encrypt: async (payload: object, password: string): Promise<string> => {
    return await sign(payload, password);
  },

  decrypt: async (payload: string, password: string): Promise<any> => {
    return (await verify(payload, password, {
      ignoreNotBefore: true,
      ignoreExpiration: true,
    })) as object;
  },
};
