import { Paginate } from './../../../../auth/models/base.model'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { SchoolYear } from '../establishment.model'
import { SchoolYearsService } from '../services/school-years.service'

@Injectable({
  providedIn: 'root',
})
export class SchoolYearsResolver implements Resolve<Paginate<SchoolYear>> {
  constructor(private _schoolYearService: SchoolYearsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<SchoolYear>> {
    return this._schoolYearService.index(route.queryParams)
  }
}
