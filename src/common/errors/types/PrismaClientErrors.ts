import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ConflictError } from './HttpErrors';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { target: string[] };
};

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;

    super(`A record with this ${uniqueField} already exists.`);
  }
}
