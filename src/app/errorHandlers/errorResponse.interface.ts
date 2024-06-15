export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TErrorResponse = {
  success: boolean;
  message: string;
  errorMessages: TErrorSources;
};
