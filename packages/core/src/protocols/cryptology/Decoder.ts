export interface Decoder {
  decode(encoded: string): Promise<string>;
}
