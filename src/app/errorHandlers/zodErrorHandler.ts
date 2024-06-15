import { ZodError, ZodIssue } from "zod";
import { TErrorResponse, TErrorSources } from "./errorResponse.interface";

const extractZodIssues = (zodIssues: ZodIssue[]): TErrorSources => {
  return zodIssues.map((issue) => {
    return {
      path: issue.path[0],
      message: issue.message,
    };
  });
};

export const zodErrorHandler = (zodError: ZodError): TErrorResponse => {
  return {
    success: false,
    message: "Validation error",
    errorMessages: extractZodIssues(zodError.issues),
  };
};
