import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from 'environments/environment'
import { User, Role } from 'app/auth/models'
import { ToastrService } from 'ngx-toastr'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _baseUrl!: string

  //public
  public currentUser: Observable<User>

  //private
  private currentUserSubject: BehaviorSubject<User>

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient) {
    this._baseUrl = `${environment.api}users/`
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')),
    )
    this.currentUser = this.currentUserSubject.asObservable()
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return (
      this.currentUser && this.currentUserSubject.value.role === Role.Client
    )
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(username: string, password: string) {
    return this._http
      .post<any>(`${this._baseUrl}authenticate`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user))

            this.currentUserSubject.next(user)
          }

          return user
        }),
      )
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
    // notify
    this.currentUserSubject.next(null)
  }
}
