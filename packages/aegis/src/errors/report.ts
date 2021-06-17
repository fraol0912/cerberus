import {
  NoInputData,
  IdNotProvided,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { UnauthorizedError } from "@cerberus/core";
import { InvalidId, ClientNotFound } from "@cerberus/mongo";

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
    error instanceof UnauthorizedError ||
    error instanceof ClientNameNotGiven ||
    error instanceof AdminPasswordNotGiven
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
  }

  return {
    success: false,
    error: {
      name: "ServerError",
      message: "An error occurred at the server",
    },
  };
}
