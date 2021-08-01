import {
  UnauthorizedError,
  NotBeforeDateError,
  ExpirationDateError,
} from "@cerberus/core";
import {
  NoInputData,
  IdNotProvided,
  ClientNameNotGiven,
  ExpiryDateNotGiven,
  AdminPasswordNotGiven,
  AssertionNameNotGiven,
  NotBeforeDateNotGiven,
  AssertionTokenNotGiven,
  ExpiryDateWasNotANumber,
  NotBeforeDateWasNotANumber,
} from "@cerberus/aegis/errors";
import { InvalidId, ClientNotFound } from "@cerberus/mongo";
import { ClientNotFound as MemClientNotFound } from "@cerberus/memory";

interface ErrorResponse {
  success: false;
  error: {
    name: string;
    message: string;
  };
}

function allowedError(error: any) {
  return (
    error instanceof InvalidId ||
    error instanceof NoInputData ||
    error instanceof IdNotProvided ||
    error instanceof ClientNotFound ||
    error instanceof MemClientNotFound ||
    error instanceof UnauthorizedError ||
    error instanceof ExpiryDateNotGiven ||
    error instanceof ClientNameNotGiven ||
    error instanceof NotBeforeDateError ||
    error instanceof ExpirationDateError ||
    error instanceof AdminPasswordNotGiven ||
    error instanceof AssertionNameNotGiven ||
    error instanceof NotBeforeDateNotGiven ||
    error instanceof AssertionTokenNotGiven ||
    error instanceof ExpiryDateWasNotANumber ||
    error instanceof NotBeforeDateWasNotANumber
  );
}

export function errorReport(error: any): ErrorResponse {
  if (allowedError(error)) {
    return {
      success: false,
      error: {
        name: (error as Error).name,
        message: (error as Error)?.message,
      },
    };
  } else {
    console.log(error);
    return {
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred at the server",
      },
    };
  }
}
