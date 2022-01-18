import { Decoder } from "../Decoder";

export class DecoderSpy implements Decoder {
  calledWithPassword: string;
  decode(encoded: string) {
    this.calledWithPassword = encoded;
    return Promise.resolve("password");
  }
}
