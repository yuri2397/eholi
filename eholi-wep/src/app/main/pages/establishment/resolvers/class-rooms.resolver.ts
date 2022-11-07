import { ClassRoomService } from './../services/class-room.service'
import { ClassRoom } from './../models/class-room.model'
import { Paginate } from 'app/auth/models/base.model'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ClassRoomsResolver implements Resolve<Paginate<ClassRoom>> {
  constructor(private _classRoomService: ClassRoomService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<ClassRoom>> {
    return this._classRoomService.index(route.queryParams)
  }
}
