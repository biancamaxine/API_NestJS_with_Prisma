import { DataBaseError } from '../types/HttpErrors';
import {
  PrismaClientError,
  UniqueConstraintError,
} from '../types/PrismaClientErrors';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handlePrismaErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DataBaseError(e.message);
  }
};
