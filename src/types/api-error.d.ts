import type { ZodIssue } from "zod";

// Validation errors (from Zod)
export type ValidationErrorResponse = {
  error: "ValidationError";
  message: string;
  details: ZodIssue[];
};

// Server-side errors (general failures)
export type ServerErrorResponse = {
  error: "ServerError";
  message: string;
};

// Not found error
export type NotFoundErrorResponse = {
  error: "NotFound";
  message: string;
};

// Extend ApiErrorResponse to include all known API errors
export type ApiErrorResponse = ValidationErrorResponse | ServerErrorResponse | NotFoundErrorResponse;
