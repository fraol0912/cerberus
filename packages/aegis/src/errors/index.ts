export * from "./report";

export class NoInputData extends Error {
  name = "NoInputData";
}

export class IdNotProvided extends Error {
  name = "IdNotProvidedError";
}

export class ClientNameNotGiven extends Error {
  name = "ClientNameNotGiven";
}

export class AdminPasswordNotGiven extends Error {
  name = "AdminPasswordNotGiven";
}
