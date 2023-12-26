import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { BuildingService } from "../services/building.service";

@Injectable({
  providedIn: "root",
})
export class BuildingResolver implements Resolve<boolean> {
  constructor(private _buildingService: BuildingService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this._buildingService.index(route.queryParams);
  }
}
