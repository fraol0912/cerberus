import { decodeBase64 } from "@cerberus/helpers";
import { Decoder } from "@cerberus/core/protocols/cryptology";

export class MainDecoder implements Decoder {
  decode(encoded: string) {
    return Promise.resolve(decodeBase64(encoded));
  }
}
