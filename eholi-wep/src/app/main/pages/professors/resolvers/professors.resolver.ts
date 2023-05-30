import { catchError } from 'rxjs/operators'
import { Professor } from './../professor'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Paginate } from 'app/auth/models/base.model'
import { ProfessorsService } from '../professors.service'

@Injectable({
  providedIn: 'root',
})
export class ProfessorsResolver implements Resolve<Paginate<Professor>> {
  constructor(private _professorService: ProfessorsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Professor>> {
    return this._professorService.index(route.queryParams).pipe(
      catchError((_) => {
        return of([] as any)
      }),
    )
  }
}
