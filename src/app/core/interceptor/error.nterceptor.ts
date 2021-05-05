import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonResp } from '@core/model/share';
import { ResponseCodes, ResponseMessages } from '@core/enum/response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
      const error = err.message || err.statusText;

      switch (err.status) {
        case 400:
          this.error400Handler(err);
          break;
        case 401:
          this.error401Handler(err);
          break;
        case 500:
          this.error500Handler(err);
          break;
        default:
          this.errorDefaultHandler(err);
          break;
      }

      return throwError(error);
    }));
  }

  private error400Handler(err: HttpErrorResponse) {
    const errorRespBody: CommonResp = err.error;
    let errorMsg: string;

    switch (errorRespBody.Code) {
      case ResponseCodes.notSupportCurrency:
        errorMsg = ResponseMessages.notSupportCurrency;
        break;
      default:
        errorMsg = ResponseMessages.undefined400;
    }

    alert(errorMsg);
    window.history.back();
  }

  private error401Handler(err: HttpErrorResponse) {
    const errorRespBody: CommonResp = err.error;
    let errorMsg: string;

    switch (errorRespBody.Code) {
      case ResponseCodes.userTokenExpired:
        errorMsg = ResponseMessages.userTokenExpired;
        break;
      case ResponseCodes.notSupportTestPlayer:
        errorMsg = ResponseMessages.notSupportTestPlayer;
        break;
      default:
        errorMsg = ResponseMessages.undefined401;
    }

    alert(errorMsg);
    window.history.back();
  }

  private error500Handler(err: HttpErrorResponse) {
    const errorRespBody: CommonResp = err.error;

    console.log(errorRespBody.Message);
    alert(ResponseMessages.undefined500);

    window.history.back();
  }

  private errorDefaultHandler(err: HttpErrorResponse) {
    const errorRespBody: CommonResp = err.error;

    console.log(errorRespBody.Message);
    alert(ResponseMessages.undefinedOther);

    window.history.back();
  }
}
