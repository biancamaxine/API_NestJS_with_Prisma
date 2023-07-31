import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { isPrismaClientError } from '../utils/is-prisma-client-error.util';
import { handlePrismaErrors } from '../utils/handle-prisma-error.util';
import { DataBaseError } from '../types/HttpErrors';

@Injectable()
export class PrismaClientInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(err => {
        if (isPrismaClientError(err)) err = handlePrismaErrors(err);
        if (err instanceof DataBaseError)
          throw new BadRequestException(err.message);
        throw err;
      }),
    );
  }
}
