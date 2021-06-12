import { model, Schema } from "mongoose";

interface Client extends Document {
  name: string;
}

const schema = new Schema<Client>({
  name: {
    type: String,
    required: true,
  },
});

export const ClientModel = model<Client>("Client", schema);
