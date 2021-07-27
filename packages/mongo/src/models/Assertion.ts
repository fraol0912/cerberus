import { model, Schema } from "mongoose";

interface Assertion extends Document {
  name: string;
  issuer: string;
  subject: string;
  audience: string;

  expiresAt: Date;
  notBefore: Date;
  initiatedAt: Date;
}

const schema = new Schema<Assertion>({
  name: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  audience: {
    type: String,
    required: true,
  },

  // time
  expiresAt: {
    type: Date,
    required: true,
  },
  notBefore: {
    type: Date,
    required: true,
  },
  initiatedAt: {
    type: Date,
    required: true,
  },
});

export const AssertionModel = model<Assertion>("Assertion", schema);
