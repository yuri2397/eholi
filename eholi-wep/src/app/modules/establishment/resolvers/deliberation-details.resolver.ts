import { DeliberationService } from "./../services/deliberationservice";
import { Deliberation } from "./../models/test-exam.model";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeliberationDetailsResolver implements Resolve<Deliberation> {
  constructor(private _delService: DeliberationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Deliberation> {
    return this._delService.show(route.params["uuid"], {
      "with[]": [
        "schoolYear",
        "semester",
        "classLevel",
        "deliberationItemResults",
      ],
    });
  }
}
