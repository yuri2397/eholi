import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from 'app/shared/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class SurahService  extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('surahs', _ch)
  }

}
