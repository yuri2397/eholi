import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HandleResolveService {
  constructor(private _router: Router) {}

  handleError(route: ActivatedRouteSnapshot, errorResponse: HttpErrorResponse) {
    switch (errorResponse.status) {
      case 404: {
        this._router.navigate(['/not-found'])
        return of(null)
      }
      case 401: {
        const returnURL: string =
          '/' + route.url.map((segment) => segment.path).join('/')
        this._router.navigate(['/login'], {
          queryParams: { returnURL: returnURL },
        })
        return of(null)
      }
      case 403: {
        this._router.navigate(['/unauthorized'])
        return of(null)
      }
      default: {
        this._router.navigate(['/error'])
        return of(null)
      }
    }
  }
}
