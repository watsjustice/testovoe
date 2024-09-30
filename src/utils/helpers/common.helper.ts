import { HttpException } from '@nestjs/common';
import * as util from 'node:util';

export async function getOrThrow<T>(getter: () => Promise<T>, exception: HttpException): Promise<T> {
  let result: any;

  try {
    result = await getter();
  } catch {
    throw exception;
  }

  if (result == undefined || result == null || (Array.isArray(result) && result.length === 0)) {
    throw exception;
  }

  return result;
}

export const formatException = (message: string, arg: string | number) => {
  return util.format(message, arg);
};

