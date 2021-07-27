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

export class AssertionNameNotGiven extends Error {
  name = "AssertionNameNotGiven";
}

export class ExpiryDateNotGiven extends Error {
  name = "ExpiryDateNotGiven";
}

export class ExpiryDateWasNotANumber extends Error {
  name = "ExpiryDateWasNotANumber";
}

export class NotBeforeDateNotGiven extends Error {
  name = "NotBeforeDateNotGiven";
}

export class NotBeforeDateWasNotANumber extends Error {
  name = "NotBeforeDateWasNotANumber";
}
