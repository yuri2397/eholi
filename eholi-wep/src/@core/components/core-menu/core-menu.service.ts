import { CoreMenu } from './../../types/core-menu'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { BehaviorSubject, Observable, Subject } from 'rxjs'

import { AuthenticationService } from 'app/auth/service'
import { User } from 'app/auth/models'

@Injectable({
  providedIn: 'root',
})
export class CoreMenuService {
  currentUser: User
  onItemCollapsed: Subject<any>
  onItemCollapseToggled: Subject<any>

  // Private
  private _onMenuRegistered: BehaviorSubject<any>
  private _onMenuUnregistered: BehaviorSubject<any>
  private _onMenuChanged: BehaviorSubject<any>
  private _currentMenuKey: string
  private _registry: { [key: string]: any } = {}

  /**
   * Constructor
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
  ) {
    this._authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x),
    )

    // Set defaults
    this.onItemCollapsed = new Subject()
    this.onItemCollapseToggled = new Subject()

    // Set private defaults
    this._currentMenuKey = null
    this._onMenuRegistered = new BehaviorSubject(null)
    this._onMenuUnregistered = new BehaviorSubject(null)
    this._onMenuChanged = new BehaviorSubject(null)
  }

  // Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * onMenuRegistered
   *
   * @returns {Observable<any>}
   */
  get onMenuRegistered(): Observable<any> {
    return this._onMenuRegistered.asObservable()
  }

  /**
   * onMenuUnregistered
   *
   * @returns {Observable<any>}
   */
  get onMenuUnregistered(): Observable<any> {
    return this._onMenuUnregistered.asObservable()
  }

  /**
   * onMenuChanged
   *
   * @returns {Observable<any>}
   */
  get onMenuChanged(): Observable<any> {
    return this._onMenuChanged.asObservable()
  }

  // Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register the provided menu with the provided key
   *
   * @param key
   * @param menu
   */
  register(key, menu): void {
    // Confirm if the key already used
    if (this._registry[key]) {
      console.error(
        `Menu with the key '${key}' already exists. Either unregister it first or use a unique key.`,
      )

      return
    }

    // Add to registry
    this._registry[key] = menu

    // Notify subject
    this._onMenuRegistered.next([key, menu])
  }

  /**
   * Unregister the menu from the registry
   *
   * @param key
   */
  unregister(key): void {
    // Confirm if the menu exists
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`)
    }

    // Unregister sidebar
    delete this._registry[key]

    // Notify subject
    this._onMenuUnregistered.next(key)
  }

  /**
   * Get menu from registry by key
   *
   * @param key
   * @returns {any}
   */
  getMenu(key): any {
    // Confirm if the menu exists
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`)

      return
    }

    // Return sidebar
    return this._registry[key]
  }

  get permissions() {
    return this._authenticationService.currentUserValue.permissions
  }

  get roles() {
    return this._authenticationService.currentUserValue.roles
  }

  /**
   * Get current menu
   *
   * @returns {any}
   */
  getCurrentMenu(): any {
    if (!this._currentMenuKey) {
      console.warn(`The current menu is not set.`)

      return
    }

    return this.getMenu(this._currentMenuKey)
  }

  /**
   * Set menu with the key as the current menu
   *
   * @param key
   */
  setCurrentMenu(key): void {
    // Confirm if the sidebar exists
    if (!this._registry[key]) {
      console.warn(`Menu with the key '${key}' doesn't exist in the registry.`)

      return
    }

    // Set current menu key
    this._currentMenuKey = key

    // Notify subject
    this._onMenuChanged.next(key)
  }

  userCanShowMenu(item: CoreMenu) {
    return true

    switch (item.type) {
      case 'section':
        this.roles.forEach((r) => {
          if (item.role.includes(r.name)) {
            return true
          }
        })
        return false
      case 'collapsible':
        return item.children.every((ch) => {
          ch.role.forEach((r) => {
            if (this.permissions.find((e) => e.name == r)) {
              return true
            }
            return false
          })
        })
        break

      case 'item':
        this.permissions.forEach((r) => {
          if (item.role.includes(r.name)) {
            return true
          }
        })
        return false
    }
    return true
    return (
      item.type == 'section' &&
      (item.role
        ? item.role.includes(this.currentUser.role)
        : false || item.role == undefined)
    )
  }
}
