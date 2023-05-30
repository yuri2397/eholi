import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthenticationService } from 'app/auth/service'

import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class AccountSettingsService implements Resolve<any> {
  rows: any
  onSettingsChanged: BehaviorSubject<any>

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _authService: AuthenticationService) {
    // Set the defaults
    this.onSettingsChanged = new BehaviorSubject({})
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve()
      }, reject)
    })
  }

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._authService
        .getCurrentUser({
          'with[]': ['owner'],
        })
        .subscribe({
          next: (response) => {
            this.rows = response
            this.onSettingsChanged.next(this.rows)
            resolve(this.rows)
          },
          error: (error) => {
            reject(error)
          },
        })
    })
  }
}
