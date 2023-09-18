import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from 'app/shared/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RecitationsService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('progressions', _ch)
  }

  studentProgression(uuid: string){
    let url = `${this.endpoint}/student-progressions/${uuid}`;
    return this.http.get(url);
  }

  studentProgressionDetails(uuid: string){
    let url = `${this.endpoint}/student-progression-details/${uuid}`;
    return this.http.get(url);
  }

}
