import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from 'environments/environment'
import { AuthenticationService } from 'app/auth/service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this._authenticationService.token
    const isApiUrl = request.url.startsWith(environment.api)
    if (token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
    }
    return next.handle(request)
  }
}
