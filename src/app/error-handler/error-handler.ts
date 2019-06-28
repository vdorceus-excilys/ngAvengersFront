import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { toast } from 'bulma-toast';

const noInternetMessage = {
    message: '<h1>Please make sure that you are connected to internet</h1>',
    type: 'is-danger',
    position: 'bottom-right',
    dismissible: true,
    duration: 10000,
    animate: { in: 'fadeIn', out: 'fadeOut' }
};


const posterror = {
  message: '<h1>Save error</h1>',
  type: 'is-danger',
  position: 'bottom-right',
  dismissible: true,
  duration: 10000,
  animate: { in: 'fadeIn', out: 'fadeOut' }
};


@Injectable()
export class ErrorHandlerImpl extends ErrorHandler {

  constructor( private injector: Injector ) {
      super();
   }

  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);

    if (error instanceof HttpErrorResponse ) {
      if (!navigator.onLine) {
        return this.injector.get<any>(toast(noInternetMessage));
      }

      if (error.status === 400)
        return this.injector.get<any>(toast(posterror));


    } else {
        router.navigate(['badRoute']);
    }
  }
}


