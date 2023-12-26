import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "app/shared/abstract.service";

@Injectable({
  providedIn: "root",
})
export class ClassLevelTestExamService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super("tests", _ch);
  }

  updateTestResult(id: number, result: any) {
    return this._ch.put(`${this.endpoint}/update-test-result/${id}`, result);
  }

  studentClassLevelTest(data: any) {
    let url = `${this.endpoint}/student-tests-result`;
    return this._ch.get(url, { params: data });
  }
}
