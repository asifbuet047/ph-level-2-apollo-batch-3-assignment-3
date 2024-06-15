export const sendGenericResponse = <T>(
  isSuccessful: boolean,
  statusCode: number,
  message: string,
  data: T,
) => {
  return {
    success: isSuccessful,
    statusCode,
    message,
    data,
  };
};
