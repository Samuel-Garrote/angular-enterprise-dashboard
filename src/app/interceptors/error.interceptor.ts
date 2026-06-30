import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

//***DEBUGGING***To log in console any error HTTP from backend
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error('HTTP Error:', error.status, error.message);
      return throwError(() => error);
    }),
  );
};
