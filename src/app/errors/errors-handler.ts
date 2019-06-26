import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { toast } from 'bulma-toast';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor( private injector: Injector ) { }

  handleError(error: Error | HttpErrorResponse) {

    console.error('In handleError');
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        console.log('Offline');
        // Handle offline error
        return this.injector.get(toast({
          message: '<h1>Please make sure that you are connected to internet</h1>',
          type: 'is-danger',
          position: 'bottom-right',
          dismissible: true,
          duration: 10000,
          animate: { in: 'fadeIn', out: 'fadeOut' }
        }));
      } else {
        console.log('Online');
        // Handle Http Error (error.status === 403, 404...)

        console.error('An httpError: ', error);
        router.navigate(['/error'], { queryParams: { error } });
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.error('Not an httpError: ', error);
      router.navigate(['/error'], { queryParams: { error } });
    }  // Log the error anyway
    console.error('Error in the end of handleError: ', error);
  }
}
