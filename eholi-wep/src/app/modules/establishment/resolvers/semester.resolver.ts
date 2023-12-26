import { Paginate } from 'app/auth/models/base.model'
import { RoomService } from '../services/room.service'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Room } from '../establishment.model'
import { Semester } from '../models/semester.model'
import { SemesterService } from '../services/semester.service'

@Injectable({
  providedIn: 'root',
})
export class SemesterResolver implements Resolve<Paginate<Semester>> {
  constructor(private _semesterService: SemesterService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Semester>> {
    return this._semesterService.index(route.queryParams)
  }
}
