import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment as env } from "environments/environment";
import { User, Role } from "app/auth/models";
import { ToastrService } from "ngx-toastr";
import { LoginResponse } from "../models/response.model";
import { Token } from "../models/token";
import { Param, Permission } from "../models/data.model";
import { SchoolYearsService } from "app/modules/establishment/services/school-years.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private _baseUrl!: string;
  private _token_key = "_enkot_ye";
  private _current_user_key = "currentUser";
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param _syService
   */
  constructor(
    private _http: HttpClient,
    private _syService: SchoolYearsService
  ) {
    this._baseUrl = `${env.api}users/`;
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLogin() {
    return JSON.parse(localStorage.getItem(this._token_key)) && true;
  }

  public get token(): LoginResponse {
    return JSON.parse(localStorage.getItem(this._token_key)) as LoginResponse;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return (
      this.currentUser && this.currentUserSubject.value.role === Role.Admin
    );
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return (
      this.currentUser && this.currentUserSubject.value.role === Role.Client
    );
  }

  get permissions(): Permission[] {
    return (
      (JSON.parse(this._current_user_key)?.permissions as Permission[]) ?? []
    );
  }

  get school() {
    return JSON.parse(localStorage.getItem("school_data"));
  }

  get roles() {
    return (JSON.parse(this._current_user_key)?.roles as Permission[]) ?? [];
  }

  /**
   * User login
   *
   * @param username
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
        map((token) => {
          // login successful if there's a jwt token in the response
          if (token && token.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this._token_key, JSON.stringify(token));
          }
          return token;
        })
      );
  }

  getCurrentUser(params?: Param) {
    return this._http
      .get(`${this._baseUrl}current-user`, { params: params })
      .pipe(
        map((user: any) => {
          if (user) {
            this._syService.currentSchoolYear().subscribe((res: any) => {
              console.log(res);
              localStorage.setItem('school_year', JSON.stringify(res));
            });
            localStorage.setItem(this._current_user_key, JSON.stringify(user));
            localStorage.setItem(
              'school_data',
              JSON.stringify(user.owner.school_user.school)
            );
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem(this._token_key);
    // notify
    this.currentUserSubject.next(null);
  }
}
