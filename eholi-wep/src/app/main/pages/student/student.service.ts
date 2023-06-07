import { first } from "rxjs/operators";
import { Param } from "../../../auth/models/data.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Injectable } from "@angular/core";
import { Paginate } from "app/auth/models/base.model";
import { SchoolStudent, Student, StudentMetaData } from "./student.model";
import { AbstractService } from "app/shared/abstract.service";

@Injectable({
  providedIn: "root",
})
export class StudentService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super("students", _ch);
  }

  metaData(uuid: string) {
    return this.http.get<StudentMetaData>(`${this.endpoint}/${uuid}/meta-data`);
  }

  public ecardIndex(params?: Param) {
    return this.http.get<any>(`${this.endpoint}`, { params: params });
  }

  /**
   *  Disable the student by setting the status to false
   * @param uuid student_id
   * @returns result
   */
  public disableStudentInSchool(uuid: string) {
    return this.http.put<SchoolStudent>(`${this.endpoint}/${uuid}/disable`, {});
  }

  updateAvatar(formData: FormData, studentId: any) {
    let url = `${this.endpoint}/update-avatar/${studentId}`;
    return this._ch.post(url, formData);
  }
}
