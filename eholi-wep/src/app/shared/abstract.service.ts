import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'environments/environment'

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
}
