import { Client } from "../Client";

export function makeClient() {
  return new Client({
    id: "id",
    name: "name",
  });
}
