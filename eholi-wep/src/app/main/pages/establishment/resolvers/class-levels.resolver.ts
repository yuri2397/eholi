import {ClassLevel} from '../models/class-level.model';
import {Paginate} from '../../../../auth/models/base.model';
import {ClassLevelService} from './../services/class-level.service';
import {Injectable} from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ClassLevelsResolver implements Resolve<Paginate<ClassLevel>> {
    constructor(private _classLeveService: ClassLevelService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<Paginate<ClassLevel>> {
        return this._classLeveService.index(route.queryParams);
    }
}
