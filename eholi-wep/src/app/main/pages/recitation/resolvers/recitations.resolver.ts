import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecitationsService } from '../services/recitations.service';

@Injectable({
  providedIn: 'root'
})
export class RecitationDetailResolver implements Resolve<any> {
    constructor(
        private _recitationService: RecitationsService
    ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route.queryParams)
    return  this._recitationService.studentProgression(route.params['uuid']);
  }
}
