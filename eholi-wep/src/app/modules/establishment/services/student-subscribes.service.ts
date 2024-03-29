import { Semester } from "./../models/semester.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paginate } from "app/auth/models/base.model";
import { Param } from "app/auth/models/data.model";
import { AbstractService } from "app/shared/abstract.service";
import { Building } from "../establishment.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StudentSubscribeService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super("student-subscribes", _ch);
  }

  myEcard(data: any) {
    let url = `${this.endpoint}/my-ecard`;
    return this._ch.post(url, data, {
      responseType: "html" as "json",
    });
  }
}
