import { catchError } from 'rxjs/operators'
import { Professor } from '../professor'
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
export class ProfessorDetailsResolver implements Resolve<Professor> {
  constructor(private _professorService: ProfessorsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Professor> {
    console.log(route.params['id'])

    return this._professorService.show(route.params['id']).pipe(
      catchError((_) => {
        return of(null)
      }),
    )
  }
}
