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

@Injectable({
  providedIn: 'root',
})
export class RoomResolver implements Resolve<Paginate<Room>> {
  constructor(private _roomService: RoomService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Room>> {
    return this._roomService.index(route.queryParams)
  }
}
