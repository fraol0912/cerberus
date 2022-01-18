export function decodeBase64(base64: string) {
  const buff = Buffer.from(base64, "base64");
  const data = buff.toString("utf-8");
  return data;
}
