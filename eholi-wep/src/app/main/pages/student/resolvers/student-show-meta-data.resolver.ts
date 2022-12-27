import { catchError, first, map } from 'rxjs/operators'
import { HandleResolveService } from '../../../../shared/handle-resolve.service'
import { StudentService } from '../student.service'
import { Student } from '../student.model'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class StudentShowMetaDataResolver implements Resolve<any> {
  constructor(
    private _studentService: StudentService,
    private _resolveError: HandleResolveService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any>{
    return this._studentService.show(route.params.uuid)
  }

  handleError(route: ActivatedRouteSnapshot, errorResponse: HttpErrorResponse) {
    console.log(`RESOLEVE ERROR: ${errorResponse}`)
  }
}
