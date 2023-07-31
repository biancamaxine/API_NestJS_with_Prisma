import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../types/HttpErrors';

@Injectable()
export class HttpExeptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof BadRequestError)
          throw new BadRequestException(err.message);
        if (err instanceof UnauthorizedError)
          throw new UnauthorizedException(err.message);
        if (err instanceof NotFoundError)
          throw new NotFoundException(err.message);
        if (err instanceof ConflictError)
          throw new ConflictException(err.message);
        throw err;
      }),
    );
  }
}
