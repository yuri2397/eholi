import { Param } from "./../../../auth/models/data.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "app/shared/abstract.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EcardService extends AbstractService {
  constructor(private _hc: HttpClient) {
    super("student-subscribes", _hc);
  }

  index(params?: Param) {
    console.log(this.endpoint);

    return this.http.get<any>(this.endpoint, { params: params });
  }

  classLevelEcard(clasLevelId: any) {
    let url = `${this.endpoint}/class-level-ecard/${clasLevelId}`;
    return this._hc.get(url, {
      responseType: "html" as "json",
    }).pipe(tap(() => console.log(`chiffre d'affaire fiche`)));
  }
}
