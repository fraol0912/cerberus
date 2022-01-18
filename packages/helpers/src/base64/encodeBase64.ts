export function encodeBase64(data: string): string {
  const buff = Buffer.from(data, "utf-8");
  const base64 = buff.toString("base64");
  return base64;
}
