import { Client } from "../Client";

export function makeClient({ name, id }: { name: string; id: string }) {
  return new Client({
    id,
    name,
  });
}
