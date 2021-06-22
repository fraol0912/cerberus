import {
  NoInputData,
  IdNotProvided,
  ClientNameNotGiven,
  AdminPasswordNotGiven,
} from "@cerberus/aegis/errors";
import { UnauthorizedError } from "@cerberus/core";
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
  } else {
    return {
      success: false,
      error: {
        name: "ServerError",
        message: "An error occurred at the server",
      },
    };
  }
}
