import { Deliberation } from "./../models/test-exam.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paginate } from "app/auth/models/base.model";
import { Param } from "app/auth/models/data.model";
import { AbstractService } from "app/shared/abstract.service";
import { ClassLevel } from "../establishment.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DeliberationService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super("deliberations", _ch);
  }

  checkIfDeliberationIsPossible(data: any) {
    let url = `${this.endpoint}/check-deliberation`;
    return this._ch.post(url, data);
  }

  downloadResults(deliberation: Deliberation) {
    let url = `${this.endpoint}/download-results/${deliberation.id}`;
    return this._ch
      .post<Blob>(url, deliberation, {
        responseType: "html" as "json",
      })
      .pipe(tap(() => console.log(`chiffre d'affaire fiche`)));
  }
}
