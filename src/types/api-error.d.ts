import type { ZodIssue } from "zod";

export type ValidationErrorResponse = {
  error: "ValidationError";
  details: ZodIssue[];
};

export type ServerErrorResponse = {
  error: "ServerError";
  message: string;
};

export type ApiErrorResponse = ValidationErrorResponse | ServerErrorResponse;
