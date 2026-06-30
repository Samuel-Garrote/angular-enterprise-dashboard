import { HttpInterceptorFn } from '@angular/common/http';

//***DEBUGGING***To see what request is doing the app

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request sent to:', req.url);
  return next(req);
};
