import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '@core/config/config.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private API_URL = this.configService.API_URL_Origin;

  constructor(
    private configService: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // The Http request is by default immutable, so you need to clone
    const cloneReq = req.clone({
      url: `${this.API_URL}${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${this.configService.getAuthToken()}`
      }
    });
    return next.handle(cloneReq);
  }
}
