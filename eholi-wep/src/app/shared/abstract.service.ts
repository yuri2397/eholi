import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { environment } from 'environments/environment'
import { first } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AbstractService {
  private _enpoint!: string
  private _http!: HttpClient

  constructor(private _baseUrl: string, private _clientHttp?: HttpClient) {
    this.enpoint = environment.api + _baseUrl
    this.http = _clientHttp
  }

  public get enpoint(): string {
    return this._enpoint
  }
  public set enpoint(value: string) {
    this._enpoint = value
  }

  public get http(): HttpClient {
    if (this._http) return this._http
    throw new Error(`The HttpClient is not initialized.
      In you constructor:\n
      constructor(private _ch: HttpClient){
        super('your_base_url', _ch)
      }`)
  }
  public set http(value: HttpClient) {
    this._http = value
  }


  /**
   * CRUD FUNCTION
   */

  public index<T>(params?: Param) {
    return this.http
      .get<Paginate<T>>(this.enpoint, { params: params })
      .pipe(first())
  }

  public create<T>(data: T) {
    return this.http.post<T>(this.enpoint, data).pipe(
      first()
    )
  }

  public show<T>(uuid: string, params?: Param) {
    return this.http
      .get<T>(`${this.enpoint}/${uuid}`, { params: params })
      .pipe(first())
  }

  public update<T>(uuid: string, data: T) {
    return this.http.put<T>(`${this.enpoint}/${uuid}`, data).pipe(
      first()
    )
  }

  public delete<T>(uuid: string) {
    return this.http.delete<T>(`${this.enpoint}/${uuid}`).pipe(
      first()
    )
  }

}
