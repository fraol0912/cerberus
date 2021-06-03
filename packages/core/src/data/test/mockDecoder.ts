import { Decoder } from "../protocols/cryptography/Decoder";

export class DecoderSpy implements Decoder {
  decoded: string = "decoded";
  encodedString: string;

  decode(encoded: string) {
    this.encodedString = encoded;
    return Promise.resolve(this.decoded);
  }
}
