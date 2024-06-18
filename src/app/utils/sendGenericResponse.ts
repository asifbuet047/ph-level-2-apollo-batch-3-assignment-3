import { Response } from "express";
import httpStatus from "http-status";

export type TGenericSuccessfulReponse<T> = {
  message: string;
  data: T;
};

export const sendGenericSuccessfulResponse = <T>(
  res: Response,
  data: TGenericSuccessfulReponse<T>,
  code?: number
) => {
  if (code) {
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: code,
      message: data.message,
      data: data.data,
    });
  } else {
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: data.message,
      data: data.data,
    });
  }
};
