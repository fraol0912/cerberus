import { connect, disconnect, connection } from "mongoose";

export async function connectToDB(uri: string) {
  await connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}

export async function closeDB() {
  await disconnect();
}

export async function clearDB() {
  await connection.db.dropDatabase();
}
