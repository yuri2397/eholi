import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { ClassLevel } from '../establishment.model'
import { ClassLevelService } from '../services/class-level.service'

@Injectable({
  providedIn: 'root',
})
export class ShowClassLevelResolver implements Resolve<ClassLevel> {
  constructor(private _classLevelService: ClassLevelService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ClassLevel> {
    console.log(route.params.uuid)

    return this._classLevelService.show(route.params.uuid)
  }
}
