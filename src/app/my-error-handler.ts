import { ErrorHandler } from '@angular/core';

export class MyErrorHandler implements ErrorHandler {
  public handleError(error) {
    if (IS_DEV || IS_TEST) {
      console.error(error);
      return;
    }
    // Prod, log to server
    // todo: log to server or email in prod mode
  }
}
